import { Request, Response } from "express";
import UserService from "../services/user.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function handleError(
    res: Response,
    error: unknown,
    action: string,
    status = 400,
    defaultMsg = "Đã xảy ra lỗi"
) {
    if (error instanceof Error) {
        console.error(`Lỗi khi ${action}:`, error.message);
        return res.status(status).json({ error: error.message });
    } else {
        console.error(`Lỗi không xác định khi ${action}`);
        return res.status(status).json({ error: defaultMsg });
    }
}

class UserController {

    private readonly userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userData = await this.userService.login(email, password);
            const token = jwt.sign(
                { userId: userData.userId, email: userData.email },
                JWT_SECRET,
                { expiresIn: "7d" }
            );
            res.json({ message: "Đăng nhập thành công", token, user: userData });
        } catch (err) {
            const msg = (err as Error).message || "Lỗi máy chủ";
            const status = msg.includes("mật khẩu") ? 401 : 500;
            res.status(status).json({ error: msg });
        }
    }
    async getUserById(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await this.userService.getUserById(userId);
            if (!user)
                return res.status(404).json({ message: "Không tìm thấy người dùng" });
            res.json({ message: "Lấy người dùng thành công", data: user });
        } catch (err) {
            return handleError(
                res,
                err,
                "Lấy người dùng theo ID",
                500,
                "Lỗi máy chủ"
            );
        }
    }

    async getUserByName(req: Request, res: Response) {
        try {
            const { userName } = req.body;
            const users = await this.userService.getUserByName(userName as string);
            res.json({ message: "Lấy người dùng theo tên thành công", data: users });
        } catch (err) {
            return handleError(
                res,
                err,
                "Lấy người dùng theo tên",
                500,
                "Lỗi máy chủ"
            );
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await this.userService.getUserByEmail(email as string);
            if (!user)
                return res.status(404).json({ message: "Không tìm thấy người dùng" });
            res.json({ message: "Lấy người dùng theo email thành công", data: user });
        } catch (err) {
            return handleError(
                res,
                err,
                "Lấy người dùng theo email",
                500,
                "Lỗi máy chủ"
            );
        }
    }

    async getAllUser(req: Request, res: Response) {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const take = parseInt(req.query.take as string) || 0;
            const users = await this.userService.getAllUser(skip, take);
            res.json({ message: "Lấy danh sách người dùng thành công", data: users });
        } catch (err) {
            return handleError(res, err, "Lấy tất cả người dùng", 500, "Lỗi máy chủ");
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            res
                .status(201)
                .json({ message: "Tạo người dùng thành công", data: user });
        } catch (err) {
            return handleError(
                res,
                err,
                "Tạo người dùng",
                400,
                "Tạo người dùng thất bại"
            );
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await this.userService.updateUser(req.body, userId);
            res.json({ message: "Cập nhật người dùng thành công", data: user });
        } catch (err) {
            return handleError(
                res,
                err,
                "Cập nhật người dùng",
                400,
                "Cập nhật người dùng thất bại"
            );
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const result = await this.userService.deleteUser(userId);
            res.json({ message: "Xóa người dùng thành công", data: result });
        } catch (err) {
            return handleError(
                res,
                err,
                "xóa người dùng",
                400,
                "Xóa người dùng thất bại"
            );
        }
    }

    async changePasswordUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { newPassword } = req.body;
            const user = await this.userService.changePasswordUser(userId, newPassword);
            res.json({ message: "Đổi mật khẩu thành công", data: user });
        } catch (err) {
            return handleError(
                res,
                err,
                "Đổi mật khẩu người dùng",
                400,
                "Đổi mật khẩu thất bại"
            );
        }
    }
}

export default UserController;