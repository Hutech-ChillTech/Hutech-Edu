import { Prisma, PrismaClient } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class CourseRepository extends BaseRepository<
  "course",
  PrismaClient["course"],
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {
  constructor(prisma: PrismaClient, primaryKey: string) {
    super(prisma, "course", primaryKey);
  }

  async getCourseByName(courseName: string) {
    return await this.delegate.findMany({
      where: { courseName },
    });
  }

  async getCourseByNamePrefix(prefix: string) {
    return await this.delegate.findMany({
      where: {
        courseName: {
          startsWith: prefix,
          mode: "insensitive",
        },
      },
    });
  }

  async getAllSorted(sortField: string, sortOrder: "asc" | "desc" = "asc") {
    return this.delegate.findMany({
      orderBy: { [sortField]: sortOrder },
    });
  }
}

export default CourseRepository;
