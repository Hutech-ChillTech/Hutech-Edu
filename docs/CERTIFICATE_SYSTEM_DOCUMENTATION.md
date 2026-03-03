# 🎓 Certificate System - Tài liệu chi tiết

## 📋 Mục lục
1. [Tổng quan hệ thống](#tổng-quan-hệ-thống)
2. [Kiến trúc và Flow](#kiến-trúc-và-flow)
3. [Database Schema](#database-schema)
4. [Backend Implementation](#backend-implementation)
5. [PDF Generation](#pdf-generation)
6. [API Endpoints](#api-endpoints)
7. [Frontend Integration](#frontend-integration)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Tổng quan hệ thống

### Mục đích
Hệ thống Certificate tự động cấp chứng chỉ cho học viên khi hoàn thành 100% khóa học, bao gồm:
- ✅ Tất cả bài học (lessons)
- ✅ Tất cả bài quiz với điểm đạt yêu cầu

### Tính năng chính
1. **Tự động cấp certificate** khi hoàn thành khóa học
2. **Generate PDF đẹp** với template HTML/CSS + Puppeteer
3. **Upload lên Cloudinary** để lưu trữ lâu dài
4. **QR Code xác thực** để verify certificate
5. **Xem/Tải certificate** bất cứ lúc nào
6. **Hỗ trợ legacy certificates** (PDF local) và modern certificates (Cloudinary)

---

## 🏗️ Kiến trúc và Flow

### Flow tổng quan

```
User hoàn thành quiz
        ↓
submission.service.ts: submitQuiz()
        ↓
Kiểm tra progress = 100%?
        ↓ YES
Kiểm tra đã có certificate?
        ↓ NO
Generate PDF với Puppeteer
        ↓
Upload PDF lên Cloudinary
        ↓
Generate QR Code
        ↓
Upload QR Code lên Cloudinary
        ↓
Lưu certificate vào database
        ↓
Trả về certificate cho frontend
```

### Luồng chi tiết

#### 1️⃣ **User submit quiz** (`submission.service.ts`)

```typescript
// File: src/services/submission.service.ts
async submitQuiz(data: { userId, chapterQuizId, answers }) {
  // 1. Cho phép làm lại quiz (xóa submission cũ)
  const existingSubmission = await hasUserSubmittedQuiz(userId, chapterQuizId);
  if (existingSubmission) {
    await deleteSubmission(existingSubmission.submissionId);
  }

  // 2. Lấy quiz và tính điểm
  const quiz = await findByIdWithDetails(chapterQuizId);
  let score = calculateScore(quiz, answers);
  const isPassed = (score / maxScore * 100) >= passingScore;

  // 3. Lưu submission
  const submission = await createSubmission({ userId, chapterQuizId, score, isPassed });

  // 4. Kiểm tra progress = 100%
  const progress = await calculateCourseProgress(userId, courseId);
  
  if (progress >= 100) {
    // 5. Kiểm tra đã có certificate chưa
    const existingCert = await prisma.certificate.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (!existingCert) {
      // 6. Tạo certificate mới
      await createCertificate(userId, courseId);
    }
  }

  return { submission, isPassed, courseCompleted: progress >= 100 };
}
```

#### 2️⃣ **Generate Certificate** (`certificate.service.ts`)

```typescript
// File: src/services/certificate.service.ts
async issueCertificate(userId: string, courseId: string) {
  // 1. Kiểm tra đã có certificate chưa
  const existingCert = await getCertificateByUserAndCourse(userId, courseId);
  if (existingCert) {
    // Trả về certificate hiện có (không throw error)
    return { ...existingCert, alreadyIssued: true };
  }

  // 2. Kiểm tra điều kiện (100% lessons + pass all quizzes)
  const eligibility = await checkEligibility(userId, courseId);
  if (!eligibility.eligible) {
    throw new Error(eligibility.reason);
  }

  // 3. Lấy thông tin user và course
  const [user, course] = await Promise.all([
    prisma.user.findUnique({ where: { userId } }),
    prisma.course.findUnique({ where: { courseId } })
  ]);

  // 4. Tính điểm trung bình
  const submissions = await getSubmissionsByUserAndCourse(userId, courseId);
  const averageScore = calculateAverageScore(submissions);

  // 5. Generate certificate code
  const certificateCode = PDFGenerator.generateCertificateCode(course.courseName);
  // → "CERT-FSWD-2025-123456"

  // 6. Generate PDF với Puppeteer
  const { PuppeteerPDFService } = await import("../utils/puppeteerPDF.service.js");
  const pdfBuffer = await PuppeteerPDFService.generateCertificatePDF({
    userName: user.userName,
    courseName: course.courseName,
    certificateCode,
    issuedAt: new Date(),
    averageScore,
    companyName: "HUTECH EDUCATION",
    companySubtitle: "Online Learning Platform"
  });

  // 7. Upload PDF lên Cloudinary
  const pdfUrl = await PDFGenerator.uploadPDFToCloudinary(pdfBuffer, certificateCode);

  // 8. Generate và upload QR Code
  const qrCodeDataUrl = await PDFGenerator.generateQRCode(certificateCode);
  const qrCodeUrl = await PDFGenerator.uploadQRCodeToCloudinary(qrCodeDataUrl, certificateCode);

  // 9. Lưu vào database
  const certificate = await certificateRepository.createCertificate({
    userId,
    courseId,
    certificateCode,
    userName: user.userName,
    courseName: course.courseName,
    certificateTitle: `Chứng chỉ hoàn thành khóa học ${course.courseName}`,
    averageScore,
    totalScore,
    maxScore,
    pdfUrl,        // Cloudinary URL
    qrCodeUrl,     // Cloudinary URL
    status: "valid"
  });

  return {
    success: true,
    certificateId: certificate.certificateId,
    certificateCode: certificate.certificateCode,
    pdfUrl: certificate.pdfUrl,
    qrCodeUrl: certificate.qrCodeUrl,
    message: `Chúc mừng! Bạn đã nhận được certificate với điểm ${averageScore.toFixed(2)}%`,
    alreadyIssued: false
  };
}
```

#### 3️⃣ **Generate PDF với Puppeteer** (`puppeteerPDF.service.ts`)

```typescript
// File: src/utils/puppeteerPDF.service.ts
static async generateCertificatePDF(data: PuppeteerCertificateData): Promise<Buffer> {
  // 1. Đọc HTML template
  let html = fs.readFileSync('./src/templates/certificate.template.html', 'utf-8');

  // 2. Generate QR Code
  const qrCode = await this.generateQRCode(data.certificateCode);

  // 3. Replace placeholders
  html = html.replace('{{USER_NAME}}', data.userName);
  html = html.replace('{{COURSE_NAME}}', data.courseName);
  html = html.replace('{{CERTIFICATE_CODE}}', data.certificateCode);
  html = html.replace('{{SCORE}}', data.averageScore.toFixed(2));
  html = html.replace('{{QR_CODE}}', qrCode);
  // ... replace all placeholders

  // 4. Launch Puppeteer
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 5. Set HTML content
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // 6. Generate PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}
```

---

## 💾 Database Schema

### Certificate Model

```prisma
model Certificate {
  certificateId    String @id @default(uuid()) @db.Uuid
  certificateCode  String @unique                // "CERT-FSWD-2025-123456"
  certificateTitle String?
  userId           String @db.Uuid
  userName         String                        // Cached từ User
  courseId         String @db.Uuid
  courseName       String                        // Cached từ Course
  
  // URLs
  certificateURL   String?                       // Legacy: "/certificates/cert.pdf"
  pdfUrl           String?                       // Modern: "https://cloudinary.com/.../cert.pdf"
  qrCodeUrl        String?                       // "https://cloudinary.com/.../qr.png"
  
  // Scores
  averageScore     Float?                        // 95.5%
  totalScore       Float?                        // Tổng điểm đạt được
  maxScore         Float?                        // Tổng điểm tối đa
  
  // Status
  status           String @default("valid")      // "valid" | "revoked"
  
  // Timestamps
  issuedAt         DateTime @default(now())
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt

  user       User   @relation(fields: [userId], references: [userId])
  course     Course @relation(fields: [courseId], references: [courseId])

  @@unique([userId, courseId])  // Mỗi user chỉ có 1 certificate/course
  @@index([certificateCode])
}
```

### Ý nghĩa các fields

| Field | Type | Mô tả |
|-------|------|-------|
| `certificateCode` | String | Mã chứng chỉ unique, dùng để verify |
| `pdfUrl` | String | URL của PDF trên Cloudinary (modern) |
| `certificateURL` | String | Path local của PDF (legacy, deprecated) |
| `qrCodeUrl` | String | URL của QR code để verify |
| `averageScore` | Float | Điểm trung bình tất cả quiz (%) |
| `status` | String | "valid" hoặc "revoked" |

---

## 🔧 Backend Implementation

### 1. Repository Layer

```typescript
// File: src/repositories/certificate.repository.ts
export class CertificateRepository {
  // Tạo certificate mới
  async createCertificate(data: {
    userId: string;
    courseId: string;
    certificateCode: string;
    userName: string;
    courseName: string;
    pdfUrl?: string;
    qrCodeUrl?: string;
    averageScore: number;
    // ...
  }): Promise<Certificate> {
    return this.prisma.certificate.create({ data });
  }

  // Lấy certificate của user trong course
  async getCertificateByUserAndCourse(
    userId: string, 
    courseId: string
  ): Promise<Certificate | null> {
    return this.prisma.certificate.findFirst({
      where: { userId, courseId }
    });
  }

  // Lấy tất cả certificates của user
  async getCertificatesByUser(userId: string): Promise<Certificate[]> {
    return this.prisma.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: 'desc' }
    });
  }
}
```

### 2. Service Layer

```typescript
// File: src/services/certificate.service.ts
export class CertificateService {
  // Helper: Normalize URL cho cả legacy và modern certificates
  private normalizeCertificateURL(cert: any): any {
    if (!cert) return cert;

    // Nếu đã có pdfUrl (Cloudinary) → OK
    if (cert.pdfUrl?.startsWith('http')) {
      return cert;
    }

    // Nếu chỉ có certificateURL (legacy) → Tạo viewUrl
    if (cert.certificateURL && !cert.pdfUrl) {
      const filename = cert.certificateURL.split('/').pop();
      cert.viewUrl = `/certificates/view/${filename}`;
    }

    return cert;
  }

  // Lấy certificate và normalize URL
  async getUserCertificateInCourse(userId: string, courseId: string) {
    const certificate = await this.certificateRepository
      .getCertificateByUserAndCourse(userId, courseId);
    
    if (!certificate) {
      throw new Error("Bạn chưa nhận certificate cho khóa học này!");
    }

    return this.normalizeCertificateURL(certificate);
  }

  // Lấy tất cả certificates
  async getUserCertificates(userId: string) {
    const certificates = await this.certificateRepository
      .getCertificatesByUser(userId);
    
    return certificates.map(cert => this.normalizeCertificateURL(cert));
  }
}
```

### 3. Controller Layer

```typescript
// File: src/controllers/certificate.controller.ts
export class CertificateController {
  // Cấp certificate
  issueCertificate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      const { courseId } = req.params;

      const result = await this.certificateService.issueCertificate(userId, courseId);

      return sendSuccess(res, result, result.message, 201);
    } catch (error) {
      next(error);
    }
  };

  // Lấy certificate của course
  getCertificateInCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.userId;
      const { courseId } = req.params;

      const certificate = await this.certificateService
        .getUserCertificateInCourse(userId, courseId);

      return sendSuccess(res, certificate, "Lấy certificate thành công");
    } catch (error) {
      next(error);
    }
  };

  // Xem PDF file
  viewCertificatePDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params;

      // Validate filename (security)
      if (filename.includes("..") || filename.includes("/")) {
        return sendError(res, "Invalid filename", 400);
      }

      const filePath = path.join(__dirname, "../../public/certificates", filename);
      
      if (!fs.existsSync(filePath)) {
        return sendError(res, "Certificate file not found", 404);
      }

      // Set headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

      // Stream file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      next(error);
    }
  };
}
```

### 4. Routes

```typescript
// File: src/routes/certificate.route.ts
const router = Router();

// Xem PDF (public, phải đặt trước)
router.get("/view/:filename", readLimiter, certificateController.viewCertificatePDF);

// Cấp certificate (authenticated)
router.post("/issue/:courseId", authenticate, createLimiter, certificateController.issueCertificate);

// Lấy certificate của course (authenticated)
router.get("/course/:courseId", authenticate, readLimiter, certificateController.getCertificateInCourse);

// Lấy tất cả certificates (authenticated)
router.get("/my-certificates", authenticate, readLimiter, certificateController.getMyCertificates);

export default router;
```

---

## 🎨 PDF Generation

### HTML Template

```html
<!-- File: src/templates/certificate.template.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    .certificate-container {
      width: 297mm;
      height: 210mm;
      background: linear-gradient(135deg, #fdfbfb 0%, #f7f4f1 100%);
      position: relative;
      padding: 40px;
    }

    .border-outer {
      border: 3px solid #d4af37;
      border-radius: 10px;
    }

    .title {
      font-size: 64px;
      font-weight: bold;
      color: #2c2c2c;
      text-align: center;
      letter-spacing: 4px;
    }

    .recipient-name {
      font-size: 52px;
      color: #1e3a8a;
      font-family: 'Brush Script MT', cursive;
      text-align: center;
      font-style: italic;
    }

    /* ... more styles ... */
  </style>
</head>
<body>
  <div class="certificate-container">
    <div class="border-outer"></div>
    
    <div class="ribbon">
      <div class="company-name">{{COMPANY_NAME}}</div>
    </div>

    <div class="title">CERTIFICATE</div>
    <div class="recipient-name">{{USER_NAME}}</div>
    <div class="course-name">{{COURSE_NAME}}</div>
    <div class="score">Final Score: {{SCORE}}%</div>

    <div class="qr-code">
      <img src="{{QR_CODE}}" alt="QR Code">
    </div>

    <div class="certificate-code">
      Certificate Code: {{CERTIFICATE_CODE}}
    </div>
  </div>
</body>
</html>
```

### Puppeteer Service

```typescript
// File: src/utils/puppeteerPDF.service.ts
export class PuppeteerPDFService {
  // Generate QR Code
  private static async generateQRCode(certificateCode: string): Promise<string> {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-certificate/${certificateCode}`;
    return await QRCode.toDataURL(verifyUrl, { width: 200 });
  }

  // Replace template placeholders
  private static async prepareHTML(data: PuppeteerCertificateData): Promise<string> {
    let html = fs.readFileSync(this.templatePath, 'utf-8');

    const qrCode = await this.generateQRCode(data.certificateCode);
    const formattedDate = new Date(data.issuedAt).toLocaleDateString('en-US');

    const replacements = {
      '{{COMPANY_NAME}}': data.companyName || 'HUTECH EDUCATION',
      '{{USER_NAME}}': data.userName,
      '{{COURSE_NAME}}': data.courseName,
      '{{CERTIFICATE_CODE}}': data.certificateCode,
      '{{ISSUE_DATE}}': formattedDate,
      '{{YEAR}}': new Date().getFullYear().toString(),
      '{{QR_CODE}}': qrCode,
      '{{SCORE}}': data.averageScore?.toFixed(2) || ''
    };

    Object.entries(replacements).forEach(([key, value]) => {
      html = html.replace(new RegExp(key, 'g'), value);
    });

    return html;
  }

  // Generate PDF
  static async generateCertificatePDF(data: PuppeteerCertificateData): Promise<Buffer> {
    const html = await this.prepareHTML(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
```

### Upload to Cloudinary

```typescript
// File: src/utils/pdfGenerator.ts
export class PDFGenerator {
  // Upload PDF
  static async uploadPDFToCloudinary(pdfBuffer: Buffer, certificateCode: string): Promise<string> {
    // Tạo file tạm
    const tempFilePath = path.join(__dirname, `../../temp_${certificateCode}.pdf`);
    fs.writeFileSync(tempFilePath, pdfBuffer);

    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'certificates/pdfs',
      public_id: `cert_${certificateCode}`,
      resource_type: 'raw',
      overwrite: true
    });

    // Xóa file tạm
    fs.unlinkSync(tempFilePath);

    return result.secure_url;
    // → "https://res.cloudinary.com/.../cert_CERT-FSWD-2025-123456.pdf"
  }

  // Upload QR Code
  static async uploadQRCodeToCloudinary(qrCodeDataUrl: string, certificateCode: string): Promise<string> {
    const result = await cloudinary.uploader.upload(qrCodeDataUrl, {
      folder: 'certificates/qrcodes',
      public_id: `qr_${certificateCode}`,
      overwrite: true
    });

    return result.secure_url;
    // → "https://res.cloudinary.com/.../qr_CERT-FSWD-2025-123456.png"
  }

  // Generate certificate code
  static generateCertificateCode(courseName: string): string {
    const coursePrefix = courseName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 4);

    const year = new Date().getFullYear();
    const randomNum = Math.floor(100000 + Math.random() * 900000);

    return `CERT-${coursePrefix}-${year}-${randomNum}`;
    // → "CERT-FSWD-2025-123456"
  }
}
```

---

## 🌐 API Endpoints

### 1. POST /api/certificates/issue/:courseId
**Cấp certificate cho user**

**Request:**
```http
POST /api/certificates/issue/fe9a3316-90ac-4dd3-bdcc-0f2e60f5d1c7
Authorization: Bearer <token>
```

**Response (Success - New Certificate):**
```json
{
  "success": true,
  "data": {
    "certificateId": "abc-123",
    "certificateCode": "CERT-FSWD-2025-123456",
    "pdfUrl": "https://res.cloudinary.com/.../cert.pdf",
    "qrCodeUrl": "https://res.cloudinary.com/.../qr.png",
    "message": "Chúc mừng! Bạn đã nhận được certificate với điểm 95.50%",
    "alreadyIssued": false
  }
}
```

**Response (Already Issued):**
```json
{
  "success": true,
  "data": {
    "certificateId": "abc-123",
    "certificateCode": "CERT-FSWD-2025-123456",
    "pdfUrl": "https://res.cloudinary.com/.../cert.pdf",
    "qrCodeUrl": "https://res.cloudinary.com/.../qr.png",
    "message": "Bạn đã nhận certificate này rồi! Điểm: 95.50%",
    "alreadyIssued": true
  }
}
```

**Response (Not Eligible):**
```json
{
  "success": false,
  "message": "Bạn cần hoàn thành 100% bài học. Hiện tại: 75.0%"
}
```

---

### 2. GET /api/certificates/course/:courseId
**Lấy certificate của user trong course**

**Request:**
```http
GET /api/certificates/course/fe9a3316-90ac-4dd3-bdcc-0f2e60f5d1c7
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "certificateId": "abc-123",
    "certificateCode": "CERT-FSWD-2025-123456",
    "userName": "Nguyễn Văn A",
    "courseName": "Full Stack Development",
    "averageScore": 95.5,
    "issuedAt": "2025-12-29T07:00:00.000Z",
    "pdfUrl": "https://res.cloudinary.com/.../cert.pdf",
    "qrCodeUrl": "https://res.cloudinary.com/.../qr.png",
    "status": "valid"
  },
  "message": "Lấy certificate thành công"
}
```

---

### 3. GET /api/certificates/my-certificates
**Lấy tất cả certificates của user**

**Request:**
```http
GET /api/certificates/my-certificates
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "certificateId": "abc-123",
      "certificateCode": "CERT-FSWD-2025-123456",
      "courseName": "Full Stack Development",
      "averageScore": 95.5,
      "issuedAt": "2025-12-29T07:00:00.000Z",
      "pdfUrl": "https://res.cloudinary.com/.../cert.pdf",
      "course": {
        "courseId": "fe9a3316-...",
        "courseName": "Full Stack Development",
        "avatarURL": "https://..."
      }
    },
    {
      "certificateId": "def-456",
      "certificateCode": "CERT-REAC-2025-789012",
      "courseName": "React Advanced",
      "averageScore": 88.0,
      "issuedAt": "2025-12-20T07:00:00.000Z",
      "viewUrl": "/certificates/view/certificate_xxx.pdf"
    }
  ],
  "message": "Lấy danh sách certificates thành công"
}
```

---

### 4. GET /api/certificates/view/:filename
**Xem/Tải PDF certificate (local storage)**

**Request:**
```http
GET /api/certificates/view/certificate_d987384a_fe9a3316_1766981612731.pdf
```

**Response:**
```
Content-Type: application/pdf
Content-Disposition: inline; filename="certificate_xxx.pdf"

