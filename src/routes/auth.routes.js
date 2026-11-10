
const express = require("express");

const router = express.Router();

// Kiem tra API auth
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth API dang hoat dong"
  });
});

module.exports = router;
