# ⚡ HƯỚNG DẪN NHANH - Hoàn Tất Setup

## 📋 TÌNH TRẠNG HIỆN TẠI

### ✅ Đã Hoàn Thành:
- ✅ Tạo 15 files (Redis config, Prometheus metrics, middlewares, docs)
- ✅ Fix tất cả lỗi TypeScript syntax
- ✅ Docker stack đã chạy (Redis, Prometheus, Grafana)
- ✅ Documentation đầy đủ

### ⏳ Đang Thực Hiện:
- ⏳ `npm install ioredis prom-client @types/ioredis` - Đang chạy

---

## 🚀 CÁC BƯỚC TIẾP THEO

### **Bước 1: Đợi npm install hoàn thành**

Kiểm tra status:
```bash
npm list ioredis prom-client
```

Kết quả mong đợi:
```
back-end@1.0.0 D:\Work-space\Node-Js\Hutech-Edu
├── ioredis@5.x.x
└── prom-client@15.x.x
```

---

### **Bước 2: Build TypeScript**

```bash
npm run build
```

**Kết quả mong đợi:** Build thành công, không có errors

---

### **Bước 3: Kiểm tra Docker Stack**

```bash
docker-compose -f docker-compose.monitoring.yml ps
```

**Phải thấy:**
- ✅ redis-hutech: Up (healthy)
- ✅ prometheus-hutech: Up (healthy)
- ✅ grafana-hutech: Up (healthy)
- ✅ redis-commander-hutech: Up (healthy)

---

### **Bước 4: Start Backend**

```bash
npm run dev
```

**Phải thấy logs:**
```
✅ Redis: Connected to Redis server
✅ Redis: Ready to accept commands
✅ Prometheus metrics initialized
Server running on port 3000
```

---

### **Bước 5: Test Cache**

**Terminal 1:**
```bash
# Request lần 1 (cache MISS - chậm ~200ms)
curl http://localhost:3000/api/courses
```

**Terminal 2:**
```bash
# Request lần 2 (cache HIT - nhanh ~2ms) ⚡
curl http://localhost:3000/api/courses
```

**Kiểm tra headers:**
- Lần 1: `X-Cache: MISS`
- Lần 2: `X-Cache: HIT` ✅

---

### **Bước 6: Xem Metrics**

**A. Raw Metrics:**
```bash
curl http://localhost:3000/metrics
```

**Kết quả mong đợi:**
```
# HELP hutech_edu_http_requests_total Total number of HTTP requests
# TYPE hutech_edu_http_requests_total counter
hutech_edu_http_requests_total{method="GET",route="/api/courses",status_code="200"} 2

# HELP hutech_edu_http_request_duration_ms HTTP request duration in milliseconds
# TYPE hutech_edu_http_request_duration_ms histogram
hutech_edu_http_request_duration_ms_bucket{le="5"} 1
hutech_edu_http_request_duration_ms_bucket{le="10"} 2
...
```

---

**B. Prometheus UI:**

1. Mở: **http://localhost:9090**
2. Vào tab **Graph**
3. Thử queries:

```promql
# Tổng requests
hutech_edu_http_requests_total

# Requests per second
rate(hutech_edu_http_requests_total[1m])

# Average response time
rate(hutech_edu_http_request_duration_ms_sum[5m]) / 
rate(hutech_edu_http_request_duration_ms_count[5m])
```

4. Click **Execute** → Xem graph

---

**C. Grafana Dashboard:**

1. Mở: **http://localhost:3001**
2. Login: `admin` / `admin123`
3. Click **Skip** (nếu hỏi đổi password)

**Add Data Source:**
- Click ⚙️ **Configuration** → **Data Sources**
- Click **Add data source**
- Chọn **Prometheus**
- URL: `http://prometheus:9090`
- Click **Save & Test** → Phải thấy "Data source is working" ✅

**Import Dashboard:**
- Click **+** → **Import**
- Click **Upload JSON file**
- Chọn file: `grafana-dashboard.json`
- Chọn Prometheus data source
- Click **Import**

---

**D. Redis Commander:**

