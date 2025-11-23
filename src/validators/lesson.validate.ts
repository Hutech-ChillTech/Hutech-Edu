import Joi from "joi";

export const createLessonSchema = Joi.object({
  lessonName: Joi.string().trim().min(3).max(255).required().messages({
    "string.empty": "Tên bài học không được để trống.",
    "string.min": "Tên bài học phải có ít nhất 3 ký tự.",
    "string.max": "Tên bài học không được vượt quá 255 ký tự.",
    "any.required": "Tên bài học là bắt buộc.",
  }),


  chapterId: Joi.string().uuid().required().messages({
    "string.empty": "ID chương không được để trống.",
    "string.uuid": "ID chương phải là UUID hợp lệ.",
    "any.required": "ID chương là bắt buộc.",
  }),

  isPreview: Joi.boolean().default(false).messages({
    "boolean.base": "isPreview phải là giá trị boolean (true/false).",
  }),
  
  lessonType: Joi.string().valid('normal', 'testcode', 'quiz', 'Lesson').optional(),

  
  duration: Joi.any().custom((value, helpers) => {
      const num = Number(value);
      if (isNaN(num)) return helpers.error('number.base');
      return num;
  }).optional().messages({
      "number.base": "Thời lượng phải là số phút hợp lệ"
  }),

  
  videoUrl: Joi.string().allow(null, ""), 
  content: Joi.string().allow(null, "").max(5000),
  
  
  description: Joi.string().allow(null, ""),
  input: Joi.string().allow(null, ""),
  expectedOutput: Joi.string().allow(null, ""),
  question: Joi.string().allow(null, ""),
  answer: Joi.string().allow(null, ""),
  options: Joi.string().allow(null, ""), 


}).unknown(true); 



export const updateLessonSchema = Joi.object({
  lessonName: Joi.string().trim().min(3).max(255),
  
  
  isPreview: Joi.boolean(),
  
  content: Joi.string().allow(null, "").max(5000),
  videoUrl: Joi.string().uri().allow(null, ""),
  duration: Joi.any().custom((value, helpers) => {
      const num = Number(value);
      if (isNaN(num)) return helpers.error('number.base');
      return num;
  }).optional(),

}).unknown(true); 