
const express = require("express");
const cors = require("cors");
const { randomUUID } = require("node:crypto");

const app = express();

// Kích hoạt CORS
app.use(cors());
app.use(express.json());

// Ghi log mỗi yêu cầu API
app.use((req, res, next) => {
  const requestId = randomUUID();
  const start = Date.now();

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  console.info(
    `[INFO] [${requestId}] ${req.method} ${req.originalUrl}`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.info(
      `[INFO] [${requestId}] HTTP ${res.statusCode} ${duration}ms`
    );
  });

  next();
});

// Kiểm tra Backend
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "L8 CSAT/NPS API is running"
  });
});

// Đăng ký Auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/auth", authRoutes);
console.log("Auth routes đã được đăng ký thành công");

// Đăng ký Survey Routes
const surveyRoutes = require("./routes/survey.routes");
app.use("/api/v1/surveys", surveyRoutes);
console.log("Survey routes đã được đăng ký thành công");

// Đăng ký Warranty Routes
const { requireAuth } = require("./middlewares/auth.middleware");

const warrantyRoutes = require("./routes/warranty.routes");
app.use("/api/v1/warranty-tickets", requireAuth, warrantyRoutes);
console.log("Warranty routes đã được đăng ký thành công");

// Xử lý lỗi tập trung
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
