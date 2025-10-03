const { PrismaClient } = require("../generated/prisma/client");

class KhoaHocRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getKhoaHocById(id) {
    try {
      if (!id) throw new Error("Thiếu ID");
      return await this.prisma.khoaHoc.findUnique({
        where: { KhoaHocId: parseInt(id) },
      });
    } catch (err) {
      throw new Error("Không tìm thấy khóa học");
    }
  }

  async getKhoaHocByName(name) {
    return await this.prisma.khoaHoc.findFirst({
      where: {
        TenKhoaHoc: name,
      },
    });
  }

  async getKhoaHocAll() {
    return await this.prisma.khoaHoc.findMany();
  }

  async createKhoaHoc(khoahocData) {
    return await this.prisma.khoaHoc.create({
      data: khoahocData,
    });
  }

  async updateKhoaHoc(khoahocData) {
    return await this.prisma.khoaHoc.update({
      where: {
        KhoaHocId: Number(khoahocData.KhoaHocId),
      },
      data: {
        TenKhoaHoc: khoahocData.TenKhoaHoc,
        MoTa: khoahocData.MoTa ?? null,
        Gia: khoahocData.Gia,
      },
    });
  }

  async deleteKhoaHoc(khoahocId) {
    return await this.prisma.khoaHoc.delete({
      where: { KhoaHocId: parseInt(khoahocId) },
    });
  }
}

module.exports = new KhoaHocRepository();
