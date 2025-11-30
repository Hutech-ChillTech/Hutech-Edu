📋 PROMPT AI - TASK IMPLEMENTATION GUIDE
Context
Bạn đang phát triển một hệ thống học lập trình có tính năng tự động chấm điểm code HTML/CSS tại Frontend. Hệ thống đã có:

Hook useHtmlGrader để chấm điểm
Component CompilerComponent (code editor)
Backend API trả về bài học và test cases
Database lưu test cases

Mục tiêu: Hoàn thiện luồng chấm điểm và thông báo kết quả cho người dùng.

🎯 TASK 1: Kết nối Hook với UI Component
Objective
Tích hợp useHtmlGrader vào CompilerComponent.tsx để người dùng có thể chạy code và nhận thông báo kết quả.
Requirements
typescript// File: CompilerComponent.tsx

import { useHtmlGrader } from '@/hooks/useHtmlGrader';
import { message, notification } from 'antd';
import { useEffect } from 'react';

// 1. Khởi tạo hook
const { results, isAllPassed, runCodeCheck, resetGrader } = useHtmlGrader();

// 2. Lắng nghe kết quả chấm điểm
useEffect(() => {
  if (isAllPassed === true) {
    notification.success({
      message: '🎉 Chúc mừng!',
      description: 'Bạn đã hoàn thành bài tập thành công!',
      duration: 3,
    });
  } else if (isAllPassed === false) {
    notification.error({
      message: '❌ Chưa đúng',
      description: 'Vui lòng kiểm tra lại code của bạn',
      duration: 3,
    });
  }
}, [isAllPassed]);

// 3. Xử lý sự kiện nút Run
const handleRunCode = () => {
  if (!htmlCode.trim()) {
    message.warning('Vui lòng nhập code HTML');
    return;
  }
  
  runCodeCheck(htmlCode, cssCode, testCases);
};

// 4. Gắn vào button
<button onClick={handleRunCode}>Run Code</button>
Acceptance Criteria

✅ Hook được gọi đúng trong component
✅ Nút "Run Code" trigger hàm runCodeCheck
✅ Hiển thị notification khi pass/fail
✅ UI không bị lag khi chấm điểm


🔌 TASK 2: Kiểm tra & Chuẩn hóa API Response
Objective
Đảm bảo dữ liệu từ Backend về Frontend đúng format mà useHtmlGrader expect.
Requirements
Backend API cần trả về:
json{
  "id": 1,
  "title": "Bài 1: HTML cơ bản",
  "content": "...",
  "testCases": [
    {
      "id": 1,
      "description": "Kiểm tra thẻ h1",
      "input": "const h1 = iframe.contentDocument.querySelector('h1'); if (!h1) return 'Thiếu thẻ h1'; return true;",
      "expectedOutput": "true"
    }
  ]
}
Hoặc nếu dùng field khác:
json{
  "testCases": [
    {
      "testCode": "const h1 = ...", // Thay vì "input"
      "expected": "true"             // Thay vì "expectedOutput"
    }
  ]
}
Action Items

Kiểm tra API Response:

bash   # Test API
   curl http://localhost:3000/api/lessons/1

Chuẩn hóa field names:

typescript   // Nếu Backend trả về snake_case
   const normalizedTestCases = lesson.test_cases.map(tc => ({
     id: tc.id,
     description: tc.description,
     input: tc.test_code,           // Map test_code -> input
     expectedOutput: tc.expected     // Map expected -> expectedOutput
   }));

Update TypeScript Types:

typescript   interface TestCase {
     id: number;
     description: string;
     input: string;          // Đoạn JS code để test
     expectedOutput: string; // Kết quả mong đợi
   }
Acceptance Criteria

✅ API trả về đúng structure
✅ Field names match với Hook expectations
✅ TypeScript types được update
✅ Console.log không có lỗi undefined


✍️ TASK 3: Tạo Test Case mẫu (Admin Content)
Objective
Viết bài học đầu tiên với test cases chuẩn để kiểm tra hệ thống.
Requirements
Bài học mẫu: "HTML cơ bản - Thẻ Heading"
Yêu cầu bài tập:

Tạo một thẻ <h1> với nội dung "Hello World" và thẻ <p> với nội dung "Đây là đoạn văn đầu tiên"

Test Case 1: Kiểm tra thẻ H1
javascriptconst h1 = iframe.contentDocument.querySelector('h1');
if (!h1) return "❌ Thiếu thẻ <h1>";
if (h1.innerText.trim() !== "Hello World") return "❌ Nội dung h1 phải là 'Hello World'";
return true;
Test Case 2: Kiểm tra thẻ P
javascriptconst p = iframe.contentDocument.querySelector('p');
if (!p) return "❌ Thiếu thẻ <p>";
if (p.innerText.trim() !== "Đây là đoạn văn đầu tiên") return "❌ Nội dung không đúng";
return true;
Test Case 3: Kiểm tra cấu trúc HTML
javascriptconst html = iframe.contentDocument.querySelector('html');
const body = iframe.contentDocument.querySelector('body');
if (!html || !body) return "❌ Thiếu cấu trúc HTML cơ bản";
return true;
Admin Flow

