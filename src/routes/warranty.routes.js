
const express = require("express");
const router = express.Router();
const service = require("../services/warranty.service");

// GET - Lấy tất cả phiếu bảo hành
router.get("/", async (req, res, next) => {
  try {
    const data = await service.getAllTickets();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// GET - Lấy phiếu bảo hành theo ID
router.get("/:id", async (req, res, next) => {
  try {
    const data = await service.getTicketById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay phieu bao hanh"
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST - Thêm phiếu bảo hành
router.post("/", async (req, res, next) => {
  try {
    const data = await service.createTicket(req.body);

    res.status(201).json({
      success: true,
      message: "Them phieu bao hanh thanh cong",
      data
    });
  } catch (error) {
    next(error);
  }
});

// PUT - Cập nhật phiếu bảo hành
router.put("/:id", async (req, res, next) => {
  try {
    const data = await service.updateTicket(
      req.params.id,
      req.body
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay phieu bao hanh"
      });
    }

    res.json({
      success: true,
      message: "Cap nhat phieu bao hanh thanh cong",
      data
    });
  } catch (error) {
    next(error);
  }
});

// DELETE - Xóa phiếu bảo hành
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await service.deleteTicket(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay phieu bao hanh"
      });
    }

    res.json({
      success: true,
      message: "Xoa phieu bao hanh thanh cong"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
