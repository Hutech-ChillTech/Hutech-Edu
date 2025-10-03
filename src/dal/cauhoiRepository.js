const { PrismaClient } = require("../generated/prisma");

class CauHoiRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getCauHoiById(id) {
    try {
      if (!id) throw new Error("Thiếu ID");
      return await this.prisma.cauHoiGame.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      throw new Error("Không tìm thấy câu hỏi");
    }
  }

  async getCauHoiByNoiDung(noiDung) {
    return await this.prisma.cauHoiGame.findFirst({
      where: {
        noiDung: noiDung,
      },
    });
  }

  async getAllCauHoi() {
    return await this.prisma.cauHoiGame.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createCauHoi(data) {
    return await this.prisma.cauHoiGame.create({
      data: {
        noiDung: data.noiDung,
        dapAn: data.dapAn,
        capDo: data.capDo || null,
        chuDe: data.chuDe || null,
      },
    });
  }

  async updateCauHoi(data) {
    return await this.prisma.cauHoiGame.update({
      where: {
        id: Number(data.id),
      },
      data: {
        noiDung: data.noiDung,
        dapAn: data.dapAn,
        capDo: data.capDo || null,
        chuDe: data.chuDe || null,
      },
    });
  }

  async deleteCauHoi(id) {
    return await this.prisma.cauHoiGame.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new CauHoiRepository();
