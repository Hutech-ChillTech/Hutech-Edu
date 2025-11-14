import { LearningSpeed, SubLevel, Level } from "@prisma/client";
import prisma from "../configs/prismaClient";

/**
 * 📊 CÔNG THỨC TÍNH TỐC ĐỘ HỌC
 *
 * speedScore = (finalScore / 100 * estimatedDuration) / totalLearningTime
 *
 * Trong đó:
 * - finalScore: Điểm cuối cùng (từ Certificate.totalScore)
 * - estimatedDuration: Thời gian ước lượng (giờ) từ Course.estimatedDuration
 * - totalLearningTime: Tổng thời gian học thực tế (giờ)
 *
 * KẾT QUẢ:
 * - speedScore > 1.0: Học NHANH (Fast)
 * - speedScore = 1.0: Học BÌNH THƯỜNG (Normal)
 * - speedScore < 1.0: Học CHẬM (Slow)
 */

interface CalculateSpeedParams {
  userId: string;
  courseId: string;
  totalScore: number; // Từ Certificate
  estimatedDuration: number; // Từ Course (giờ)
  totalLearningTime: number; // Từ LearningSession (giờ)
}

interface SubLevelInfo {
  level: Level;
  subLevel: SubLevel;
  position: number; // 1-9 (1=Basic-Low, 9=Advanced-High)
}

