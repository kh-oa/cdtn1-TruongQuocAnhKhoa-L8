
const test = require("node:test");
const assert = require("node:assert/strict");

const service = require("../src/services/warranty.service");

function validTicket() {
  return {
    ticket_code: "BH_TEST",
    product_name: "Laptop Lenovo",
    status: "Hoàn tất",
    completed_at: null
  };
}

// Các trường hợp dữ liệu không hợp lệ
test("Từ chối khi thiếu mã phiếu", async () => {
  await assert.rejects(
    service.createTicket({
      ...validTicket(),
      ticket_code: ""
    }),
    { status: 400 }
  );
});

test("Từ chối khi thiếu tên sản phẩm", async () => {
  await assert.rejects(
    service.createTicket({
      ...validTicket(),
      product_name: ""
    }),
    { status: 400 }
  );
});

test("Từ chối khi thiếu trạng thái", async () => {
  await assert.rejects(
    service.createTicket({
      ...validTicket(),
      status: ""
    }),
    { status: 400 }
  );
});

test("Từ chối mã phiếu quá 50 ký tự", async () => {
  await assert.rejects(
    service.createTicket({
      ...validTicket(),
      ticket_code: "A".repeat(51)
    }),
    { status: 400 }
  );
});

test("Từ chối ngày hoàn thành sai định dạng", async () => {
  await assert.rejects(
    service.createTicket({
      ...validTicket(),
      completed_at: "sai-ngay"
    }),
    { status: 400 }
  );
});

test("Từ chối ID bằng 0", async () => {
  await assert.rejects(
    service.getTicketById(0),
    { status: 400 }
  );
});

test("Từ chối ID không phải số nguyên", async () => {
  await assert.rejects(
    service.deleteTicket("abc"),
    { status: 400 }
  );
});

test("Từ chối cập nhật thiếu tên sản phẩm", async () => {
  await assert.rejects(
    service.updateTicket(1, {
      ...validTicket(),
      product_name: ""
    }),
    { status: 400 }
  );
});
