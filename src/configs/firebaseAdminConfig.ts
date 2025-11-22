import admin from "firebase-admin";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

/**
 * Khởi tạo Firebase Admin SDK.
 * Hỗ trợ cả Service Account File và Environment Variables
 */
export const initializeFirebaseAdmin = (): void => {
  try {
    // Nếu đã khởi tạo rồi thì bỏ qua
    if (admin.apps.length > 0) {
      console.log("✅ Firebase Admin SDK đã được khởi tạo trước đó.");
      return;
    }

    const firebaseAdmin = process.env.FIREBASE_ADMIN_SDK_JSON;

    if (!firebaseAdmin) {
      console.warn(
        "⚠️ FIREBASE_ADMIN_SDK_JSON chưa được cấu hình. Bỏ qua Firebase Authentication."
      );
      return;
    }

    // Sử dụng đường dẫn từ root của project (process.cwd())
    const serviceAccountPath = path.resolve(
      process.cwd(),
      firebaseAdmin || "./src/configs/serviceAccountKey.json"
    );

    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
    });

    console.log("✅ Firebase Admin SDK đã khởi tạo thành công.");
  } catch (error: any) {
    console.warn("⚠️ Không thể khởi tạo Firebase Admin:", error.message);
    console.warn("   Chức năng Firebase Authentication sẽ không khả dụng.");
  }
};

export default admin;
