import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class ChapterRepository extends BaseRepository<"chapter",
    PrismaClient["chapter"],
    Prisma.ChapterCreateInput,
    Prisma.ChapterUpdateInput> {

    constructor(prisma: PrismaClient, primaryKey: string) {
        super(prisma, "chapter", primaryKey);
    }

    // Trong Service
    async getByChapterId(chapterId: string) {
        const chapter = await this.prisma.chapter.findUnique({
            where: { chapterId },
            include: { lessons: true }
        });

        return chapter ? chapter.lessons : [];
    }
}

export default ChapterRepository;