# Certificate API - Frontend Integration Guide

## 📋 API Endpoints

### 1. Lấy certificate của một course
```
GET /api/certificates/course/:courseId
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "certificateId": "uuid",
    "certificateCode": "CERT-FSWD-2025-123456",
    "userName": "Nguyễn Văn A",
    "courseName": "Full Stack Development",
    "averageScore": 95.5,
    "issuedAt": "2025-12-29T07:00:00.000Z",
    
    // Modern certificate (Cloudinary)
    "pdfUrl": "https://res.cloudinary.com/.../cert.pdf",
    "qrCodeUrl": "https://res.cloudinary.com/.../qr.png",
    
    // Legacy certificate (local file)
    "certificateURL": "/certificates/certificate_xxx.pdf",
    "viewUrl": "/certificates/view/certificate_xxx.pdf"
  }
}
```

### 2. Lấy tất cả certificates của user
```
GET /api/certificates/my-certificates
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    { /* certificate object */ },
    { /* certificate object */ }
  ]
}
```

### 3. Xem PDF certificate
```
GET /api/certificates/view/:filename
Public route - không cần authentication
```

---

## 💻 Frontend Implementation

### React/TypeScript Example

```tsx
import { useState, useEffect } from 'react';

interface Certificate {
  certificateId: string;
  certificateCode: string;
  userName: string;
  courseName: string;
  averageScore: number;
  issuedAt: string;
  pdfUrl?: string;
  qrCodeUrl?: string;
  certificateURL?: string;
  viewUrl?: string;
}

// Component hiển thị certificate
const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  // Ưu tiên: pdfUrl (Cloudinary) > viewUrl (local)
  const pdfLink = certificate.pdfUrl || certificate.viewUrl;
  
  // Nếu pdfUrl là Cloudinary URL → Dùng trực tiếp
  // Nếu viewUrl là local path → Thêm base URL
  const fullPdfUrl = certificate.pdfUrl?.startsWith('http') 
    ? certificate.pdfUrl 
    : `${import.meta.env.VITE_API_URL}${certificate.viewUrl}`;

  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <h3>{certificate.courseName}</h3>
        <span className="certificate-code">{certificate.certificateCode}</span>
      </div>
      
      <div className="certificate-details">
        <p>Người nhận: {certificate.userName}</p>
        <p>Điểm số: {certificate.averageScore}%</p>
        <p>Ngày cấp: {new Date(certificate.issuedAt).toLocaleDateString('vi-VN')}</p>
      </div>
      
      <div className="certificate-actions">
        <a 
          href={fullPdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          📄 Xem chứng chỉ
        </a>
        
        <a 
          href={fullPdfUrl} 
          download={`certificate-${certificate.certificateCode}.pdf`}
          className="btn btn-secondary"
        >
          ⬇️ Tải xuống
        </a>
      </div>
      
      {certificate.qrCodeUrl && (
        <div className="qr-code">
          <img src={certificate.qrCodeUrl} alt="QR Code" width="100" />
          <p>Quét để xác thực</p>
        </div>
      )}
    </div>
  );
};

// Page hiển thị tất cả certificates
const MyCertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/certificates/my-certificates`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="certificates-page">
      <h1>🎓 Chứng chỉ của tôi</h1>
      
      {certificates.length === 0 ? (
        <div className="empty-state">
          <p>Bạn chưa có chứng chỉ nào</p>
          <p>Hoàn thành khóa học để nhận chứng chỉ!</p>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map(cert => (
            <CertificateCard key={cert.certificateId} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCertificatesPage;
```

---

## 🎨 CSS Example

```css
.certificates-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.certificate-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.certificate-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.certificate-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.certificate-header h3 {
  margin: 0 0 0.5rem 0;
  color: #1a1a1a;
  font-size: 1.25rem;
}

.certificate-code {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #666;
  font-family: monospace;
}

.certificate-details {
  margin-bottom: 1.5rem;
}

.certificate-details p {
  margin: 0.5rem 0;
  color: #666;
}

.certificate-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #f0f0f0;
  color: #1a1a1a;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.qr-code {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.qr-code img {
  border: 2px solid #d4af37;
  border-radius: 8px;
  padding: 0.5rem;
  background: white;
}

.qr-code p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #999;
}
```

---

## ⚠️ Important Notes

### 1. URL Construction
- **Cloudinary URLs** (`pdfUrl`): Dùng trực tiếp, đã có full URL
- **Local URLs** (`viewUrl`): Cần thêm base URL của API

```typescript
const getPdfUrl = (certificate: Certificate) => {
  if (certificate.pdfUrl?.startsWith('http')) {
    return certificate.pdfUrl; // Cloudinary
  }
  return `${API_BASE_URL}${certificate.viewUrl}`; // Local
};
```

### 2. Authentication
- `GET /api/certificates/my-certificates` - **Cần token**
- `GET /api/certificates/course/:courseId` - **Cần token**
- `GET /api/certificates/view/:filename` - **Public** (không cần token)

### 3. Error Handling
```typescript
try {
  const response = await fetch(url, { headers });
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message);
  }
  
  return data.data;
} catch (error) {
  console.error('Certificate error:', error);
  // Show error to user
}
```

---

## 🚀 Quick Start

1. **Fetch certificates:**
   ```typescript
   const certs = await fetchCertificates();
   ```

2. **Display certificate:**
   ```tsx
   <CertificateCard certificate={cert} />
   ```

3. **Download PDF:**
   ```tsx
   <a href={pdfUrl} download>Download</a>
   ```

That's it! 🎉
