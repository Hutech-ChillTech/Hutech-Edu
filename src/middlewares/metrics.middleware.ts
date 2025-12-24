import { Request, Response, NextFunction } from 'express';
import { recordHttpRequest } from '../configs/metrics.config.js';

/**
 * 📊 METRICS MIDDLEWARE
 * 
 * Middleware này tự động ghi lại metrics cho mỗi HTTP request:
 * - Thời gian response 
 * - Status code
 * - Route path
 * - HTTP method
 * 
 * Cách hoạt động:
 * 1. Request vào → Ghi lại thời gian bắt đầu
 * 2. Request xử lý xong → Tính thời gian đã qua
 * 3. Ghi metrics vào Prometheus
 * 
 * Usage:
 * app.use(metricsMiddleware);
 */

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  // Ghi lại thời gian bắt đầu request
  const startTime = Date.now();

  // Lắng nghe sự kiện 'finish' khi response được gửi đi
  res.on('finish', () => {
    // Tính thời gian đã qua (milliseconds)
    const duration = Date.now() - startTime;

    // Lấy thông tin request
    const method = req.method;
    const route = req.route?.path || req.path || 'unknown';
    const statusCode = res.statusCode;

    // Ghi metrics
    recordHttpRequest(method, route, statusCode, duration);

    // Log ra console để debug (có thể tắt ở production)
    if (duration > 1000) {
      // Chỉ log requests chậm > 1s
      console.warn(`⚠️  Slow request: ${method} ${route} - ${duration}ms - ${statusCode}`);
    }
  });

  next();
}

/**
 * 🎯 METRICS ENDPOINT
 * 
 * Endpoint này expose metrics để Prometheus scrape.
 * Prometheus sẽ gọi endpoint này mỗi 15-30 giây để lấy metrics.
 * 
 * Usage:
 * app.get('/metrics', metricsEndpoint);
 * 
 * Sau đó config Prometheus:
 * scrape_configs:
 *   - job_name: 'hutech-edu'
 *     static_configs:
 *       - targets: ['localhost:3000']
 *     metrics_path: '/metrics'
 */

export async function metricsEndpoint(req: Request, res: Response) {
  try {
    const { metricsRegistry } = await import('../configs/metrics.config.js');
    
    // Set content type cho Prometheus
    res.set('Content-Type', metricsRegistry.contentType);
    
    // Trả về metrics
    const metrics = await metricsRegistry.metrics();
    res.end(metrics);
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send('Error generating metrics');
  }
}
