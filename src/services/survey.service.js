
const repository = require("../repositories/survey.repository");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

// Lấy danh sách phiếu chưa đánh giá
async function getEligibleTickets() {
  return repository.getEligibleTickets();
}

// Kiểm tra và gửi đánh giá
async function submitSurvey(data) {
  const { ticket_id, rating, feedback, nps_score } = data;

  const ticketId = Number(ticket_id);

  if (
    !Number.isSafeInteger(ticketId) ||
    ticketId <= 0 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    throw createError("Du lieu danh gia khong hop le", 400);
  }

  if (
    nps_score !== undefined &&
    nps_score !== null &&
    (!Number.isInteger(nps_score) ||
      nps_score < 0 ||
      nps_score > 10)
  ) {
    throw createError("Diem NPS phai tu 0 den 10", 400);
  }

  const ticket = await repository.findCompletedTicket(ticketId);

  if (!ticket) {
    throw createError("Khong tim thay phieu bao hanh hop le", 404);
  }

  const survey = await repository.createSurvey(
    ticketId,
    rating,
    feedback ?? null,
    nps_score ?? null
  );

  if (!survey) {
    throw createError("Phieu nay da duoc danh gia", 409);
  }

  return survey;
}

// Lấy thống kê
async function getStatistics() {
  return repository.getStatistics();
}

async function getAllSurveys() {
  return repository.getAllSurveys();
}


module.exports = {
  getEligibleTickets,
  submitSurvey,
  getStatistics,
  getAllSurveys
};

