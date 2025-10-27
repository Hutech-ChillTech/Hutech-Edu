import { Prisma } from "@prisma/client";
import UserRepository from "../repositories/user.repository";

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
        const user = await this.userRepository.getUserByEmail(email);
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
        const { password: _, ...userData } = user;
        return userData;
    }

    async getUserById(userId: string) {
        return this.userRepository.getById(userId);
    }

    async getUserByName(userName: string) {
        return this.userRepository.getUserByName(userName);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    async getAllUser(skip = 0, take = 0) {
        return this.userRepository.getAll({ skip, take });
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
        return this.userRepository.create(user);
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
        return this.userRepository.update(userId, user);
    }

    async deleteUser(userId: string) {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }
        return this.userRepository.delete(userId);
    }
}

export default UserService;