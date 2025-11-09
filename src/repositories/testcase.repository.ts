import { BaseRepository } from "./baseRepository";
import { Prisma, PrismaClient } from "@prisma/client";


class TestCaseRepository extends BaseRepository<
      "testCase",
      PrismaClient["testCase"],
      Prisma.TestCaseCreateInput,
      Prisma.TestCaseUpdateInput
> {

    constructor(prisma: PrismaClient, primaryKey: string){
        super(prisma, "testCase", primaryKey);
    }
}

export default TestCaseRepository;