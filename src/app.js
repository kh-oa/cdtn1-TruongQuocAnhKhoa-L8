
const express = require("express");
const { randomUUID } = require("node:crypto");

const app = express();

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
      `[INFO] [${requestId}] HTTP ${res.statusCode} - ${duration}ms`
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

// API kiểm tra
app.get("/test-route", (req, res) => {
  res.json({ message: "Route hoat dong" });
});

// Đăng ký API khảo sát
const surveyRoutes = require("./routes/survey.routes");
app.use("/api/surveys", surveyRoutes);

console.log("Survey routes đã được đăng ký");

const errorHandler = require("./middlewares/error.middleware");

// Xử lý lỗi tập trung
app.use(errorHandler);
module.exports = app;
