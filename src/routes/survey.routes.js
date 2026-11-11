
const express = require("express");
const service = require("../services/survey.service");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");

const router = express.Router();

// Lay danh sach phieu chua danh gia - Yeu cau dang nhap
router.get("/eligible-tickets", requireAuth, async (req, res, next) => {
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

// Gui danh gia - Cong khai
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

// Thong ke CSAT va NPS - Yeu cau dang nhap
router.get("/statistics", requireAuth, async (req, res, next) => {
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

// Lay danh sach tat ca khao sat - Yeu cau dang nhap
router.get("/", requireAuth, async (req, res, next) => {
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

// Lay chi tiet khao sat theo ID - Yeu cau dang nhap
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const survey = await service.getSurveyById(req.params.id);

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay khao sat"
      });
    }

    res.status(200).json({
      success: true,
      data: survey
    });
  } catch (error) {
    next(error);
  }
});

// Cap nhat khao sat - Chi Admin
router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const survey = await service.updateSurvey(
        req.params.id,
        req.body
      );

      if (!survey) {
        return res.status(404).json({
          success: false,
          message: "Khong tim thay khao sat"
        });
      }

      res.status(200).json({
        success: true,
        message: "Cap nhat khao sat thanh cong",
        data: survey
      });
    } catch (error) {
      next(error);
    }
  }
);

// Xoa khao sat - Chi Admin
router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const survey = await service.deleteSurvey(req.params.id);

      if (!survey) {
        return res.status(404).json({
          success: false,
          message: "Khong tim thay khao sat"
        });
      }

      res.status(200).json({
        success: true,
        message: "Xoa khao sat thanh cong"
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
