const {
  validateId,
  validateCauHoiData,
} = require("../validations/cauHoiValidation");

// Kiểm tra ID trên param :id
function validateIdParam(req, res, next) {
  const { id } = req.params;
  const errors = validateId(id, "CauHoiId");

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }

  next();
}

// Validate khi tạo mới
function validateCreateCauHoi(req, res, next) {
  const { noiDung, dapAn } = req.body;

  const errors = validateCauHoiData({ noiDung, dapAn });
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }

  next();
}

// Validate khi cập nhật
function validateUpdateCauHoi(req, res, next) {
  const { id } = req.params;
  const { noiDung, dapAn } = req.body;

  const idErrors = validateId(id, "CauHoiId");
  const dataErrors = validateCauHoiData({ noiDung, dapAn });

  const allErrors = [...idErrors, ...dataErrors];
  if (allErrors.length > 0) {
    return res.status(400).json({ error: allErrors.join(", ") });
  }

  next();
}

module.exports = {
  validateIdParam,
  validateCreateCauHoi,
  validateUpdateCauHoi,
};
