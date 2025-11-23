import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";
import UserService from "../services/user.service";
import jwt from "jsonwebtoken";
import { sendCreated, sendNotFound, sendSuccess } from "../utils/responseHelper";
import createHttpError from "http-errors";

class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Đăng nhập
  async login (req: Request, res:Response, next: NextFunction){
    try {
      const {email, password} = req.body;

      if(!email || !password){
        throw createHttpError(404, 'Người dùng chưa cung cấp đủ email hoặc password');
      }

      const result = await this.userService.loginWithEmail(email, password);
      console.log(result);
      sendSuccess(res, result, 'Đăng nhập thành công');
    } catch (error) {
      console.log("[User] Error logging into system: ", error);
      return next(error);
    }
  }


  // Đăng ký
  async register (req: Request, res: Response, next: NextFunction){
      try {
        const data = req.body;
        
        const user = await this.userService.register(data);

        sendCreated(res, user, 'Đăng ký thành công');
      } catch (error) {
        return next(error);
      }
  }

  async getUserByUid(req: Request, res: Response, next: NextFunction){
    try {
      const {uid} = req.params;
      const user = await this.userService.getUserByUid(uid);

      if(!user){
        sendNotFound(res);
        return;
      }
      sendSuccess(res, user, "Lấy người dùng theo UID thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID 1" });
      }

      const user = await this.userService.getUserById(userId);
      if (!user) {
        sendNotFound(res, "Không tìm thấy thông tin người dùng.");
        return;
      }

      sendSuccess(res, user, "Lấy người dùng theo ID thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName } = req.query;
      if (!userName) {
        return res.status(400).json({ message: "Thiếu tham số userName" });
      }
      const users = await this.userService.getUserByName(userName as string);
      sendSuccess(res, users, "Lấy người dùng theo tên thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async searchUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      if (!search) {
        return res.status(400).json({ message: "Thiếu tham số search" });
      }
      const users = await this.userService.searchUserByName(search as string);
      sendSuccess(res, users, "Tìm kiếm người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "Thiếu tham số email" });
      }
      const user = await this.userService.getUserByEmail(email as string);
      if (!user) {
        sendNotFound(res, "Không tìm thấy người dùng theo Email này.");
        return;
      }
      sendSuccess(res, user, "Lấy người dùng theo Email thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const take = parseInt(req.query.take as string) || 0;
      const users = await this.userService.getAllUser(skip, take);
      sendSuccess(res, users, "Lấy tất cả thông tin người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const user = await this.userService.createUser(data);
      sendSuccess(res, user, "Thêm mới người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const fileAvatar = req.file;
      const { userId } = req.params;

      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID 2" });
      }

      if(!fileAvatar){
        throw createHttpError(404, "Ảnh đại diện chưa được tải lên");
      }

      const data = req.body;

      const payloadUpdateUser = {
        ...data,
        avatarURL: fileAvatar.path
      }

      const user = await this.userService.updateUser(payloadUpdateUser, userId);
      
      sendSuccess(res, user, "Cập nhật thông tin người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  // user.controller.ts

async updateUserByUid(req: Request, res: Response, next: NextFunction) {
    try {
      const { uid } = req.params;
      const dataToUpdate = req.body; 

      const user = await this.userService.updateUserByUid(dataToUpdate, uid);
      
      sendSuccess(res, user, "Cập nhật thông tin người dùng thành công.");
    } catch (error) {
      return next(error);
    }
}

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID 3" });
      }
      const result = await this.userService.deleteUser(userId);
      sendSuccess(res, result, "Xóa thông tin người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async changePasswordUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID 4" });
      }
      const { newPassword } = req.body;
      const user = await this.userService.changePasswordUser(
        userId,
        newPassword
      );
      sendSuccess(res, user, "Thay đổi mật khẩu thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getUserWithRelations(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await this.userService.getUserWithRelations(userId);
      if (!user) {
        sendNotFound(res, "Không tìm thấy thông tin người dùng.");
        return;
      }
      sendSuccess(res, user, "Lấy thông tin chi tiết người dùng thành công.");
    } catch (error) {
      return next(error);
    }
  }

  async getUserEnrolledCourses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      if (!isUUID(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const courses = await this.userService.getUserEnrolledCourses(userId);
      sendSuccess(
        res,
        courses,
        "Lấy danh sách khóa học đã đăng ký thành công."
      );
    } catch (error) {
      return next(error);
    }
  }

  async checkEnrollment(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, courseId } = req.params;
      if (!isUUID(userId) || !isUUID(courseId)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const isEnrolled = await this.userService.isUserEnrolledInCourse(
        userId,
        courseId
      );
      sendSuccess(res, { isEnrolled }, "Kiểm tra enrollment thành công.");
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
