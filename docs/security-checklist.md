# Security Checklist – L8 CSAT/NPS

## Security Review Summary

This document records the security controls, test evidence, and remaining security tasks for the L8 CSAT/NPS application.

The latest automated test run completed successfully with **51 passed tests and 0 failures**.

## 1. Environment Variables and Secrets

- [x] `.env.example` provides configuration placeholders.
- [x] Docker Compose reads configuration from environment variables.
- [x] `.env` is not tracked by Git in the current repository.
- [x] `CORS_ORIGIN` is configurable through environment variables.
- [ ] Verify that all deployment secrets are strong and unique.

**Evidence:**
- `.env.example`
- `docker-compose.yml`
- `git ls-files -- .env`

## 2. Authentication (JWT)

- [x] JWT authentication middleware is implemented.
- [x] Missing JWT returns HTTP 401.
- [x] Invalid JWT returns HTTP 401.
- [x] Expired JWT returns HTTP 401.
- [x] JWT verification restricts the algorithm to HS256.
- [x] Survey statistics, list, and detail endpoints reject unauthenticated requests with HTTP 401.
- [x] The eligible-tickets endpoint rejects unauthenticated requests with HTTP 401.
- [x] Authenticated users can access the eligible-tickets endpoint through the frontend.
- [x] Verify successful access to statistics, list, and detail endpoints using a valid JWT.

**Evidence:**
- `src/middlewares/auth.middleware.js`
- `src/routes/survey.routes.js`
- `tests/auth.api.test.js`
- Manual HTTP 401 verification
- Authenticated frontend verification

## 3. Authorization (RBAC)

- [x] Warranty DELETE requires the Admin role.
- [x] Survey PUT requires authentication and the Admin role.
- [x] Survey DELETE requires authentication and the Admin role.
- [x] Staff receives HTTP 403 for restricted operations.

**Evidence:**
- `src/routes/warranty.routes.js`
- `src/routes/survey.routes.js`
- `tests/survey.api.test.js`

## 4. Input Validation

- [x] Survey rating must be between 1 and 5.
- [x] NPS score must be between 0 and 10.
- [x] Survey and ticket IDs are validated.
- [x] Duplicate survey submissions are rejected.
- [x] Warranty input validation is covered by automated tests.
- [x] Feedback must be a string when provided.
- [x] Feedback length is limited to 1,000 characters.
- [x] Missing or null feedback is accepted.
- [x] Feedback validation is implemented for both survey creation and updates.
- [x] Seven additional automated tests cover feedback validation.
- [x] All 51 automated tests passed after the feedback validation update.
- [x] Verify that the PostgreSQL feedback column supports the configured maximum length.

**Evidence:**
- `src/services/survey.service.js`
- `tests/survey.service.test.js`
- Warranty service tests
- `npm.cmd test`

## 5. Error Handling and Logging

- [x] Centralized error handling is implemented.
- [x] Internal server errors return a generic HTTP 500 message.
- [x] Request IDs are generated for API requests.
- [x] HTTP 4xx errors are logged without stack traces.
- [x] HTTP 4xx logs include status codes and request IDs.
- [x] Request logging uses `req.path` instead of `req.originalUrl` to avoid logging query parameters.
- [x] Automated tests passed after the logging update.
- [x] Backend Docker image was rebuilt after the logging update.
- [ ] Review HTTP 5xx logs for sensitive information before production deployment.

**Evidence:**
- `src/middlewares/error.middleware.js`
- `src/app.js`
- `npm test`
- `docker compose up -d --build backend`

## 6. Dependency Security

- [x] Production dependencies were scanned using `npm audit --omit=dev`.
- [x] The reported high-severity body-parser vulnerability was addressed.
- [x] The latest production dependency audit reported zero vulnerabilities.
- [x] All 42 automated tests passed after the dependency update.
- [x] The latest test run passed all 51 automated tests after feedback validation changes.
- [x] Backend Docker image was rebuilt after the dependency update.
- [x] Rebuild the backend Docker image after the latest feedback validation changes.

**Evidence:**
- `npm audit fix`
- `npm audit --omit=dev`
- `npm.cmd test`
- `docker compose up -d --build backend`

## 7. Deployment and API Exposure

- [x] Docker Compose builds the application successfully.
- [x] PostgreSQL health check passes.
- [x] Database initialization completes successfully.
- [x] Backend container starts successfully.
- [x] Survey statistics, list, and detail endpoints require JWT authentication.
- [x] Unauthenticated requests to all three protected Survey GET endpoints returned HTTP 401.
- [x] The eligible-tickets endpoint requires JWT authentication.
- [x] Unauthenticated requests to eligible-tickets return HTTP 401.
- [x] Authenticated users can view eligible warranty tickets in the frontend.
- [x] The frontend successfully displayed ticket BH001 â€“ Laptop Dell after login.
- [x] CORS is restricted to configured frontend origins.
- [x] Requests from `http://localhost:5173` receive the expected Access-Control-Allow-Origin header.
- [x] Requests from `http://evil.example` do not receive the Access-Control-Allow-Origin header.
- [x] CORS configuration was applied through a successful Docker rebuild.
- [ ] Restrict eligible ticket visibility by user if required by the access policy.
- [ ] Verify production-specific CORS origins before public deployment.
- [x] Verify deployment with a fresh, isolated database.

**Evidence:**
- `docker-compose.yml`
- `Dockerfile`
- `src/app.js`
- `docs/deployment-guide.md`
- `docker compose ps -a`
- Manual HTTP 401 verification
- Authenticated frontend verification
- PowerShell CORS verification

## Automated Test Results

| Test Result | Value |
|---|---|
| Total tests | 51 |
| Passed | 51 |
| Failed | 0 |
| Additional feedback tests | 7 |
| Production dependency vulnerabilities reported | 0 |
| Protected Survey GET endpoints verified with HTTP 401 | 4 |
| Eligible-tickets frontend verification | Passed |
| CORS allowed-origin verification | Passed |
| CORS disallowed-origin verification | Passed |
| HTTP 4xx logging verification | Passed |
| Previous backend Docker rebuild | Passed |
| Latest feedback validation Docker rebuild | Passed |

## Final Status

The application passed all **51 automated tests**, with zero failures.

The latest production dependency audit reported zero vulnerabilities.

JWT authentication and role-based authorization have been implemented for protected operations.

Manual verification confirmed that four protected Survey GET endpoints reject unauthenticated requests with HTTP 401.

The eligible-tickets endpoint was verified through the authenticated frontend. Ticket BH001 â€“ Laptop Dell was displayed successfully.

CORS configuration was verified using PowerShell. The approved localhost frontend origin received the expected CORS response header, while the unapproved origin did not.

Error logging was improved to avoid stack traces for HTTP 4xx errors. Request IDs remain available for troubleshooting.

Feedback validation has been implemented for survey creation and updates. Feedback must be a string when provided, with a maximum length of 1,000 characters. Missing or null feedback is accepted.

Seven additional feedback validation tests were added, bringing the automated test suite to 49 passing tests.

Remaining tasks include:

- Production secrets verification.
- HTTP 5xx logging review.
- Production-specific CORS configuration review.

These remaining checks must be completed or reviewed before declaring the application production-ready.

### Fresh Clone Verification Evidence
- Fresh clone was deployed using an isolated Docker Compose project (l8-fresh-clone).
- PostgreSQL initialization succeeded with 3 warranty tickets and 0 surveys.
- Backend health endpoint returned OK at http://localhost:3200/health.
- The original database remained intact with 8 surveys.
