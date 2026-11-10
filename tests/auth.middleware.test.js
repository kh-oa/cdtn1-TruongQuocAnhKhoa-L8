
const test = require("node:test");
const assert = require("node:assert/strict");
const { requireRole } = require("../src/middlewares/auth.middleware");

function checkRole(user, allowedRoles) {
  let statusCode = null;
  let nextCalled = false;

  const req = { user };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      return data;
    }
  };

  requireRole(...allowedRoles)(req, res, () => {
    nextCalled = true;
  });

  return { statusCode, nextCalled };
}

test("Admin được phép xóa", () => {
  const result = checkRole({ role: "admin" }, ["admin"]);
  assert.equal(result.nextCalled, true);
});

test("Staff bị từ chối quyền xóa - HTTP 403", () => {
  const result = checkRole({ role: "staff" }, ["admin"]);
  assert.equal(result.statusCode, 403);
  assert.equal(result.nextCalled, false);
});

test("Chưa đăng nhập bị từ chối - HTTP 401", () => {
  const result = checkRole(undefined, ["admin"]);
  assert.equal(result.statusCode, 401);
  assert.equal(result.nextCalled, false);
});
