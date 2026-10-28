
const test = require("node:test");
const assert = require("node:assert/strict");

const repository = require("../src/repositories/survey.repository");
const service = require("../src/services/survey.service");

// 1. Dữ liệu sai: rating nhỏ hơn mức cho phép
test("Từ chối rating nhỏ hơn 1", async () => {
  await assert.rejects(
    service.submitSurvey({ ticket_id: 1, rating: 0, nps_score: 10 }),
    (error) => error.statusCode === 400
  );
});

// 2. Dữ liệu sai: rating lớn hơn mức cho phép
test("Từ chối rating lớn hơn 5", async () => {
  await assert.rejects(
    service.submitSurvey({ ticket_id: 1, rating: 6, nps_score: 10 }),
    (error) => error.statusCode === 400
  );
});

// 3. Biên hợp lệ: rating = 1 và NPS = 0
test("Chấp nhận điểm ở biên dưới", async () => {
  const originalFind = repository.findCompletedTicket;
  const originalCreate = repository.createSurvey;

  try {
    repository.findCompletedTicket = async () => ({ ticket_id: 1 });
    repository.createSurvey = async (ticketId, rating, feedback, nps) => ({
      survey_id: 99,
      ticket_id: ticketId,
      rating,
      feedback,
      nps_score: nps,
    });

    const result = await service.submitSurvey({
      ticket_id: 1,
      rating: 1,
      nps_score: 0,
    });

    assert.equal(result.rating, 1);
    assert.equal(result.nps_score, 0);
  } finally {
    repository.findCompletedTicket = originalFind;
    repository.createSurvey = originalCreate;
  }
});

// 4. Biên hợp lệ: rating = 5 và NPS = 10
test("Chấp nhận điểm ở biên trên", async () => {
  const originalFind = repository.findCompletedTicket;
  const originalCreate = repository.createSurvey;

  try {
    repository.findCompletedTicket = async () => ({ ticket_id: 1 });
    repository.createSurvey = async (ticketId, rating, feedback, nps) => ({
      survey_id: 100,
      ticket_id: ticketId,
      rating,
      feedback,
      nps_score: nps,
    });

    const result = await service.submitSurvey({
      ticket_id: 1,
      rating: 5,
      nps_score: 10,
    });

    assert.equal(result.rating, 5);
    assert.equal(result.nps_score, 10);
  } finally {
    repository.findCompletedTicket = originalFind;
    repository.createSurvey = originalCreate;
  }
});

// 5. Không tìm thấy phiếu bảo hành hợp lệ
test("Từ chối phiếu bảo hành không hợp lệ", async () => {
  const originalFind = repository.findCompletedTicket;

  try {
    repository.findCompletedTicket = async () => null;

    await assert.rejects(
      service.submitSurvey({
        ticket_id: 999,
        rating: 5,
        nps_score: 10,
      }),
      (error) => error.statusCode === 404
    );
  } finally {
    repository.findCompletedTicket = originalFind;
  }
});

// 6. Khảo sát đã tồn tại
test("Từ chối khảo sát trùng", async () => {
  const originalFind = repository.findCompletedTicket;
  const originalCreate = repository.createSurvey;

  try {
    repository.findCompletedTicket = async () => ({ ticket_id: 1 });
    repository.createSurvey = async () => null;

    await assert.rejects(
      service.submitSurvey({
        ticket_id: 1,
        rating: 5,
        nps_score: 10,
      }),
      (error) => error.statusCode === 409
    );
  } finally {
    repository.findCompletedTicket = originalFind;
    repository.createSurvey = originalCreate;
  }
});
