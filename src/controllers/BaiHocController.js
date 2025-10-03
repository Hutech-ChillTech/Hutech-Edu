const baihocService = require("../services/baihocService.js");
const {
  validateBaiHocData,
  validateId,
} = require("../validations/baiHocValidation.js");

class BaiHocController {
  // Tìm kiếm đơn giản
  timkiem(req, res) {
    const slug = req.params.slug;
    res.send(`🔍 Bạn đang tìm kiếm: ${slug}`);
  }

  // Lấy tất cả bài học
  async getAllBaiHoc(req, res) {
    try {
      const result = await baihocService.getBaiHocAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ Lỗi khi lấy tất cả bài học:", error);
      res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
    }
  }

  // Lấy bài học theo ID
  async getBaiHocId(req, res) {
    const baihocId = req.params.id;
    const errors = validateId(baihocId, "BaiHocId");
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await baihocService.getBaiHocById(baihocId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Tạo bài học mới
  async createBaiHoc(req, res) {
    const { TieuDe, NoiDung, KhoaHocId, VideoUrl, HinhAnh } = req.body;
    console.log("📦 Dữ liệu nhận được từ client:", req.body);

    const errors = validateBaiHocData({ TieuDe, NoiDung, KhoaHocId });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await baihocService.createBaiHoc({
        TieuDe,
        NoiDung,
        KhoaHocId,
        VideoUrl: VideoUrl || null,
        HinhAnh: HinhAnh || null,
      });

      res.status(201).json({
        message: "✅ Tạo bài học thành công",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Cập nhật bài học
  async updateBaiHoc(req, res) {
    const BaiHocId = req.params.id;
    const { TieuDe, NoiDung, KhoaHocId, VideoUrl, HinhAnh } = req.body;

    const idErrors = validateId(BaiHocId, "BaiHocId");
    const dataErrors = validateBaiHocData({ TieuDe, NoiDung, KhoaHocId });
    const allErrors = [...idErrors, ...dataErrors];

    if (allErrors.length > 0) {
      return res.status(400).json({ error: allErrors.join(", ") });
    }

    try {
      const result = await baihocService.updateBaiHoc({
        BaiHocId,
        TieuDe,
        NoiDung,
        KhoaHocId,
        VideoUrl: VideoUrl || null,
        HinhAnh: HinhAnh || null,
      });

      res.status(200).json({
        message: "✅ Cập nhật bài học thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Xóa bài học
  async deleteBaiHoc(req, res) {
    const BaiHocId = req.params.id;
    const errors = validateId(BaiHocId, "BaiHocId");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await baihocService.deleteBaiHoc(BaiHocId);
      res.status(200).json({
        message: "🗑️ Xóa bài học thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new BaiHocController();
