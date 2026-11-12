# L8 – Khảo sát hài lòng CSAT/NPS

**Sinh viên:** Trương Quốc Anh Khoa  
**MSSV:** 2374802013450  
**Track:** Software Engineering (SE)  
**Luồng:** L8  
**Học phần:** Chuyên đề Tốt nghiệp 1 – HK1 2026–2027

**GitHub:** https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8

**Phiên bản nộp BT3:** `v1.0`

## 1. Giới thiệu dự án

Hệ thống khảo sát mức độ hài lòng của khách hàng sau khi hoàn tất bảo hành.

Khách hàng có thể xem các phiếu bảo hành đủ điều kiện, gửi điểm đánh giá và nhận xét. Hệ thống lưu kết quả và cung cấp thống kê CSAT/NPS.

Dự án được phát triển theo Track Software Engineering (SE), sử dụng kiến trúc phân lớp và được đóng gói bằng Docker Compose nhằm hỗ trợ triển khai và kiểm thử có khả năng tái lập.

## 2. Công nghệ sử dụng

- Frontend: React, Vite
- Backend: Node.js 24, Express
- Database: PostgreSQL 18
- Authentication: JWT
- Đóng gói và triển khai: Docker Compose
- Kiểm thử tự động: Node.js Test Runner
- Quản lý phiên bản: Git, GitHub

## 3. Chức năng chính

- Lấy danh sách phiếu bảo hành đủ điều kiện khảo sát.
- Gửi phiếu khảo sát với điểm hài lòng từ 1 đến 5.
- Lưu nhận xét và điểm NPS từ 0 đến 10.
- Kiểm tra dữ liệu đầu vào và giá trị biên.
- Ngăn gửi khảo sát trùng cho cùng một phiếu bảo hành.
- Xem danh sách và thống kê khảo sát.
- Xác thực API bằng JWT.
- Kiểm tra quyền truy cập đối với các thao tác được bảo vệ.

## 4. Cấu trúc dự án

- `frontend/`: giao diện React và Vite.
- `src/routes/`: định nghĩa API routes.
- `src/services/`: xử lý nghiệp vụ.
- `src/repositories/`: truy vấn cơ sở dữ liệu.
- `src/middlewares/`: xác thực, phân quyền và xử lý lỗi.
- `src/config/`: cấu hình kết nối database.
- `db/migrations/`: các file migration.
- `db/seeds/`: dữ liệu mẫu.
- `tests/`: bộ kiểm thử tự động.
- `docs/`: tài liệu và bằng chứng kiểm thử.
- `Dockerfile`: đóng gói backend.
- `frontend/Dockerfile`: đóng gói frontend.
- `docker-compose.yml`: cấu hình các service.
- `.env.example`: mẫu cấu hình môi trường.
- `package-lock.json`: khóa phiên bản dependencies.

## 5. Yêu cầu môi trường

Máy chạy cần có:

- Git để tải mã nguồn.
- Docker Desktop hoặc Docker Engine có Docker Compose.
- Kết nối Internet trong lần build đầu tiên.
- Các cổng `3000` và `5173` chưa bị ứng dụng khác chiếm dụng.
- Dung lượng ổ đĩa đủ để tải Docker images và lưu dữ liệu PostgreSQL.

Node.js 24 chỉ cần cài trực tiếp nếu muốn chạy kiểm thử ngoài Docker.

**Lưu ý:** Docker Desktop phải đang hoạt động trước khi khởi chạy ứng dụng.

## 6. Hướng dẫn tải và chạy dự án

### 6.1. Tải mã nguồn phiên bản BT3

Mở Terminal hoặc PowerShell:

```bash
git clone --branch v1.0 https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8.git
cd cdtn1-TruongQuocAnhKhoa-L8
```

Lệnh clone tải đúng phiên bản `v1.0` được sử dụng để nộp BT3.

### 6.2. Cấu hình môi trường

