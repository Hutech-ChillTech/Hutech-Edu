import { Prisma } from "@prisma/client";
import UserRepository from "../repositories/user.repository";
import PrismaClient from "../configs/prismaClient";
import { UserRoles } from "../constants/roles";

class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async verifyPassword(hash: string, plain: string) {
    const valid = await this.userRepository.verifyPassword(hash, plain);
    if (!valid) {
      throw new Error("Mật khẩu không hợp lệ hoặc dữ liệu mật khẩu bị lỗi.");
    }
    return true;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmailWithRoles(email);

    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    try {
      await this.verifyPassword(user.password, password);
    } catch (err) {
      throw new Error(
        (err as Error).message || "Email hoặc mật khẩu không đúng"
      );
    }

    const roles = user.roles.map((userRole) => userRole.role.name);

    const { password: _, ...userData } = user;
    return {
      ...userData,
      roles,
    };
  }

  async getUserById(userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      return null;
    }
    const { password: _, ...userData } = user;
    return userData;
  }

  async getUserWithRelations(userId: string) {
    const user = await this.userRepository.getUserWithRelations(userId);
    if (!user) {
      return null;
    }
    const { password: _, ...userData } = user;
    return userData;
  }

  async getUserByName(userName: string) {
    return this.userRepository.getUserByName(userName);
  }

  async searchUserByName(searchTerm: string) {
    return this.userRepository.searchUserByName(searchTerm);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const { password: _, ...userData } = user;
    return userData;
  }

  async getAllUser(skip = 0, take = 0) {
    const users = await this.userRepository.getAll({ skip, take });
    return users.map((user: any) => {
      const { password, ...userData } = user;
      return userData;
    });
  }

  async changePasswordUser(userId: string, newPassword: string) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return this.userRepository.changePasswordUser(userId, newPassword);
  }

  async createUser(user: Prisma.UserCreateInput) {
    const existing = await this.userRepository.getUserByEmail(user.email);
    if (existing) {
      throw new Error("Email đã tồn tại");
    }

    const newUser = await this.userRepository.create(user);

    const userRole = await PrismaClient.role.findUnique({
      where: { name: UserRoles.USER },
    });

    if (userRole) {
      await PrismaClient.userRole.create({
        data: {
          userId: newUser.userId,
          roleId: userRole.roleId,
        },
      });
    }

    const { password: _, ...userData } = newUser;
    return userData;
  }

  async updateUser(user: Prisma.UserUpdateInput, userId: string) {
    const existingUser = await this.userRepository.getById(userId);
    if (!existingUser) {
      throw new Error("Người dùng không tồn tại");
    }
    if (user.email && user.email !== existingUser.email) {
      const emailUser = await this.userRepository.getUserByEmail(
        user.email as string
      );
      if (emailUser) {
        throw new Error("Email đã tồn tại");
      }
    }
    const updatedUser = await this.userRepository.update(userId, user);
    const { password: _, ...userData } = updatedUser;
    return userData;
  }

  async deleteUser(userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return this.userRepository.delete(userId);
  }

  async getUserEnrolledCourses(userId: string) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    return this.userRepository.getUserEnrolledCourses(userId);
  }

  async isUserEnrolledInCourse(userId: string, courseId: string) {
    return this.userRepository.isUserEnrolledInCourse(userId, courseId);
  }
}

export default UserService;
