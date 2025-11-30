# Task: Fix Backend Video Validation for TestCode Lessons

## Problem Statement

**Current Issue:**
- Backend ALWAYS requires video upload when creating lessons (line 105-107 in LessonController)
- Admin is forced to upload video even for TestCode lessons (practical coding exercises)
- TestCode lessons should use IDE/compiler, NOT video player
- This causes **redundant data** and **incorrect validation logic**

**Expected Behavior:**
- Video Lessons (`lessonType: 'normal'`): Require video file upload
- TestCode Lessons (`lessonType: 'testcode'`): Do NOT require video, allow `videoUrl = null`

---

## ⚠️ CRITICAL CONSTRAINTS

### 🚫 DO NOT:
- ❌ Add new fields to Prisma schema
- ❌ Modify database structure
- ❌ Change existing class architecture (Controller → Service → Repository)
- ❌ Break dependency injection pattern
- ❌ Refactor entire codebase

### ✅ MUST:
- ✅ Follow existing TypeScript + Express pattern
- ✅ Use Joi validation (already in place)
- ✅ Maintain class-based Controller structure
- ✅ Keep Service layer pattern
- ✅ Only modify validation logic in existing files
- ✅ Use existing `lessonType` field in validation

---

## Current Code Analysis

### ❌ Problem in LessonController.createLesson (Lines 105-109)

```typescript
async createLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const fileVideo = req.file;
    const { chapterId } = req.body;
    const data = req.body;

    if (!fileVideo) {
      throw createHttpError(404, "Video chưa được tải lên"); // ❌ ALWAYS requires video
    }

    const cloudResult = await uploadVideoToCloudinary(chapterId, fileVideo.buffer, 'course-videos');
    // ...
```

**Problem:** Always throws error if no video, even for TestCode lessons!

---

## Solution: Conditional Video Validation

### Step 1: Update Joi Validation Schema

**File:** `src/validators/lessonValidator.ts` (hoặc file chứa validation)

#### Current Schema (Partially Correct):
```typescript
export const createLessonSchema = Joi.object({
  lessonName: Joi.string().trim().min(3).max(255).required(),
  chapterId: Joi.string().uuid().required(),
  isPreview: Joi.boolean().default(false),
  lessonType: Joi.string().valid('normal', 'testcode', 'quiz', 'Lesson').optional(), // ✅ Has lessonType
  videoUrl: Joi.string().allow(null, ""), // ✅ Already allows null
  content: Joi.string().allow(null, "").max(5000),
  // ...
}).unknown(true);
```

#### Required Changes:
```typescript
export const createLessonSchema = Joi.object({
  lessonName: Joi.string().trim().min(3).max(255).required().messages({
    "string.empty": "Tên bài học không được để trống.",
    "any.required": "Tên bài học là bắt buộc.",
  }),

  chapterId: Joi.string().uuid().required().messages({
    "string.uuid": "ID chương phải là UUID hợp lệ.",
    "any.required": "ID chương là bắt buộc.",
  }),

  lessonType: Joi.string()
    .valid('normal', 'testcode', 'quiz', 'Lesson')
    .default('normal') // ✅ Default to normal lesson
    .messages({
      "any.only": "Loại bài học phải là: normal, testcode, quiz, hoặc Lesson.",
    }),

  isPreview: Joi.boolean().default(false),

  // ✅ Video validation now depends on lessonType
  videoUrl: Joi.when('lessonType', {
    is: Joi.valid('testcode', 'quiz'), // If testcode or quiz
    then: Joi.string().allow(null, "").optional(), // Video is optional
    otherwise: Joi.string().allow(null, "").optional(), // Still optional here, will validate in controller
  }),

  content: Joi.string().allow(null, "").max(5000),
  duration: Joi.any().custom((value, helpers) => {
    const num = Number(value);
    if (isNaN(num)) return helpers.error('number.base');
    return num;
  }).optional(),

  // TestCode specific fields
  description: Joi.string().allow(null, ""),
  input: Joi.string().allow(null, ""),
  expectedOutput: Joi.string().allow(null, ""),
  
  // Quiz specific fields
  question: Joi.string().allow(null, ""),
  answer: Joi.string().allow(null, ""),
  options: Joi.string().allow(null, ""),

}).unknown(true);
```