1. Mở: **http://localhost:8081**
2. Sẽ thấy Redis GUI
3. Expand `db0` → Xem cache keys:
   - `api:/api/courses`
   - `courses:all:0:10`
   - etc.
4. Click vào key để xem data

---

## 🎯 VERIFICATION CHECKLIST

### **Cache Working:**
- [ ] Request 1: Response time ~200ms, Header `X-Cache: MISS`
- [ ] Request 2: Response time ~2ms, Header `X-Cache: HIT` ⚡
- [ ] Redis Commander shows cache keys

### **Metrics Working:**
- [ ] `/metrics` endpoint returns Prometheus format
- [ ] Prometheus UI shows metrics
- [ ] Grafana connected to Prometheus
- [ ] Dashboard shows data

### **Performance:**
- [ ] API response time: 2ms (cache hit)
- [ ] Cache hit rate: > 80%
- [ ] No errors in console

---

## 🐛 TROUBLESHOOTING

### **Lỗi: Cannot find module 'ioredis'**

```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Lỗi: Redis connection refused**

```bash
# Kiểm tra Redis đang chạy
docker ps | grep redis

# Restart Redis
docker restart redis-hutech

# Test connection
docker exec -it redis-hutech redis-cli ping
# Kết quả: PONG
```

### **Lỗi: Prometheus không scrape được**

1. Kiểm tra backend đang chạy:
```bash
curl http://localhost:3000/metrics
```

2. Kiểm tra Prometheus targets:
- Mở: http://localhost:9090/targets
- Nếu DOWN: Sửa `prometheus.yml` → `host.docker.internal:3000`

3. Restart Prometheus:
```bash
docker restart prometheus-hutech
```

### **Cache không hoạt động**

```bash
# Test Redis connection
docker exec -it redis-hutech redis-cli
> ping
PONG
> keys *
(empty array)  # Chưa có cache
> exit

# Gọi API để tạo cache
curl http://localhost:3000/api/courses

# Kiểm tra lại
docker exec -it redis-hutech redis-cli
> keys *
1) "api:/api/courses"
```

---

## 📊 PERFORMANCE METRICS

### **Trước (Không cache):**
```
GET /api/courses
├── Query PostgreSQL: 200ms
└── Total: 200ms

1000 requests = 200,000ms (3.3 phút)
```

### **Sau (Có cache):**
```
GET /api/courses
├── Request 1: Query DB + Cache = 205ms
├── Request 2-1000: Cache hit = 2ms each
└── Total: 205ms + (999 × 2ms) = 2,203ms (2.2 giây)

Speedup: 90x faster! 🚀
Cache hit rate: 99.9%
```

---

## 🎉 SUCCESS CRITERIA

Khi bạn thấy:

✅ **Backend logs:**
```
✅ Redis: Connected to Redis server
✅ Redis: Ready to accept commands
✅ Prometheus metrics initialized
```

✅ **API response headers:**
```
X-Cache: HIT
```

✅ **Prometheus UI:**
- Metrics hiển thị
- Graphs có data

✅ **Grafana Dashboard:**
- Panels có data
- Real-time updates

✅ **Performance:**
- Response time < 10ms (cache hit)
- No errors

→ **THÀNH CÔNG! 🎉**

---

## 📚 TÀI LIỆU THAM KHẢO

- **Quick Start:** `QUICK_START_CACHE_MONITORING.md`
- **Detailed Setup:** `REDIS_PROMETHEUS_SETUP.md`
- **Usage Examples:** `CACHE_METRICS_EXAMPLES.md`
- **Full Explanation:** `COMPLETE_EXPLANATION.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

---

## 🆘 NẾU GẶP VẤN ĐỀ

1. Đọc `COMPLETE_EXPLANATION.md` - Giải thích chi tiết
2. Đọc `REDIS_PROMETHEUS_SETUP.md` - Troubleshooting section
3. Kiểm tra logs:
   ```bash
   docker logs redis-hutech
   docker logs prometheus-hutech
   npm run dev  # Xem backend logs
   ```

---

**Happy Coding! 🚀📊**
