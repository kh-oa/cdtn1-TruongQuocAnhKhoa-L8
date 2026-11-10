
const express = require("express");
const router = express.Router();

const authService = require("../services/auth.service");

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth API dang hoat dong"
  });
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const data = await authService.login(username, password);

    res.status(200).json({
      success: true,
      message: "Dang nhap thanh cong",
      data
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
