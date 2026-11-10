
const repository = require("../repositories/warranty.repository");

// Kiểm tra ID
function validateId(id) {
  const number = Number(id);

  if (!Number.isSafeInteger(number) || number <= 0) {
    const error = new Error("ID khong hop le");
    error.status = 400;
    throw error;
  }

  return number;
}

// Kiểm tra dữ liệu phiếu bảo hành
function validateTicket(data) {
  const { ticket_code, product_name, status, completed_at } = data;

  if (
    typeof ticket_code !== "string" ||
    !ticket_code.trim() ||
    ticket_code.length > 50 ||
    typeof product_name !== "string" ||
    !product_name.trim() ||
    product_name.length > 100 ||
    typeof status !== "string" ||
    !status.trim() ||
    status.length > 30
  ) {
    const error = new Error("Thong tin phieu bao hanh khong hop le");
    error.status = 400;
    throw error;
  }

  if (
    completed_at !== undefined &&
    completed_at !== null &&
    (typeof completed_at !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(completed_at) ||
      Number.isNaN(Date.parse(completed_at)))
  ) {
    const error = new Error("Ngay hoan thanh khong hop le");
    error.status = 400;
    throw error;
  }

  return {
    ticket_code: ticket_code.trim(),
    product_name: product_name.trim(),
    status: status.trim(),
    completed_at: completed_at ?? null
  };
}

// READ - Danh sách
async function getAllTickets() {
  return repository.getAllTickets();
}

// READ - Theo ID
async function getTicketById(id) {
  return repository.getTicketById(validateId(id));
}

// CREATE
async function createTicket(data) {
  return repository.createTicket(validateTicket(data));
}

// UPDATE
async function updateTicket(id, data) {
  return repository.updateTicket(
    validateId(id),
    validateTicket(data)
  );
}

// DELETE
async function deleteTicket(id) {
  return repository.deleteTicket(validateId(id));
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
