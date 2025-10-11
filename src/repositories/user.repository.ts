import argon2 from "argon2";
import { PrismaClient, Prisma } from "@prisma/client";
import { BaseRepository } from "./baseRepository";

class UserRepository extends BaseRepository<"user",
  PrismaClient["user"],
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput> {

  constructor(prisma: PrismaClient) {
    super(prisma, "user");
  }

  async getUserByName(userName: string) {
    return await this.prisma.user.findMany({
      where: { userName },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async changePasswordUser(userId: string, newPassword: string) {
    const hashedPassword = await argon2.hash(newPassword);
    return await this.prisma.user.update({
      where: { userId },
      data: {
        password: hashedPassword,
      },
    });
  }

  async verifyPassword(hash: string, plain: string) {
    if (typeof hash !== "string" || !hash.startsWith("$")) {
      return false;
    }
    return await argon2.verify(hash, plain);
  }

}
export default UserRepository;