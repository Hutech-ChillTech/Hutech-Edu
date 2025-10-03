// Kiểm tra ID hợp lệ
function validateId(id, fieldName = "ID") {
  const errors = [];
  const parsed = parseInt(id);

  if (!id) {
    errors.push(`${fieldName} không được bỏ trống`);
  } else if (isNaN(parsed) || parsed <= 0) {
    errors.push(`${fieldName} phải là số nguyên dương`);
  }

  return errors;
}

// Kiểm tra dữ liệu câu hỏi
function validateCauHoiData(data) {
  const errors = [];

  if (!data.noiDung || data.noiDung.trim() === "") {
    errors.push("Nội dung câu hỏi không được bỏ trống");
  }

  if (!data.dapAn || data.dapAn.trim() === "") {
    errors.push("Đáp án không được bỏ trống");
  }

  return errors;
}

module.exports = {
  validateId,
  validateCauHoiData,
};
