function validateKhoaHocData(data) {
  const errors = [];

  if (
    !data.TenKhoaHoc ||
    typeof data.TenKhoaHoc !== "string" ||
    data.TenKhoaHoc.trim() === ""
  ) {
    errors.push("Tên khóa học không được để trống");
  }

  if (data.MoTa && typeof data.MoTa !== "string") {
    errors.push("Mô tả phải là chuỗi");
  }

  if (
    data.Gia === undefined ||
    data.Gia === null ||
    isNaN(Number(data.Gia)) ||
    Number(data.Gia) < 0
  ) {
    errors.push("Giá khóa học phải là số không âm");
  }

  return errors;
}

function validateKhoaHocId(id) {
  const errors = [];

  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    errors.push("KhoaHocId không hợp lệ");
  }

  return errors;
}

function validateKhoaHocName(name) {
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Tên khóa học không hợp lệ");
  }

  return errors;
}

module.exports = {
  validateKhoaHocData,
  validateKhoaHocId,
  validateKhoaHocName,
};
