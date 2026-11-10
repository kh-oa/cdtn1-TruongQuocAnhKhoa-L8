
function errorHandler(err, req, res, next) {
  const statusCode =
    err.statusCode >= 400 && err.statusCode < 600
      ? err.statusCode
      : 500;

  // Ghi chi tiet loi trong Terminal
  console.error(
    `[ERROR] [${req.requestId || "unknown"}]`,
    err
  );

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Loi may chu"
        : err.message,
    requestId: req.requestId
  });
}

module.exports = errorHandler;
