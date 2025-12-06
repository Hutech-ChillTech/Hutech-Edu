import LessonProgressRepository from "../repositories/lessonProgress.repository";
import CourseTrackingRepository from "../repositories/courseTracking.repository";
import createHttpError from "http-errors";
import PrismaClient from "../configs/prismaClient";
import XPService from "./xp.service";

class LessonProgressService {
  private readonly progressRepository: LessonProgressRepository;
  private readonly trackingRepository: CourseTrackingRepository;
  private xpService?: XPService;
  private lastLessonCache: Map<string, string> = new Map(); // courseId -> lessonId cache

  constructor(
    progressRepository: LessonProgressRepository,
    xpService?: XPService
  ) {
    this.progressRepository = progressRepository;
    this.trackingRepository = new CourseTrackingRepository();
    this.xpService = xpService;
  }

  /**
   * 🎯 Check xem lesson có phải là lesson cuối cùng của course không
   * Sử dụng cache để tối ưu performance
   */
  private async isLastLessonOfCourse(
    lessonId: string,
    courseId: string
  ): Promise<boolean> {
    try {
      // Check cache trước
      const cachedLastLessonId = this.lastLessonCache.get(courseId);
      if (cachedLastLessonId) {
        return cachedLastLessonId === lessonId;
      }

      // Nếu chưa có cache, query database
      // Lấy chapter cuối cùng (theo created_at DESC)
      const lastChapter = await PrismaClient.chapter.findFirst({
        where: { courseId },
        orderBy: { created_at: "desc" },
        select: { chapterId: true },
      });

      if (!lastChapter) return false;

      // Lấy lesson cuối cùng trong chapter cuối (theo created_at DESC)
      const lastLesson = await PrismaClient.lesson.findFirst({
        where: { chapterId: lastChapter.chapterId },
        orderBy: { created_at: "desc" },
        select: { lessonId: true },
      });

      if (!lastLesson) return false;

      // Lưu vào cache
      this.lastLessonCache.set(courseId, lastLesson.lessonId);

      return lastLesson.lessonId === lessonId;
    } catch (error) {
      console.error("Error checking last lesson:", error);
      return false;
    }
  }

  /**
   * 🎉 Execute checkpoint actions khi hoàn thành lesson cuối cùng
   */
  private async executeLastLessonCheckpoint(
    userId: string,
    courseId: string,
    lessonId: string
  ) {
    console.log(`🎯 CHECKPOINT: Executing actions for last lesson ${lessonId}`);

    try {
      // Các actions sẽ được execute sau khi course completed
      // (Certificate, Learning Speed, etc. sẽ được handle ở phía trên)

      // Có thể thêm bonus XP cho việc hoàn thành khóa học
      if (this.xpService) {
        try {
          await this.xpService.addXP({
            userId,
            amount: 100,
            source: "course_completion",
            description: `Hoàn thành khóa học (Course Completion Bonus)`,
            courseId,
          });
          console.log(`✅ Awarded 100 bonus XP for course completion`);
        } catch (xpError) {
          console.error("Error awarding bonus XP:", xpError);
        }
      }

      // TODO: Thêm các checkpoint actions khác nếu cần:
      // - Send notification
      // - Update learning path progress
      // - Trigger analytics event
      // - etc.

      console.log(`✅ Checkpoint completed successfully`);
    } catch (error) {
      console.error("Error executing checkpoint:", error);
      // Không throw error để không ảnh hưởng đến flow chính
    }
  }

