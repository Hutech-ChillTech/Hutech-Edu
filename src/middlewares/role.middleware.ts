import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/customRequest";
import Prisma from "../configs/prismaClient";
import { UserRoles, Permissions } from "../constants/roles";
import { sendUnauthorized } from "../utils/responseHelper";

/*
 * Middleware kiểm tra user có role cụ thể không
 */
export const requirePermission = (permissions: Permissions[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const roleId = req.user?.roleId;

    if (!roleId) {
      sendUnauthorized(res, "Không tìm thấy vai trò của người dùng");
      return;
    }

    // Lấy danh sách quyền từ RoleClaim
    const roleClaims = await Prisma.roleClaim.findMany({
      where: { roleId },
      select: { permission: true }
    });

    const userPermissions = roleClaims.map(rc => rc.permission);

    const hasPermission = userPermissions.some((p) =>
      permissions.includes(p as Permissions)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - You don't have required permission",
        requiredPermissions: permissions,
        yourPermissions: userPermissions,
      });
    }

    next();
   };
};



/**
 * Middleware kiểm tra user có TẤT CẢ permissions yêu cầu không
 */
// export const requireAllPermissions = (permissions: Permissions[]) => {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - Please login first",
//       });
//     }

//     // Kiểm tra user có ĐỦ TẤT CẢ permissions không
//     const hasAllPermissions = permissions.every((permission) =>
//       req.user!.permissions.includes(permission)
//     );

//     if (!hasAllPermissions) {
//       const missingPermissions = permissions.filter(
//         (permission) => !req.user!.permissions.includes(permission)
//       );

//       return res.status(403).json({
//         success: false,
//         message: "Forbidden - Missing required permissions",
//         missingPermissions,
//       });
//     }

//     next();
//   };
// };

// /**
//  * Middleware kiểm tra user là owner của resource hoặc là Admin
//  */
export const requireOwnerOrAdmin = (
  getUserIdFromRequest: (req: AuthRequest) => string
) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }

    const targetUserId = getUserIdFromRequest(req);
    const isOwner = req.user.userId === targetUserId;
    const isAdmin = req.user.roleId.includes(UserRoles.ADMIN);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - You can only access your own resources",
      });
    }

    next();
  };
};

/**
 * Middleware kiểm tra user là creator của course hoặc là Admin
 * Dùng cho Course, Chapter, Lesson management
 */
export const requireCourseOwnerOrAdmin = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login first",
      });
    }

    // Admin có full access
    if (req.user.roleId.includes(UserRoles.ADMIN)) {
      return next();
    }

    // Kiểm tra creator từ body (khi tạo mới)
    if (req.body.createdBy) {
      if (req.user.userId !== req.body.createdBy) {
        return res.status(403).json({
          success: false,
          message: "Forbidden - You can only create courses for yourself",
        });
      }
      return next();
    }

    // Với update/delete, cần check trong DB (implement sau)
    next();
  };
};
