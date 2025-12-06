import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../configs/redis.config.js';
import { recordCacheOperation } from '../configs/metrics.config.js';

/**
 * 🚀 CACHE MIDDLEWARE
 * 
 * Middleware này tự động cache response của API.
 * 
 * Cách hoạt động:
 * 1. Request vào → Kiểm tra cache có dữ liệu không
 * 2. Nếu có → Trả về ngay (CACHE HIT) ⚡
 * 3. Nếu không → Xử lý bình thường → Lưu vào cache → Trả về (CACHE MISS)
 * 
 * Usage:
 * router.get('/courses', cacheMiddleware(300), getCourses);
 *                        ↑ Cache 300 giây (5 phút)
 */

interface CacheOptions {
  ttl?: number; // Time to live (giây)
  keyPrefix?: string; // Prefix cho cache key
  includeQuery?: boolean; // Include query params trong cache key
  includeUserId?: boolean; // Include userId trong cache key (cho data cá nhân)
}

export function cacheMiddleware(options: CacheOptions | number = {}) {
  // Nếu truyền vào số, coi như là TTL
  const opts: CacheOptions = typeof options === 'number' 
    ? { ttl: options } 
    : options;

  const {
    ttl = 300, // Mặc định: 5 phút
    keyPrefix = 'api',
    includeQuery = true,
    includeUserId = false,
  } = opts;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Chỉ cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Tạo cache key dựa trên route, query params, userId
    let cacheKey = `${keyPrefix}:${req.path}`;

    if (includeQuery && Object.keys(req.query).length > 0) {
      const queryString = JSON.stringify(req.query);
      cacheKey += `:${queryString}`;
    }

    if (includeUserId && (req as any).user?.userId) {
      cacheKey += `:user:${(req as any).user.userId}`;
    }

    try {
      // Kiểm tra cache
      const startTime = Date.now();
      const cachedData = await CacheService.get(cacheKey);
      const cacheDuration = Date.now() - startTime;

      // Record cache operation metrics
      recordCacheOperation('get', cacheDuration);

      if (cachedData) {
        // CACHE HIT ⚡
        console.log(`✅ Cache HIT: ${cacheKey} (${cacheDuration}ms)`);
        
        // Set header để biết response từ cache
        res.set('X-Cache', 'HIT');
        res.set('X-Cache-Key', cacheKey);
        
        return res.json(cachedData);
      }

      // CACHE MISS - Lưu response vào cache
      console.log(`❌ Cache MISS: ${cacheKey}`);
      res.set('X-Cache', 'MISS');

      // Override res.json để intercept response
      const originalJson = res.json.bind(res);
      res.json = function (data: any) {
        // Lưu vào cache (async, không chờ)
        CacheService.set(cacheKey, data, ttl)
          .then(() => {
            console.log(`💾 Cached: ${cacheKey} (TTL: ${ttl}s)`);
            recordCacheOperation('set', Date.now() - startTime);
          })
          .catch((err) => {
            console.error(`Cache SET error for ${cacheKey}:`, err);
          });

        // Trả về response bình thường
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Nếu Redis lỗi, vẫn tiếp tục xử lý request bình thường
      next();
    }
  };
}

/**
 * 🗑️ CACHE INVALIDATION HELPER
 * 
 * Helper function để xóa cache khi data thay đổi.
 * 
 * Usage:
 * // Sau khi create/update/delete course
 * await invalidateCache('api:/api/courses*');
 */
export async function invalidateCache(pattern: string) {
  try {
    const startTime = Date.now();
    await CacheService.delete(pattern);
    const duration = Date.now() - startTime;
    
    recordCacheOperation('delete', duration);
    console.log(`🗑️  Cache invalidated: ${pattern} (${duration}ms)`);
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

/**
 * 📊 CACHE STATISTICS
 * 
 * Middleware để track cache hit/miss rate
 */

let cacheHits = 0;
let cacheMisses = 0;

export function getCacheStats() {
  const total = cacheHits + cacheMisses;
  const hitRate = total > 0 ? (cacheHits / total) * 100 : 0;

  return {
    hits: cacheHits,
    misses: cacheMisses,
    total,
    hitRate: hitRate.toFixed(2) + '%',
  };
}

export function resetCacheStats() {
  cacheHits = 0;
  cacheMisses = 0;
}

// Update cache stats
export function trackCacheHit() {
  cacheHits++;
}

export function trackCacheMiss() {
  cacheMisses++;
}