[PDF Binary Data]
```

---

## 💻 Frontend Integration

### React Component Example

```tsx
import { useState, useEffect } from 'react';

const MyCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates/my-certificates', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPdfUrl = (cert) => {
    // Ưu tiên pdfUrl (Cloudinary), fallback về viewUrl (local)
    if (cert.pdfUrl?.startsWith('http')) {
      return cert.pdfUrl;
    }
    return `${import.meta.env.VITE_API_URL}${cert.viewUrl}`;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="certificates-page">
      <h1>🎓 Chứng chỉ của tôi</h1>
      
      <div className="certificates-grid">
        {certificates.map(cert => (
          <div key={cert.certificateId} className="certificate-card">
            <h3>{cert.courseName}</h3>
            <p>Mã: {cert.certificateCode}</p>
            <p>Điểm: {cert.averageScore}%</p>
            <p>Ngày: {new Date(cert.issuedAt).toLocaleDateString()}</p>
            
            <div className="actions">
              <a href={getPdfUrl(cert)} target="_blank" rel="noopener noreferrer">
                📄 Xem
              </a>
              <a href={getPdfUrl(cert)} download>
                ⬇️ Tải
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🐛 Troubleshooting

### Vấn đề 1: Lỗi 500 khi làm lại quiz đã PASSED

**Nguyên nhân:**
- Backend throw error "Bạn đã nhận certificate cho khóa học này rồi!"

**Giải pháp:**
- ✅ Đã fix: `issueCertificate()` giờ trả về certificate hiện có thay vì throw error
- Response có field `alreadyIssued: true` để frontend biết

---

### Vấn đề 2: Lỗi 400 "Invalid certificateId format"

**Nguyên nhân:**
- Frontend gọi `/api/certificates/certificate_xxx.pdf` (filename) thay vì UUID
- Route `/:certificateId` validate UUID và reject filename

**Giải pháp:**
- ✅ Đã thêm route `/view/:filename` để serve PDF files
- Frontend dùng `viewUrl` thay vì gọi trực tiếp filename

---

### Vấn đề 3: Lỗi 404 `/api/api/certificates/view/...`

**Nguyên nhân:**
- Backend trả về `viewUrl = "/api/certificates/view/..."`
- Frontend có base URL = `/api/`
- Kết quả: `/api/` + `/api/certificates/view/...` = `/api/api/...` ❌

**Giải pháp:**
- ✅ Đã fix: Backend giờ trả về `viewUrl = "/certificates/view/..."` (không có `/api/`)
- Frontend tự thêm base URL: `/api/` + `/certificates/view/...` = `/api/certificates/view/...` ✅

---

### Vấn đề 4: Certificate cũ không có pdfUrl

**Nguyên nhân:**
- Certificate cũ được tạo bằng legacy method, chỉ có `certificateURL` (local path)
- Không có `pdfUrl` (Cloudinary URL)

**Giải pháp:**
- ✅ Đã thêm `normalizeCertificateURL()` helper
- Tự động tạo `viewUrl` cho legacy certificates
- Frontend dùng `pdfUrl || viewUrl`

---

### Vấn đề 5: Puppeteer không chạy trên production

**Nguyên nhân:**
- Thiếu Chrome dependencies trên server

**Giải pháp:**
```bash
# Ubuntu/Debian
sudo apt-get install -y \
  chromium-browser \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils

# Hoặc dùng Docker với Puppeteer image
FROM ghcr.io/puppeteer/puppeteer:latest
```

---

## 📚 Tài liệu tham khảo

- [Puppeteer Documentation](https://pptr.dev/)
- [Cloudinary Upload API](https://cloudinary.com/documentation/upload_images)
- [QRCode.js](https://github.com/soldair/node-qrcode)
- [PDFKit Documentation](https://pdfkit.org/)

---

## 🎉 Kết luận

Hệ thống Certificate đã hoàn chỉnh với:
- ✅ Tự động cấp certificate khi hoàn thành khóa học
- ✅ Generate PDF đẹp với Puppeteer
- ✅ Upload lên Cloudinary
- ✅ QR Code xác thực
- ✅ Hỗ trợ cả legacy và modern certificates
- ✅ API đầy đủ cho frontend
- ✅ Error handling tốt

**Happy Coding! 🚀**