Sau khi mở thư mục dự án, hệ thống được thiết lập và khởi chạy bằng hai lệnh chính trên Windows PowerShell.

**Lệnh 1 – Tạo file môi trường:**

```powershell
Copy-Item .env.example .env
```

Trên Linux hoặc macOS, dùng lệnh tương đương:

```bash
cp .env.example .env
```

File `.env.example` chứa các biến:

| Biến | Ý nghĩa |
|---|---|
| `PORT` | Cổng backend |
| `DB_HOST` | Địa chỉ PostgreSQL |
| `DB_PORT` | Cổng PostgreSQL |
| `DB_NAME` | Tên database |
| `DB_USER` | Tài khoản database |
| `DB_PASSWORD` | Mật khẩu kết nối database |
| `POSTGRES_PASSWORD` | Mật khẩu khởi tạo PostgreSQL |
| `JWT_SECRET` | Khóa ký JWT |
| `CORS_ORIGIN` | Nguồn frontend được phép gọi API |

Trước khi triển khai ngoài môi trường thử nghiệm, cần thay các giá trị mật khẩu và `JWT_SECRET` mẫu bằng giá trị đủ mạnh. `DB_PASSWORD` phải trùng với `POSTGRES_PASSWORD`.

**Không commit file `.env` lên GitHub.**

### 6.3. Khởi chạy hệ thống

**Lệnh 2 – Build và chạy Docker Compose:**

```bash
docker compose up -d --build
```

Docker Compose quản lý bốn service:

1. `db`: PostgreSQL 18.
2. `db-init`: chạy migration và seed tự động.
3. `backend`: Node.js và Express API.
4. `frontend`: React và Vite.

Không cần chạy migration hoặc seed thủ công.

### 6.4. Kiểm tra trạng thái

```bash
docker compose ps -a
```

Kết quả mong đợi:

| Service | Trạng thái |
|---|---|
| `db` | Up (healthy) |
| `db-init` | Exited (0) |
| `backend` | Up (healthy) |
| `frontend` | Up |

`Exited (0)` của `db-init` là trạng thái thành công, vì service chỉ thực hiện khởi tạo dữ liệu rồi kết thúc.

Có thể kiểm tra log migration và seed:

```bash
docker compose logs db-init
```

### 6.5. Truy cập ứng dụng

Sau khi các service khởi chạy:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

Kiểm tra Backend bằng PowerShell:

```powershell
Invoke-RestMethod http://localhost:3000/health
```

Kết quả mong đợi:

```json
{
  "status": "OK",
  "message": "L8 CSAT/NPS API is running"
}
```

### 6.6. Dừng ứng dụng

```bash
docker compose down
```

Lệnh này dừng các container nhưng vẫn giữ dữ liệu PostgreSQL trong Docker volume.

**Không sử dụng `docker compose down -v` nếu muốn giữ dữ liệu hiện có.**

Nếu thay đổi mật khẩu PostgreSQL sau khi volume đã được khởi tạo, cần đồng bộ mật khẩu với database hiện tại. Thay đổi biến môi trường không tự động đổi mật khẩu đã lưu trong PostgreSQL.

## 7. Kiểm thử tự động

### 7.1. Chạy kiểm thử bằng Docker

Sau khi hệ thống đã khởi động:

```bash
docker compose exec -T backend npm test
```

### 7.2. Chạy kiểm thử trực tiếp

Nếu máy đã cài Node.js 24:

```bash
npm ci
npm test
```

Trên Windows PowerShell, có thể dùng:

```powershell
npm.cmd test
```

### 7.3. Phạm vi kiểm thử

Bộ kiểm thử bao gồm:

- Kiểm thử dữ liệu hợp lệ và không hợp lệ.
- Kiểm thử giá trị biên của rating và NPS.
- Kiểm thử dữ liệu phiếu bảo hành.
- Kiểm thử khảo sát trùng.
- Kiểm thử giới hạn độ dài feedback.
- Kiểm thử xác thực JWT.
- Kiểm thử phân quyền Admin và Staff.
- Kiểm thử mã trạng thái HTTP 400, 401, 403, 404 và xử lý lỗi 500.
- Kiểm thử service, middleware và API.

