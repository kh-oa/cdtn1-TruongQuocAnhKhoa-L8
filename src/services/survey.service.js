
const repository = require("../repositories/survey.repository");

const MAX_FEEDBACK_LENGTH = 1000;

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateFeedback(feedback) {
  if (feedback === undefined || feedback === null) {
    return null;
  }

  if (typeof feedback !== "string") {
    throw createError("Feedback phai la chuoi van ban", 400);
  }

  if (feedback.length > MAX_FEEDBACK_LENGTH) {
    throw createError("Feedback khong duoc qua 1000 ky tu", 400);
  }

  return feedback;
}

// Lay danh sach phieu chua danh gia
async function getEligibleTickets() {
  return repository.getEligibleTickets();
}

// Kiem tra va gui danh gia
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

  const validFeedback = validateFeedback(feedback);

  const ticket = await repository.findCompletedTicket(ticketId);

  if (!ticket) {
    throw createError("Khong tim thay phieu bao hanh hop le", 404);
  }

  const survey = await repository.createSurvey(
    ticketId,
    rating,
    validFeedback,
    nps_score ?? null
  );

  if (!survey) {
    throw createError("Phieu nay da duoc danh gia", 409);
  }

  return survey;
}

// Lay thong ke
async function getStatistics() {
  return repository.getStatistics();
}

async function getAllSurveys() {
  return repository.getAllSurveys();
}

// Lay khao sat theo ID
async function getSurveyById(id) {
  const surveyId = Number(id);

  if (!Number.isSafeInteger(surveyId) || surveyId <= 0) {
    throw createError("ID khao sat khong hop le", 400);
  }

  return repository.getSurveyById(surveyId);
}

// Cap nhat khao sat
async function updateSurvey(id, data) {
  const surveyId = Number(id);

  if (!Number.isSafeInteger(surveyId) || surveyId <= 0) {
    throw createError("ID khao sat khong hop le", 400);
  }

  const { rating, feedback, nps_score } = data;

  if (
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    throw createError("Rating phai tu 1 den 5", 400);
  }

  if (
    nps_score !== undefined &&
    nps_score !== null &&
    (!Number.isInteger(nps_score) ||
      nps_score < 0 ||
      nps_score > 10)
  ) {
    throw createError("NPS phai tu 0 den 10", 400);
  }

  const validFeedback = validateFeedback(feedback);

  return repository.updateSurvey(
    surveyId,
    rating,
    validFeedback,
    nps_score ?? null
  );
}

// Xoa khao sat
async function deleteSurvey(id) {
  const surveyId = Number(id);

  if (!Number.isSafeInteger(surveyId) || surveyId <= 0) {
    throw createError("ID khao sat khong hop le", 400);
  }

  return repository.deleteSurvey(surveyId);
}

module.exports = {
  getEligibleTickets,
  submitSurvey,
  getStatistics,
  getAllSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey
};