Đăng nhập Admin Panel
Tạo bài học mới
Nhập tiêu đề, mô tả
Thêm Test Cases - Copy 3 đoạn code trên vào từng test case
Lưu bài học
Test bằng tài khoản học viên

Acceptance Criteria

✅ Admin có thể thêm test cases
✅ Test cases được lưu vào DB
✅ Frontend nhận được test cases qua API
✅ Test cases chạy đúng trong iframe


💾 TASK 4: Lưu tiến độ học tập (User Progress)
Objective
Khi học viên pass tất cả test cases, lưu trạng thái "Đã hoàn thành" lên server.
Backend API Design
typescript// POST /api/user-progress
{
  "userId": 123,
  "lessonId": 1,
  "status": "completed",
  "score": 100,
  "completedAt": "2025-11-30T10:30:00Z"
}
Frontend Implementation
typescript// File: CompilerComponent.tsx

const saveProgress = async (lessonId: number) => {
  try {
    await fetch('/api/user-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId,
        status: 'completed',
        score: 100,
      }),
    });
  } catch (error) {
    console.error('Lỗi lưu tiến độ:', error);
  }
};

// Gọi sau khi pass
useEffect(() => {
  if (isAllPassed === true) {
    notification.success({
      message: '🎉 Chúc mừng!',
      description: 'Bạn đã hoàn thành bài tập!',
    });
    
    // Lưu tiến độ
    saveProgress(lessonId);
  }
}, [isAllPassed]);
Database Schema
sqlCREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  status VARCHAR(50) DEFAULT 'in_progress',
  score INT DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
Acceptance Criteria

✅ API endpoint được tạo
✅ Database table được migrate
✅ Frontend gọi API sau khi pass
✅ Dữ liệu được lưu vào DB
✅ Không duplicate progress records


🚀 PRIORITY ORDER

HIGH - Task 1: Kết nối Hook (Core functionality)
    notification.error({
      message: '❌ Chưa đúng',
      description: 'Vui lòng kiểm tra lại code của bạn',
      duration: 3,
    });
  }
}, [isAllPassed]);

// 3. Xử lý sự kiện nút Run
const handleRunCode = () => {
  if (!htmlCode.trim()) {
    message.warning('Vui lòng nhập code HTML');
    return;
  }
  
  runCodeCheck(htmlCode, cssCode, testCases);
};

// 4. Gắn vào button
<button onClick={handleRunCode}>Run Code</button>
Acceptance Criteria

✅ Hook được gọi đúng trong component
✅ Nút "Run Code" trigger hàm runCodeCheck
✅ Hiển thị notification khi pass/fail
✅ UI không bị lag khi chấm điểm


🔌 TASK 2: Kiểm tra & Chuẩn hóa API Response
Objective
Đảm bảo dữ liệu từ Backend về Frontend đúng format mà useHtmlGrader expect.
Requirements
Backend API cần trả về:
json{
  "id": 1,
  "title": "Bài 1: HTML cơ bản",
  "content": "...",
  "testCases": [
    {
      "id": 1,
      "description": "Kiểm tra thẻ h1",
      "input": "const h1 = iframe.contentDocument.querySelector('h1'); if (!h1) return 'Thiếu thẻ h1'; return true;",
      "expectedOutput": "true"
    }
  ]
}
Hoặc nếu dùng field khác:
json{
  "testCases": [
    {
      "testCode": "const h1 = ...", // Thay vì "input"
      "expected": "true"             // Thay vì "expectedOutput"
    }
  ]
}
Action Items

Kiểm tra API Response:

bash   # Test API
   curl http://localhost:3000/api/lessons/1

Chuẩn hóa field names:

typescript   // Nếu Backend trả về snake_case
   const normalizedTestCases = lesson.test_cases.map(tc => ({
     id: tc.id,
     description: tc.description,
     input: tc.test_code,           // Map test_code -> input
     expectedOutput: tc.expected     // Map expected -> expectedOutput
   }));

Update TypeScript Types:

typescript   interface TestCase {
     id: number;
     description: string;
     input: string;          // Đoạn JS code để test
     expectedOutput: string; // Kết quả mong đợi
   }
Acceptance Criteria

✅ API trả về đúng structure
✅ Field names match với Hook expectations
✅ TypeScript types được update
✅ Console.log không có lỗi undefined


