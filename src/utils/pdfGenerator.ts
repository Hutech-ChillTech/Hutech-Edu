import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface CertificateData {
  userName: string;
  courseName: string;
  level: string;
  subLevel: string;
  totalScore: number;
  issuedDate: Date;
}

export class PDFGenerator {
  /**
   * Tạo Certificate PDF tự động (giống mẫu Cisco)
   */
  static async generateCertificatePDF(
    userId: string,
    courseId: string,
    data: CertificateData
  ): Promise<string> {
    try {
      // Tạo folder certificates nếu chưa có
      const certificatesDir = path.join(__dirname, '../../public/certificates');
      if (!fs.existsSync(certificatesDir)) {
        fs.mkdirSync(certificatesDir, { recursive: true });
      }

      // Tên file PDF
      const fileName = `certificate_${userId}_${courseId}_${Date.now()}.pdf`;
      const filePath = path.join(certificatesDir, fileName);

      // Tạo PDF
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      // Pipe PDF to file
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ===== DESIGN CERTIFICATE (Giống Cisco) =====

      // Background color
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f0f4f8');

      // Outer border (blue)
      doc
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .lineWidth(3)
        .stroke('#2563eb');

      // Inner border (light blue)
      doc
        .rect(40, 40, doc.page.width - 80, doc.page.height - 80)
        .lineWidth(1)
        .stroke('#60a5fa');

      // Logo placeholder (bạn có thể thêm logo sau)
      // const logoPath = path.join(__dirname, '../../public/logo.png');
      // if (fs.existsSync(logoPath)) {
      //   doc.image(logoPath, 350, 60, { width: 100 });
      // }

      // Title
      doc
        .fontSize(28)
        .font('Helvetica-Bold')
        .fillColor('#1e40af')
        .text('CERTIFICATE OF COMPLETION', 0, 100, {
          align: 'center',
        });

      // Subtitle
      doc
        .fontSize(14)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('This is to certify that', 0, 150, {
          align: 'center',
        });

      // User Name (lớn, đậm)
      doc
        .fontSize(36)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text(data.userName, 0, 190, {
          align: 'center',
        });

      // Description
      doc
        .fontSize(14)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('has successfully completed the course', 0, 250, {
          align: 'center',
        });

      // Course Name (lớn, màu xanh)
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text(data.courseName, 0, 290, {
          align: 'center',
        });

      // Level & Score
      doc
        .fontSize(16)
        .font('Helvetica')
        .fillColor('#475569')
        .text(
          `Level: ${data.level} - ${data.subLevel} | Score: ${data.totalScore.toFixed(1)}%`,
          0,
          340,
          {
            align: 'center',
          }
        );

      // Date
      const formattedDate = data.issuedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#64748b')
        .text(`Issued on: ${formattedDate}`, 0, 400, {
          align: 'center',
        });

      // Certificate ID (unique)
      const certificateId = `CERT-${Date.now().toString(36).toUpperCase()}`;
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#94a3b8')
        .text(`Certificate ID: ${certificateId}`, 0, 480, {
          align: 'center',
        });

      // Signature line (left) - Instructor
      doc.moveTo(150, 450).lineTo(300, 450).stroke('#cbd5e1');
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('Instructor Signature', 150, 460, {
          width: 150,
          align: 'center',
        });

      // Signature line (right) - Director
      doc
        .moveTo(doc.page.width - 300, 450)
        .lineTo(doc.page.width - 150, 450)
        .stroke('#cbd5e1');
      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('Director Signature', doc.page.width - 300, 460, {
          width: 150,
          align: 'center',
        });

      // Footer
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#94a3b8')
        .text(
          'This certificate is issued by Hutech-Edu Platform | https://hutech-edu.com',
          0,
          doc.page.height - 40,
          {
            align: 'center',
          }
        );

      // Finalize PDF
      doc.end();

      // Wait for file to be written
      await new Promise<void>((resolve, reject) => {
        stream.on('finish', () => resolve());
        stream.on('error', reject);
      });

      // Return public URL
      const certificateURL = `/certificates/${fileName}`;
      console.log(`📜 Certificate PDF created: ${certificateURL}`);
      
      return certificateURL;
    } catch (error) {
      console.error('Error generating certificate PDF:', error);
      throw error;
    }
  }
}
