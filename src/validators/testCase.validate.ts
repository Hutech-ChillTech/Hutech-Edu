import Joi from "joi";


const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


export const createTestCaseSchema = Joi.object({
  description: Joi.string()
    .required()
    .max(255)
    .messages({
      "string.empty": "Mô tả không được để trống",
      "string.max": "Mô tả không được vượt quá 255 ký tự",
      "any.required": "Mô tả là bắt buộc",
    }),

  input: Joi.string()
    .required()
    .max(500)
    .messages({
      "string.empty": "Input không được để trống",
      "string.max": "Input quá dài (tối đa 500 ký tự)",
      "any.required": "Input là bắt buộc",
    }),

  expectedOutput: Joi.string()
    .required()
    .max(500)
    .messages({
      "string.empty": "Expected output không được để trống",
      "string.max": "Expected output quá dài (tối đa 500 ký tự)",
      "any.required": "Expected output là bắt buộc",
    }),

  lessonId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.pattern.base": "lessonId không hợp lệ (phải là UUID hợp lệ)",
      "any.required": "lessonId là bắt buộc",
    }),
});


export const updateTestCaseSchema = Joi.object({
  testCaseId: Joi.string()
    .pattern(uuidPattern)
    .required()
    .messages({
      "string.pattern.base": "testCaseId không hợp lệ (phải là UUID hợp lệ)",
      "any.required": "testCaseId là bắt buộc",
    }),

  description: Joi.string().max(255).optional().messages({
    "string.max": "Mô tả không được vượt quá 255 ký tự",
  }),

  input: Joi.string().max(500).optional().messages({
    "string.max": "Input quá dài (tối đa 500 ký tự)",
  }),

  expectedOutput: Joi.string().max(500).optional().messages({
    "string.max": "Expected output quá dài (tối đa 500 ký tự)",
  }),
});
