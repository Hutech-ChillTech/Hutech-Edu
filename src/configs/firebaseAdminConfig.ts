import * as admin from "firebase-admin";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export let auth: admin.auth.Auth;
export let bucket: any; 

/**
 * Khởi tạo Firebase Admin SDK.
 */
export const initializeFirebaseAdmin = (): void => {
  try {
    const firebaseAdmin = process.env.FIREBASE_ADMIN_SDK_JSON;
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET; 

    if (!firebaseAdmin) throw new Error("FIREBASE_ADMIN_SDK_JSON chưa được cấu hình.");
    if (!storageBucket) throw new Error("FIREBASE_STORAGE_BUCKET chưa được cấu hình.");

    const serviceAccountPath = path.resolve(
      __dirname,
      "skillcoder-b2fac-firebase-adminsdk-fbsvc-35333b9125.json"
    );

    // Kiểm tra để không init 2 lần
    if (!admin.apps.length) {
      const serviceAccount = require(serviceAccountPath);

      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: storageBucket,
      });

      
      auth = admin.auth();
      bucket = admin.storage().bucket();
      
      console.log("✅ Firebase Admin SDK đã khởi tạo thành công.");
    }
  } catch (error: any) {
    console.error("❌ Lỗi Firebase Admin:", error.message);
    process.exit(1);
  }
};

export default admin;