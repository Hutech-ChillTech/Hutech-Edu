import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

dotenv.config();

// Firebase Admin SDK - PHẢI khởi tạo đầu tiên trước khi import các service khác
import { initializeFirebaseAdmin } from "./configs/firebaseAdminConfig";
initializeFirebaseAdmin();

// 📊 Initialize Redis & Metrics (phải import sớm để các service khác có thể dùng)
import "./configs/redis.config"; // Initialize Redis connection
import "./configs/metrics.config"; // Initialize Prometheus metrics

// Tất cả endpoint sẽ được khai báo ở đây
import routes from "./routes/site.route";

import { connectPostgresDB } from "./configs/database.config";

// Tất cả error sẽ được truyền về middleware
import { errorHandler } from "./middlewares/errorHandler.middleware";

// Rate limiting
import { generalLimiter } from "./middlewares/rateLimiter.middleware";

// 📊 Metrics middleware
import { metricsMiddleware, metricsEndpoint } from "./middlewares/metrics.middleware";

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

// 📁 Serve static files từ thư mục public
app.use(express.static(path.join(__dirname, "../public")));

// 📊 Metrics middleware - PHẢI đặt trước routes để track tất cả requests
app.use(metricsMiddleware);

// 📊 Metrics endpoint cho Prometheus scraping
// Endpoint này KHÔNG cần authentication để Prometheus có thể access
app.get("/metrics", metricsEndpoint);

// Apply rate limiting cho tất cả routes
app.use("/api", generalLimiter);

routes(app);

app.use(errorHandler);

// Kiểm tra kết nối đến database
connectPostgresDB();

export default app;
