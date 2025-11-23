import { Request, Response, NextFunction } from "express";
import {AuthRequest} from "../types/customRequest";
import { sendError, sendForbidden } from "../utils/responseHelper";

/**
 * Middleware: Phân quyền
 * Nếu `requiredRoles` rỗng => mọi role đều được qua
 * Nếu có => role user phải nằm trong danh sách
 */
export const verifyRole = (requiredRoles: string[] = []) => {
    return async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const roleName = req.user?.roleName;

            if (!roleName) {
                sendForbidden(
                    res,
                    "Vai trò tài khoản không hợp lệ. Vui lòng liên hệ quản trị viên."
                );
                return;
            }

            if (requiredRoles.length > 0 && !requiredRoles.includes(roleName)) {
                sendForbidden(res);
                return;
            }
            
            return next();
        } catch (error) {
            sendError(res);
            return;
        }
    };
};