🐛 BUG FIX PROMPT - Sửa lỗi Notification & Test Case Validation

📋 CONTEXT - CODE HIỆN TẠI (KHÔNG ĐƯỢC THAY ĐỔI)
File đang làm việc: hooks/useHtmlGrader.ts
Các tính năng đã hoàn thành (PHẢI GIỮ NGUYÊN):

✅ Hook đã được kết nối với CompilerComponent (Task 1 cũ)
✅ API response đã được normalize (Task 2 cũ)
✅ Function runCodeCheck đang hoạt động
✅ State management với results, isAllPassed

Structure hiện tại cần giữ:
typescriptexport const useHtmlGrader = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isAllPassed, setIsAllPassed] = useState<boolean | null>(null);

  const runCodeCheck = (htmlCode: string, cssCode: string, testCases: TestCase[]) => {
    // Logic này cần FIX nhưng KHÔNG ĐƯỢC viết lại toàn bộ
  };

  return { results, isAllPassed, runCodeCheck, resetGrader };
};

🐛 CÁC VẤN ĐỀ CẦN FIX
Bug 1: Thông báo lỗi chung chung "Chưa thỏa mãn yêu cầu"

Nguyên nhân: Biến result từ checkFunc(iframe) trả về undefined, null hoặc false thay vì chuỗi lỗi cụ thể
Hậu quả: Người dùng không biết sai chỗ nào

Bug 2: Test case đúng vẫn hiện là sai

Nguyên nhân: Logic xử lý result chưa linh hoạt, không xử lý đúng các kiểu dữ liệu
Hậu quả: isAllPassed luôn là false, không hiện notification thành công

Bug 3: Script Admin không có error handling

Nguyên nhân: Khi script bị lỗi cú pháp JS, không có thông báo rõ ràng
Hậu quả: Admin không biết mình viết sai


🎯 YÊU CẦU FIX - INCREMENTAL UPDATE ONLY
⚠️ QUAN TRỌNG - KHÔNG ĐƯỢC:

❌ Viết lại toàn bộ file useHtmlGrader.ts
❌ Thay đổi signature của function runCodeCheck
❌ Xóa state management hiện tại
❌ Thay đổi return values của hook
❌ Sửa các phần code không liên quan đến bug

✅ CHỈ ĐƯỢC:

✅ Thêm console.log để debug (Task 1)
✅ Sửa logic xử lý result trong block try-catch (Task 2)
✅ Cải thiện error handling trong catch block (Task 2)


🔧 TASK 1: Thêm Debug Logging
Vị trí: Bên trong testCases.map(), trong block try
Code cần THÊM VÀO (không thay thế):
typescript// TRƯỚC KHI CHẠY checkFunc
try {
  const checkFunc = new Function('iframe', validationScript);
  
  // ========== THÊM ĐOẠN NÀY VÀO ========== 
  console.log(`--- Test Case ${tc.testCaseId} ---`);
  console.log("Script nhận được:", validationScript);
  // =========================================
  
  const result = checkFunc(iframe);
  
  // ========== THÊM ĐOẠN NÀY VÀO ========== 
  console.log("Result trả về:", result);
  console.log("Type of result:", typeof result);
  // =========================================

  // Logic xử lý result ở dưới (sẽ fix ở Task 2)
  if (result === true || result === 'Pass') {
    return { testCaseId: tc.testCaseId, pass: true, message: "Chính xác!" };
  } else {
    // ... code hiện tại
  }
}
```

**Expected Output trong Console:**
```
--- Test Case 1 ---
Script nhận được: const btn = iframe.contentDocument.querySelector('button'); if (!btn) return "Thiếu button"; return true;
Result trả về: true
Type of result: boolean

🔧 TASK 2: Fix Logic Xử Lý Result
Vị trí: Thay thế đoạn xử lý result và catch block trong testCases.map()
Code CŨ cần thay thế:
typescript// ĐOẠN NÀY SẼ BỊ THAY THẾ
if (result === true || result === 'Pass') {
  return { testCaseId: tc.testCaseId, pass: true, message: "Chính xác!" };
} else {
  return {
    testCaseId: tc.testCaseId,
    pass: false,
    message: typeof result === 'string' && result !== 'Fail' ? result : "Chưa thỏa mãn yêu cầu"
  };
}
Code MỚI thay thế:
typescript// ========== THAY THẾ BẰNG ĐOẠN NÀY ==========
// 1. Xử lý case PASS
if (result === true) {
  return { testCaseId: tc.testCaseId, pass: true, message: "Chính xác!" };
} 

// 2. Xử lý case FAIL với lỗi cụ thể (string)
if (typeof result === 'string') {
  return { testCaseId: tc.testCaseId, pass: false, message: result };
}

// 3. Xử lý case FAIL chung chung (false, undefined, null)
return { 
  testCaseId: tc.testCaseId, 
  pass: false, 
  message: "Chưa thỏa mãn yêu cầu (Script không trả về lý do cụ thể)." 
};
// ============================================
Code CŨ trong catch block:
typescriptcatch (err: any) {
  console.error("Lỗi:", err);
  return { testCaseId: tc.testCaseId, pass: false, message: "Lỗi khi chạy test" };
}
Code MỚI thay thế:
typescript// ========== THAY THẾ CATCH BLOCK ==========
catch (err: any) {
  console.error("Lỗi chạy script:", err);
  return {
    testCaseId: tc.testCaseId,
    pass: false,
    message: `❌ Lỗi kịch bản kiểm tra: ${err.message}` 
  };
}
// ==========================================

