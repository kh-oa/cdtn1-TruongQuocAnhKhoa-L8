
const express = require("express");
const cors = require("cors");
const { randomUUID } = require("node:crypto");

const app = express();

// Gioi han CORS theo danh sach frontend duoc phep
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    }
  })
);

app.use(express.json());

// Ghi log API, khong ghi query parameters
app.use((req, res, next) => {
  const requestId = randomUUID();
  const start = Date.now();

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  // req.path khong chua query string
  console.info(
    `[INFO] [${requestId}] ${req.method} ${req.path}`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.info(
      `[INFO] [${requestId}] HTTP ${res.statusCode} ${duration}ms`
    );
  });

  next();
});

// Kiem tra Backend
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "L8 CSAT/NPS API is running"
  });
});

// Dang ky Auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/auth", authRoutes);
console.log("Auth routes da duoc dang ky thanh cong");

// Dang ky Survey Routes
const surveyRoutes = require("./routes/survey.routes");
app.use("/api/v1/surveys", surveyRoutes);
console.log("Survey routes da duoc dang ky thanh cong");

// Dang ky Warranty Routes
const { requireAuth } = require("./middlewares/auth.middleware");

const warrantyRoutes = require("./routes/warranty.routes");
app.use("/api/v1/warranty-tickets", requireAuth, warrantyRoutes);
console.log("Warranty routes da duoc dang ky thanh cong");

// Xu ly loi tap trung
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
