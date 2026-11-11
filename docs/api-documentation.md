\# API Documentation â€“ L8 CSAT/NPS



\## 1. Overview



The L8 CSAT/NPS REST API supports user authentication, warranty ticket management, customer satisfaction surveys, and CSAT/NPS statistics.



\*\*Base URL:\*\* `http://localhost:3000`



\*\*API Version:\*\* v1



\*\*Content Type:\*\* `application/json`



\### Authentication



Protected endpoints require a JSON Web Token (JWT).



```http

Authorization: Bearer <your\_jwt\_token>

```



Roles include `admin` and `staff`. Some operations are restricted to administrators.



\## 2. Health Check



| Method | Endpoint | Authentication | Success |

|---|---|---|---|

| GET | `/health` | Public | 200 |

| GET | `/api/v1/auth/health` | Public | 200 |



The health endpoints confirm that the application or authentication API is running.



\## 3. Authentication API



\### POST /api/v1/auth/login



Authenticates a user and returns login information from the authentication service.



\*\*Authentication:\*\* Public



\*\*Request body:\*\*



```json

{

&#x20; "username": "your\_username",

&#x20; "password": "your\_password"

}

```



\*\*Successful response:\*\* HTTP 200



```json

{

&#x20; "success": true,

&#x20; "message": "Dang nhap thanh cong",

&#x20; "data": {}

}

```



The `data` object is returned by the authentication service and contains the login result.



Invalid credentials are handled by the authentication service and centralized error handler.



\## 4. Survey API



\*\*Base path:\*\* `/api/v1/surveys`



| Method | Endpoint | Authentication | Success |

|---|---|---|---|

| GET | `/eligible-tickets` | JWT required | 200 |

| POST | `/` | Public | 201 |

| GET | `/statistics` | JWT required | 200 |

| GET | `/` | JWT required | 200 |

| GET | `/:id` | JWT required | 200 |

| PUT | `/:id` | Admin only | 200 |

| DELETE | `/:id` | Admin only | 200 |



\### GET /api/v1/surveys/eligible-tickets



Returns warranty tickets eligible for customer feedback.



\*\*Authentication:\*\* JWT required.



\*\*Successful response:\*\*



```json

{

&#x20; "success": true,

&#x20; "data": \[]

}

```



\### POST /api/v1/surveys



Submits a customer satisfaction survey.



\*\*Authentication:\*\* Public.



\*\*Request body:\*\*



```json

{

&#x20; "ticket\_id": 1,

&#x20; "rating": 5,

&#x20; "feedback": "Good service",

&#x20; "nps\_score": 9

}

```



\*\*Validation rules:\*\*



\- `ticket\_id`: Positive integer identifying an eligible warranty ticket.

\- `rating`: Required integer from 1 to 5.

\- `feedback`: Optional string, maximum 1,000 characters.

\- `nps\_score`: Optional integer from 0 to 10.

\- Duplicate survey submissions are rejected.



\*\*Successful response:\*\* HTTP 201



```json

{

&#x20; "success": true,

&#x20; "message": "Gui danh gia thanh cong",

&#x20; "data": {}

}

```



Possible errors include HTTP 400 for invalid input, HTTP 404 for an ineligible or missing ticket, and HTTP 409 for duplicate feedback.



\### GET /api/v1/surveys/statistics



Returns CSAT and NPS statistics.



\*\*Authentication:\*\* JWT required.



\*\*Successful response:\*\* HTTP 200



```json

{

&#x20; "success": true,

&#x20; "data": {}

}

```



The statistics object is produced by the survey service.



\### GET /api/v1/surveys



Returns all surveys.



\*\*Authentication:\*\* JWT required.



\*\*Successful response:\*\* HTTP 200



```json

{

&#x20; "success": true,

&#x20; "data": \[]

}

```



\### GET /api/v1/surveys/:id



Returns a survey by ID.



\*\*Authentication:\*\* JWT required.



\*\*Successful response:\*\* HTTP 200.



\*\*Not found:\*\* HTTP 404.



\### PUT /api/v1/surveys/:id



Updates a survey.



