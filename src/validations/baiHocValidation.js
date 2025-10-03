// validations/baiHocValidation.js

function validateBaiHocData(data) {
  const errors = [];

  if (
    !data.TieuDe ||
    typeof data.TieuDe !== "string" ||
    data.TieuDe.trim() === ""
  ) {
    errors.push("Tiêu đề không được để trống");
  }

  if (
    !data.NoiDung ||
    typeof data.NoiDung !== "string" ||
    data.NoiDung.trim() === ""
  ) {
    errors.push("Nội dung không được để trống");
  }

  if (!data.KhoaHocId || isNaN(parseInt(data.KhoaHocId))) {
    errors.push("KhoaHocId không hợp lệ");
  }

  return errors;
}

function validateId(id, name = "ID") {
  if (!id || isNaN(parseInt(id))) {
    return [`${name} không hợp lệ`];
  }
  return [];
}

module.exports = {
  validateBaiHocData,
  validateId,
};
