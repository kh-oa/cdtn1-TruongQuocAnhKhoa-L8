
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/eligible-tickets", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        wt.ticket_id,
        wt.ticket_code,
        wt.product_name,
        wt.completed_at
      FROM warranty_ticket wt
      WHERE wt.status = 'Hoàn tất'
        AND NOT EXISTS (
          SELECT 1
          FROM survey s
          WHERE s.ticket_id = wt.ticket_id
        )
      ORDER BY wt.completed_at DESC
    `);

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("Loi lay phieu bao hanh:", error);  
    res.status(500).json({
      success: false,
      message: "Loi may chu"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { ticket_id, rating, feedback } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
      !Number.isSafeInteger(Number(ticket_id)) ||
      Number(ticket_id) <= 0 ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Du lieu danh gia khong hop le"
      });
    }

    // Chỉ cho phép khảo sát phiếu đã hoàn tất
    const ticket = await pool.query(
      "SELECT ticket_id FROM warranty_ticket WHERE ticket_id = $1 AND status = $2",
      [ticket_id, "Hoàn tất"]
    );

    if (ticket.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay phieu bao hanh hop le"
      });
    }

    // Lưu đánh giá
    const result = await pool.query(
      `INSERT INTO survey (ticket_id, rating, feedback)
       VALUES ($1, $2, $3)
       ON CONFLICT (ticket_id) DO NOTHING
       RETURNING *`,
      [ticket_id, rating, feedback ?? null]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({
        success: false,
        message: "Phieu nay da duoc danh gia"
      });
    }

    res.status(201).json({
      success: true,
      message: "Gui danh gia thanh cong",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Loi gui danh gia:", error);
    res.status(500).json({
      success: false,
      message: "Loi may chu"
    });
  }
});

router.get("/statistics", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total_surveys,
        ROUND(AVG(rating), 2) AS average_rating,
        COUNT(*) FILTER (WHERE rating >= 4)::int
          AS satisfied_count,
        ROUND(
          100.0 * COUNT(*) FILTER (WHERE rating >= 4)
          / NULLIF(COUNT(*), 0),
          2
        ) AS csat_percentage
      FROM survey
    `);

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Loi thong ke:", error);
    res.status(500).json({
      success: false,
      message: "Loi may chu"
    });
  }
});

module.exports = router;
