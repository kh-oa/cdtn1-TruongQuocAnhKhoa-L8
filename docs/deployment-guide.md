# Deployment Guide – L8 CSAT/NPS



## 1. Requirements



The following software is required:



- Git

- Docker Desktop with Docker Compose

- Node.js 24 or later (optional, for running tests locally)



The application uses:



- Frontend: React and Vite

- Backend: Node.js and Express

- Database: PostgreSQL 18

- Container management: Docker Compose



Docker must be running before starting the application.



## 2. Setup Steps



### Step 1: Clone the repository



```bash

git clone https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8.git

cd cdtn1-TruongQuocAnhKhoa-L8

```



For the final release, check out tag `v1.0` after it has been created.



### Step 2: Configure environment variables



On Windows PowerShell:



```powershell

Copy-Item .env.example .env

```



On Linux or macOS:



```bash

cp .env.example .env

```



Open `.env` and replace the example passwords and JWT secret with secure values.



`DB\_PASSWORD` and `POSTGRES\_PASSWORD` must have the same value.



### Step 3: Build and start the application



```bash

docker compose up -d --build

```



Docker Compose starts the services in the following order:



1\. PostgreSQL database

2\. Database initialization (migration and seed)

3\. Backend API

4\. Frontend application



Database migration and seed scripts run automatically through the `db-init` service.



### Step 4: Check container status



```bash

docker compose ps -a

```



Expected results:



- `db`: Up (healthy)

- `db-init`: Exited (0)

- `backend`: Up (healthy)

- `frontend`: Up



### Step 5: Access the application



- Frontend: http://localhost:5173

- Backend: http://localhost:3000

- Health endpoint: http://localhost:3000/health



### Step 6: Stop the application



```bash

docker compose down

```



This command stops the containers without deleting the PostgreSQL data volume.



Do not use `docker compose down -v` unless permanent deletion of database data is intended.



## 3. Environment Variables



| Variable | Description | Example |

|---|---|---|

| `PORT` | Backend API port | `3000` |

| `DB\_HOST` | PostgreSQL hostname inside Docker | `db` |

| `DB\_PORT` | PostgreSQL port | `5432` |

| `DB\_NAME` | Database name | `l8\_csat\_nps` |

| `DB\_USER` | Database username | `postgres` |

| `DB\_PASSWORD` | Password used by the Backend | `your\_password\_here` |

| `POSTGRES\_PASSWORD` | Password used to initialize PostgreSQL | `your\_password\_here` |

| `JWT\_SECRET` | Secret key used to sign JWT tokens | `replace\_with\_a\_random\_secret\_at\_least\_32\_characters` |

| `API\_PROXY\_TARGET` | Frontend API proxy destination, configured in Docker Compose | `http://backend:3000` |



The example passwords and JWT secret are placeholders and must be replaced before production deployment.



Never commit the real `.env` file or production secrets to Git.



## 4. Sample Data and Expected Counts



The initial database migration creates three main tables:



- `warranty\_ticket`

- `survey`

- `users`



The seed script inserts three sample warranty tickets:



| Ticket Code | Product | Status |

|---|---|---|

| BH001 | Laptop Dell | Hoàn tất |

| BH002 | Điện thoại Samsung | Hoàn tất |

| BH003 | Máy tính bảng | Đang xử lý |



The seed script uses `ON CONFLICT DO NOTHING` to prevent duplicate ticket codes.



For a newly initialized database, the expected number of warranty tickets is \*\*3\*\*.



Existing databases may contain additional records.



During the local verification on November 10, 2026, the existing database contained \*\*11 warranty tickets\*\*.



The seed does not create sample users or survey responses.



## 5. Verify It Works



### Check the Backend health endpoint



On Windows PowerShell:



```powershell

Invoke-RestMethod http://localhost:3000/health

```



Expected response:



```json

{

&#x20; "status": "OK",

&#x20; "message": "L8 CSAT/NPS API is running"

}

```



### Verify database migrations



```bash

docker compose exec db psql -U postgres -d l8\_csat\_nps -c "SELECT filename FROM schema\_migrations ORDER BY filename;"

```



Expected migration files:



```text

001\_initial.sql

002\_create\_users.sql

```



### Verify sample data



```bash

docker compose exec db psql -U postgres -d l8\_csat\_nps -c "SELECT COUNT(\*) FROM warranty\_ticket;"

```



Expected result for a new database:



```text

3

```



### Verify container health



```bash

docker compose ps -a

```



The database and Backend should report `healthy`. The initialization container should report `Exited (0)`.



### Run automated tests



Install dependencies and execute the test suite:



```bash

npm ci

npm test

```



On Windows PowerShell, use `npm.cmd test` if necessary.



### Review service logs



```bash

docker compose logs db-init

docker compose logs backend

```



The initialization logs should confirm that migrations and seed scripts completed successfully.



\*\*Verification note:\*\* The application has been verified using an existing local database. A separate clean-database deployment test is still required to confirm full reproducibility.
