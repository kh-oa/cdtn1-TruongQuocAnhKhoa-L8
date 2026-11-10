
const test = require("node:test");
const assert = require("node:assert/strict");

const authService = require("../src/services/auth.service");

test("Từ chối khi thiếu username", async () => {
  await assert.rejects(
    authService.login("", "123456"),
    { status: 400 }
  );
});

test("Từ chối khi thiếu password", async () => {
  await assert.rejects(
    authService.login("admin", ""),
    { status: 400 }
  );
});

test("Từ chối username không hợp lệ", async () => {
  await assert.rejects(
    authService.login(null, "123456"),
    { status: 400 }
  );
});

test("Từ chối password không hợp lệ", async () => {
  await assert.rejects(
    authService.login("admin", null),
    { status: 400 }
  );
});
