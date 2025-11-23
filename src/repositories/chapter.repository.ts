import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class ChapterRepository extends BaseRepository<"chapter",
    PrismaClient["chapter"],
    Prisma.ChapterCreateInput,
    Prisma.ChapterUpdateInput> {

    constructor(prisma: PrismaClient, primaryKey: string) {
        super(prisma, "chapter", primaryKey);
    }

    async getByChapterId(chapterId: string) {
        return await this.prisma.chapter.findUnique({
            where: { chapterId },
            include: {
                lessons: true, 
            }
        });
    }
}

export default ChapterRepository;