export class LearningSpeedService {
  /**
   * Tính toán tốc độ học của user cho một khóa học
   */
  async calculateLearningSpeed(params: CalculateSpeedParams) {
    const {
      userId,
      courseId,
      totalScore,
      estimatedDuration,
      totalLearningTime,
    } = params;

    // Validate inputs
    if (totalLearningTime <= 0) {
      throw new Error("Total learning time must be greater than 0");
    }
    if (estimatedDuration <= 0) {
      throw new Error("Estimated duration must be greater than 0");
    }
    if (totalScore < 0 || totalScore > 100) {
      throw new Error("Total score must be between 0 and 100");
    }

    // CÔNG THỨC: (totalScore / 100 * estimatedDuration) / totalLearningTime
    const speedScore =
      ((totalScore / 100) * estimatedDuration) / totalLearningTime;

    // Xác định learningSpeed
    let learningSpeed: LearningSpeed;
    if (speedScore > 1.0) {
      learningSpeed = LearningSpeed.Fast;
    } else if (speedScore >= 0.9 && speedScore <= 1.1) {
      // Cho phép sai số ±10% coi là Normal
      learningSpeed = LearningSpeed.Normal;
    } else {
      learningSpeed = LearningSpeed.Slow;
    }

    // Lưu hoặc cập nhật vào database
    const userLearningSpeed = await prisma.userLearningSpeed.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      update: {
        totalLearningTime,
        finalScore: totalScore,
        speedScore,
        learningSpeed,
        lastUpdated: new Date(),
      },
      create: {
        userId,
        courseId,
        totalLearningTime,
        finalScore: totalScore,
        speedScore,
        learningSpeed,
      },
    });

    return {
      speedScore,
      learningSpeed,
      userLearningSpeed,
    };
  }

  /**
   * Tính tổng thời gian học thực tế từ các sessions
   */
  async calculateTotalLearningTime(
    userId: string,
    courseId: string
  ): Promise<number> {
    const sessions = await prisma.learningSession.findMany({
      where: {
        userId,
        courseId,
        isActive: false, // Chỉ lấy sessions đã kết thúc
        endTime: { not: null },
      },
    });

    // Tổng thời gian active (giây) → chuyển sang giờ
    const totalSeconds = sessions.reduce(
      (sum, session) => sum + session.totalActiveTime,
      0
    );
    const totalHours = totalSeconds / 3600;

    return totalHours;
  }

  /**
   * Lấy thông tin vị trí cấp độ hiện tại của khóa học (1-9)
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
  private positionToSubLevel(position: number): SubLevelInfo {
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

  /**
   * 🎯 GỢI Ý KHÓA HỌC DựA TRÊN TỐC ĐỘ HỌC
   *
   * - Fast (>1): +2 cấp (VD: Basic-Low → Basic-High)
   * - Normal (=1): Cùng cấp (VD: Basic-Mid → Basic-Mid)
   * - Slow (<1): -1 cấp (VD: Basic-High → Basic-Mid)
   */
  async recommendNextCourses(userId: string, completedCourseId: string) {
    // 1. Lấy thông tin khóa học vừa hoàn thành
    const completedCourse = await prisma.course.findUnique({
      where: { courseId: completedCourseId },
      select: { level: true, subLevel: true, estimatedDuration: true },
    });

    if (
      !completedCourse ||
      !completedCourse.level ||
      !completedCourse.subLevel
    ) {
      throw new Error("Course level/subLevel not found");
    }

    // 2. Lấy learning speed của user cho khóa học này
    const userSpeed = await prisma.userLearningSpeed.findUnique({
      where: {
        userId_courseId: { userId, courseId: completedCourseId },
      },
    });

    if (!userSpeed || !userSpeed.learningSpeed) {
      throw new Error("Learning speed not calculated yet");
    }

    // 3. Xác định vị trí hiện tại (1-9)
    const currentPosition = this.getSubLevelPosition(
      completedCourse.level,
      completedCourse.subLevel
    );

    // 4. Tính vị trí đề xuất dựa trên tốc độ học
    let recommendedPosition: number;
    let reason: string;

    switch (userSpeed.learningSpeed) {
      case LearningSpeed.Fast:
        // +2 cấp
        recommendedPosition = currentPosition + 2;
        reason = `Bạn học nhanh (điểm ${userSpeed.speedScore?.toFixed(
          2
        )})! Gợi ý khóa học khó hơn 2 cấp`;
        break;

      case LearningSpeed.Normal:
        // Cùng cấp
        recommendedPosition = currentPosition;
        reason = `Bạn học ổn định (điểm ${userSpeed.speedScore?.toFixed(
          2
        )}). Gợi ý khóa học cùng cấp độ`;
        break;

      case LearningSpeed.Slow:
        // -1 cấp
        recommendedPosition = currentPosition - 1;
        reason = `Bạn cần thêm thời gian (điểm ${userSpeed.speedScore?.toFixed(
          2
        )}). Gợi ý khóa học dễ hơn 1 cấp`;
        break;

      default:
        recommendedPosition = currentPosition;
        reason = "Gợi ý khóa học cùng cấp độ";
    }

    // 5. Chuyển đổi vị trí thành Level + SubLevel
    const recommendedLevel = this.positionToSubLevel(recommendedPosition);

    // 6. Tìm khóa học phù hợp
    const recommendedCourses = await prisma.course.findMany({
      where: {
        level: recommendedLevel.level,
        subLevel: recommendedLevel.subLevel,
        courseId: { not: completedCourseId }, // Không gợi ý lại khóa vừa học
      },
      take: 5,
      orderBy: { created_at: "desc" },
    });

    // 7. Lưu recommendations vào database
    const recommendations = await Promise.all(
      recommendedCourses.map((course) =>
        prisma.courseRecommendation.create({
          data: {
            userId,
            recommendedCourseId: course.courseId,
            reason,
            score: userSpeed.speedScore || 0,
          },
        })
      )
    );

    return {
      currentLevel: {
        level: completedCourse.level,
        subLevel: completedCourse.subLevel,
        position: currentPosition,
      },
      recommendedLevel: {
        level: recommendedLevel.level,
        subLevel: recommendedLevel.subLevel,
        position: recommendedLevel.position,
      },
      learningSpeed: userSpeed.learningSpeed,
      speedScore: userSpeed.speedScore,
      reason,
      courses: recommendedCourses,
      recommendations,
    };
  }

  /**
   * Trigger khi user hoàn thành khóa học (có Certificate)
   * → Tính toán learning speed và gợi ý khóa học tiếp theo
   */
  async onCourseCompleted(userId: string, courseId: string) {
    // 1. Lấy Certificate (chứa totalScore)
    const certificate = await prisma.certificate.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (!certificate || certificate.totalScore === null) {
      throw new Error("Certificate not found or totalScore is null");
    }

    // 2. Lấy thông tin khóa học (estimatedDuration)
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { estimatedDuration: true },
    });

    if (!course || !course.estimatedDuration) {
      throw new Error("Course estimatedDuration not found");
    }

    // 3. Tính tổng thời gian học thực tế
    const totalLearningTime = await this.calculateTotalLearningTime(
      userId,
      courseId
    );

    if (totalLearningTime <= 0) {
      throw new Error("No learning time recorded");
    }

    // 4. Tính learning speed
    const speedResult = await this.calculateLearningSpeed({
      userId,
      courseId,
      totalScore: certificate.totalScore,
      estimatedDuration: course.estimatedDuration,
      totalLearningTime,
    });

    // 5. Gợi ý khóa học tiếp theo
    const recommendations = await this.recommendNextCourses(userId, courseId);

    return {
      speedResult,
      recommendations,
    };
  }

  /**
   * Lấy learning speed history của user
   */
  async getUserLearningSpeedHistory(userId: string) {
    const history = await prisma.userLearningSpeed.findMany({
      where: { userId },
      orderBy: { lastUpdated: "desc" },
      take: 10,
    });

    return history;
  }
}

export default new LearningSpeedService();
