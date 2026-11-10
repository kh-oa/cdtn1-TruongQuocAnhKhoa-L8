
require("dotenv").config();

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

const url = "/api/v1/warranty-tickets/1";

test("Không có JWT trả về HTTP 401", async () => {
  const res = await request(app).delete(url);

  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
});

test("JWT giả mạo trả về HTTP 401", async () => {
  const res = await request(app)
    .delete(url)
    .set("Authorization", "Bearer token_gia_mao");

  assert.equal(res.status, 401);
});

test("JWT hết hạn trả về HTTP 401", async () => {
  const token = jwt.sign(
    { userId: 2, role: "staff" },
    process.env.JWT_SECRET,
    { expiresIn: -1 }
  );

  const res = await request(app)
    .delete(url)
    .set("Authorization", `Bearer ${token}`);

  assert.equal(res.status, 401);
});

test("Staff gọi DELETE trả về HTTP 403", async () => {
  const token = jwt.sign(
    { userId: 2, role: "staff" },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  const res = await request(app)
    .delete(url)
    .set("Authorization", `Bearer ${token}`);

  assert.equal(res.status, 403);
});

test("Staff có thể gọi GET", async () => {
  const token = jwt.sign(
    { userId: 2, role: "staff" },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  const res = await request(app)
    .get("/api/v1/warranty-tickets")
    .set("Authorization", `Bearer ${token}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
});

test("Đăng nhập thiếu username trả về HTTP 400", async () => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ password: "123456" });

  assert.equal(res.status, 400);
});

test("Đăng nhập thiếu password trả về HTTP 400", async () => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username: "admin" });

  assert.equal(res.status, 400);
});

test("Đăng nhập sai tài khoản bị từ chối", async () => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({
      username: "user_khong_ton_tai_123",
      password: "wrong_password"
    });

  assert.equal(res.status, 401);
});
