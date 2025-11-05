import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class RoleRepository extends BaseRepository<
    "role",
    PrismaClient["role"],
    Prisma.RoleCreateInput,
    Prisma.RoleUpdateInput> {

    constructor(prisma: PrismaClient, primaryKey: string) {
        super(prisma, "role", primaryKey);
    }

    async findByRoleName(name: string) {
        return this.prisma.role.findUnique({
            where: { name },
        });
    }

 
}

export default RoleRepository;