✍️ TASK 3: Tạo Test Case mẫu (Admin Content)
Objective
Viết bài học đầu tiên với test cases chuẩn để kiểm tra hệ thống.
Requirements
Bài học mẫu: "HTML cơ bản - Thẻ Heading"
Yêu cầu bài tập:

Tạo một thẻ <h1> với nội dung "Hello World" và thẻ <p> với nội dung "Đây là đoạn văn đầu tiên"

Test Case 1: Kiểm tra thẻ H1
javascriptconst h1 = iframe.contentDocument.querySelector('h1');
if (!h1) return "❌ Thiếu thẻ <h1>";
if (h1.innerText.trim() !== "Hello World") return "❌ Nội dung h1 phải là 'Hello World'";
return true;
Test Case 2: Kiểm tra thẻ P
javascriptconst p = iframe.contentDocument.querySelector('p');
if (!p) return "❌ Thiếu thẻ <p>";
if (p.innerText.trim() !== "Đây là đoạn văn đầu tiên") return "❌ Nội dung không đúng";
return true;
Test Case 3: Kiểm tra cấu trúc HTML
javascriptconst html = iframe.contentDocument.querySelector('html');
const body = iframe.contentDocument.querySelector('body');
if (!html || !body) return "❌ Thiếu cấu trúc HTML cơ bản";
return true;
Admin Flow

Đăng nhập Admin Panel
Tạo bài học mới
Nhập tiêu đề, mô tả
Thêm Test Cases - Copy 3 đoạn code trên vào từng test case
Lưu bài học
Test bằng tài khoản học viên

Acceptance Criteria

✅ Admin có thể thêm test cases
✅ Test cases được lưu vào DB
✅ Frontend nhận được test cases qua API
✅ Test cases chạy đúng trong iframe


💾 TASK 4: Lưu tiến độ học tập (User Progress)
Objective
Khi học viên pass tất cả test cases, lưu trạng thái "Đã hoàn thành" lên server.
Backend API Design
typescript// POST /api/user-progress
{
  "userId": 123,
  "lessonId": 1,
  "status": "completed",
  "score": 100,
  "completedAt": "2025-11-30T10:30:00Z"
}
Frontend Implementation
typescript// File: CompilerComponent.tsx

const saveProgress = async (lessonId: number) => {
  try {
    await fetch('/api/user-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId,
        status: 'completed',
        score: 100,
      }),
    });
  } catch (error) {
    console.error('Lỗi lưu tiến độ:', error);
  }
};

// Gọi sau khi pass
useEffect(() => {
  if (isAllPassed === true) {
    notification.success({
      message: '🎉 Chúc mừng!',
      description: 'Bạn đã hoàn thành bài tập!',
    });
    
    // Lưu tiến độ
    saveProgress(lessonId);
  }
}, [isAllPassed]);
Database Schema
sqlCREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  status VARCHAR(50) DEFAULT 'in_progress',
  score INT DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
Acceptance Criteria

✅ API endpoint được tạo
✅ Database table được migrate
✅ Frontend gọi API sau khi pass
✅ Dữ liệu được lưu vào DB
✅ Không duplicate progress records


🚀 PRIORITY ORDER

✅ HIGH - Task 1: Kết nối Hook (Core functionality)
notification.error({
      message: '❌ Chưa đúng',
      description: 'Vui lòng kiểm tra lại code của bạn',
      duration: 3,
    });
  }
}, [isAllPassed]);

// 3. Xử lý sự kiện nút Run
const handleRunCode = () => {
  if (!htmlCode.trim()) {
    message.warning('Vui lòng nhập code HTML');
    return;
  }
  
  runCodeCheck(htmlCode, cssCode, testCases);
};

// 4. Gắn vào button
<button onClick={handleRunCode}>Run Code</button>
Acceptance Criteria

✅ Hook được gọi đúng trong component
✅ Nút "Run Code" trigger hàm runCodeCheck
✅ Hiển thị notification khi pass/fail
✅ UI không bị lag khi chấm điểm


🔌 TASK 2: Kiểm tra & Chuẩn hóa API Response
Objective
Đảm bảo dữ liệu từ Backend về Frontend đúng format mà useHtmlGrader expect.
Requirements
Backend API cần trả về:
json{
  "id": 1,
  "title": "Bài 1: HTML cơ bản",
  "content": "...",
  "testCases": [
    {
      "id": 1,
      "description": "Kiểm tra thẻ h1",
      "input": "const h1 = iframe.contentDocument.querySelector('h1'); if (!h1) return 'Thiếu thẻ h1'; return true;",
      "expectedOutput": "true"
    }
  ]
}
Hoặc nếu dùng field khác:
json{
  "testCases": [
    {
      "testCode": "const h1 = ...", // Thay vì "input"
      "expected": "true"             // Thay vì "expectedOutput"
    }
  ]
}
Action Items

