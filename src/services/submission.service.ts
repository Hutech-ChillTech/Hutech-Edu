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

    if (existingSubmission) {
      throw new Error("Bạn đã làm bài quiz này rồi!");
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

    return {
      submission,
      percentage: Math.round(percentage * 100) / 100,
      isPassed,
      message: isPassed
        ? `Chúc mừng! Bạn đã đạt ${percentage.toFixed(2)}%`
        : `Rất tiếc! Bạn chỉ đạt ${percentage.toFixed(
            2
          )}%. Cần ít nhất ${passingScore}% để pass.`,
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
