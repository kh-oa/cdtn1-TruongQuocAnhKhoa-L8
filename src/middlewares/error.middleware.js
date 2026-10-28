
function errorHandler(err, req, res, next) {
  const statusCode =
    err.statusCode >= 400 && err.statusCode < 600
      ? err.statusCode
      : 500;

  console.error(
    `[ERROR] [${req.requestId || "unknown"}]`,
    err.message
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
