import { SubmissionRepository } from "../repositories/submission.repository";
import ChapterQuizRepository from "../repositories/chapterQuiz.repository";
import prisma from "../configs/prismaClient";

export class SubmissionService {
  private submissionRepository: SubmissionRepository;
  private chapterQuizRepository: ChapterQuizRepository;

  constructor() {
    this.submissionRepository = new SubmissionRepository(prisma);
    this.chapterQuizRepository = new ChapterQuizRepository(
      prisma,
      "chapterQuizId"
    );
  }

  /**
   * Nộp bài quiz - User submit quiz answers
   */
  async submitQuiz(data: {
    userId: string;
    chapterQuizId: string;
    answers: any; // { questionId: selectedOptionId }
  }) {
    const { userId, chapterQuizId, answers } = data;

    // 1. Kiểm tra xem đã làm bài này chưa
    const existingSubmission =
      await this.submissionRepository.hasUserSubmittedQuiz(
        userId,
        chapterQuizId
      );

    // Cho phép làm lại quiz bất kể PASSED hay FAILED
    if (existingSubmission) {
      await this.submissionRepository.deleteSubmission(
        existingSubmission.submissionId
      );
      const status = existingSubmission.isPassed ? "PASSED" : "FAILED";
      console.log(
        `🔄 User ${userId} đang làm lại quiz ${chapterQuizId} (lần trước ${status})`
      );
    }

    // 2. Lấy thông tin quiz và câu hỏi
    const quiz = await this.chapterQuizRepository.findByIdWithDetails(
      chapterQuizId
    );
    if (!quiz) {
      throw new Error("Không tìm thấy quiz!");
    }

    // 3. Tính điểm
    let score = 0;
    let maxScore = 0;

    for (const question of quiz.quizQuestions) {
      maxScore += question.points;

      const userAnswerId = answers[question.quizQuestionId];
      if (!userAnswerId) continue;

      // Kiểm tra câu trả lời đúng
      const correctOption = question.quizOptions.find(
        (opt: any) => opt.isCorrect
      );
      if (correctOption && correctOption.quizOptionId === userAnswerId) {
        score += question.points;
      }
    }

    // 4. Kiểm tra pass hay fail
    const passingScore = quiz.passingScore || 70; // Default 70%
    const percentage = (score / maxScore) * 100;
    const isPassed = percentage >= passingScore;

    // 5. Lưu submission
    const submission = await this.submissionRepository.createSubmission({
      userId,
      chapterQuizId,
      score,
      maxScore,
      isPassed,
      answers,
      submittedAt: new Date(),
    });

    // 6. Kiểm tra xem đã hoàn thành 100% course chưa
    let courseCompleted = false;
    let certificateCreated = false;

    try {
      // Lấy courseId từ chapterQuiz
      const chapterQuiz = await prisma.chapterQuiz.findUnique({
        where: { chapterQuizId },
        include: { chapter: true },
      });

      if (chapterQuiz) {
        const courseId = chapterQuiz.chapter.courseId;

        // Đếm tổng items và completed items
        const [totalLessons, totalQuizzes, completedLessons, completedQuizzes] =
          await Promise.all([
            prisma.lesson.count({
              where: { chapter: { courseId } },
            }),
            prisma.chapterQuiz.count({
              where: { chapter: { courseId } },
            }),
            prisma.userLessonProgress.count({
              where: {
                userId,
                lesson: { chapter: { courseId } },
                isCompleted: true,
              },
            }),
            prisma.submission.count({
              where: {
                userId,
                isPassed: true,
                chapterQuiz: { chapter: { courseId } },
              },
            }),
          ]);

        const totalItems = totalLessons + totalQuizzes;
        const completedItems = completedLessons + completedQuizzes;
        const progress =
          totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

        // Nếu đạt 100% → Tạo Certificate
        if (progress >= 100) {
          courseCompleted = true;

          // Kiểm tra xem đã có certificate chưa
          const existingCert = await prisma.certificate.findUnique({
            where: { userId_courseId: { userId, courseId } },
          });

          if (!existingCert) {
            // Import PDFGenerator và tạo certificate
            const { PDFGenerator } = await import("../utils/pdfGenerator.js");

            // Lấy thông tin user và course
            const [user, course, allSubmissions] = await Promise.all([
              prisma.user.findUnique({
                where: { userId },
                select: { userName: true },
              }),
              prisma.course.findUnique({
                where: { courseId },
                select: { courseName: true, level: true, subLevel: true },
              }),
              prisma.submission.findMany({
                where: {
                  userId,
                  chapterQuiz: { chapter: { courseId } },
                },
                select: { score: true, maxScore: true },
              }),
            ]);

            if (user && course) {
              // Tính totalScore
              let totalScore = 0;
              if (allSubmissions.length > 0) {
                const totalPoints = allSubmissions.reduce(
                  (sum, s) => sum + (s.score || 0),
                  0
                );
                const maxPoints = allSubmissions.reduce(
                  (sum, s) => sum + (s.maxScore || 100),
                  0
                );
                totalScore =
                  maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
              }

              // Generate PDF
              let certificateURL = "";
              try {
                certificateURL = await PDFGenerator.generateCertificatePDF(
                  userId,
                  courseId,
                  {
                    userName: user.userName,
                    courseName: course.courseName,
                    level: course.level || "Basic",
                    subLevel: course.subLevel || "Low",
                    totalScore,
                    issuedDate: new Date(),
                  }
                );
              } catch (pdfError) {
                console.error("Error generating PDF:", pdfError);
              }

              // Tạo Certificate record
              await prisma.certificate.create({
                data: {
                  userId,
                  courseId,
                  certificateTitle: `Certificate of Completion - ${course.courseName}`,
                  certificateURL,
                  totalScore: parseFloat(totalScore.toFixed(2)),
                  averageScore: parseFloat(totalScore.toFixed(2)),
                  maxScore: 100,
                  issuedAt: new Date(),
                },
              });

              certificateCreated = true;
              console.log(
                `🎓 Certificate created after quiz completion! User: ${userId}, Course: ${courseId}, Score: ${totalScore.toFixed(
                  2
                )}%`
              );
            }
          }
        }
      }
    } catch (certError) {
      console.error("Error checking/creating certificate:", certError);
      // Không throw error, chỉ log
    }

    return {
      submission,
      percentage: Math.round(percentage * 100) / 100,
      isPassed,
      message: isPassed
        ? `Chúc mừng! Bạn đã đạt ${percentage.toFixed(2)}%`
        : `Rất tiếc! Bạn chỉ đạt ${percentage.toFixed(
            2
          )}%. Cần ít nhất ${passingScore}% để pass.`,
      courseCompleted,
      certificateCreated,
    };
  }

