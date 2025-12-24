import promClient from 'prom-client';

/**
 * 📊 PROMETHEUS METRICS CONFIGURATION
 * 
 * Prometheus là hệ thống monitoring thu thập metrics (số liệu) từ ứng dụng.
 * Metrics giúp bạn theo dõi:
 * - Số lượng requests
 * - Thời gian response
 * - Số lượng errors
 * - Memory/CPU usage
 * - Custom business metrics (số user đăng ký, số payment thành công, etc.)
 * 
 * Sau đó dùng Grafana để visualize metrics thành dashboard đẹp.
 */

// Clear existing metrics to prevent duplicate registration during hot-reload
promClient.register.clear();

// Enable default metrics (CPU, Memory, Event Loop, etc.)
// Prometheus tự động thu thập các metrics hệ thống
promClient.collectDefaultMetrics({
  prefix: 'hutech_edu_', // Prefix cho tất cả metrics
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // Garbage collection buckets
});

/**
 * 📈 COUNTER METRICS
 * Counter chỉ tăng, không giảm. Dùng để đếm số lượng events.
 */

// Tổng số HTTP requests
export const httpRequestCounter = new promClient.Counter({
  name: 'hutech_edu_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'], // Labels để phân loại
});

// Tổng số errors
export const errorCounter = new promClient.Counter({
  name: 'hutech_edu_errors_total',
  help: 'Total number of errors',
  labelNames: ['type', 'route'], // type: 'validation', 'database', 'external_api', etc.
});

// Tổng số user registrations
export const userRegistrationCounter = new promClient.Counter({
  name: 'hutech_edu_user_registrations_total',
  help: 'Total number of user registrations',
  labelNames: ['method'], // method: 'email', 'google', 'facebook'
});

// Tổng số payments
export const paymentCounter = new promClient.Counter({
  name: 'hutech_edu_payments_total',
  help: 'Total number of payments',
  labelNames: ['status', 'method'], // status: 'success', 'failed'; method: 'vnpay', 'momo'
});

// Tổng số course enrollments
export const enrollmentCounter = new promClient.Counter({
  name: 'hutech_edu_enrollments_total',
  help: 'Total number of course enrollments',
  labelNames: ['course_id'],
});

/**
 * 📊 GAUGE METRICS
 * Gauge có thể tăng hoặc giảm. Dùng để đo giá trị hiện tại.
 */

// Số users đang online
export const activeUsersGauge = new promClient.Gauge({
  name: 'hutech_edu_active_users',
  help: 'Number of currently active users',
});

// Số learning sessions đang active
export const activeSessionsGauge = new promClient.Gauge({
  name: 'hutech_edu_active_sessions',
  help: 'Number of currently active learning sessions',
});

// Cache hit rate (%)
export const cacheHitRateGauge = new promClient.Gauge({
  name: 'hutech_edu_cache_hit_rate',
  help: 'Cache hit rate percentage',
});

/**
 * ⏱️ HISTOGRAM METRICS
 * Histogram đo phân phối của giá trị (thường là thời gian).
 * Tự động tạo buckets để phân loại: <10ms, <50ms, <100ms, <500ms, etc.
 */

// Thời gian response của HTTP requests
export const httpRequestDuration = new promClient.Histogram({
  name: 'hutech_edu_http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000], // milliseconds
});

// Thời gian query database
export const databaseQueryDuration = new promClient.Histogram({
  name: 'hutech_edu_database_query_duration_ms',
  help: 'Database query duration in milliseconds',
  labelNames: ['operation', 'model'], // operation: 'findMany', 'create', etc.; model: 'User', 'Course'
  buckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000],
});

// Thời gian cache operations
export const cacheOperationDuration = new promClient.Histogram({
  name: 'hutech_edu_cache_operation_duration_ms',
  help: 'Cache operation duration in milliseconds',
  labelNames: ['operation'], // operation: 'get', 'set', 'delete'
  buckets: [0.1, 0.5, 1, 2, 5, 10, 25, 50],
});

