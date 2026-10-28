
const pool = require("../config/db");

// Lấy phiếu bảo hành chưa được đánh giá
async function getEligibleTickets() {
  const result = await pool.query(`
    SELECT
      wt.ticket_id,
      wt.ticket_code,
      wt.product_name,
      wt.completed_at
    FROM warranty_ticket wt
    WHERE wt.status = 'Hoàn tất'
      AND NOT EXISTS (
        SELECT 1 FROM survey s
        WHERE s.ticket_id = wt.ticket_id
      )
    ORDER BY wt.completed_at DESC
  `);

  return result.rows;
}

// Kiểm tra phiếu đã hoàn tất
async function findCompletedTicket(ticketId) {
  const result = await pool.query(
    `SELECT ticket_id FROM warranty_ticket
     WHERE ticket_id = $1 AND status = $2`,
    [ticketId, "Hoàn tất"]
  );

  return result.rows[0] || null;
}

// Lưu khảo sát
async function createSurvey(ticketId, rating, feedback, npsScore) {
  const result = await pool.query(
    `INSERT INTO survey
      (ticket_id, rating, feedback, nps_score)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (ticket_id) DO NOTHING
     RETURNING *`,
    [ticketId, rating, feedback, npsScore]
  );

  return result.rows[0] || null;
}

// Thống kê CSAT và NPS
async function getStatistics() {
  const result = await pool.query(`
    SELECT
      COUNT(*)::int AS total_surveys,
      ROUND(AVG(rating), 2) AS average_rating,
      COUNT(*) FILTER (
        WHERE rating >= 4
      )::int AS satisfied_count,
      ROUND(
        100.0 * COUNT(*) FILTER (WHERE rating >= 4)
        / NULLIF(COUNT(*), 0), 2
      ) AS csat_percentage,
      COUNT(nps_score)::int AS total_nps,
      COUNT(*) FILTER (
        WHERE nps_score >= 9
      )::int AS promoters,
      COUNT(*) FILTER (
        WHERE nps_score <= 6
      )::int AS detractors,
      ROUND(
        100.0 * (
          COUNT(*) FILTER (WHERE nps_score >= 9)
          -
          COUNT(*) FILTER (WHERE nps_score <= 6)
        ) / NULLIF(COUNT(nps_score), 0), 2
      ) AS nps_score
    FROM survey
  `);

  return result.rows[0];
}

async function getAllSurveys() {
  const result = await pool.query(`
    SELECT
      s.survey_id,
      wt.ticket_code,
      s.rating,
      s.nps_score,
      s.feedback,
      s.submitted_at
    FROM survey s
    JOIN warranty_ticket wt
      ON s.ticket_id = wt.ticket_id
    ORDER BY s.submitted_at DESC
  `);

  return result.rows;
}


module.exports = {
  getEligibleTickets,
  findCompletedTicket,
  createSurvey,
  getStatistics,
  getAllSurveys
};
