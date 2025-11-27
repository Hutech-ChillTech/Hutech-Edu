import { BaseRepository } from "./baseRepository";
import { Prisma, PrismaClient } from "@prisma/client";


class TestCaseRepository extends BaseRepository<
    "testCase",
    PrismaClient["testCase"],
    Prisma.TestCaseCreateInput,
    Prisma.TestCaseUpdateInput
> {

    constructor(prisma: PrismaClient, primaryKey: string) {
        super(prisma, "testCase", primaryKey);
    }

    async getTestCaseByLessonId(lessonId: string) {
        return await this.prisma.testCase.findMany({
            where: {
                lessonId
            }
        })
    }
}

export default TestCaseRepository;