import Prisma from "../configs/prismaClient";
import { UserRoles, Permissions, RolePermissions } from "../constants/roles";
import { Gender } from "@prisma/client";
import argon2 from "argon2";

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
    for (const roleName of Object.values(UserRoles)) {
      const role = await Prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName },
      });

      console.log(`✅ Role "${roleName}" đã được tạo/cập nhật`);

      const permissions = RolePermissions[roleName as UserRoles];

      await Prisma.roleClaim.deleteMany({
        where: { roleId: role.roleId },
      });

      for (const permission of permissions) {
        await Prisma.roleClaim.create({
          data: {
            roleId: role.roleId,
            permission: permission,
            claimType: "permission",
            claimValue: permission,
          },
        });
      }
      console.log(
        `   ↳ ${permissions.length} permissions đã được gán cho ${roleName}`
      );
    }

    console.log("\n✅ Hoàn tất seed roles và permissions!");
    console.log("\n📋 Tóm tắt:");
    console.log(
      `   - ADMIN: ${RolePermissions[UserRoles.ADMIN].length} permissions`
    );
    console.log(
      `   - USER: ${RolePermissions[UserRoles.USER].length} permissions`
    );

    console.log("\n👤 Tạo tài khoản ADMIN...");

    const adminRole = await Prisma.role.findUnique({
      where: { name: UserRoles.ADMIN },
    });

    if (!adminRole) {
      throw new Error("Không tìm thấy role ADMIN");
    }

    for (const adminData of ADMIN_ACCOUNTS) {
      const existingUser = await Prisma.user.findUnique({
        where: { email: adminData.email },
      });

      if (existingUser) {
        console.log(`   ⚠️  ${adminData.email} đã tồn tại, bỏ qua...`);
        continue;
      }

      const hashedPassword = await argon2.hash(adminData.password);

      const user = await Prisma.user.create({
        data: {
          userName: adminData.userName,
          email: adminData.email,
          password: hashedPassword,
          gender: adminData.gender,
        },
      });

      await Prisma.userRole.create({
        data: {
          userId: user.userId,
          roleId: adminRole.roleId,
        },
      });

      console.log(
        `   ✅ Tạo ADMIN: ${adminData.email} (password: ${adminData.password})`
      );
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
