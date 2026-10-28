
const express = require("express");
const service = require("../services/survey.service");

const router = express.Router();

// Lay danh sach phieu chua danh gia
router.get("/eligible-tickets", async (req, res, next) => {
  try {
    const tickets = await service.getEligibleTickets();

    res.status(200).json({
      success: true,
      data: tickets
    });
  } catch (error) {
    next(error);
  }
});

// Gui danh gia
router.post("/", async (req, res, next) => {
  try {
    const survey = await service.submitSurvey(req.body);

    res.status(201).json({
      success: true,
      message: "Gui danh gia thanh cong",
      data: survey
    });
  } catch (error) {
    next(error);
  }
});

// Thong ke CSAT va NPS
router.get("/statistics", async (req, res, next) => {
  try {
    const stats = await service.getStatistics();

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Lay danh sach tat ca khao sat
router.get("/", async (req, res, next) => {
  try {
    const surveys = await service.getAllSurveys();

    res.status(200).json({
      success: true,
      data: surveys
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