---

### Step 2: Update LessonController.createLesson

**File:** `src/controllers/lesson.controller.ts`

#### Current Code (WRONG):
```typescript
async createLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const fileVideo = req.file;
    const { chapterId } = req.body;
    const data = req.body;

    if (!fileVideo) {
      throw createHttpError(404, "Video chưa được tải lên"); // ❌ Always requires
    }

    const cloudResult = await uploadVideoToCloudinary(chapterId, fileVideo.buffer, 'course-videos');

    const payloadLesson = {
      ...data,
      videoUrl: cloudResult.url,
      publicIdVideo: cloudResult.public_id
    }

    const lesson = await this.lessonService.createLesson(payloadLesson);
    return sendSuccess(res, lesson, "Thêm mới lesson thành công.");
  } catch (error) {
    return next(error);
  }
}
```

#### Required Code (CORRECT):
```typescript
async createLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const fileVideo = req.file;
    const { chapterId, lessonType } = req.body;
    const data = req.body;

    // ✅ Check if this is a lesson type that requires video
    const isVideoLesson = !lessonType || lessonType === 'normal' || lessonType === 'Lesson';
    const isTestCodeLesson = lessonType === 'testcode';
    const isQuizLesson = lessonType === 'quiz';

    // ✅ Only require video for normal/Lesson type
    if (isVideoLesson && !fileVideo) {
      throw createHttpError(400, "Bài học video yêu cầu tải lên file video");
    }

    // ✅ Prepare payload based on lesson type
    let payloadLesson;

    if (isVideoLesson && fileVideo) {
      // Upload video to Cloudinary for video lessons
      const cloudResult = await uploadVideoToCloudinary(
        chapterId, 
        fileVideo.buffer, 
        'course-videos'
      );

      payloadLesson = {
        ...data,
        videoUrl: cloudResult.url,
        publicIdVideo: cloudResult.public_id,
        lessonType: lessonType || 'normal'
      };
    } else {
      // TestCode or Quiz lessons - no video
      payloadLesson = {
        ...data,
        videoUrl: null,
        publicIdVideo: null,
        lessonType: lessonType || 'normal'
      };
    }

    const lesson = await this.lessonService.createLesson(payloadLesson);

    return sendSuccess(res, lesson, "Thêm mới lesson thành công.");
  } catch (error) {
    return next(error);
  }
}
```

---

### Step 3: Update LessonController.updateLesson (Optional)

**File:** `src/controllers/lesson.controller.ts`

#### Add Similar Logic for Update:
```typescript
async updateLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const { lessonId } = req.params;
    if (!isUUID(lessonId)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }

    const fileVideo = req.file;
    const { lessonType } = req.body;
    const data = req.body;

    // ✅ Check lesson type
    const isVideoLesson = !lessonType || lessonType === 'normal' || lessonType === 'Lesson';

    let payloadLesson;

    if (isVideoLesson && fileVideo) {
      // If updating with new video
      const { chapterId } = data;
      const cloudResult = await uploadVideoToCloudinary(
        chapterId, 
        fileVideo.buffer, 
        'course-videos'
      );

      payloadLesson = {
        ...data,
        videoUrl: cloudResult.url,
        publicIdVideo: cloudResult.public_id
      };
    } else {
      // No new video or TestCode lesson
      payloadLesson = { ...data };
    }

    const lesson = await this.lessonService.updateLesson(lessonId, payloadLesson);

    if (!lesson) {
      sendNotFound(res, "Không tìm thấy lesson cần tìm");
      return;
    }

    return sendSuccess(res, lesson, "Cập nhật dữ liệu lesson thành công.");
  } catch (error) {
    return next(error);
  }
}
```