🔧 TASK 3: Update Admin Test Case Script
File: Database hoặc Admin Panel
Script CŨ (có thể bị lỗi):
javascriptconst btn = iframe.contentDocument.querySelector('button');
if (!btn) return "Thiếu button";
const style = getComputedStyle(btn);
if (style.backgroundColor !== 'red') return "Màu nền sai";
return true;
Script MỚI (copy vào DB):
javascriptconst doc = iframe.contentDocument;
const btn = doc.querySelector('button');

// 1. Kiểm tra HTML
if (!btn) return "Thiếu thẻ <button>";
if (!btn.classList.contains('btn-buy')) return "Button thiếu class 'btn-buy'";
if (btn.innerText.trim() !== "Mua Ngay") return "Nội dung button phải là 'Mua Ngay'";

// 2. Kiểm tra CSS
const style = iframe.contentWindow.getComputedStyle(btn);

// Màu đỏ có thể là 'red' hoặc 'rgb(255, 0, 0)'
const bg = style.backgroundColor;
if (bg !== 'red' && bg !== 'rgb(255, 0, 0)') {
    return `Màu nền sai. Yêu cầu đỏ (red), hiện tại là: ${bg}`;
}

const color = style.color;
if (color !== 'white' && color !== 'rgb(255, 255, 255)') {
    return "Màu chữ phải là trắng (white)";
}

return true;
```

---

## 📝 CÁCH NÓI VỚI AI

### ❌ PROMPT SAI (AI sẽ viết lại toàn bộ):
```
"Fix bug trong useHtmlGrader"
✅ PROMPT ĐÚNG (AI chỉ fix phần cần thiết):
markdown# INCREMENTAL BUG FIX - useHtmlGrader.ts

## Context
File `hooks/useHtmlGrader.ts` đã implement đầy đủ logic chấm điểm. 
KHÔNG ĐƯỢC viết lại toàn bộ file. Chỉ fix 2 phần cụ thể sau:

## Bug cần fix
1. Thông báo lỗi chung chung "Chưa thỏa mãn yêu cầu"
2. Test case đúng vẫn hiện là sai

## Task 1: Thêm debug logging
**Vị trí:** Bên trong `testCases.map()`, block `try`
**Hành động:** Thêm 4 dòng console.log (KHÔNG xóa code cũ)
```typescript
console.log(`--- Test Case ${tc.testCaseId} ---`);
console.log("Script nhận được:", validationScript);
const result = checkFunc(iframe);
console.log("Result trả về:", result);
console.log("Type of result:", typeof result);
```

## Task 2: Thay thế logic xử lý result
**Vị trí:** Đoạn xử lý `if (result === true || result === 'Pass')`
**Hành động:** Thay thế bằng logic mới xử lý 3 cases:
```typescript
// Case 1: Pass
if (result === true) {
  return { testCaseId: tc.testCaseId, pass: true, message: "Chính xác!" };
} 

// Case 2: Fail với lỗi cụ thể
if (typeof result === 'string') {
  return { testCaseId: tc.testCaseId, pass: false, message: result };
}

// Case 3: Fail chung
return { 
  testCaseId: tc.testCaseId, 
  pass: false, 
  message: "Chưa thỏa mãn yêu cầu (Script không trả về lý do cụ thể)." 
};
```

**Đồng thời thay thế catch block:**
```typescript
catch (err: any) {
  console.error("Lỗi chạy script:", err);
  return {
    testCaseId: tc.testCaseId,
    pass: false,
    message: `❌ Lỗi kịch bản kiểm tra: ${err.message}` 
  };
}
```

## Yêu cầu nghiêm ngặt
- ✅ CHỈ sửa 2 phần trên
- ❌ KHÔNG viết lại function `runCodeCheck`
- ❌ KHÔNG thay đổi state management
- ❌ KHÔNG sửa return values của hook
- ❌ GIỮ NGUYÊN toàn bộ code khác

## Output mong đợi
Trả về:
1. Code snippet của 2 phần đã sửa
2. Giải thích ngắn gọn thay đổi gì
3. KHÔNG trả về toàn bộ file
```

---

## ✅ CHECKLIST VERIFICATION

Sau khi AI trả lời, kiểm tra:

- [ ] AI chỉ trả về 2 đoạn code (debug logs + logic xử lý result)
- [ ] AI KHÔNG viết lại toàn bộ file
- [ ] AI KHÔNG thay đổi function signature
- [ ] AI giải thích ngắn gọn (< 5 câu)
- [ ] Console logs hiển thị đúng trong F12
- [ ] Notification hiện đúng khi pass/fail

---

## 🎯 EXPECTED RESULT

**Trước khi fix:**
```
❌ "Chưa thỏa mãn yêu cầu" (không biết sai gì)
❌ isAllPassed = false (dù code đúng)
```

**Sau khi fix:**
```
✅ "Màu nền sai. Yêu cầu đỏ (red), hiện tại là: rgb(0, 0, 255)"
✅ Console hiển thị: Result trả về: "Màu nền sai..."
✅ isAllPassed = true khi code đúng → Notification xuất hiện
