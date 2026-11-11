
require("dotenv").config();

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

// Dung ID khong ton tai de tranh xoa du lieu that
const url = "/api/v1/surveys/999999";

function createToken(role) {
  return jwt.sign(
    { userId: 2, role },
    process.env.JWT_SECRET,
    { expiresIn: "5m", algorithm: "HS256" }
  );
}

test("Survey DELETE khong co JWT tra ve 401", async () => {
  const res = await request(app).delete(url);

  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
});

test("Survey DELETE JWT gia mao tra ve 401", async () => {
  const res = await request(app)
    .delete(url)
    .set("Authorization", "Bearer token_gia_mao");

  assert.equal(res.status, 401);
});

test("Survey DELETE Staff tra ve 403", async () => {
  const res = await request(app)
    .delete(url)
    .set("Authorization", `Bearer ${createToken("staff")}`);

  assert.equal(res.status, 403);
});

test("Survey PUT khong co JWT tra ve 401", async () => {
  const res = await request(app)
    .put(url)
    .send({ rating: 5, nps_score: 10 });

  assert.equal(res.status, 401);
});

test("Survey PUT Staff tra ve 403", async () => {
  const res = await request(app)
    .put(url)
    .set("Authorization", `Bearer ${createToken("staff")}`)
    .send({ rating: 5, nps_score: 10 });

  assert.equal(res.status, 403);
});

test("Survey DELETE Admin qua buoc phan quyen", async () => {
  const res = await request(app)
    .delete(url)
    .set("Authorization", `Bearer ${createToken("admin")}`);

  assert.equal(res.status, 404);
});

test("Survey PUT Admin qua buoc phan quyen", async () => {
  const res = await request(app)
    .put(url)
    .set("Authorization", `Bearer ${createToken("admin")}`)
    .send({ rating: 5, nps_score: 10 });

  assert.equal(res.status, 404);
});