---

### Step 4: Service Layer (No Changes Needed)

**File:** `src/services/lesson.service.ts`

The service layer should remain unchanged. It just passes data to repository:

```typescript
// Service should stay as is
class LessonService {
  async createLesson(data: any) {
    return await prisma.lesson.create({ data });
  }

  async updateLesson(lessonId: string, data: any) {
    return await prisma.lesson.update({
      where: { lessonId },
      data
    });
  }
  // ...
}
```

**No changes needed** - Service just executes the operation.

---

## Testing Checklist

### Test Case 1: Create Normal Video Lesson
```bash
POST /api/lessons
Content-Type: multipart/form-data

{
  "lessonName": "React Tutorial",
  "chapterId": "uuid-here",
  "lessonType": "normal",
  "content": "Learn React basics",
  "file": [video file]
}
```
**Expected:** ✅ Success, video uploaded to Cloudinary

---

### Test Case 2: Create TestCode Lesson (No Video)
```bash
POST /api/lessons
Content-Type: application/json

{
  "lessonName": "Array Practice",
  "chapterId": "uuid-here",
  "lessonType": "testcode",
  "content": "Practice array methods",
  "input": "[1,2,3]",
  "expectedOutput": "6"
}
```
**Expected:** ✅ Success, no video required, `videoUrl = null`

---

### Test Case 3: Create Normal Lesson Without Video (Should Fail)
```bash
POST /api/lessons
Content-Type: application/json

{
  "lessonName": "React Tutorial",
  "chapterId": "uuid-here",
  "lessonType": "normal",
  "content": "Learn React"
}
```
**Expected:** ❌ Error 400: "Bài học video yêu cầu tải lên file video"

---

### Test Case 4: Create TestCode Lesson With Video (Should Work)
```bash
POST /api/lessons
Content-Type: multipart/form-data

{
  "lessonName": "Array Practice",
  "chapterId": "uuid-here",
  "lessonType": "testcode",
  "file": [video file]
}
```
**Expected:** ✅ Success but video is ignored, `videoUrl = null`

---

## Files to Modify

### Summary of Changes:

1. **`src/validators/lessonValidator.ts`**
   - Update `createLessonSchema`
   - Add conditional validation for `videoUrl` based on `lessonType`
   - Set default `lessonType: 'normal'`

2. **`src/controllers/lesson.controller.ts`**
   - Update `createLesson()` method
   - Add conditional check: `if (isVideoLesson && !fileVideo)`
   - Only upload video for `normal` or `Lesson` types
   - Set `videoUrl = null` for TestCode/Quiz lessons
   - Optional: Update `updateLesson()` with similar logic

3. **`src/services/lesson.service.ts`**
   - **NO CHANGES NEEDED** ✅

4. **`src/repositories/lessonRepository.ts`** (if exists)
   - **NO CHANGES NEEDED** ✅

---

## Acceptance Criteria

- [ ] Joi validation allows `lessonType` field
- [ ] Video upload is skipped for `lessonType: 'testcode'`
- [ ] Video upload is required for `lessonType: 'normal'` or `'Lesson'`
- [ ] TestCode lessons save with `videoUrl = null`
- [ ] Normal lessons require video file
- [ ] Error message clear when video missing for normal lesson
- [ ] No database schema changes
- [ ] Class structure and DI pattern maintained
- [ ] Service layer unchanged
- [ ] All tests pass

---

## Implementation Summary

### What Changes:
- ✅ Joi schema: Add conditional validation
- ✅ Controller: Add `lessonType` check before video upload
- ✅ Controller: Set `videoUrl = null` for TestCode lessons

### What Stays Same:
- ✅ Database schema (already has nullable `videoUrl`)
- ✅ Service layer (no changes)
- ✅ Repository layer (no changes)
- ✅ Class-based architecture
- ✅ Dependency injection pattern
- ✅ Error handling structure

**Key Principle:**
> Add conditional logic in Controller, use existing `lessonType` field, maintain architecture.