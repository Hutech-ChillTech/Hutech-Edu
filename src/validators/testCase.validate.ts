import Joi from "joi";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const createTestCaseSchema = Joi.object({
  lessonId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.pattern.base": "lessonId không hợp lệ (phải là UUID hợp lệ)",
      "any.required": "lessonId là bắt buộc",
    }),

  description: Joi.string()
    .required() // Vẫn bắt buộc có mô tả để admin dễ quản lý
    .max(255)
    .messages({
      "string.empty": "Mô tả không được để trống",
      "string.max": "Mô tả không được vượt quá 255 ký tự",
      "any.required": "Mô tả là bắt buộc",
    }),

  // 1. Cấu hình cho bài thuật toán (Algorithm)
  input: Joi.string()
    .optional()
    .allow(null, "") // Cho phép null hoặc rỗng nếu là bài HTML
    .max(2000) // Tăng lên chút vì input mảng/object có thể dài
    .messages({
      "string.max": "Input quá dài (tối đa 2000 ký tự)",
    }),

  expectedOutput: Joi.string()
    .optional()
    .allow(null, "")
    .max(2000)
    .messages({
      "string.max": "Expected output quá dài (tối đa 2000 ký tự)",
    }),

  // 2. Cấu hình cho bài HTML/CSS/JS DOM (Mới thêm)
  testCode: Joi.string()
    .optional()
    .allow(null, "")
    .messages({
      "string.base": "Test code phải là chuỗi ký tự",
    }),
})
  .custom((value, helpers) => {
    // Check if input and expectedOutput are present (not null/undefined), allowing empty strings
    const hasAlgoData =
      value.input !== undefined &&
      value.input !== null &&
      value.expectedOutput !== undefined &&
      value.expectedOutput !== null;

    // Check if testCode is present (not null/undefined), allowing empty strings
    const hasDomData = value.testCode !== undefined && value.testCode !== null;

    if (!hasAlgoData && !hasDomData) {
      return helpers.message(
        "Phải cung cấp dữ liệu kiểm thử: Hoặc (Input/Output) cho thuật toán, Hoặc (Test Code) cho HTML/CSS" as any
      );
    }
    return value;
  });

export const updateTestCaseSchema = Joi.object({
  testCaseId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.pattern.base": "testCaseId không hợp lệ (phải là UUID hợp lệ)",
      "any.required": "testCaseId là bắt buộc",
    }),

  description: Joi.string().max(255).optional().allow(null, "").messages({
    "string.max": "Mô tả không được vượt quá 255 ký tự",
  }),

  input: Joi.string().max(2000).optional().allow(null, "").messages({
    "string.max": "Input quá dài",
  }),

  expectedOutput: Joi.string().max(2000).optional().allow(null, "").messages({
    "string.max": "Expected output quá dài",
  }),

  testCode: Joi.string().optional().allow(null, ""),
});