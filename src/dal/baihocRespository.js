const { PrismaClient } = require("../generated/prisma");

class BaiHocRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getBaiHocId(id) {
    try {
      if (!id) throw new Error("Thiếu ID");
      return await this.prisma.baiHoc.findUnique({
        where: { BaiHocId: parseInt(id) },
      });
    } catch (err) {
      throw new Error("Không tìm thấy bài học");
    }
  }

  async getBaiHocByName(name) {
    return await this.prisma.baiHoc.findFirst({
      where: {
        TieuDe: name,
      },
    });
  }

  async getAllBaiHoc() {
    return await this.prisma.baiHoc.findMany({
      include: {
        KhoaHoc: true, // Trả thêm thông tin khóa học
      },
    });
  }

  async createBaiHoc(baihocData) {
    return await this.prisma.baiHoc.create({
      data: {
        TieuDe: baihocData.TieuDe,
        NoiDung: baihocData.NoiDung,
        KhoaHocId: baihocData.KhoaHocId,
        HinhAnh: baihocData.Anh || null,
        VideoUrl: baihocData.VideoUrl || null,
      },
    });
  }

  async updateBaiHoc(baihocData) {
    return await this.prisma.baiHoc.update({
      where: {
        BaiHocId: Number(baihocData.BaiHocId),
      },
      data: {
        TieuDe: baihocData.TieuDe,
        NoiDung: baihocData.NoiDung,
        KhoaHocId: baihocData.KhoaHocId,
        HinhAnh: baihocData.Anh || null,
        VideoUrl: baihocData.VideoUrl || null,
      },
    });
  }

  async deleteBaiHoc(baihocId) {
    return await this.prisma.baiHoc.delete({
      where: { BaiHocId: parseInt(baihocId) },
    });
  }
}

module.exports = new BaiHocRepository();
