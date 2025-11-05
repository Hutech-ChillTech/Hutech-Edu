import Prisma from "../configs/prismaClient";
import { UserRoles, RolePermissions } from "../constants/roles";
import { Gender } from "@prisma/client";
import argon2 from "argon2";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

// Khởi tạo Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require("../configs/skillcoder-b2fac-firebase-adminsdk-fbsvc-35333b9125.json")
    ),
  });
}

const ADMIN_ACCOUNTS = [
  {
    userName: "admin1",
    email: "admin1@hutech.edu.vn",
    password: "Admin@123",
    gender: Gender.MALE,
  },
  {
    userName: "admin2",
    email: "admin2@hutech.edu.vn",
    password: "Admin@123",
    gender: Gender.FEMALE,
  },
  {
    userName: "admin3",
    email: "admin3@hutech.edu.vn",
    password: "Admin@123",
    gender: Gender.MALE,
  },
];

async function seedRoles() {
  console.log("🌱 Bắt đầu seed roles và permissions...");

  try {
    // 1️⃣ Tạo/cập nhật các roles
    for (const roleName of Object.values(UserRoles)) {
      const role = await Prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName },
      });

      const permissions = RolePermissions[roleName as UserRoles];

      await Prisma.roleClaim.deleteMany({
        where: { roleId: role.roleId },
      });

      for (const permission of permissions) {
        await Prisma.roleClaim.create({
          data: {
            roleId: role.roleId,
            permission,
            claimType: "permission",
            claimValue: permission,
          },
        });
      }

      console.log(`✅ Role "${roleName}" đã được cập nhật`);
    }

    // 2️⃣ Tạo các tài khoản ADMIN
    const adminRole = await Prisma.role.findUnique({
      where: { name: UserRoles.ADMIN },
    });
    if (!adminRole) throw new Error("Không tìm thấy role ADMIN");

    for (const adminData of ADMIN_ACCOUNTS) {
      const existingUser = await Prisma.user.findUnique({
        where: { email: adminData.email },
      });
      if (existingUser) {
        console.log(`⚠️ ${adminData.email} đã tồn tại, bỏ qua...`);
        continue;
      }

      // 🔹 Tạo tài khoản trong Firebase
      let firebaseUser;
      try {
        firebaseUser = await admin.auth().createUser({
          email: adminData.email,
          password: adminData.password,
          displayName: adminData.userName,
        });
        console.log(`✅ Firebase user tạo thành công: ${firebaseUser.uid}`);
      } catch (error: any) {
        if (error.code === "auth/email-already-exists") {
          firebaseUser = await admin.auth().getUserByEmail(adminData.email);
          console.log(`⚠️ Firebase user đã tồn tại: ${firebaseUser.uid}`);
        } else {
          throw error;
        }
      }

      // 🔹 Hash password để lưu vào DB
      const hashedPassword = await argon2.hash(adminData.password);

      // 🔹 Tạo user trong PostgreSQL (qua Prisma)
      const user = await Prisma.user.create({
        data: {
          userName: adminData.userName,
          email: adminData.email,
          password: hashedPassword,
          gender: adminData.gender,
          firebaseUid: firebaseUser.uid,
        },
      });

      // 🔹 Gán role ADMIN
      await Prisma.userRole.create({
        data: {
          userId: user.userId,
          roleId: adminRole.roleId,
        },
      });

      console.log(`👑 Tạo ADMIN: ${adminData.email}`);
    }

    console.log("\n🎉 Hoàn tất seed database!");
  } catch (error) {
    console.error("❌ Lỗi khi seed roles:", error);
    throw error;
  } finally {
    await Prisma.$disconnect();
  }
}

seedRoles().catch((error) => {
  console.error(error);
  process.exit(1);
});
