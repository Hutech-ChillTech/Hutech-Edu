import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

// Firebase Admin SDK - PHẢI khởi tạo đầu tiên trước khi import các service khác
import { initializeFirebaseAdmin } from "./configs/firebaseAdminConfig";
initializeFirebaseAdmin();

// Tất cả endpoint sẽ được khai báo ở đây
import routes from "./routes/site.route";

import { connectPostgresDB } from "./configs/database.config";

// Tất cả error sẽ được truyền về middleware
import { errorHandler } from "./middlewares/errorHandler.middleware";

// Rate limiting
import { generalLimiter } from "./middlewares/rateLimiter.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));

// Apply rate limiting cho tất cả routes
app.use("/api", generalLimiter);

routes(app);

app.use(errorHandler);

// Kiểm tra kết nối đến database
connectPostgresDB();

export default app;
