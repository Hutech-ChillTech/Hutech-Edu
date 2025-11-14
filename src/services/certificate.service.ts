import { CertificateRepository } from "../repositories/certificate.repository";
import { SubmissionRepository } from "../repositories/submission.repository";
import prisma from "../configs/prismaClient";

export class CertificateService {
  private certificateRepository: CertificateRepository;
  private submissionRepository: SubmissionRepository;

  constructor() {
    this.certificateRepository = new CertificateRepository(prisma);
    this.submissionRepository = new SubmissionRepository(prisma);
  }

  /**
   * Kiểm tra và cấp certificate cho user nếu đủ điều kiện
   */
  async checkAndIssueCertificate(userId: string, courseId: string) {
    // 1. Kiểm tra đã có certificate chưa
    const existingCert =
      await this.certificateRepository.hasUserReceivedCertificate(
        userId,
        courseId
      );

    if (existingCert) {
      throw new Error("Bạn đã nhận certificate cho khóa học này rồi!");
    }

    // 2. Lấy tất cả ChapterQuiz trong course
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

    if (allQuizzes.length === 0) {
      throw new Error("Khóa học này chưa có quiz nào!");
    }

    // 3. Lấy tất cả submissions của user trong course
    const submissions =
      await this.submissionRepository.getSubmissionsByUserAndCourse(
        userId,
        courseId
      );

    // Kiểm tra đã làm hết tất cả quiz chưa
    if (submissions.length !== allQuizzes.length) {
      throw new Error(
        `Bạn cần hoàn thành tất cả ${allQuizzes.length} quiz. Hiện tại: ${submissions.length}/${allQuizzes.length}`
      );
    }

    // 4. Tính tổng điểm
    let totalScore = 0;
    let maxScore = 0;

    submissions.forEach((sub) => {
      totalScore += sub.score || 0;
      maxScore += sub.maxScore || 0;
    });

    // 5. Tính điểm trung bình (%)
    const averageScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // 6. Kiểm tra điều kiện: >= 70%
    if (averageScore < 70) {
      throw new Error(
        `Điểm trung bình của bạn là ${averageScore.toFixed(
          2
        )}%. Cần ít nhất 70% để nhận certificate!`
      );
    }

    // 7. Lấy thông tin course
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { courseName: true },
    });

    // 8. Tạo certificate
    const certificate = await this.certificateRepository.createCertificate({
      userId,
      courseId,
      certificateTitle: `Chứng chỉ hoàn thành khóa học ${
        course?.courseName || "Unknown"
      }`,
      averageScore: Math.round(averageScore * 100) / 100,
      totalScore,
      maxScore,
    });

    return {
      certificate,
      message: `Chúc mừng! Bạn đã nhận được certificate với điểm ${averageScore.toFixed(
        2
      )}%`,
    };
  }

  /**
   * Lấy tất cả certificates của user
   */
  async getUserCertificates(userId: string) {
    return this.certificateRepository.getCertificatesByUser(userId);
  }

  /**
   * Lấy certificate theo ID
   */
  async getCertificateById(certificateId: string) {
    const certificate = await this.certificateRepository.getCertificateById(
      certificateId
    );

    if (!certificate) {
      throw new Error("Không tìm thấy certificate!");
    }

    return certificate;
  }

  /**
   * Lấy certificate của user trong một course
   */
  async getUserCertificateInCourse(userId: string, courseId: string) {
    const certificate =
      await this.certificateRepository.getCertificateByUserAndCourse(
        userId,
        courseId
      );

    if (!certificate) {
      throw new Error("Bạn chưa nhận certificate cho khóa học này!");
    }

    return certificate;
  }

  /**
   * Cập nhật URL sau khi generate PDF certificate
   */
  async updateCertificateURL(certificateId: string, certificateURL: string) {
    return this.certificateRepository.updateCertificateURL(
      certificateId,
      certificateURL
    );
  }

  /**
   * Lấy danh sách certificates của course (dành cho admin/creator)
   */
  async getCourseCertificates(courseId: string) {
    return this.certificateRepository.getCertificatesByCourse(courseId);
  }

  /**
   * Xóa certificate (dành cho admin)
   */
  async deleteCertificate(certificateId: string) {
    await this.certificateRepository.deleteCertificate(certificateId);
    return { message: "Xóa certificate thành công!" };
  }

  /**
   * Thống kê certificate
   */
  async getCertificateStats(userId: string) {
    const totalCertificates =
      await this.certificateRepository.countCertificatesByUser(userId);
    const certificates = await this.certificateRepository.getCertificatesByUser(
      userId
    );

    const avgScore =
      certificates.length > 0
        ? certificates.reduce(
            (sum, cert) => sum + (cert.averageScore || 0),
            0
          ) / certificates.length
        : 0;

    return {
      totalCertificates,
      averageScore: Math.round(avgScore * 100) / 100,
      certificates,
    };
  }
}
