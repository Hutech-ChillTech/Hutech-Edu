import prisma from '../configs/prismaClient';
import { Level, SubLevel } from '@prisma/client';

export class CourseRecommendationService {
  /**
   * 🎯 GỢI Ý KHÓA HỌC ĐƠN GIẢN
   * Không cần Certificate, không cần Learning Speed
   * Chỉ dựa trên level của khóa học vừa hoàn thành
   */
  async getSimpleRecommendations(userId: string, completedCourseId: string) {
    try {
      // 1. Lấy thông tin user (specialization)
      const user = await prisma.user.findUnique({
        where: { userId },
        select: { specialization: true },
      });

      // 2. Lấy thông tin khóa học vừa hoàn thành
      const completedCourse = await prisma.course.findUnique({
        where: { courseId: completedCourseId },
        select: {
          courseName: true,
          level: true,
          subLevel: true,
          specialization: true,
          tag: true,
        },
      });

      if (!completedCourse || !completedCourse.level || !completedCourse.subLevel) {
        throw new Error('Course level/subLevel not found');
      }

      // 3. Xác định vị trí hiện tại (1-9)
      const currentPosition = this.getSubLevelPosition(
        completedCourse.level,
        completedCourse.subLevel
      );

      // 4. Gợi ý khóa học CÙNG CẤP hoặc CAO HƠN 1 CẤP
      const recommendedPosition = currentPosition + 1; // Tăng 1 cấp
      const recommendedLevel = this.positionToSubLevel(recommendedPosition);

      // 5. Tìm khóa học phù hợp
      // 5.1. Ưu tiên 1: Cùng TAG + Level cao hơn
      const coursesByTag = completedCourse.tag
        ? await prisma.course.findMany({
            where: {
              tag: completedCourse.tag,
              level: recommendedLevel.level,
              subLevel: recommendedLevel.subLevel,
              courseId: { not: completedCourseId },
            },
            take: 3,
            orderBy: { created_at: 'desc' },
          })
        : [];

      // 5.2. Ưu tiên 2: Cùng specialization với user
      const coursesBySpecialization = user?.specialization
        ? await prisma.course.findMany({
            where: {
              level: recommendedLevel.level,
              subLevel: recommendedLevel.subLevel,
              specialization: user.specialization,
              courseId: {
                not: completedCourseId,
                notIn: coursesByTag.map((c) => c.courseId),
              },
            },
            take: 2,
            orderBy: { created_at: 'desc' },
          })
        : [];

      // 5.3. Ưu tiên 3: Các khóa học khác cùng level
      const otherCourses = await prisma.course.findMany({
        where: {
          level: recommendedLevel.level,
          subLevel: recommendedLevel.subLevel,
          courseId: {
            not: completedCourseId,
            notIn: [
              ...coursesByTag.map((c) => c.courseId),
              ...coursesBySpecialization.map((c) => c.courseId),
            ],
          },
        },
        take: 5 - coursesByTag.length - coursesBySpecialization.length,
        orderBy: { created_at: 'desc' },
      });

      // Gộp tất cả khóa học
      const recommendedCourses = [
        ...coursesByTag,
        ...coursesBySpecialization,
        ...otherCourses,
      ];

      // 6. Tạo reason chi tiết
      const createDetailedReason = (course: any) => {
        const reasons = [];

        if (completedCourse.tag && course.tag === completedCourse.tag) {
          reasons.push(`cùng chủ đề ${course.tag}`);
        }

        if (
          user?.specialization &&
          course.specialization === user.specialization
        ) {
          reasons.push(`phù hợp với chuyên ngành ${user.specialization}`);
        }

        reasons.push(`khóa học tiếp theo sau ${completedCourse.courseName}`);

        return reasons.join(', ');
      };

      return {
        currentCourse: {
          courseName: completedCourse.courseName,
          level: completedCourse.level,
          subLevel: completedCourse.subLevel,
          position: currentPosition,
        },
        recommendedLevel: {
          level: recommendedLevel.level,
          subLevel: recommendedLevel.subLevel,
          position: recommendedLevel.position,
        },
        reason: `Bạn đã hoàn thành ${completedCourse.courseName}. Gợi ý khóa học tiếp theo!`,
        matchCriteria: {
          userSpecialization: user?.specialization || null,
          courseTag: completedCourse.tag || null,
          courseSpecialization: completedCourse.specialization || null,
        },
        recommendationBreakdown: {
          byTag: coursesByTag.length,
          bySpecialization: coursesBySpecialization.length,
          others: otherCourses.length,
          total: recommendedCourses.length,
        },
        courses: recommendedCourses.map((course) => ({
          ...course,
          reason: createDetailedReason(course),
        })),
      };
    } catch (error) {
      console.error('Error getting simple recommendations:', error);
      throw error;
    }
  }

  /**
   * Lấy vị trí cấp độ (1-9)
   */
  private getSubLevelPosition(level: Level, subLevel: SubLevel): number {
    const levelBase = {
      [Level.Basic]: 0,
      [Level.Intermediate]: 3,
      [Level.Advanced]: 6,
    }[level];

    const subLevelOffset = {
      [SubLevel.Low]: 1,
      [SubLevel.Mid]: 2,
      [SubLevel.High]: 3,
    }[subLevel];

    return levelBase + subLevelOffset;
  }

  /**
   * Chuyển đổi vị trí (1-9) thành Level + SubLevel
   */
  private positionToSubLevel(position: number): {
    level: Level;
    subLevel: SubLevel;
    position: number;
  } {
    if (position < 1) position = 1;
    if (position > 9) position = 9;

    let level: Level;
    let subLevel: SubLevel;

    if (position <= 3) {
      level = Level.Basic;
      subLevel = [SubLevel.Low, SubLevel.Mid, SubLevel.High][position - 1];
    } else if (position <= 6) {
      level = Level.Intermediate;
      subLevel = [SubLevel.Low, SubLevel.Mid, SubLevel.High][position - 4];
    } else {
      level = Level.Advanced;
      subLevel = [SubLevel.Low, SubLevel.Mid, SubLevel.High][position - 7];
    }

    return { level, subLevel, position };
  }
}

export default new CourseRecommendationService();
