const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const request = require("supertest");
const errorHandler = require("../src/middlewares/error.middleware");

function createApp(statusCode, message) {
  const app = express();

  app.use((req, res, next) => {
    req.requestId = "test-request-123";
    const error = new Error(message);
    error.statusCode = statusCode;
    next(error);
  });

  app.use(errorHandler);
  return app;
}

test("HTTP 500 hides internal error details", async () => {
  const app = createApp(500, "Internal database connection failed");
  const originalError = console.error;
  console.error = () => {};

  try {
    const response = await request(app).get("/test");

    assert.equal(response.status, 500);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "Loi may chu");
    assert.equal(response.body.requestId, "test-request-123");
    assert.equal(JSON.stringify(response.body).includes("database"), false);
    assert.equal(JSON.stringify(response.body).includes("stack"), false);
  } finally {
    console.error = originalError;
  }
});

test("HTTP 400 preserves validation message", async () => {
  const app = createApp(400, "Invalid input");
  const originalWarn = console.warn;
  console.warn = () => {};

  try {
    const response = await request(app).get("/test");

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, "Invalid input");
    assert.equal(response.body.requestId, "test-request-123");
  } finally {
    console.warn = originalWarn;
  }
});
