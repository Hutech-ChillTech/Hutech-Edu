import { Prisma } from "@prisma/client";
import PrismaClient from "../configs/prismaClient";
import admin from '../configs/firebaseAdminConfig';
import argon2 from "argon2";
import axios from "axios";
import createHttpError from "http-errors";
import { UserRoles } from "../constants/roles";
import UserRepository from "../repositories/user.repository";
import RoleRepository from "../repositories/role.repository";
import UserRoleRepository from "../repositories/userRole.repository";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import { refreshToken } from "firebase-admin/app";


class UserService {
  private readonly userRepository: UserRepository;
  private readonly roleRepository: RoleRepository;
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRepository: UserRepository, roleRepository: RoleRepository, userRoleRepository: UserRoleRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.userRoleRepository = userRoleRepository;
  }

  async verifyPassword(hash: string, plain: string) {
    const valid = await this.userRepository.verifyPassword(hash, plain);
    if (!valid) {
      throw new Error("Mật khẩu không hợp lệ hoặc dữ liệu mật khẩu bị lỗi.");
    }
    return true;
  }

  // Đăng nhập
  // async login(email: string, password: string) {
  //   const user = await this.userRepository.getUserByEmail(email);
  //   if (!user) {
  //     throw new Error("Email hoặc mật khẩu không đúng");
  //   }
  //   try {
  //     await this.verifyPassword(user.password, password);
  //   } catch (err) {
  //     throw new Error(
  //       (err as Error).message || "Email hoặc mật khẩu không đúng"
  //     );
  //   }
  //   const { password: _, ...userData } = user;
  //   return userData;
  // }

  async loginWithEmail(email: string, password: string) {
    try {
      console.log("🔥 Bắt đầu loginWithEmail");
      const firebaseApiKey = process.env.FIREBASE_API_KEY;
      console.log("đang chạy đến đây");

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
        { email, password, returnSecureToken: true }
      );

      const { idToken } = response.data;

      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const uid = decodedToken.uid;

      const account = await this.userRepository.findUserByUidForSystem(uid);

      if (!account) throw createHttpError(404, 'Người dùng chưa đăng ký tài khoản');

      const roleObj = await this.userRoleRepository.getRoleByUserId(account.userId);

      if (!roleObj) {
        throw new Error('Không tìm thấy role theo ID');
      }

      const roleId = roleObj[0].roleId;
      const userId = roleObj[0].userId;


      const roleName = await this.roleRepository.getById(roleId);
      if(!roleName){
        throw new Error("Không tìm thấy role phù hợp với ID");
      }

      const payload = {
        uid,
        userId: userId,
        roleId: roleId,
        role: roleName.name,
        email: decodedToken.email,
        token: idToken,
      };
      
      console.log('✅ Đăng nhập thành công');
      return payload;
    } catch (error) {
      console.error('❌lLogin with email error:', error);
      throw createHttpError(401, 'Đăng nhập thất bại');
    }
  }

  // Đăng ký
  async register(user: Prisma.UserCreateInput) {
    try {
      const result = await PrismaClient.$transaction(async (tx) => {

        const existingUser = await tx.user.findUnique({
          where: { email: user.email }
        });

        if (existingUser) {
          throw createHttpError(400, 'Email đã được đăng ký');
        }


        const firebaseUser = await admin.auth().createUser({
          email: user.email,
          password: user.password,
          displayName: user.userName,
        });

        if (!firebaseUser || !firebaseUser.uid) {
          throw new Error("Firebase user không được tạo thành công");
        }

        console.log('✅ Firebase account created:', firebaseUser.uid);

        const hashedPassword = await argon2.hash(user.password);

        const newUser = await tx.user.create({
          data: {
            userName: user.userName,
            password: hashedPassword,
            email: user.email,
            gender: user.gender,
            level: user.level,
            firebaseUid: firebaseUser.uid
          }
        });

        const defaultRole = await tx.role.findUnique({
          where: { name: 'User' }
        });

        if (!defaultRole) {
          throw new Error("Role mặc định 'User' chưa được khởi tạo");
        }

        const payloadUserRole = {
          userId: newUser.userId,
          roleId: defaultRole.roleId
        };

        if (!payloadUserRole.userId || !payloadUserRole.roleId) {
          throw new Error("Payload ở userRole đang gặp lỗi.");
        }

        await tx.userRole.create({ data: payloadUserRole });

        return newUser;
      });

      return result;

    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        throw createHttpError(400, 'Email đã tồn tại trên Firebase');
      }
      console.error("❌ Lỗi khi đăng ký user:", error.message);
      throw error;
    }
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
