import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/customRequest";
import Prisma from "../configs/prismaClient";
import admin from "../configs/firebaseAdminConfig";
import UserRepository from "../repositories/user.repository";
import RoleRepository from "../repositories/role.repository";
import UserRoleRepository from "../repositories/userRole.repository";

const userRepository = new UserRepository(Prisma, "userId");
const roleRepository = new RoleRepository(Prisma, "roleId");
const userRoleRepository = new UserRoleRepository(Prisma, "userRoleId");

import { sendNotFound, sendUnauthorized, sendForbidden } from "../utils/responseHelper";


export const verifyFirebaseToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            sendUnauthorized(res, "Token không hợp lệ hoặc không được cung cấp")
            return;
        }

        const idToken = authHeader.split("Bearer ")[1].trim();
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        if (!decodedToken || !decodedToken.uid) {
            sendUnauthorized(res, "ID Token không hợp lệ");
            return;
        }

        const profile = await userRepository.findUserByUidForSystem(decodedToken.uid);

        if (!profile) {
            sendNotFound(res, "Người dùng chưa đăng ký tài khoản");
            return;
        }

        const userId = profile.userId as any;

        const existingUserRole = await userRoleRepository.getRoleByUserId(profile.userId);

        if (!existingUserRole) {
            sendNotFound(res, 'Người dùng chưa đăng ký tài khoản');
            return;
        }

        const roleId = existingUserRole[0].roleId;

        const existingRole = await roleRepository.getById(roleId);

        if (!existingRole) {
            throw new Error('Hệ thông không có role này');
        }

        const roleName = existingRole.name;

        req.user = {
            userId,
            roleId,
            roleName
        }
        console.log("Request Body: ", req.body);
        console.log("Auth Request: ", req.user);

        return next();

    } catch (error) {
        console.error("❌ VerifyFirebaseToken error:", error);
        sendUnauthorized(res, "Token không hợp lệ hoặc hết hạn");
        return;
    }
}