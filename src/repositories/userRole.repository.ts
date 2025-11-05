import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";


class UserRoleRepository extends BaseRepository<
    "userRole",
    PrismaClient["userRole"],
    Prisma.UserRoleCreateInput,
    Prisma.UserRoleUpdateInput
> {
    constructor(prisma: PrismaClient, primaryKey: string) {
        super(prisma, "userRole", primaryKey);
    }

    async getRoleByUserId(userId: string) {
        return await this.prisma.userRole.findMany({
            where: { userId }
        })
    }

}

export default UserRoleRepository;