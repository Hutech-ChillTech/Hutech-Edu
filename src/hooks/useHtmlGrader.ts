import { useState, useCallback } from 'react';
import { type TestCase } from '../types/database.types';

export interface CheckResult {
  testCaseId: string;
  pass: boolean;
  message: string;
}

export const useHtmlGrader = () => {
  const [results, setResults] = useState<CheckResult[]>([]);
  const [isAllPassed, setIsAllPassed] = useState(false);

  // Update signature to accept html and css
  const runCodeCheck = useCallback((html: string, css: string, testCases: TestCase[]) => {

    // Check if both are empty
    if (!html.trim() && !css.trim()) {
      setResults([]);
      setIsAllPassed(false);
      return;
    }

    // 1. Tạo iframe sandbox
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    // Sandbox attributes: allow-scripts để chạy JS (nếu cần), allow-same-origin để truy cập contentDocument
    iframe.sandbox.add('allow-scripts', 'allow-same-origin');
    document.body.appendChild(iframe);

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) {
        throw new Error("Không thể khởi tạo môi trường kiểm tra (Sandbox Error)");
      }

      // 2. Inject code vào iframe
      doc.open();
      doc.write(html);
      if (css) {
        doc.write(`<style>${css}</style>`);
      }
      doc.close();

      // 3. Chạy vòng lặp qua từng Test Case
      const checkResults: CheckResult[] = testCases.map((tc) => {
        // Lấy script kiểm tra từ trường 'input' (do đã map ở LessonList)
        // Fallback sang 'testCode' nếu có (cho dữ liệu cũ)
        const validationScript = tc.input || (tc as any).testCode;

        if (!validationScript) {
          return { testCaseId: tc.testCaseId, pass: true, message: "Không có bài kiểm tra" };
        }

        try {
          // Tạo hàm kiểm tra, truyền vào 'iframe' để script có thể truy cập contentDocument
          // Script ví dụ: "const el = iframe.contentDocument.querySelector('h1'); return el ? true : 'Thiếu thẻ h1';"
          const checkFunc = new Function('iframe', validationScript);

          // ========== ADDED LOGS ==========
          console.log(`--- Test Case ${tc.testCaseId} ---`);
          console.log("Script nhận được:", validationScript);
          // ================================

          // Chạy hàm kiểm tra
          const result = checkFunc(iframe);

          // ========== ADDED LOGS ==========
          console.log("Result trả về:", result);
          console.log("Type of result:", typeof result);
          // ================================

          // Logic xử lý result MỚI
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

        } catch (err: any) {
          console.error("Lỗi chạy script:", err);
          return {
            testCaseId: tc.testCaseId,
            pass: false,
            message: `❌ Lỗi kịch bản kiểm tra: ${err.message}`
          };
        }
      });

      // 4. Cập nhật State
      setResults(checkResults);

      // Kiểm tra xem đã pass hết chưa
      const allPassed = checkResults.length > 0 && checkResults.every(r => r.pass);
      setIsAllPassed(allPassed);

    } catch (error) {
      console.error("Lỗi hệ thống chấm điểm:", error);
    } finally {
      // 5. Cleanup: Xóa iframe sau khi kiểm tra xong
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }
  }, []);

  // Trả về những gì Component cần
  return {
    results,       // Mảng kết quả chi tiết
    isAllPassed,   // Biến boolean tổng (True/False)
    runCodeCheck,  // Hàm để kích hoạt việc chấm
    resetGrader: () => { setResults([]); setIsAllPassed(false); } // Hàm reset khi chuyển bài
  };
};