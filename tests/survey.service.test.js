
const test = require("node:test");
const assert = require("node:assert/strict");

const repository = require("../src/repositories/survey.repository");
const service = require("../src/services/survey.service");

// 1. Dá»¯ liá»‡u sai: rating nhá» hÆ¡n má»©c cho phÃ©p
test("Tá»« chá»‘i rating nhá» hÆ¡n 1", async () => {
  await assert.rejects(
    service.submitSurvey({ ticket_id: 1, rating: 0, nps_score: 10 }),
    (error) => error.statusCode === 400
  );
});

// 2. Dá»¯ liá»‡u sai: rating lá»›n hÆ¡n má»©c cho phÃ©p
test("Tá»« chá»‘i rating lá»›n hÆ¡n 5", async () => {
  await assert.rejects(
    service.submitSurvey({ ticket_id: 1, rating: 6, nps_score: 10 }),
    (error) => error.statusCode === 400
  );
});

// 3. BiÃªn há»£p lá»‡: rating = 1 vÃ  NPS = 0
test("Cháº¥p nháº­n Ä‘iá»ƒm á»Ÿ biÃªn dÆ°á»›i", async () => {
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

// 4. BiÃªn há»£p lá»‡: rating = 5 vÃ  NPS = 10
test("Cháº¥p nháº­n Ä‘iá»ƒm á»Ÿ biÃªn trÃªn", async () => {
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

// 5. KhÃ´ng tÃ¬m tháº¥y phiáº¿u báº£o hÃ nh há»£p lá»‡
test("Tá»« chá»‘i phiáº¿u báº£o hÃ nh khÃ´ng há»£p lá»‡", async () => {
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

// 6. Kháº£o sÃ¡t Ä‘Ã£ tá»“n táº¡i
test("Tá»« chá»‘i kháº£o sÃ¡t trÃ¹ng", async () => {
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
// 7. Luá»“ng Ä‘Ãºng: gá»­i kháº£o sÃ¡t há»£p lá»‡
test("Cháº¥p nháº­n gá»­i kháº£o sÃ¡t há»£p lá»‡", async () => {
  const originalFind = repository.findCompletedTicket;
  const originalCreate = repository.createSurvey;

  try {
    repository.findCompletedTicket = async () => ({ ticket_id: 1 });
    repository.createSurvey = async (ticketId, rating, feedback, nps) => ({
      survey_id: 101,
      ticket_id: ticketId,
      rating,
      feedback,
      nps_score: nps,
    });

    const result = await service.submitSurvey({
      ticket_id: 1,
      rating: 4,
      feedback: "Dá»‹ch vá»¥ tá»‘t",
      nps_score: 9,
    });

    assert.equal(result.ticket_id, 1);
    assert.equal(result.rating, 4);
    assert.equal(result.feedback, "Dá»‹ch vá»¥ tá»‘t");
    assert.equal(result.nps_score, 9);
  } finally {
    repository.findCompletedTicket = originalFind;
    repository.createSurvey = originalCreate;
  }
});

// 8. Dá»¯ liá»‡u sai: thiáº¿u rating
test("Tá»« chá»‘i khi thiáº¿u rating", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1,
      nps_score: 8,
    }),
    (error) => error.statusCode === 400
  );
});

// 9. Dá»¯ liá»‡u sai: ticket_id báº±ng 0
test("Tá»« chá»‘i ticket_id báº±ng 0", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 0,
      rating: 5,
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});

// 10. Dá»¯ liá»‡u sai: ticket_id khÃ´ng pháº£i sá»‘ nguyÃªn
test("Tá»« chá»‘i ticket_id khÃ´ng pháº£i sá»‘ nguyÃªn", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1.5,
      rating: 5,
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});

// 11. Dá»¯ liá»‡u sai: NPS nhá» hÆ¡n 0
test("Tá»« chá»‘i NPS nhá» hÆ¡n 0", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1,
      rating: 5,
      nps_score: -1,
    }),
    (error) => error.statusCode === 400
  );
});

// 12. Dá»¯ liá»‡u sai: NPS lá»›n hÆ¡n 10
test("Tá»« chá»‘i NPS lá»›n hÆ¡n 10", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1,
      rating: 5,
      nps_score: 11,
    }),
    (error) => error.statusCode === 400
  );
});

const feedbackCases = [
  {
    name: "Chap nhan feedback hop le",
    feedback: "Dich vu tot",
    expected: "Dich vu tot",
  },
  {
    name: "Chap nhan feedback de trong",
    feedback: undefined,
    expected: null,
  },
  {
    name: "Chap nhan feedback dung 1000 ky tu",
    feedback: "a".repeat(1000),
    expected: "a".repeat(1000),
  },
];

for (const item of feedbackCases) {
  test(item.name, async () => {
    const originalFind = repository.findCompletedTicket;
    const originalCreate = repository.createSurvey;

    try {
      repository.findCompletedTicket = async () => ({
        ticket_id: 1,
      });

      repository.createSurvey = async (
        ticketId,
        rating,
        feedback,
        nps
      ) => ({
        survey_id: 102,
        ticket_id: ticketId,
        rating,
        feedback,
        nps_score: nps,
      });

      const result = await service.submitSurvey({
        ticket_id: 1,
        rating: 5,
        feedback: item.feedback,
        nps_score: 10,
      });

      assert.equal(result.feedback, item.expected);
    } finally {
      repository.findCompletedTicket = originalFind;
      repository.createSurvey = originalCreate;
    }
  });
}

test("Tu choi feedback khong phai chuoi", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1,
      rating: 5,
      feedback: 123,
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});

test("Tu choi feedback qua 1000 ky tu", async () => {
  await assert.rejects(
    service.submitSurvey({
      ticket_id: 1,
      rating: 5,
      feedback: "a".repeat(1001),
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});

test("Tu choi feedback sai kieu khi cap nhat", async () => {
  await assert.rejects(
    service.updateSurvey(1, {
      rating: 5,
      feedback: { text: "abc" },
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});

test("Tu choi feedback qua 1000 ky tu khi cap nhat", async () => {
  await assert.rejects(
    service.updateSurvey(1, {
      rating: 5,
      feedback: "a".repeat(1001),
      nps_score: 10,
    }),
    (error) => error.statusCode === 400
  );
});