Kiểm tra API Response:

bash   # Test API
   curl http://localhost:3000/api/lessons/1

Chuẩn hóa field names:

typescript   // Nếu Backend trả về snake_case
   const normalizedTestCases = lesson.test_cases.map(tc => ({
     id: tc.id,
     description: tc.description,
     input: tc.test_code,           // Map test_code -> input
     expectedOutput: tc.expected     // Map expected -> expectedOutput
   }));

Update TypeScript Types:

typescript   interface TestCase {
     id: number;
     description: string;
     input: string;          // Đoạn JS code để test
     expectedOutput: string; // Kết quả mong đợi
   }
Acceptance Criteria

✅ API trả về đúng structure
✅ Field names match với Hook expectations
✅ TypeScript types được update
✅ Console.log không có lỗi undefined


✍️ TASK 3: Tạo Test Case mẫu (Admin Content)
Objective
Viết bài học đầu tiên với test cases chuẩn để kiểm tra hệ thống.
Requirements
Bài học mẫu: "HTML cơ bản - Thẻ Heading"
Yêu cầu bài tập:

Tạo một thẻ <h1> với nội dung "Hello World" và thẻ <p> với nội dung "Đây là đoạn văn đầu tiên"

Test Case 1: Kiểm tra thẻ H1
javascriptconst h1 = iframe.contentDocument.querySelector('h1');
if (!h1) return "❌ Thiếu thẻ <h1>";
if (h1.innerText.trim() !== "Hello World") return "❌ Nội dung h1 phải là 'Hello World'";
return true;
Test Case 2: Kiểm tra thẻ P
javascriptconst p = iframe.contentDocument.querySelector('p');
if (!p) return "❌ Thiếu thẻ <p>";
if (p.innerText.trim() !== "Đây là đoạn văn đầu tiên") return "❌ Nội dung không đúng";
return true;
Test Case 3: Kiểm tra cấu trúc HTML
javascriptconst html = iframe.contentDocument.querySelector('html');
const body = iframe.contentDocument.querySelector('body');
if (!html || !body) return "❌ Thiếu cấu trúc HTML cơ bản";
return true;
Admin Flow

Đăng nhập Admin Panel
Tạo bài học mới
Nhập tiêu đề, mô tả
Thêm Test Cases - Copy 3 đoạn code trên vào từng test case
Lưu bài học
Test bằng tài khoản học viên

Acceptance Criteria

✅ Admin có thể thêm test cases
✅ Test cases được lưu vào DB
✅ Frontend nhận được test cases qua API
✅ Test cases chạy đúng trong iframe


💾 TASK 4: Lưu tiến độ học tập (User Progress)
Objective
Khi học viên pass tất cả test cases, lưu trạng thái "Đã hoàn thành" lên server.
Backend API Design
typescript// POST /api/user-progress
{
  "userId": 123,
  "lessonId": 1,
  "status": "completed",
  "score": 100,
  "completedAt": "2025-11-30T10:30:00Z"
}
Frontend Implementation
typescript// File: CompilerComponent.tsx

const saveProgress = async (lessonId: number) => {
  try {
    await fetch('/api/user-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId,
        status: 'completed',
        score: 100,
      }),
    });
  } catch (error) {
    console.error('Lỗi lưu tiến độ:', error);
  }
};

// Gọi sau khi pass
useEffect(() => {
  if (isAllPassed === true) {
    notification.success({
      message: '🎉 Chúc mừng!',
      description: 'Bạn đã hoàn thành bài tập!',
    });
    
    // Lưu tiến độ
    saveProgress(lessonId);
  }
}, [isAllPassed]);
Database Schema
sqlCREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  status VARCHAR(50) DEFAULT 'in_progress',
  score INT DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);
Acceptance Criteria

✅ API endpoint được tạo
✅ Database table được migrate
✅ Frontend gọi API sau khi pass
✅ Dữ liệu được lưu vào DB
✅ Không duplicate progress records


🚀 PRIORITY ORDER

✅ HIGH - Task 1: Kết nối Hook (Core functionality)
✅ HIGH - Task 2: Chuẩn hóa API (Data flow)
MEDIUM - Task 3: Tạo test cases mẫu (Testing)
✅ LOW - Task 4: Lưu tiến độ (Enhancement)


✅ DEFINITION OF DONE
Toàn bộ feature được coi là hoàn thành khi:

 [x] Học viên mở bài học, thấy code editor
 [x] Học viên viết code HTML/CSS
 [x] Click "Run Code" → Hệ thống chấm điểm
 [x] Nếu pass → Hiện notification thành công + Lưu progress
 [x] Nếu fail → Hiện notification lỗi + Gợi ý sửa
 [x] Admin có thể tạo bài học với test cases
 [x] Dashboard hiển thị tiến độ học tập