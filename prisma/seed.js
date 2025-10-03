const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const rolesConfig = require("./rolesConfig");

async function main() {
  // 1. Tạo Role & Claim
  for (const [roleName, claims] of Object.entries(rolesConfig)) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });

    for (const claim of claims) {
      await prisma.roleClaim.upsert({
        where: {
          roleId_claim: {
            roleId: role.id,
            claim: claim,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          claim: claim,
        },
      });
    }
  }

  console.log("✅ Roles & Claims đã được seed.");

  // 2. Tạo tài khoản admin mặc định
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        fullname: "Super Admin",
        sex: "Nam",
        phonenumber: "0123456789",
        password: hashedPassword,
      },
    });

    // Tìm role "Admin"
    const adminRole = await prisma.role.findUnique({
      where: { name: "Admin" },
    });

    if (!adminRole) {
      console.error('❌ Không tìm thấy role "Admin". Kiểm tra rolesConfig.js!');
      return;
    }

    // 3. Gán role "Admin" cho user
    await prisma.userRole.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    });

    console.log("✅ Admin đã được tạo: admin@example.com / admin123");
  } else {
    console.log("ℹ️ Tài khoản admin đã tồn tại, bỏ qua.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
