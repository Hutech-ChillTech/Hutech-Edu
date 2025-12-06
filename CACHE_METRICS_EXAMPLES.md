# 📚 Cache & Monitoring Usage Examples

## 📋 Mục Lục
1. [Cache Examples](#cache-examples)
2. [Metrics Examples](#metrics-examples)
3. [Real-world Scenarios](#real-world-scenarios)

---

## 1️⃣ Cache Examples

### **A. Basic Cache Operations**

```typescript
import { CacheService } from './configs/redis.config.js';

// ========================================
// GET - Lấy dữ liệu từ cache
// ========================================
const courses = await CacheService.get<Course[]>('courses:all');
if (courses) {
  console.log('✅ Cache HIT:', courses.length, 'courses');
  return courses;
}

// ========================================
// SET - Lưu dữ liệu vào cache
// ========================================
const newCourses = await prisma.course.findMany();
await CacheService.set('courses:all', newCourses, 300); // Cache 5 phút
console.log('💾 Cached:', newCourses.length, 'courses');

// ========================================
// DELETE - Xóa cache
// ========================================
await CacheService.delete('courses:all');
console.log('🗑️  Cache deleted');

// Xóa nhiều keys với pattern
await CacheService.delete('courses:*');  // Xóa tất cả cache courses
console.log('🗑️  All courses cache deleted');

// ========================================
// EXISTS - Kiểm tra key có tồn tại không
// ========================================
const exists = await CacheService.exists('courses:all');
console.log('Key exists:', exists);

// ========================================
// TTL - Kiểm tra thời gian còn lại
// ========================================
const ttl = await CacheService.ttl('courses:all');
console.log('Time to live:', ttl, 'seconds');
```

### **B. Cache trong Service Layer**

```typescript
// ========================================
// PATTERN 1: Cache-Aside (Lazy Loading)
// ========================================
class UserService {
  async getUserById(userId: string) {
    const cacheKey = `user:${userId}`;
    
    // 1. Kiểm tra cache
    const cached = await CacheService.get(cacheKey);
    if (cached) return cached;
    
    // 2. Cache MISS → Query DB
    const user = await prisma.user.findUnique({
      where: { userId }
    });
    
    // 3. Lưu vào cache
    if (user) {
      await CacheService.set(cacheKey, user, 600); // 10 phút
    }
    
    return user;
  }
  
  // Xóa cache khi update
  async updateUser(userId: string, data: any) {
    const user = await prisma.user.update({
      where: { userId },
      data
    });
    
    // Invalidate cache
    await CacheService.delete(`user:${userId}`);
    
    return user;
  }
}

// ========================================
// PATTERN 2: Write-Through Cache
// ========================================
class CourseService {
  async createCourse(data: any) {
    // 1. Tạo course trong DB
    const course = await prisma.course.create({ data });
    
    // 2. Lưu vào cache ngay
    await CacheService.set(`course:${course.courseId}`, course, 600);
    
    // 3. Xóa cache danh sách (vì có course mới)
    await CacheService.delete('courses:*');
    
    return course;
  }
}
```

### **C. Cache với Middleware**

```typescript
import { cacheMiddleware } from './middlewares/cache.middleware.js';

// ========================================
// SIMPLE CACHE - Chỉ cần TTL
// ========================================
router.get('/courses', 
  cacheMiddleware(300),  // Cache 5 phút
  getAllCourses
);

// ========================================
// ADVANCED CACHE - Với options
// ========================================
router.get('/courses/:id', 
  cacheMiddleware({
    ttl: 600,              // Cache 10 phút
    keyPrefix: 'course',   // Prefix: course:...
    includeQuery: true,    // Include query params trong key
    includeUserId: false,  // Không include userId
  }),
  getCourseById
);

// ========================================
// USER-SPECIFIC CACHE
// ========================================
router.get('/my-courses', 
  authenticate,  // Middleware để set req.user
  cacheMiddleware({
    ttl: 300,
    keyPrefix: 'user-courses',
    includeUserId: true,  // Cache riêng cho mỗi user
  }),
  getMyEnrolledCourses
);

// ========================================
// CACHE INVALIDATION
// ========================================
import { invalidateCache } from './middlewares/cache.middleware.js';

router.post('/courses', async (req, res) => {
  const course = await courseService.createCourse(req.body);
  
  // Xóa cache danh sách courses
  await invalidateCache('api:/api/courses*');
  
  res.json(course);
});

router.put('/courses/:id', async (req, res) => {
  const course = await courseService.updateCourse(req.params.id, req.body);
  
  // Xóa cache của course này và danh sách
  await invalidateCache(`api:/api/courses/${req.params.id}`);
  await invalidateCache('api:/api/courses*');
  
  res.json(course);
});
```

### **D. Advanced Cache Patterns**

```typescript
// ========================================
// LEADERBOARD với Sorted Set
// ========================================
import { CacheService } from './configs/redis.config.js';

// Thêm user vào leaderboard
await CacheService.addToSortedSet('leaderboard:xp', userXP, userId);

// Lấy top 10 users
const top10 = await CacheService.getTopFromSortedSet('leaderboard:xp', 10);
console.log('Top 10 users:', top10);
// [
//   { member: 'user-123', score: 5000 },
//   { member: 'user-456', score: 4500 },
//   ...
// ]

// ========================================
// RATE LIMITING với Counter
// ========================================
const key = `rate_limit:${userId}`;
const count = await CacheService.increment(key);

if (count === 1) {
  // Lần đầu tiên, set expire 60s
  await redis.expire(key, 60);
}

if (count > 100) {
  return res.status(429).json({ error: 'Too many requests' });
}

// ========================================
// SESSION STORAGE
// ========================================
// Lưu session
await CacheService.set(`session:${sessionId}`, {
  userId,
  role: 'student',
  loginAt: new Date(),
}, 3600); // 1 giờ

// Lấy session
const session = await CacheService.get(`session:${sessionId}`);
if (!session) {
  return res.status(401).json({ error: 'Session expired' });
}
```

---

## 2️⃣ Metrics Examples

### **A. Recording Metrics**

```typescript
import {
  recordHttpRequest,
  recordError,
  recordPayment,
  recordEnrollment,
  recordUserRegistration,
  recordDatabaseQuery,
  recordCacheOperation,
  recordExternalApi,
  updateActiveUsers,
  updateActiveSessions,
} from './configs/metrics.config.js';

// ========================================
// HTTP REQUEST (Tự động bởi middleware)
// ========================================
// Không cần gọi manual, middleware tự động ghi

// ========================================
// ERROR TRACKING
// ========================================
try {
  await processPayment(paymentData);
} catch (error) {
  recordError('payment_error', '/api/payments');
  throw error;
}

// ========================================
// PAYMENT METRICS
// ========================================
// Payment thành công
recordPayment('success', 'vnpay', 500000, 'VND');

// Payment thất bại
recordPayment('failed', 'momo', 300000, 'VND');

// ========================================
// ENROLLMENT METRICS
// ========================================
recordEnrollment(courseId);

// ========================================
// USER REGISTRATION
// ========================================
recordUserRegistration('email');      // Email signup
recordUserRegistration('google');     // Google OAuth
recordUserRegistration('facebook');   // Facebook OAuth

// ========================================
// DATABASE QUERY METRICS
// ========================================
const startTime = Date.now();
const courses = await prisma.course.findMany();
const duration = Date.now() - startTime;

recordDatabaseQuery('findMany', 'Course', duration);

// ========================================
// CACHE OPERATION METRICS
// ========================================
const cacheStart = Date.now();
const cached = await CacheService.get('courses:all');
recordCacheOperation('get', Date.now() - cacheStart);

// ========================================
// EXTERNAL API METRICS
// ========================================
const apiStart = Date.now();
const response = await axios.post('https://vnpay.vn/api/payment', data);
recordExternalApi('vnpay', '/api/payment', Date.now() - apiStart);

// ========================================
// ACTIVE USERS/SESSIONS
// ========================================
// Update mỗi 30 giây
setInterval(async () => {
  const activeUsers = await prisma.user.count({
    where: {
      enrollments: {
        some: {
          isCurrentlyActive: true
        }
      }
    }
  });
  
  const activeSessions = await prisma.learningSession.count({
    where: { isActive: true }
  });
  
  updateActiveUsers(activeUsers);
  updateActiveSessions(activeSessions);
}, 30000);
```

### **B. Custom Metrics trong Controller**

```typescript
// ========================================
// PAYMENT CONTROLLER
// ========================================
import { recordPayment, recordError } from '../configs/metrics.config.js';

export async function handleVNPayCallback(req: Request, res: Response) {
  try {
    const { vnp_ResponseCode, vnp_Amount, vnp_TxnRef } = req.query;
    
    if (vnp_ResponseCode === '00') {
      // Payment success
      recordPayment('success', 'vnpay', Number(vnp_Amount) / 100, 'VND');
      
      // Process enrollment...
      await enrollmentService.createEnrollment(userId, courseId);
      recordEnrollment(courseId);
      
      res.json({ success: true });
    } else {
      // Payment failed
      recordPayment('failed', 'vnpay', Number(vnp_Amount) / 100, 'VND');
      recordError('payment_failed', '/api/payments/vnpay/callback');
      
      res.json({ success: false });
    }
  } catch (error) {
    recordError('payment_exception', '/api/payments/vnpay/callback');
    throw error;
  }
}

// ========================================
// COURSE CONTROLLER
// ========================================
import { recordDatabaseQuery } from '../configs/metrics.config.js';

export async function getAllCourses(req: Request, res: Response) {
  const startTime = Date.now();
  
  const courses = await courseService.getAllCourse();
  
  // Record DB query time
  recordDatabaseQuery('findMany', 'Course', Date.now() - startTime);
  
  res.json(courses);
}
```

---

## 3️⃣ Real-world Scenarios

### **Scenario 1: Popular Courses API**

```typescript
// ========================================
// GET /api/courses/popular
// Cache 15 phút, track metrics
// ========================================

router.get('/courses/popular', 
  cacheMiddleware(900),  // Cache 15 phút
  async (req: Request, res: Response) => {
    try {
      const startTime = Date.now();
      
      // Query DB
      const courses = await prisma.course.findMany({
        take: 10,
        orderBy: {
          enrollments: {
            _count: 'desc'
          }
        },
        include: {
          _count: {
            select: { enrollments: true }
          }
        }
      });
      
      // Record metrics
      recordDatabaseQuery('findMany', 'Course', Date.now() - startTime);
      
      res.json(courses);
    } catch (error) {
      recordError('database_error', '/api/courses/popular');
      throw error;
    }
  }
);
```

### **Scenario 2: User Profile with Cache**

```typescript
// ========================================
// GET /api/users/:id
// Cache per-user, 5 phút
// ========================================

router.get('/users/:id',
  authenticate,
  cacheMiddleware({
    ttl: 300,
    keyPrefix: 'user-profile',
    includeUserId: true,
  }),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const startTime = Date.now();
    const user = await prisma.user.findUnique({
      where: { userId: id },
      include: {
        enrollments: true,
        achievements: true,
      }
    });
    
    recordDatabaseQuery('findUnique', 'User', Date.now() - startTime);
    
    res.json(user);
  }
);

// ========================================
// PUT /api/users/:id
// Invalidate cache sau khi update
// ========================================

router.put('/users/:id',
  authenticate,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const user = await prisma.user.update({
      where: { userId: id },
      data: req.body,
    });
    
    // Invalidate cache
    await invalidateCache(`api:/api/users/${id}*`);
    
    res.json(user);
  }
);
```

### **Scenario 3: Payment Processing với Full Tracking**

```typescript
// ========================================
// POST /api/payments/vnpay
// Track payment metrics, external API calls
// ========================================

router.post('/payments/vnpay', async (req: Request, res: Response) => {
  const { amount, courseId, userId } = req.body;
  
  try {
    // 1. Create payment record
    const dbStart = Date.now();
    const payment = await prisma.payment.create({
      data: {
        amount,
        courseId,
        userId,
        paymentMethod: 'VNPAY',
        paymentStatus: 'PENDING',
      }
    });
    recordDatabaseQuery('create', 'Payment', Date.now() - dbStart);
    
    // 2. Call VNPay API
    const apiStart = Date.now();
    const vnpayUrl = await vnpayService.createPaymentUrl(payment);
    recordExternalApi('vnpay', '/create-payment', Date.now() - apiStart);
    
    res.json({ paymentUrl: vnpayUrl });
    
  } catch (error) {
    recordError('payment_creation_error', '/api/payments/vnpay');
    recordPayment('failed', 'vnpay', amount, 'VND');
    throw error;
  }
});
```

### **Scenario 4: Leaderboard với Cache**

```typescript
// ========================================
// GET /api/leaderboard/xp
// Cache 1 phút, dùng Sorted Set
// ========================================

router.get('/leaderboard/xp', async (req: Request, res: Response) => {
  const cacheKey = 'leaderboard:xp:top100';
  
  // Check cache
  const cached = await CacheService.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Get from Sorted Set
  const top100 = await CacheService.getTopFromSortedSet('leaderboard:xp', 100);
  
  // Get user details
  const userIds = top100.map(item => item.member);
  const users = await prisma.user.findMany({
    where: { userId: { in: userIds } },
    select: {
      userId: true,
      userName: true,
      avatarURL: true,
      experiencePoints: true,
    }
  });
  
  // Merge data
  const leaderboard = top100.map(item => {
    const user = users.find(u => u.userId === item.member);
    return {
      ...user,
      rank: top100.indexOf(item) + 1,
      xp: item.score,
    };
  });
  
  // Cache 1 phút
  await CacheService.set(cacheKey, leaderboard, 60);
  
  res.json(leaderboard);
});

// ========================================
// Update leaderboard khi user nhận XP
// ========================================

async function awardXP(userId: string, amount: number) {
  // Update DB
  const user = await prisma.user.update({
    where: { userId },
    data: {
      experiencePoints: { increment: amount }
    }
  });
  
  // Update Sorted Set
  await CacheService.addToSortedSet('leaderboard:xp', user.experiencePoints, userId);
  
  // Invalidate cache
  await CacheService.delete('leaderboard:xp:*');
  
  // Record metrics
  recordXpTransaction(amount);
}
```

---

## 🎯 Best Practices Summary

### **Cache:**
1. ✅ Cache data ít thay đổi (courses, categories)
2. ✅ Set TTL phù hợp (static: 10-15 phút, dynamic: 1-5 phút)
3. ✅ Invalidate cache khi data thay đổi
4. ✅ Dùng cache key có namespace rõ ràng
5. ✅ Handle cache errors gracefully (fallback to DB)

### **Metrics:**
1. ✅ Track tất cả HTTP requests (tự động bởi middleware)
2. ✅ Track errors để debug
3. ✅ Track business metrics (payments, enrollments)
4. ✅ Track external API calls
5. ✅ Monitor cache hit rate

### **Performance:**
1. ✅ Aim for cache hit rate > 80%
2. ✅ Keep response time < 100ms
3. ✅ Monitor slow queries (> 500ms)
4. ✅ Set up alerts cho errors
5. ✅ Review metrics dashboard daily
