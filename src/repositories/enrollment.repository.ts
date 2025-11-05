import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class EnrollmentRepository extends BaseRepository<
  "enrollment",
  PrismaClient["enrollment"],
  Prisma.EnrollmentCreateInput,
  Prisma.EnrollmentUpdateInput
> {
  constructor(prisma: PrismaClient, primaryKey: string) {
    super(prisma, "enrollment", primaryKey);
  }

  async findByUserAndCourse(userId: string, courseId: string) {
    return await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          select: {
            courseId: true,
            courseName: true,
            avatarURL: true,
            coursePrice: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            courseId: true,
            courseName: true,
            courseDescription: true,
            avatarURL: true,
            coursePrice: true,
            discount: true,
            createdBy: true,
            user: {
              select: {
                userId: true,
                userName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByCourseId(courseId: string) {
    return await this.prisma.enrollment.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
            avatarURL: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async countByCourse(courseId: string) {
    return await this.prisma.enrollment.count({
      where: { courseId },
    });
  }

  async countByUser(userId: string) {
    return await this.prisma.enrollment.count({
      where: { userId },
    });
  }

  async getAllWithDetails(params?: { skip?: number; take?: number }) {
    const query: any = {
      include: {
        user: {
          select: {
            userId: true,
            userName: true,
            email: true,
          },
        },
        course: {
          select: {
            courseId: true,
            courseName: true,
            coursePrice: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    };

    if (params?.skip) query.skip = params.skip;
    if (params?.take && params.take > 0) query.take = params.take;

    return await this.prisma.enrollment.findMany(query);
  }
}

export default EnrollmentRepository;
