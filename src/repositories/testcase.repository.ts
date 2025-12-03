import { BaseRepository } from "./baseRepository";
import { Prisma, PrismaClient } from "@prisma/client";

class TestCaseRepository extends BaseRepository<
  "testCode",
  PrismaClient["testCode"],
  Prisma.TestCodeCreateInput,
  Prisma.TestCodeUpdateInput
> {
  constructor(prisma: PrismaClient, primaryKey: string) {
    super(prisma, "testCode", primaryKey);
  }

  async getTestCaseByLessonId(lessonId: string) {
    return await this.prisma.testCode.findMany({
      where: {
        lessonId,
      },
    });
  }
}

export default TestCaseRepository;
