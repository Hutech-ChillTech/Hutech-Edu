const cauhoiService = require("../services/cauhoiService.js");
const {
  validateId,
  validateCauHoiData,
} = require("../validations/cauHoiValidation.js");

class CauHoiController {
  timkiem(req, res) {
    const slug = req.params.slug;
    res.send(`🔍 Bạn đang tìm câu hỏi: ${slug}`);
  }

  async getAllCauHoi(req, res) {
    try {
      const result = await cauhoiService.getAllCauHoi();
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách câu hỏi:", error);
      res.status(500).json({ error: "Lỗi truy vấn dữ liệu câu hỏi" });
    }
  }

  async getCauHoiById(req, res) {
    const id = req.params.id;
    const errors = validateId(id, "CauHoiId");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await cauhoiService.getCauHoiById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createCauHoi(req, res) {
    const { noiDung, dapAn, capDo, chuDe } = req.body;
    console.log("📦 Dữ liệu tạo câu hỏi:", req.body);

    const errors = validateCauHoiData({ noiDung, dapAn });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await cauhoiService.createCauHoi({
        noiDung,
        dapAn,
        capDo: capDo || null,
        chuDe: chuDe || null,
      });

      res.status(201).json({
        message: "✅ Tạo câu hỏi thành công",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCauHoi(req, res) {
    const id = req.params.id;
    const { noiDung, dapAn, capDo, chuDe } = req.body;

    const idErrors = validateId(id, "CauHoiId");
    const dataErrors = validateCauHoiData({ noiDung, dapAn });
    const allErrors = [...idErrors, ...dataErrors];

    if (allErrors.length > 0) {
      return res.status(400).json({ error: allErrors.join(", ") });
    }

    try {
      const result = await cauhoiService.updateCauHoi({
        id,
        noiDung,
        dapAn,
        capDo: capDo || null,
        chuDe: chuDe || null,
      });

      res.status(200).json({
        message: "✅ Cập nhật câu hỏi thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteCauHoi(req, res) {
    const id = req.params.id;
    const errors = validateId(id, "CauHoiId");

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    try {
      const result = await cauhoiService.deleteCauHoi(id);
      res.status(200).json({
        message: "🗑️ Xóa câu hỏi thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CauHoiController();
