
function errorHandler(err, req, res, next) {
  const status = err.statusCode ?? err.status;

  const statusCode =
    Number.isInteger(status) && status >= 400 && status < 600
      ? status
      : 500;

  const requestId = req.requestId || "unknown";

  // Khong ghi stack trace cho loi phia client (4xx)
  if (statusCode < 500) {
    console.warn(
      `[WARN] [${requestId}] HTTP ${statusCode}`
    );
  } else {
    // Ghi chi tiet loi may chu de phuc vu debug
    console.error(
      `[ERROR] [${requestId}] HTTP ${statusCode}`,
      err
    );
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Loi may chu"
        : err.message || "Yeu cau khong hop le",
    requestId
  });
}

module.exports = errorHandler;