// Thời gian external API calls (VNPay, Cloudinary, etc.)
export const externalApiDuration = new promClient.Histogram({
  name: 'hutech_edu_external_api_duration_ms',
  help: 'External API call duration in milliseconds',
  labelNames: ['service', 'endpoint'], // service: 'vnpay', 'cloudinary', 'firebase'
  buckets: [10, 50, 100, 250, 500, 1000, 2500, 5000],
});

/**
 * 📊 SUMMARY METRICS
 * Tương tự Histogram nhưng tính percentiles (p50, p90, p95, p99)
 */

// Payment amount distribution
export const paymentAmountSummary = new promClient.Summary({
  name: 'hutech_edu_payment_amount',
  help: 'Payment amount distribution',
  labelNames: ['currency', 'status'],
  percentiles: [0.5, 0.9, 0.95, 0.99], // p50, p90, p95, p99
});

/**
 * 🎯 CUSTOM BUSINESS METRICS
 * Metrics đặc thù cho business logic
 */

// Course completion rate
export const courseCompletionGauge = new promClient.Gauge({
  name: 'hutech_edu_course_completion_rate',
  help: 'Course completion rate percentage',
  labelNames: ['course_id'],
});

// Average learning speed
export const learningSpeedGauge = new promClient.Gauge({
  name: 'hutech_edu_learning_speed',
  help: 'Average learning speed score',
  labelNames: ['user_id', 'course_id'],
});

// XP distribution
export const xpDistributionHistogram = new promClient.Histogram({
  name: 'hutech_edu_xp_distribution',
  help: 'User XP distribution',
  buckets: [0, 100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
});

/**
 * 📤 METRICS ENDPOINT
 * Export metrics để Prometheus có thể scrape
 */
export const metricsRegistry = promClient.register;

/**
 * 🔧 HELPER FUNCTIONS
 */

// Record HTTP request
export function recordHttpRequest(
  method: string,
  route: string,
  statusCode: number,
  durationMs: number
) {
  httpRequestCounter.inc({ method, route, status_code: statusCode });
  httpRequestDuration.observe({ method, route, status_code: statusCode }, durationMs);
}

// Record error
export function recordError(type: string, route?: string) {
  errorCounter.inc({ type, route: route || 'unknown' });
}

// Record payment
export function recordPayment(status: 'success' | 'failed', method: string, amount: number, currency: string = 'VND') {
  paymentCounter.inc({ status, method });
  paymentAmountSummary.observe({ currency, status }, amount);
}

// Record enrollment
export function recordEnrollment(courseId: string) {
  enrollmentCounter.inc({ course_id: courseId });
}

// Record user registration
export function recordUserRegistration(method: 'email' | 'google' | 'facebook') {
  userRegistrationCounter.inc({ method });
}

// Update active users count
export function updateActiveUsers(count: number) {
  activeUsersGauge.set(count);
}

// Update active sessions count
export function updateActiveSessions(count: number) {
  activeSessionsGauge.set(count);
}

// Record database query
export function recordDatabaseQuery(operation: string, model: string, durationMs: number) {
  databaseQueryDuration.observe({ operation, model }, durationMs);
}

// Record cache operation
export function recordCacheOperation(operation: 'get' | 'set' | 'delete', durationMs: number) {
  cacheOperationDuration.observe({ operation }, durationMs);
}

// Record external API call
export function recordExternalApi(service: string, endpoint: string, durationMs: number) {
  externalApiDuration.observe({ service, endpoint }, durationMs);
}

// Update cache hit rate
export function updateCacheHitRate(hitRate: number) {
  cacheHitRateGauge.set(hitRate);
}

// Record XP transaction
export function recordXpTransaction(xpAmount: number) {
  xpDistributionHistogram.observe(xpAmount);
}

console.log('✅ Prometheus metrics initialized');
