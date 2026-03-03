# 🎓 Certificate System - Backend Updates (Dec 29, 2025)

## 📋 Tóm tắt thay đổi

Backend đã được cập nhật để fix các vấn đề về certificate generation:
1. ✅ Fix Vietnamese encoding (tiếng Việt bị lỗi)
2. ✅ Bỏ hiển thị Level và Score
3. ✅ Chuyển từ PDFKit sang Puppeteer (PDF đẹp hơn)
4. ✅ Upload PDF lên Cloudinary (thay vì lưu local)

---

## 🔧 Những gì đã thay đổi

### 1. **Certificate Generation Method**

**Trước:**
- Dùng PDFKit (legacy) → Encoding lỗi, không hỗ trợ tiếng Việt tốt
- Lưu PDF local tại `public/certificates/`
- Hiển thị Level và Score

**Sau:**
- Dùng Puppeteer + HTML template → Hỗ trợ tiếng Việt hoàn hảo
- Upload PDF lên Cloudinary
- Không hiển thị Level và Score nữa

---

### 2. **Certificate Response Format**

#### API: `GET /api/certificates/course/:courseId`

**Response mới:**
```json
{
  "success": true,
  "data": {
    "certificateId": "abc-123",
    "certificateCode": "CERT-HTML-2025-123456",
    "userName": "Lê Hồng",              // ✅ Tiếng Việt đúng
    "courseName": "HTML & CSS Cơ bản",  // ✅ Tiếng Việt đúng
    "averageScore": 95.5,
    "issuedAt": "2025-12-29T07:00:00.000Z",
    
    // Modern certificate (Cloudinary)
    "pdfUrl": "https://res.cloudinary.com/.../cert_CERT-HTML-2025-123456.pdf",
    "qrCodeUrl": "https://res.cloudinary.com/.../qr_CERT-HTML-2025-123456.png",
    
    // Legacy (backward compatibility)
    "certificateURL": "/certificates/certificate_xxx.pdf",
    "viewUrl": "/certificates/view/certificate_xxx.pdf"
  }
}
```

---

### 3. **Certificate Template Design**

**Đã bỏ:**
- ❌ Level: Basic - Low
- ❌ Score: 100.0%
- ❌ Footer text: "This certificate is issued by..."

**Giữ lại:**
- ✅ Company name & subtitle
- ✅ Certificate title
- ✅ Recipient name (tên người học)
- ✅ Course name (tên khóa học)
- ✅ Issue date
- ✅ Certificate code
- ✅ QR code (để verify)
- ✅ Signatures

---

## 💻 Frontend Integration

### **Không cần thay đổi gì!**

Frontend code hiện tại vẫn hoạt động bình thường vì:
- Response format không đổi (chỉ thêm `pdfUrl`)
- API endpoints không đổi
- Certificate vẫn có thể xem/tải như cũ

### **Cách hiển thị PDF:**

```tsx
const CertificateCard = ({ certificate }) => {
  // Ưu tiên pdfUrl (Cloudinary), fallback về viewUrl (local)
  const getPdfUrl = () => {
    if (certificate.pdfUrl?.startsWith('http')) {
      return certificate.pdfUrl; // Cloudinary URL
    }
    return `${API_BASE_URL}${certificate.viewUrl}`; // Local URL
  };

  return (
    <div className="certificate-card">
      <h3>{certificate.courseName}</h3>
      <p>Mã: {certificate.certificateCode}</p>
      <p>Điểm: {certificate.averageScore}%</p>
      
      <div className="actions">
        <a href={getPdfUrl()} target="_blank" rel="noopener noreferrer">
          📄 Xem chứng chỉ
        </a>
        <a href={getPdfUrl()} download>
          ⬇️ Tải xuống
        </a>
      </div>
      
      {certificate.qrCodeUrl && (
        <img src={certificate.qrCodeUrl} alt="QR Code" width="100" />
      )}
    </div>
  );
};
```

---

## 🎨 Certificate Design Preview

### **Trước (Legacy PDFKit):**
```
CERTIFICATE OF COMPLETION

This is to certify that

Lê H&£i &&&ng          ← ❌ Encoding lỗi

has successfully completed the course

HTML & CSS C&&&!€6à    ← ❌ Encoding lỗi

Level: Basic - Low | Score: 100.0%  ← ❌ Hiển thị Level/Score

Issued on: December 29, 2025
```

