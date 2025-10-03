-- CreateTable
CREATE TABLE "KhoaHoc" (
    "KhoaHocId" SERIAL NOT NULL,
    "TenKhoaHoc" TEXT NOT NULL,
    "MoTa" TEXT,
    "Gia" DOUBLE PRECISION NOT NULL,
    "VideoUrl" TEXT,
    "HinhAnh" TEXT,

    CONSTRAINT "KhoaHoc_pkey" PRIMARY KEY ("KhoaHocId")
);

-- CreateTable
CREATE TABLE "BaiHoc" (
    "BaiHocId" SERIAL NOT NULL,
    "TieuDe" TEXT NOT NULL,
    "NoiDung" TEXT,
    "VideoUrl" TEXT,
    "HinhAnh" TEXT,
    "KhoaHocId" INTEGER NOT NULL,

    CONSTRAINT "BaiHoc_pkey" PRIMARY KEY ("BaiHocId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleClaim" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "claim" TEXT NOT NULL,

    CONSTRAINT "RoleClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CT_NguoiDung_KhoaHoc" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "khoaHocId" INTEGER NOT NULL,
    "ngayCapNhat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CT_NguoiDung_KhoaHoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CT_NguoiDung_BaiHoc" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "baiHocId" INTEGER NOT NULL,
    "ngayCapNhat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CT_NguoiDung_BaiHoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CauHoiGame" (
    "id" SERIAL NOT NULL,
    "noiDung" TEXT NOT NULL,
    "dapAn" TEXT NOT NULL,
    "capDo" TEXT,
    "chuDe" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CauHoiGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LichSuChoiGame" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cauHoiId" INTEGER NOT NULL,
    "dapAnNguoiDung" TEXT NOT NULL,
    "dung" BOOLEAN NOT NULL,
    "thoiGianTraLoi" INTEGER NOT NULL,
    "thoiGian" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LichSuChoiGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleClaim_roleId_claim_key" ON "RoleClaim"("roleId", "claim");

-- CreateIndex
CREATE UNIQUE INDEX "CT_NguoiDung_KhoaHoc_userId_khoaHocId_key" ON "CT_NguoiDung_KhoaHoc"("userId", "khoaHocId");

-- CreateIndex
CREATE UNIQUE INDEX "CT_NguoiDung_BaiHoc_userId_baiHocId_key" ON "CT_NguoiDung_BaiHoc"("userId", "baiHocId");

-- AddForeignKey
ALTER TABLE "BaiHoc" ADD CONSTRAINT "BaiHoc_KhoaHocId_fkey" FOREIGN KEY ("KhoaHocId") REFERENCES "KhoaHoc"("KhoaHocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleClaim" ADD CONSTRAINT "RoleClaim_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CT_NguoiDung_KhoaHoc" ADD CONSTRAINT "CT_NguoiDung_KhoaHoc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CT_NguoiDung_KhoaHoc" ADD CONSTRAINT "CT_NguoiDung_KhoaHoc_khoaHocId_fkey" FOREIGN KEY ("khoaHocId") REFERENCES "KhoaHoc"("KhoaHocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CT_NguoiDung_BaiHoc" ADD CONSTRAINT "CT_NguoiDung_BaiHoc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CT_NguoiDung_BaiHoc" ADD CONSTRAINT "CT_NguoiDung_BaiHoc_baiHocId_fkey" FOREIGN KEY ("baiHocId") REFERENCES "BaiHoc"("BaiHocId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuChoiGame" ADD CONSTRAINT "LichSuChoiGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichSuChoiGame" ADD CONSTRAINT "LichSuChoiGame_cauHoiId_fkey" FOREIGN KEY ("cauHoiId") REFERENCES "CauHoiGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