### 7.4. Kết quả kiểm thử

Kết quả chạy bằng Docker ngày 12/11/2026:

```text
tests 51
pass 51
fail 0
cancelled 0
skipped 0
todo 0
```

**Tổng kết: 51/51 PASS – Tỷ lệ thành công 100%.**

Bằng chứng được lưu tại:

- `docs/test-results-final.txt`
- `docs/test-results-rerun.txt`
- `docs/test-report.md`

## 8. Dữ liệu mẫu

Khi khởi tạo database mới, hệ thống tự động chạy migration và seed.

Dữ liệu mẫu gồm ba phiếu bảo hành:

| Mã phiếu | Sản phẩm | Trạng thái |
|---|---|---|
| BH001 | Laptop Dell | Hoàn tất |
| BH002 | Điện thoại Samsung | Hoàn tất |
| BH003 | Máy tính bảng | Đang xử lý |

Database đã sử dụng trước đó có thể chứa nhiều bản ghi hơn.

Kiểm tra số lượng phiếu bảo hành:

```bash
docker compose exec db psql -U postgres -d l8_csat_nps -c "SELECT COUNT(*) FROM warranty_ticket;"
```

## 9. Tài liệu liên quan

| Tài liệu | Nội dung |
|---|---|
| `docs/srs.md` | Đặc tả yêu cầu phần mềm |
| `docs/architecture.drawio` | Sơ đồ kiến trúc |
| `docs/erd.drawio` | Sơ đồ cơ sở dữ liệu |
| `docs/usecase.drawio` | Sơ đồ use case |
| `docs/test-plan.md` | Kế hoạch kiểm thử |
| `docs/test-cases.md` | Các trường hợp kiểm thử |
| `docs/test-report.md` | Báo cáo kiểm thử |
| `docs/bug-log.md` | Nhật ký lỗi và cách khắc phục |
| `docs/deployment-guide.md` | Hướng dẫn triển khai bằng tiếng Anh |
| `docs/security-checklist.md` | Danh sách kiểm tra bảo mật |
| `docs/api-documentation.md` | Tài liệu API |
| `docs/thay-doi-thiet-ke.md` | Lịch sử thay đổi thiết kế |
| `docs/ai-disclosure.md` | Khai báo sử dụng AI |

## 10. Đóng gói và khả năng tái lập

Dự án sử dụng Docker Compose để đóng gói frontend, backend và PostgreSQL.

Các thành phần được khai báo trong `docker-compose.yml`, với migration và seed chạy tự động qua `db-init`.

Trong lần kiểm tra trên máy phát triển ngày 12/11/2026, hệ thống đạt:

- PostgreSQL: Healthy.
- `db-init`: Exited (0).
- Backend: Healthy.
- Frontend: Up.
- Bộ kiểm thử: 51 PASS, 0 FAIL.

Việc kiểm chứng hoàn toàn từ bản clone mới của tag `v1.0` cần được thực hiện riêng để xác nhận khả năng tái lập trên môi trường sạch.

## 11. Quản lý phiên bản

**v0.2:** Phiên bản đã phát hành trước BT3.

**v1.0:** Phiên bản được gắn tag để nộp BT3, bao gồm mã nguồn, Docker Compose, migration/seed, bộ kiểm thử và tài liệu kỹ thuật.

- Repository: https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8
- Tag BT3: https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/tree/v1.0

**Lưu ý:** Các thay đổi README được thực hiện sau khi tạo tag `v1.0` cần được commit và kiểm tra lại phiên bản nộp trên GitHub. Việc sửa README trên nhánh `main` không tự động cập nhật nội dung của tag đã tồn tại.