\*\*Authentication:\*\* Admin JWT required.



\*\*Request body:\*\*



```json

{

&#x20; "rating": 4,

&#x20; "feedback": "Updated feedback",

&#x20; "nps\_score": 8

}

```



\*\*Validation rules:\*\*



\- `rating`: Required integer from 1 to 5.

\- `feedback`: Optional string, maximum 1,000 characters.

\- `nps\_score`: Optional integer from 0 to 10.

\- `id`: Positive integer.



\*\*Successful response:\*\* HTTP 200.



\### DELETE /api/v1/surveys/:id



Deletes a survey.



\*\*Authentication:\*\* Admin JWT required.



\*\*Successful response:\*\* HTTP 200



```json

{

&#x20; "success": true,

&#x20; "message": "Xoa khao sat thanh cong"

}

```



\## 5. Warranty Ticket API



\*\*Base path:\*\* `/api/v1/warranty-tickets`



All warranty ticket endpoints require JWT authentication because the authentication middleware is applied to the entire route group in `src/app.js`.



| Method | Endpoint | Authentication | Success |

|---|---|---|---|

| GET | `/` | JWT required | 200 |

| GET | `/:id` | JWT required | 200 |

| POST | `/` | JWT required | 201 |

| PUT | `/:id` | JWT required | 200 |

| DELETE | `/:id` | Admin only | 200 |



\### GET /api/v1/warranty-tickets



Returns all warranty tickets.



\*\*Successful response:\*\* HTTP 200



```json

{

&#x20; "success": true,

&#x20; "data": \[]

}

```



\### GET /api/v1/warranty-tickets/:id



Returns a warranty ticket by ID.



\*\*Successful response:\*\* HTTP 200.



\*\*Not found:\*\* HTTP 404.



\### POST /api/v1/warranty-tickets



Creates a warranty ticket.



\*\*Authentication:\*\* JWT required.



\*\*Request body:\*\* A JSON object containing the warranty fields validated by the warranty service.



\*\*Successful response:\*\* HTTP 201.



\### PUT /api/v1/warranty-tickets/:id



Updates a warranty ticket.



\*\*Authentication:\*\* JWT required.



\*\*Request body:\*\* A JSON object containing the fields supported by the warranty service.



\*\*Successful response:\*\* HTTP 200.



\*\*Not found:\*\* HTTP 404.



\### DELETE /api/v1/warranty-tickets/:id



Deletes a warranty ticket.



\*\*Authentication:\*\* Admin JWT required.



\*\*Successful response:\*\* HTTP 200.



\*\*Not found:\*\* HTTP 404.



\## 6. HTTP Status Codes



| Status | Meaning |

|---|---|

| 200 | Request completed successfully |

| 201 | Resource created successfully |

| 400 | Invalid request data |

| 401 | Missing, invalid, or expired authentication |

| 403 | Insufficient permissions |

| 404 | Requested resource not found |

| 409 | Duplicate survey |

| 500 | Internal server error |



Errors are passed to the centralized error handler where applicable.



\## 7. Security Notes



\- JWT authentication protects restricted API endpoints.

\- Admin-only operations use role-based authorization.

\- CORS allows configured frontend origins.

\- Survey input validation checks ratings, NPS scores, IDs, and feedback.

\- Request logging includes request IDs and excludes URL query parameters.

\- HTTP 4xx errors are logged without stack traces.

\- Production secrets and deployment-specific settings must be reviewed before public deployment.



\## 8. Testing and Verification



The latest automated test execution reported:



| Metric | Result |

|---|---|

| Total tests | 49 |

| Passed | 49 |

| Failed | 0 |



Manual verification has confirmed HTTP 401 responses for protected Survey GET endpoints, authenticated eligible-ticket access, and CORS allowed/disallowed origin behavior.



Additional production and fresh-database deployment checks remain pending.



\## 9. Related Documentation



\- `README.md`

\- `docs/deployment-guide.md`

\- `docs/security-checklist.md`



\---



\*\*Project:\*\* L8 CSAT/NPS



\*\*Documentation Status:\*\* Draft completed; final deployment verification pending.
