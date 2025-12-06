# 🚀 Redis Cache & Prometheus Monitoring Setup Guide

## 📋 Mục Lục
1. [Cài đặt Redis](#1-cài-đặt-redis)
2. [Cài đặt Prometheus & Grafana](#2-cài-đặt-prometheus--grafana)
3. [Cấu hình Environment Variables](#3-cấu-hình-environment-variables)
4. [Sử dụng Cache](#4-sử-dụng-cache)
5. [Xem Metrics](#5-xem-metrics)
6. [Troubleshooting](#6-troubleshooting)

---

## 1️⃣ Cài đặt Redis

### **Windows:**

#### **Option 1: Dùng Docker (Khuyến nghị)**
```bash
# Cài Docker Desktop: https://www.docker.com/products/docker-desktop

# Chạy Redis container
docker run -d --name redis-hutech -p 6379:6379 redis:latest

# Kiểm tra Redis đang chạy
docker ps

# Xem logs
docker logs redis-hutech

# Dừng Redis
docker stop redis-hutech

# Khởi động lại
docker start redis-hutech
```

#### **Option 2: Cài Redis trực tiếp**
```bash
# Download Redis for Windows từ:
# https://github.com/microsoftarchive/redis/releases

# Hoặc dùng Chocolatey:
choco install redis-64

# Khởi động Redis
redis-server

# Test Redis (terminal mới)
redis-cli ping
# Kết quả: PONG
```

### **macOS:**
```bash
# Cài qua Homebrew
brew install redis

# Khởi động Redis
brew services start redis

# Test
redis-cli ping
```

### **Linux (Ubuntu/Debian):**
```bash
# Cài đặt
sudo apt update
sudo apt install redis-server

# Khởi động
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test
redis-cli ping
```

---

## 2️⃣ Cài đặt Prometheus & Grafana

### **Option 1: Docker Compose (Khuyến nghị)**

Tạo file `docker-compose.monitoring.yml`:

```yaml
version: '3.8'

services:
  # Prometheus - Thu thập metrics
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus-hutech
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    restart: unless-stopped

  # Grafana - Visualize metrics
  grafana:
    image: grafana/grafana:latest
    container_name: grafana-hutech
    ports:
      - "3001:3000"  # Port 3001 để tránh conflict với backend
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - prometheus
    restart: unless-stopped

  # Redis (nếu chưa cài)
  redis:
    image: redis:latest
    container_name: redis-hutech
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  prometheus-data:
  grafana-data:
  redis-data:
```

Tạo file `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s  # Lấy metrics mỗi 15 giây
  evaluation_interval: 15s

scrape_configs:
  # Hutech-Edu Backend
  - job_name: 'hutech-edu-backend'
    static_configs:
      - targets: ['host.docker.internal:3000']  # Windows/Mac
        # - targets: ['172.17.0.1:3000']  # Linux
    metrics_path: '/metrics'
    scrape_interval: 10s

  # Prometheus self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

**Khởi động:**
```bash
# Chạy tất cả services
docker-compose -f docker-compose.monitoring.yml up -d

# Kiểm tra
docker-compose -f docker-compose.monitoring.yml ps

# Xem logs
docker-compose -f docker-compose.monitoring.yml logs -f

# Dừng
docker-compose -f docker-compose.monitoring.yml down
```

### **Option 2: Cài đặt trực tiếp**

#### **Prometheus:**
```bash
# Windows: Download từ https://prometheus.io/download/
# Giải nén và chạy:
prometheus.exe --config.file=prometheus.yml

# macOS:
brew install prometheus
brew services start prometheus

# Linux:
sudo apt install prometheus
sudo systemctl start prometheus
```

#### **Grafana:**
```bash
# Windows: Download từ https://grafana.com/grafana/download

# macOS:
brew install grafana
brew services start grafana

# Linux:
sudo apt install grafana
sudo systemctl start grafana
```

---

## 3️⃣ Cấu hình Environment Variables

Thêm vào file `.env`:

```env
# ========================================
# REDIS CONFIGURATION
# ========================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=          # Để trống nếu không có password
REDIS_DB=0               # Database number (0-15)

# ========================================
# MONITORING CONFIGURATION
# ========================================
PROMETHEUS_ENABLED=true
METRICS_ENDPOINT=/metrics
```

---

## 4️⃣ Sử dụng Cache

### **A. Tự động cache với Middleware**

Trong file `routes/course.route.ts`:

```typescript
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

// Cache GET /api/courses trong 5 phút (300s)
router.get('/courses', cacheMiddleware(300), getAllCourses);

// Cache với options
router.get('/courses/:id', 
  cacheMiddleware({
    ttl: 600,              // 10 phút
    keyPrefix: 'course',
    includeQuery: true,
  }), 
  getCourseById
);

// Không cache (POST/PUT/DELETE)
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
```

### **B. Manual cache trong Service**

```typescript
import { CacheService } from '../configs/redis.config.js';

// Lấy từ cache
const cached = await CacheService.get('courses:all');
if (cached) {
  return cached;
}

// Query DB
const courses = await prisma.course.findMany();

// Lưu vào cache (5 phút)
await CacheService.set('courses:all', courses, 300);

return courses;
```

### **C. Cache Invalidation (Xóa cache khi data thay đổi)**

```typescript
import { invalidateCache } from '../middlewares/cache.middleware.js';

// Sau khi create/update/delete course
await invalidateCache('api:/api/courses*');  // Xóa tất cả cache courses
await invalidateCache(`api:/api/courses/${courseId}`);  // Xóa cache 1 course
```

### **D. Sử dụng CachedCourseService**

Trong controller, thay vì dùng `CourseService`, dùng `CachedCourseService`:

```typescript
// TRƯỚC (không cache):
import CourseService from '../services/course.service.js';
const courseService = new CourseService(courseRepo);

// SAU (có cache):
import CachedCourseService from '../services/course.service.cached.js';
const courseService = new CachedCourseService();

// Sử dụng bình thường, cache tự động hoạt động
const courses = await courseService.getAllCourse();
```

---

## 5️⃣ Xem Metrics

### **A. Prometheus UI**

1. Mở browser: `http://localhost:9090`
2. Vào tab **Graph**
3. Thử các queries:

```promql
# Tổng số HTTP requests
hutech_edu_http_requests_total

# Requests theo status code
hutech_edu_http_requests_total{status_code="200"}

# Average response time (ms)
rate(hutech_edu_http_request_duration_ms_sum[5m]) / rate(hutech_edu_http_request_duration_ms_count[5m])

# Error rate
rate(hutech_edu_errors_total[5m])

# Số users đang online
hutech_edu_active_users

# Cache hit rate
hutech_edu_cache_hit_rate

# Payment success rate
rate(hutech_edu_payments_total{status="success"}[5m])
```

### **B. Grafana Dashboard**

1. Mở browser: `http://localhost:3001`
2. Login: `admin` / `admin123`
3. **Add Data Source:**
   - Click **Configuration** → **Data Sources**
   - Click **Add data source**
   - Chọn **Prometheus**
   - URL: `http://prometheus:9090` (nếu dùng Docker) hoặc `http://localhost:9090`
   - Click **Save & Test**

4. **Import Dashboard:**
   - Click **+** → **Import**
   - Upload file `grafana-dashboard.json` (tôi sẽ tạo ở bước sau)
   - Hoặc tạo dashboard mới:

**Ví dụ Panel:**

```
Panel 1: HTTP Requests per Second
Query: rate(hutech_edu_http_requests_total[1m])

Panel 2: Average Response Time
Query: rate(hutech_edu_http_request_duration_ms_sum[5m]) / rate(hutech_edu_http_request_duration_ms_count[5m])

Panel 3: Error Rate
Query: rate(hutech_edu_errors_total[5m])

Panel 4: Active Users
Query: hutech_edu_active_users

Panel 5: Cache Hit Rate
Query: hutech_edu_cache_hit_rate
```

### **C. Metrics Endpoint**

Xem raw metrics:
```bash
curl http://localhost:3000/metrics
```

Output:
```
# HELP hutech_edu_http_requests_total Total number of HTTP requests
# TYPE hutech_edu_http_requests_total counter
hutech_edu_http_requests_total{method="GET",route="/api/courses",status_code="200"} 1234

# HELP hutech_edu_http_request_duration_ms HTTP request duration in milliseconds
# TYPE hutech_edu_http_request_duration_ms histogram
hutech_edu_http_request_duration_ms_bucket{le="5"} 100
hutech_edu_http_request_duration_ms_bucket{le="10"} 250
...
```

---

## 6️⃣ Troubleshooting

### **Redis không kết nối được:**

```bash
# Kiểm tra Redis đang chạy
redis-cli ping
# Kết quả: PONG

# Kiểm tra port
netstat -an | findstr 6379  # Windows
lsof -i :6379               # Mac/Linux

# Xem logs
docker logs redis-hutech

# Restart Redis
docker restart redis-hutech
```

### **Prometheus không scrape được metrics:**

1. Kiểm tra backend đang chạy: `http://localhost:3000/metrics`
2. Kiểm tra Prometheus targets: `http://localhost:9090/targets`
3. Nếu target DOWN:
   - Windows/Mac: Dùng `host.docker.internal:3000`
   - Linux: Dùng `172.17.0.1:3000`

### **Cache không hoạt động:**

```typescript
// Kiểm tra Redis connection
import redis from './configs/redis.config.js';

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

// Test cache manually
import { CacheService } from './configs/redis.config.js';

await CacheService.set('test', { hello: 'world' }, 60);
const data = await CacheService.get('test');
console.log(data); // { hello: 'world' }
```

### **Metrics không hiển thị:**

```bash
# Kiểm tra metrics endpoint
curl http://localhost:3000/metrics

# Restart backend
npm run dev

# Xem console logs
# Phải thấy: "✅ Prometheus metrics initialized"
```

---

## 📊 Performance Comparison

### **Trước khi có Cache:**
```
GET /api/courses
- Database query: 200ms
- Total: 200ms
- 1000 requests = 200,000ms (3.3 phút)
```

### **Sau khi có Cache:**
```
GET /api/courses
- Request 1: Database query + Cache set = 205ms
- Request 2-1000: Cache hit = 2ms each
- Total: 205ms + (999 × 2ms) = 2,203ms (2.2 giây)
- Tăng tốc: 90x faster! 🚀
```

---

## 🎯 Best Practices

### **1. Cache TTL (Time To Live):**
- **Static data** (courses, categories): 10-15 phút
- **Dynamic data** (user profile): 5 phút
- **Real-time data** (active sessions): 1-2 phút
- **Search results**: 3-5 phút

### **2. Cache Invalidation:**
```typescript
// ✅ ĐÚNG: Xóa cache sau khi update
await courseService.updateCourse(courseId, data);
await invalidateCache(`api:/api/courses/${courseId}`);

// ❌ SAI: Quên xóa cache → User thấy data cũ
await courseService.updateCourse(courseId, data);
// Không xóa cache
```

### **3. Cache Key Naming:**
```typescript
// ✅ ĐÚNG: Descriptive, có namespace
'courses:all:0:10'
'course:abc-123'
'user:profile:xyz-456'

// ❌ SAI: Không rõ ràng
'data'
'cache1'
'temp'
```

### **4. Monitoring:**
- Theo dõi **cache hit rate** (nên > 80%)
- Theo dõi **response time** (nên < 100ms)
- Set up **alerts** khi có nhiều errors

---

## 🚀 Next Steps

1. ✅ Cài đặt Redis
2. ✅ Cài đặt Prometheus & Grafana
3. ✅ Test cache với `/api/courses`
4. ✅ Xem metrics tại `http://localhost:9090`
5. ✅ Tạo Grafana dashboard
6. 🔜 Apply cache cho các endpoints khác
7. 🔜 Set up production monitoring (Datadog, New Relic)

---

## 📚 Tài liệu tham khảo

- Redis: https://redis.io/docs/
- Prometheus: https://prometheus.io/docs/
- Grafana: https://grafana.com/docs/
- ioredis: https://github.com/redis/ioredis
- prom-client: https://github.com/siimon/prom-client
