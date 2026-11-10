
function errorHandler(err, req, res, next) {
  const status = err.statusCode ?? err.status;

  const statusCode =
    Number.isInteger(status) && status >= 400 && status < 600
      ? status
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
