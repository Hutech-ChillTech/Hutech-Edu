# LessonList - Quản lý Bài học và Trắc nghiệm

## Tổng quan

Component `LessonList.tsx` cho phép quản lý đầy đủ các bài học (Lessons) và bài trắc nghiệm (Quiz) trong một chương học.

## Chức năng

### 1. **Bài học thông thường (Normal Lesson)**
- ✅ **Thêm mới**: Upload video, nội dung, cho phép học thử
- ✅ **Sửa**: Cập nhật thông tin bài học
- ✅ **Xóa**: Xóa bài học khỏi chương
- ✅ **Xem chi tiết**: Điều hướng đến trang chi tiết bài học

### 2. **Test Code**
- ✅ **Thêm test case**: Tạo bài tập code với input/output
- ✅ **Kết hợp với bài học**: Có thể thêm test case cho bài học video

### 3. **Trắc nghiệm (Quiz)**
- ✅ **Tạo quiz**: Tiêu đề, mô tả
- ✅ **Thêm câu hỏi**: Nhiều câu hỏi trong một quiz
- ✅ **Tùy chọn đáp án**: Thêm/xóa/sửa đáp án cho từng câu hỏi
- ✅ **Chọn đáp án đúng**: Đánh dấu đáp án chính xác
- ✅ **Sao chép câu hỏi**: Duplicate câu hỏi nhanh chóng
- ✅ **Đánh dấu bắt buộc**: Câu hỏi có thể đánh dấu là bắt buộc
- ✅ **Sửa quiz**: Cập nhật thông tin quiz (đang phát triển)
- ✅ **Xóa quiz**: Xóa quiz khỏi chương

## API Endpoints được sử dụng

### Lesson API
```typescript
POST   /api/lessons/create
PUT    /api/lessons/update/:lessonId
DELETE /api/lessons/delete/:lessonId
GET    /api/lessons/chapter/:chapterId
```

### Quiz API
```typescript
// Quiz
POST   /api/quizzes
PUT    /api/quizzes/:chapterQuizId
DELETE /api/quizzes/:chapterQuizId
GET    /api/quizzes/chapter/:chapterId

// Questions
POST   /api/quizzes/questions
PUT    /api/quizzes/questions/:quizQuestionId
DELETE /api/quizzes/questions/:quizQuestionId

// Options
POST   /api/quizzes/options
PUT    /api/quizzes/options/:quizOptionId
DELETE /api/quizzes/options/:quizOptionId
```

## Cấu trúc dữ liệu

### Quiz Structure
```typescript
interface QuizQuestion {
  id: string;                    // Temporary ID for UI
  question: string;              // Nội dung câu hỏi
  options: string[];             // Danh sách đáp án
  correctAnswer: number | null;  // Index của đáp án đúng
  required: boolean;             // Câu hỏi bắt buộc?
}

interface QuizData {
  title: string;                 // Tiêu đề quiz
  description: string;           // Mô tả
  questions: QuizQuestion[];     // Danh sách câu hỏi
}
```

## Workflow

### Thêm bài học video

1. Click "Thêm bài học / Trắc nghiệm"
2. Chọn tab "Bài học"
3. Nhập tên, nội dung, upload video
4. Tùy chọn: Bật "Thêm Test Case" nếu muốn thêm bài tập code
5. Click "Lưu bài học"

### Thêm trắc nghiệm

1. Click "Thêm bài học / Trắc nghiệm"
2. Chọn tab "Trắc nghiệm"
3. Nhập tiêu đề và mô tả quiz
4. Cho mỗi câu hỏi:
   - Nhập câu hỏi
   - Thêm các tùy chọn đáp án
   - Chọn đáp án đúng (radio button)
   - Đánh dấu "Bắt buộc" nếu cần
5. Click "Thêm câu hỏi" để thêm câu hỏi mới
6. Click "Lưu câu hỏi" để hoàn tất

### Sửa bài học/quiz

1. Click icon ✏️ (Edit) trên dòng cần sửa
2. Form sẽ mở với dữ liệu đã điền sẵn
3. Chỉnh sửa thông tin
4. Click "Cập nhật"

### Xóa bài học/quiz

1. Click icon 🗑️ (Delete) trên dòng cần xóa
2. Xác nhận trong popup
3. Bài học/quiz sẽ bị xóa

## Validation

### Bài học
- ❗ Tên bài học: Bắt buộc
- ❗ Video: Bắt buộc (khi tạo mới)

### Quiz
- ❗ Tiêu đề: Bắt buộc, không được để "Mẫu không có tiêu đề"
- ❗ Câu hỏi: Tất cả phải có nội dung
- ❗ Đáp án đúng: Phải chọn cho tất cả câu hỏi

## Lưu ý

1. **Video upload**: Chỉ chấp nhận file video (video/*)
2. **Quiz editing**: Chức năng sửa quiz đang được phát triển, hiện tại chỉ cập nhật title và description
3. **Test Case**: Chỉ có thể thêm test case khi tạo bài học mới, không thể thêm sau
4. **Tab switching**: Không thể chuyển tab khi đang trong quá trình thêm test case

## Dependencies

- `lesson.service.ts`: CRUD operations cho lessons
- `quiz.service.ts`: CRUD operations cho quizzes, questions, options
- `testCase.service.ts`: CRUD operations cho test cases

## State Management

Component sử dụng React hooks:
- `useState`: Quản lý local state
- `useCallback`: Optimize performance cho functions
- `useMemo`: Cache computed values (combined data, columns)
- `useEffect`: Fetch data khi component mount

## UI Components (Ant Design)

- Table: Hiển thị danh sách
- Form: Input forms
- Tabs: Chuyển đổi giữa lesson types
- Card: Container cho form và questions
- Upload: Video upload
- Radio: Select correct answer
- Popconfirm: Confirmation dialogs
