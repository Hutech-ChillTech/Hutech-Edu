const baiHocRepo = require("../dal/baihocRespository");

class BaiHocService {
  async getBaiHocById(baihocId) {
    const baihoc = await baiHocRepo.getBaiHocId(baihocId);
    if (!baihoc) {
      throw new Error("Bài học này chưa có");
    }
    return baihoc;
  }

  async getBaiHocAll() {
    const baihocs = await baiHocRepo.getAllBaiHoc();
    if (!baihocs || baihocs.length === 0) {
      throw new Error("Hiện tại chưa có bài học");
    }
    return baihocs;
  }

  async createBaiHoc(baihocData) {
    const existing = await baiHocRepo.getBaiHocByName(baihocData.TieuDe);
    if (existing) {
      throw new Error("Bài học đã tồn tại");
    }

    return await baiHocRepo.createBaiHoc({
      TieuDe: baihocData.TieuDe,
      NoiDung: baihocData.NoiDung,
      KhoaHocId: baihocData.KhoaHocId,
      Anh: baihocData.HinhAnh || null, // Lưu ý: DAL dùng key `Anh`, không phải `HinhAnh`
      VideoUrl: baihocData.VideoUrl || null,
    });
  }

  async updateBaiHoc(baihocData) {
    const existing = await baiHocRepo.getBaiHocId(baihocData.BaiHocId);
    if (!existing) {
      throw new Error("Không tìm thấy bài học để cập nhật");
    }

    return await baiHocRepo.updateBaiHoc({
      BaiHocId: baihocData.BaiHocId,
      TieuDe: baihocData.TieuDe,
      NoiDung: baihocData.NoiDung,
      KhoaHocId: baihocData.KhoaHocId,
      Anh: baihocData.HinhAnh || null, // Lưu ý dùng đúng key cho DAL
      VideoUrl: baihocData.VideoUrl || null,
    });
  }

  async deleteBaiHoc(baihocId) {
    const existing = await baiHocRepo.getBaiHocId(baihocId);
    if (!existing) {
      throw new Error("Không tìm thấy bài học để xóa");
    }
    return await baiHocRepo.deleteBaiHoc(baihocId);
  }
}

module.exports = new BaiHocService();
