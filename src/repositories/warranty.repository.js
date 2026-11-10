
const pool = require("../config/db");

// Lấy tất cả phiếu bảo hành
async function getAllTickets() {
  const result = await pool.query(
    "SELECT * FROM warranty_ticket ORDER BY ticket_id"
  );
  return result.rows;
}

// Lấy phiếu bảo hành theo ID
async function getTicketById(id) {
  const result = await pool.query(
    "SELECT * FROM warranty_ticket WHERE ticket_id = $1",
    [id]
  );
  return result.rows[0] || null;
}

// Thêm phiếu bảo hành
async function createTicket(data) {
  const { ticket_code, product_name, status, completed_at } = data;

  const result = await pool.query(
    `INSERT INTO warranty_ticket
     (ticket_code, product_name, status, completed_at)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [ticket_code, product_name, status, completed_at ?? null]
  );

  return result.rows[0];
}

// Cập nhật phiếu bảo hành
async function updateTicket(id, data) {
  const { ticket_code, product_name, status, completed_at } = data;

  const result = await pool.query(
    `UPDATE warranty_ticket
     SET ticket_code = $1,
         product_name = $2,
         status = $3,
         completed_at = $4
     WHERE ticket_id = $5
     RETURNING *`,
    [ticket_code, product_name, status, completed_at ?? null, id]
  );

  return result.rows[0] || null;
}

// Xóa phiếu bảo hành
async function deleteTicket(id) {
  const result = await pool.query(
    "DELETE FROM warranty_ticket WHERE ticket_id = $1 RETURNING *",
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
