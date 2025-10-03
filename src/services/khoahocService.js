const khoaHocRepo = require("../dal/khoahocRespository");

class KhoaHocService {
  async getKhoaHocById(khoahocId) {
    const khoahoc = await khoaHocRepo.getKhoaHocById(khoahocId);
    if (!khoahoc) {
      throw new Error("Khóa học này không có");
    }
    return khoahoc;
  }

  async getKhoaHocAll() {
    const khoahoc = await khoaHocRepo.getKhoaHocAll();
    if (!khoahoc || khoahoc.length === 0) {
      throw new Error("Hiện tại không có khóa học");
    }
    return khoahoc;
  }

  async createKhoaHoc(khoahocData) {
    const existing = await khoaHocRepo.getKhoaHocByName(khoahocData.TenKhoaHoc);
    if (existing) {
      throw new Error("Khóa học đã tồn tại");
    }
    return await khoaHocRepo.createKhoaHoc(khoahocData);
  }

  async updateKhoaHoc(khoahocData) {
    const existing = await khoaHocRepo.getKhoaHocById(khoahocData.KhoaHocId);
    if (!existing) {
      throw new Error("Không tìm thấy khóa học để cập nhật");
    }
    return await khoaHocRepo.updateKhoaHoc(khoahocData);
  }

  async deleteKhoaHoc(khoahocId) {
    const existing = await khoaHocRepo.getKhoaHocById(khoahocId);
    if (!existing) {
      throw new Error("Không tìm thấy khóa học để xóa");
    }
    return await khoaHocRepo.deleteKhoaHoc(khoahocId);
  }
}

module.exports = new KhoaHocService();