  /**
   * Đánh dấu lesson hoàn thành
   */
  async completeLesson(userId: string, lessonId: string) {
    try {
      // Kiểm tra lesson tồn tại
      const lesson = await PrismaClient.lesson.findUnique({
        where: { lessonId },
        include: {
          chapter: {
            select: {
              courseId: true,
              chapterId: true,
            },
          },
        },
      });

      if (!lesson) {
        throw createHttpError(404, "Không tìm thấy bài học");
      }

      // Kiểm tra user đã đăng ký khóa học chưa
      const enrollment = await PrismaClient.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: lesson.chapter.courseId,
          },
        },
      });

      if (!enrollment) {
        throw createHttpError(403, "Bạn chưa đăng ký khóa học này");
      }

      // 🎯 CHECKPOINT: Check xem có phải lesson cuối không
      const isLastLesson = await this.isLastLessonOfCourse(
        lessonId,
        lesson.chapter.courseId
      );

      if (isLastLesson) {
        console.log(
          `🎯 CHECKPOINT: Lesson ${lessonId} là lesson cuối cùng của course ${lesson.chapter.courseId}`
        );
      }

      // Đánh dấu hoàn thành
      const progress = await this.progressRepository.markLessonCompleted(
        userId,
        lessonId
      );

      // ⭐ Thưởng XP khi hoàn thành lesson
      let xpReward = null;
      if (this.xpService) {
        try {
          xpReward = await this.xpService.rewardLessonCompletion(
            userId,
            lessonId
          );
        } catch (xpError) {
          console.error("Error rewarding XP:", xpError);
          // Không throw error, chỉ log
        }
      }

      // Tính progress mới của khóa học
      const courseProgress = await this.getCourseProgress(
        userId,
        lesson.chapter.courseId
      );

      // ⭐ AUTO-COMPLETE COURSE khi progress = 100%
      let courseCompletionInfo = null;
      if (courseProgress.progress >= 100 && enrollment.completedAt === null) {
        try {
          // Lấy enrollment hiện tại
          const currentEnrollment = await PrismaClient.enrollment.findUnique({
            where: {
              userId_courseId: {
                userId,
                courseId: lesson.chapter.courseId,
              },
            },
          });

          if (currentEnrollment && !currentEnrollment.completedAt) {
            const now = new Date();
            const lastAccess =
              currentEnrollment.lastAccessAt ||
              currentEnrollment.firstAccessAt ||
              now;

            // Tính thời gian elapsed (giây)
            const elapsedSeconds = Math.floor(
              (now.getTime() - lastAccess.getTime()) / 1000
            );
            const timeToAdd = elapsedSeconds < 120 ? elapsedSeconds : 0;

            // Cập nhật Enrollment
            const completedEnrollment = await PrismaClient.enrollment.update({
              where: { enrollmentId: currentEnrollment.enrollmentId },
              data: {
                completedAt: now,
                totalCompletionTime:
                  currentEnrollment.totalCompletionTime + timeToAdd,
                isCurrentlyActive: false,
              },
            });

            courseCompletionInfo = {
              completedAt: completedEnrollment.completedAt,
              totalCompletionTime: completedEnrollment.totalCompletionTime,
              totalHours: parseFloat(
                (completedEnrollment.totalCompletionTime / 3600).toFixed(2)
              ),
            };

            console.log(
              `✅ User ${userId} completed course ${lesson.chapter.courseId}! Total time: ${completedEnrollment.totalCompletionTime}s`
            );

            // 🎉 Execute checkpoint actions
            if (isLastLesson) {
              await this.executeLastLessonCheckpoint(
                userId,
                lesson.chapter.courseId,
                lessonId
              );
            }
          }
        } catch (completionError) {
          console.error("Error completing course:", completionError);
          // Không throw error, chỉ log
        }
      }

      return {
        progress,
        courseProgress: courseProgress.progress,
        completedLessons: courseProgress.completedLessons,
        totalLessons: courseProgress.totalLessons,
        isLastLesson, // ← Flag để Frontend biết
        courseCompleted: courseProgress.progress >= 100, // ← Confirmed completion
        xpReward, // Thêm thông tin XP reward
        courseCompletionInfo, // Thêm thông tin hoàn thành khóa học
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cập nhật lastAccessAt khi xem bài học
   */
  async accessLesson(userId: string, lessonId: string) {
    try {
      // Kiểm tra lesson tồn tại
      const lesson = await PrismaClient.lesson.findUnique({
        where: { lessonId },
        include: {
          chapter: {
            select: {
              courseId: true,
            },
          },
        },
      });

      if (!lesson) {
        throw createHttpError(404, "Không tìm thấy bài học");
      }

      // Nếu lesson là preview, cho phép access mà không cần enrollment
      if (!lesson.isPreview) {
        // Kiểm tra enrollment chỉ khi lesson không phải preview
        const enrollment = await PrismaClient.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId,
              courseId: lesson.chapter.courseId,
            },
          },
        });

        if (!enrollment) {
          throw createHttpError(403, "Bạn chưa đăng ký khóa học này");
        }
      }

      // Update lastAccessAt
      return await this.progressRepository.updateLastAccess(userId, lessonId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy progress của user trong 1 khóa học
   */
  async getCourseProgress(userId: string, courseId: string) {
    try {
      // Kiểm tra enrollment
      const enrollment = await PrismaClient.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!enrollment) {
        throw createHttpError(404, "Bạn chưa đăng ký khóa học này");
      }

      // Đếm tổng số lessons trong course
      const totalLessons = await PrismaClient.lesson.count({
        where: {
          chapter: {
            courseId,
          },
        },
      });

      // Đếm số lessons đã hoàn thành
      const completedLessons =
        await this.progressRepository.countCompletedLessons(userId, courseId);

      // Tính progress %
      const progress =
        totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      // Lấy lesson cuối cùng đã truy cập
      const lastAccessedLesson =
        await this.progressRepository.getLastAccessedLesson(userId, courseId);

      // Lấy danh sách lessons đã hoàn thành
      const completedLessonsList =
        await this.progressRepository.getCompletedLessonsByCourse(
          userId,
          courseId
        );

      return {
        courseId,
        enrollmentId: enrollment.enrollmentId,
        totalLessons,
        completedLessons,
        progress: parseFloat(progress.toFixed(2)),
        lastAccessedLesson: lastAccessedLesson
          ? {
              lessonId: lastAccessedLesson.lesson.lessonId,
              lessonName: lastAccessedLesson.lesson.lessonName,
              chapterName: lastAccessedLesson.lesson.chapter.chapterName,
              lastAccessAt: lastAccessedLesson.lastAccessAt,
            }
          : null,
        completedLessonsList: completedLessonsList.map((p) => ({
          lessonId: p.lesson.lessonId,
          lessonName: p.lesson.lessonName,
          chapterId: p.lesson.chapterId,
          completedAt: p.updated_at,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy tất cả progress của user trong các khóa học đã đăng ký
   */
  async getAllUserProgress(userId: string) {
    try {
      // Lấy tất cả enrollments
      const enrollments = await PrismaClient.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              courseId: true,
              courseName: true,
              avatarURL: true,
            },
          },
        },
      });

      // Lấy progress cho từng course
      const progressList = await Promise.all(
        enrollments.map(async (enrollment) => {
          const courseProgress = await this.getCourseProgress(
            userId,
            enrollment.courseId
          );
          return {
            ...courseProgress,
            courseName: enrollment.course.courseName,
            courseAvatar: enrollment.course.avatarURL,
            enrolledAt: enrollment.createdAt,
          };
        })
      );

      return progressList;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy progress chi tiết của 1 lesson
   */
  async getLessonProgress(userId: string, lessonId: string) {
    try {
      const progress = await this.progressRepository.getUserLessonProgress(
        userId,
        lessonId
      );

      if (!progress) {
        return {
          lessonId,
          isCompleted: false,
          lastAccessAt: null,
        };
      }

      return {
        lessonId: progress.lessonId,
        lessonName: progress.lesson.lessonName,
        isCompleted: progress.isCompleted,
        lastAccessAt: progress.lastAccessAt,
        createdAt: progress.created_at,
        updatedAt: progress.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset progress của 1 lesson (admin/owner only)
   */
  async resetLessonProgress(userId: string, lessonId: string) {
    try {
      const progress = await this.progressRepository.getUserLessonProgress(
        userId,
        lessonId
      );

      if (!progress) {
        throw createHttpError(404, "Không tìm thấy progress");
      }

      // Delete progress record
      await PrismaClient.userLessonProgress.delete({
        where: { id: progress.id },
      });

      return { message: "Đã reset progress" };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy danh sách lessons chưa hoàn thành
   */
  async getIncompleteLessons(userId: string, courseId: string) {
    try {
      return await this.progressRepository.getIncompleteLessons(
        userId,
        courseId
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * 🔄 Clear cache cho course (call khi có lesson mới được tạo)
   */
  clearLastLessonCache(courseId: string) {
    this.lastLessonCache.delete(courseId);
    console.log(`🔄 Cleared last lesson cache for course ${courseId}`);
  }

  /**
   * 🔄 Clear toàn bộ cache
   */
  clearAllCache() {
    this.lastLessonCache.clear();
    console.log(`🔄 Cleared all last lesson cache`);
  }
}

export default LessonProgressService;
