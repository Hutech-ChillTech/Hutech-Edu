const khoahocService = require("../services/khoahocService.js");
const {
  validateKhoaHocData,
  validateKhoaHocId,
  validateKhoaHocName,
} = require("../validations/khoaHocValidation.js");

class KhoaHocController {
  // [GET] /khoahoc/timkiem/:slug - Tìm kiếm đơn giản theo tên
  timkiem(req, res) {
    const slug = req.params.slug;
    const errors = validateKhoaHocName(slug);

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    res.send(`🔍 Bạn đang tìm kiếm: ${slug}`);
  }

  // [GET] /khoahoc - Lấy tất cả khóa học
  async getAllKhoaHoc(req, res) {
    try {
      const result = await khoahocService.getKhoaHocAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ Lỗi khi lấy tất cả khóa học:", error);
      res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
    }
  }

  // [GET] /khoahoc/:id - Lấy khóa học theo ID
  async getKhoaHocById(req, res) {
    const id = req.params.id;
    const errors = validateKhoaHocId(id);

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await khoahocService.getKhoaHocById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // [POST] /khoahoc - Tạo khóa học mới
  async createKhoaHoc(req, res) {
    const { TenKhoaHoc, MoTa, Gia } = req.body;
    const errors = validateKhoaHocData({ TenKhoaHoc, MoTa, Gia });

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await khoahocService.createKhoaHoc({
        TenKhoaHoc,
        MoTa,
        Gia,
      });
      res.status(201).json({
        message: "✅ Tạo khóa học thành công",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // [PUT] /khoahoc/:id - Cập nhật khóa học
  async updateKhoaHoc(req, res) {
    const KhoaHocId = req.params.id;
    const { TenKhoaHoc, MoTa, Gia } = req.body;

    const idErrors = validateKhoaHocId(KhoaHocId);
    const dataErrors = validateKhoaHocData({ TenKhoaHoc, MoTa, Gia });
    const allErrors = [...idErrors, ...dataErrors];

    if (allErrors.length > 0) {
      return res.status(400).json({ error: allErrors.join(", ") });
    }

    try {
      const result = await khoahocService.updateKhoaHoc({
        KhoaHocId,
        TenKhoaHoc,
        MoTa,
        Gia,
      });

      res.status(200).json({
        message: "✅ Cập nhật khóa học thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // [DELETE] /khoahoc/:id - Xóa khóa học
  async deleteKhoaHoc(req, res) {
    const KhoaHocId = req.params.id;
    const errors = validateKhoaHocId(KhoaHocId);

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await khoahocService.deleteKhoaHoc(KhoaHocId);
      res.status(200).json({
        message: "🗑️ Xóa khóa học thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new KhoaHocController();