### **Sau (Puppeteer):**
```
CERTIFICATE OF COMPLETION

This is to certify that

Lê Hồng               ← ✅ Tiếng Việt đúng

has successfully completed the course

HTML & CSS Cơ bản     ← ✅ Tiếng Việt đúng

                      ← ✅ Không có Level/Score

Issued on: December 29, 2025
```

---

## 🔍 Debugging

### **Kiểm tra certificate mới:**

1. **Hoàn thành khóa học mới** để trigger certificate generation
2. **Xem logs** trong terminal:

```
📊 Score Calculation: {
  totalScore: 95,
  maxScore: 100,
  averageScore: '95.00',
  submissionsCount: 1
}

🎨 Generating PDF with: {
  userName: 'Lê Hồng',
  courseName: 'HTML & CSS Cơ bản',
  averageScore: 95
}

🎓 Certificate generated with Puppeteer: CERT-HTML-2025-123456
✅ Certificate PDF generated successfully with Puppeteer
```

3. **Kiểm tra response:**
```bash
GET /api/certificates/course/:courseId
```

Response phải có:
- `pdfUrl`: Cloudinary URL (https://res.cloudinary.com/...)
- `userName`: Tiếng Việt đúng
- `courseName`: Tiếng Việt đúng

---

## ⚠️ Important Notes

### **1. Certificate cũ (đã tạo trước)**
- Vẫn dùng legacy format
- Có thể có encoding lỗi
- Có Level/Score
- Lưu local, không có `pdfUrl`

### **2. Certificate mới (tạo sau update)**
- Dùng Puppeteer template
- Tiếng Việt đúng
- Không có Level/Score
- Upload Cloudinary, có `pdfUrl`

### **3. Backward Compatibility**
- API vẫn trả về cả `certificateURL` và `pdfUrl`
- Frontend có thể dùng cả 2
- Ưu tiên `pdfUrl` nếu có

---

## 🚀 Testing Checklist

### **Backend:**
- [x] Build thành công (`npm run build`)
- [x] Server restart không lỗi
- [x] Puppeteer dependencies đã cài
- [x] Cloudinary config đúng

### **Frontend:**
- [ ] Certificate hiển thị tiếng Việt đúng
- [ ] Không có Level/Score
- [ ] PDF có thể xem/tải được
- [ ] QR code hiển thị (nếu có)

---

## 📚 Related Files

### **Backend:**
- `src/services/certificate.service.ts` - Main certificate service
- `src/services/submission.service.ts` - Auto-generate on course completion
- `src/utils/puppeteerPDF.service.ts` - Puppeteer PDF generator
- `src/templates/certificate.template.html` - HTML template
- `src/controllers/certificate.controller.ts` - API controllers
- `src/routes/certificate.route.ts` - API routes

### **Documentation:**
- `docs/CERTIFICATE_SYSTEM_DOCUMENTATION.md` - Full technical docs
- `docs/CERTIFICATE_FRONTEND_GUIDE.md` - Frontend integration guide

---

## 🐛 Troubleshooting

### **Vấn đề: Vẫn thấy encoding lỗi**

**Nguyên nhân:**
- Đang xem certificate cũ (tạo trước update)

**Giải pháp:**
- Hoàn thành khóa học mới để tạo certificate mới
- Hoặc xóa certificate cũ và làm lại quiz

---

### **Vấn đề: PDF không load được**

**Nguyên nhân:**
- Cloudinary chưa config đúng
- Network issue

**Giải pháp:**
- Kiểm tra `.env`: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Xem logs để check upload status

---

### **Vấn đề: Puppeteer lỗi trên production**

**Nguyên nhân:**
- Thiếu Chrome dependencies

**Giải pháp:**
```bash
# Ubuntu/Debian
sudo apt-get install -y chromium-browser fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils
```

---

## 📞 Support

Nếu có vấn đề, check:
1. Server logs
2. Browser console (frontend)
3. Network tab (API responses)
4. Database (certificate records)

**Happy Coding! 🎉**
