const cauHoiRepo = require("../dal/cauhoiRepository");

class CauHoiService {
  async getCauHoiById(id) {
    const cauHoi = await cauHoiRepo.getCauHoiById(id);
    if (!cauHoi) {
      throw new Error("Không tìm thấy câu hỏi");
    }
    return cauHoi;
  }

  async getAllCauHoi() {
    const cauHoiList = await cauHoiRepo.getAllCauHoi();
    if (!cauHoiList || cauHoiList.length === 0) {
      throw new Error("Chưa có câu hỏi nào trong hệ thống");
    }
    return cauHoiList;
  }

  async createCauHoi(data) {
    const existing = await cauHoiRepo.getCauHoiByNoiDung(data.noiDung);
    if (existing) {
      throw new Error("Câu hỏi đã tồn tại");
    }

    return await cauHoiRepo.createCauHoi({
      noiDung: data.noiDung,
      dapAn: data.dapAn,
      capDo: data.capDo || null,
      chuDe: data.chuDe || null,
    });
  }

  async updateCauHoi(data) {
    const existing = await cauHoiRepo.getCauHoiById(data.id);
    if (!existing) {
      throw new Error("Không tìm thấy câu hỏi để cập nhật");
    }

    return await cauHoiRepo.updateCauHoi({
      id: data.id,
      noiDung: data.noiDung,
      dapAn: data.dapAn,
      capDo: data.capDo || null,
      chuDe: data.chuDe || null,
    });
  }

  async deleteCauHoi(id) {
    const existing = await cauHoiRepo.getCauHoiById(id);
    if (!existing) {
      throw new Error("Không tìm thấy câu hỏi để xoá");
    }
    return await cauHoiRepo.deleteCauHoi(id);
  }
}

module.exports = new CauHoiService();
