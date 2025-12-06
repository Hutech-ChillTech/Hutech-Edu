import { CacheService } from '../configs/redis.config.js';
import { recordCacheOperation } from '../configs/metrics.config.js';

/**
 * 🚀 CACHED COURSE SERVICE WRAPPER
 * 
 * File này wrap các function của CourseService với caching logic.
 * 
 * ❓ Tại sao cần file này?
 * - Danh sách courses ít thay đổi → Nên cache để tăng tốc
 * - Mỗi lần GET /api/courses phải query DB → Chậm
 * - Với cache: Request đầu query DB (200ms), các request sau lấy từ cache (2ms)
 * 
 * 📝 Cache Strategy:
 * - getAllCourse: Cache 5 phút (danh sách courses ít thay đổi)
 * - getCourseById: Cache 10 phút (thông tin course cụ thể)
 * - getPopularCourses: Cache 15 phút (popular courses thay đổi chậm)
 * - searchCourseByName: Cache 3 phút (kết quả search)
 * 
 * 🗑️ Cache Invalidation:
 * - Khi create/update/delete course → Xóa cache liên quan
 */

import CourseService from './course.service.js';
import CourseRepository from '../repositories/course.repository.js';
import { Level, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CachedCourseService {
  private courseService: CourseService;

  constructor() {
    const courseRepo = new CourseRepository(prisma, 'courseId');
    this.courseService = new CourseService(courseRepo);
  }

  /**
   * 📚 Get all courses (WITH CACHE)
   * Cache key: courses:all:{skip}:{take}
   * TTL: 5 phút (300s)
   */
  async getAllCourse(skip?: number, take?: number) {
    const cacheKey = `courses:all:${skip || 0}:${take || 10}`;
    
    // 1. Kiểm tra cache
    const startTime = Date.now();
    const cached = await CacheService.get(cacheKey);
    recordCacheOperation('get', Date.now() - startTime);

    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return cached;
    }

    // 2. Cache MISS → Query DB
    console.log(`❌ Cache MISS: ${cacheKey}`);
    const courses = await this.courseService.getAllCourse(skip, take);

    // 3. Lưu vào cache
    const setStartTime = Date.now();
    await CacheService.set(cacheKey, courses, 300); // 5 phút
    recordCacheOperation('set', Date.now() - setStartTime);

    return courses;
  }

  /**
   * 🔍 Get course by ID (WITH CACHE)
   * Cache key: course:{courseId}
   * TTL: 10 phút (600s)
   */
  async getCourseById(courseId: string) {
    const cacheKey = `course:${courseId}`;
    
    const startTime = Date.now();
    const cached = await CacheService.get(cacheKey);
    recordCacheOperation('get', Date.now() - startTime);

    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return cached;
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    const course = await this.courseService.getCourseById(courseId);

    const setStartTime = Date.now();
    await CacheService.set(cacheKey, course, 600); // 10 phút
    recordCacheOperation('set', Date.now() - setStartTime);

    return course;
  }

  /**
   * 🔥 Get popular courses (WITH CACHE)
   * Cache key: courses:popular:{limit}
   * TTL: 15 phút (900s) - Popular courses thay đổi chậm
   */
  async getPopularCourses(limit?: number) {
    const cacheKey = `courses:popular:${limit || 10}`;
    
    const startTime = Date.now();
    const cached = await CacheService.get(cacheKey);
    recordCacheOperation('get', Date.now() - startTime);

    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return cached;
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    const courses = await this.courseService.getPopularCourses(limit);

    const setStartTime = Date.now();
    await CacheService.set(cacheKey, courses, 900); // 15 phút
    recordCacheOperation('set', Date.now() - setStartTime);

    return courses;
  }

  /**
   * 🔍 Search courses by name (WITH CACHE)
   * Cache key: courses:search:{searchTerm}:{limit}
   * TTL: 3 phút (180s)
   */
  async searchCourseByName(searchTerm: string, limit?: number) {
    const cacheKey = `courses:search:${searchTerm}:${limit || 10}`;
    
    const startTime = Date.now();
    const cached = await CacheService.get(cacheKey);
    recordCacheOperation('get', Date.now() - startTime);

    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return cached;
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    const courses = await this.courseService.searchCourseByName(searchTerm, limit);

    const setStartTime = Date.now();
    await CacheService.set(cacheKey, courses, 180); // 3 phút
    recordCacheOperation('set', Date.now() - setStartTime);

    return courses;
  }

  /**
   * 📊 Get course with details (WITH CACHE)
   * Cache key: course:details:{courseId}
   * TTL: 10 phút (600s)
   */
  async getCourseWithDetails(courseId: string) {
    const cacheKey = `course:details:${courseId}`;
    
    const startTime = Date.now();
    const cached = await CacheService.get(cacheKey);
    recordCacheOperation('get', Date.now() - startTime);

    if (cached) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return cached;
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    const course = await this.courseService.getCourseWithDetails(courseId);

    const setStartTime = Date.now();
    await CacheService.set(cacheKey, course, 600); // 10 phút
    recordCacheOperation('set', Date.now() - setStartTime);

    return course;
  }

  /**
   * ✏️ CREATE COURSE (WITH CACHE INVALIDATION)
   * Sau khi tạo course mới → Xóa cache danh sách courses
   */
  async createCourse(course: Prisma.CourseCreateInput) {
    // 1. Tạo course
    const newCourse = await this.courseService.createCourse(course);

    // 2. Xóa cache liên quan
    await this.invalidateCourseCaches();

    console.log(`🗑️  Cache invalidated after creating course: ${newCourse.courseId}`);

    return newCourse;
  }

  /**
   * ✏️ UPDATE COURSE (WITH CACHE INVALIDATION)
   * Sau khi update course → Xóa cache của course đó và danh sách courses
   */
  async updateCourse(courseId: string, course: Prisma.CourseUpdateInput) {
    // 1. Update course
    const updatedCourse = await this.courseService.updateCourse(courseId, course);

    // 2. Xóa cache liên quan
    await this.invalidateCourseCaches(courseId);

    console.log(`🗑️  Cache invalidated after updating course: ${courseId}`);

    return updatedCourse;
  }

  /**
   * 🗑️ DELETE COURSE (WITH CACHE INVALIDATION)
   * Sau khi xóa course → Xóa cache của course đó và danh sách courses
   */
  async deleteCourse(courseId: string) {
    // 1. Delete course
    const deletedCourse = await this.courseService.deleteCourse(courseId);

    // 2. Xóa cache liên quan
    await this.invalidateCourseCaches(courseId);

    console.log(`🗑️  Cache invalidated after deleting course: ${courseId}`);

    return deletedCourse;
  }

  /**
   * 🗑️ INVALIDATE COURSE CACHES
   * Xóa tất cả cache liên quan đến courses
   */
  private async invalidateCourseCaches(courseId?: string) {
    const patterns = [
      'courses:all:*',      // Danh sách courses
      'courses:popular:*',  // Popular courses
      'courses:search:*',   // Search results
    ];

    if (courseId) {
      patterns.push(`course:${courseId}`);         // Course cụ thể
      patterns.push(`course:details:${courseId}`); // Course details
    }

    // Xóa tất cả patterns
    for (const pattern of patterns) {
      await CacheService.delete(pattern);
    }
  }

  // ========================================
  // CÁC METHODS KHÔNG CẦN CACHE (pass-through)
  // ========================================

  async getCourseByName(courseName: string) {
    return this.courseService.getCourseByName(courseName);
  }

  async getCourseByNamePrefix(prefix: string) {
    return this.courseService.getCourseByNamePrefix(prefix);
  }

  async getAllSort(sortField?: string, sortOrder?: string, skip?: number, take?: number) {
    return this.courseService.getAllSort(sortField, sortOrder, skip, take);
  }

  async getCoursesByLevel(level: Level, skip?: number, take?: number) {
    return this.courseService.getCoursesByLevel(level, skip, take);
  }

  async getCoursesByCreator(userId: string, skip?: number, take?: number) {
    return this.courseService.getCoursesByCreator(userId, skip, take);
  }

  async getCourseStats(courseId: string) {
    return this.courseService.getCourseStats(courseId);
  }

  async filterCourses(filters: any) {
    return this.courseService.filterCourses(filters);
  }

  async countCourses(filters?: any) {
    return this.courseService.countCourses(filters);
  }

  async getCourseWithChaptersAndLessons(courseId: string) {
    return this.courseService.getCourseWithChaptersAndLessons(courseId);
  }

  async getEnrolledCourses(userId: string, skip?: number, take?: number) {
    return this.courseService.getEnrolledCourses(userId, skip, take);
  }

  async checkUserEnrolled(userId: string, courseId: string) {
    return this.courseService.checkUserEnrolled(userId, courseId);
  }

  async getUserEnrolledCourseIds(userId: string) {
    return this.courseService.getUserEnrolledCourseIds(userId);
  }

  async addEnrollmentStatus(courses: any[], userId?: string) {
    return this.courseService.addEnrollmentStatus(courses, userId);
  }
}

export default CachedCourseService;