  /**
   * Lấy kết quả quiz của user
   */
  async getSubmissionResult(userId: string, chapterQuizId: string) {
    const submission =
      await this.submissionRepository.getSubmissionByUserAndQuiz(
        userId,
        chapterQuizId
      );

    if (!submission) {
      throw new Error("Bạn chưa làm bài quiz này!");
    }

    return submission;
  }

  /**
   * Lấy tất cả submissions của user trong một course
   */
  async getUserSubmissionsInCourse(userId: string, courseId: string) {
    return this.submissionRepository.getSubmissionsByUserAndCourse(
      userId,
      courseId
    );
  }

  /**
   * Lấy tất cả submissions của user
   */
  async getAllUserSubmissions(userId: string) {
    return this.submissionRepository.getSubmissionsByUser(userId);
  }

  /**
   * Kiểm tra user đã hoàn thành tất cả quiz trong course chưa
   */
  async checkCourseCompletion(userId: string, courseId: string) {
    // Lấy tất cả ChapterQuiz trong course
    const allQuizzes = await prisma.chapterQuiz.findMany({
      where: {
        chapter: {
          courseId,
        },
      },
      select: {
        chapterQuizId: true,
      },
    });

    // Lấy tất cả submissions của user trong course
    const submissions =
      await this.submissionRepository.getSubmissionsByUserAndCourse(
        userId,
        courseId
      );

    const totalQuizzes = allQuizzes.length;
    const completedQuizzes = submissions.length;
    const passedQuizzes = submissions.filter((s) => s.isPassed).length;

    return {
      totalQuizzes,
      completedQuizzes,
      passedQuizzes,
      isCompleted: completedQuizzes === totalQuizzes,
      completionRate:
        totalQuizzes > 0
          ? Math.round((completedQuizzes / totalQuizzes) * 100)
          : 0,
    };
  }

  /**
   * Xóa submission (dành cho admin)
   */
  async deleteSubmission(submissionId: string) {
    await this.submissionRepository.deleteSubmission(submissionId);
    return { message: "Xóa submission thành công!" };
  }
}
