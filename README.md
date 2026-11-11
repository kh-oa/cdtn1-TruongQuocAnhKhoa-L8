# L8 – Khảo sát hài lòng CSAT/NPS

**Sinh viên:** Trương Quốc Anh Khoa  
**MSSV:** 2374802013450  
**Track:** SE  
**Luồng:** L8  
**Học phần:** Chuyên đề Tốt nghiệp 1 – HK1 2026–2027

**GitHub:** https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8

**Phiên bản hiện tại:** v0.2

**Phiên bản dự kiến nộp BT3:** v1.0

## 1. Giới thiệu dự án

Hệ thống khảo sát mức độ hài lòng của khách hàng sau khi hoàn tất bảo hành.

Khách hàng có thể xem các phiếu bảo hành đủ điều kiện, gửi điểm đánh giá và nhận xét. Hệ thống lưu kết quả và cung cấp thống kê CSAT/NPS.

## 2. Công nghệ sử dụng

- Frontend: React, Vite
- Backend: Node.js 24, Express
- Database: PostgreSQL 18
- Authentication: JWT
- Đóng gói và triển khai: Docker Compose
- Kiểm thử: Node.js Test Runner

## 3. Chức năng chính

- Lấy danh sách phiếu bảo hành đủ điều kiện khảo sát.
- Gửi phiếu khảo sát với điểm hài lòng từ 1 đến 5.
- Lưu nhận xét và điểm NPS từ 0 đến 10.
- Kiểm tra dữ liệu đầu vào.
- Ngăn gửi khảo sát trùng cho cùng một phiếu bảo hành.
- Xem danh sách và thống kê khảo sát.
- Hỗ trợ API xác thực bằng JWT.

## 4. Cấu trúc dự án

- `frontend/`: giao diện React.
- `src/routes/`: định nghĩa các API route.
- `src/services/`: xử lý nghiệp vụ.
- `src/repositories/`: truy vấn cơ sở dữ liệu.
- `src/middlewares/`: middleware của Backend.
- `src/config/`: cấu hình kết nối database.
- `db/migrations/`: các file migration.
- `db/seeds/`: dữ liệu mẫu.
- `tests/`: kiểm thử tự động.
- `docs/`: tài liệu dự án và bằng chứng kiểm thử.

## 5. Yêu cầu môi trường

- Git
- Docker Desktop có Docker Compose
- Node.js 24 trở lên (chỉ cần khi chạy kiểm thử trực tiếp trên máy)

Đảm bảo Docker Desktop đang hoạt động trước khi khởi động ứng dụng.

## 6. Hướng dẫn tải và chạy dự án

### Bước 1: Clone repository

```bash
git clone https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8.git
cd cdtn1-TruongQuocAnhKhoa-L8
```

Khi phiên bản `v1.0` được phát hành, có thể sử dụng:

```bash
git checkout v1.0
```

### Bước 2: Tạo file môi trường

Trên Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Trên Linux hoặc macOS:

```bash
cp .env.example .env
```

Mở `.env` và cấu hình:

- `POSTGRES_PASSWORD`: mật khẩu PostgreSQL.
- `DB_PASSWORD`: phải giống `POSTGRES_PASSWORD`.
- `JWT_SECRET`: khóa bí mật dùng để ký JWT, thay bằng giá trị ngẫu nhiên đủ mạnh.
- `CORS_ORIGIN`: địa chỉ frontend được phép truy cập API.

Không đưa file `.env` thật lên GitHub.

### Bước 3: Khởi động ứng dụng

```bash
docker compose up -d --build
```

Docker Compose tự động khởi động theo thứ tự:

1. `db`: PostgreSQL.
2. `db-init`: chạy migration và seed.
3. `backend`: khởi động API.
4. `frontend`: khởi động giao diện React.

Không cần chạy migration và seed thủ công.

### Bước 4: Kiểm tra migration và seed tự động

Kiểm tra log:

```bash
docker compose logs db-init
```

Kiểm tra trạng thái:

```bash
docker compose ps -a
```

Kết quả mong đợi:

| Service | Trạng thái |
|---|---|
| db | Up (healthy) |
| db-init | Exited (0) |
| backend | Up (healthy) |
| frontend | Up |

`Exited (0)` nghĩa là migration và seed đã hoàn thành thành công.

### Bước 5: Truy cập ứng dụng

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health check: http://localhost:3000/health

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

### Bước 6: Dừng ứng dụng

```bash
docker compose down
```

Lệnh này dừng các container nhưng giữ nguyên dữ liệu PostgreSQL.

**Lưu ý:** Không sử dụng `docker compose down -v` nếu muốn giữ dữ liệu.

## 7. Kiểm thử

Cài đặt thư viện:

```bash
npm ci
```

Chạy kiểm thử:

```bash
npm test
```

Nếu sử dụng Windows PowerShell:

```powershell
npm.cmd test
```

Các bài kiểm thử bao gồm:

- Dữ liệu hợp lệ.
- Giá trị biên.
- Rating không hợp lệ.
- Phiếu bảo hành không hợp lệ.
- Khảo sát trùng.
- Kiểm tra JWT và phân quyền.
- Các trường hợp kiểm thử chức năng khác.

Kết quả kiểm thử gần nhất: **42 tests passed, 0 failed**.

Kết quả kiểm thử được lưu trong `docs/test-report.md`.

## 8. Dữ liệu mẫu

Khi khởi tạo database mới, hệ thống tự động tạo 3 phiếu bảo hành mẫu:

| Mã phiếu | Sản phẩm | Trạng thái |
|---|---|---|
| BH001 | Laptop Dell | Hoàn tất |
| BH002 | Điện thoại Samsung | Hoàn tất |
| BH003 | Máy tính bảng | Đang xử lý |

Database đã sử dụng trước đó có thể chứa nhiều dữ liệu hơn.

Kiểm tra số lượng phiếu:

```bash
docker compose exec db psql -U postgres -d l8_csat_nps -c "SELECT COUNT(*) FROM warranty_ticket;"
```

## 9. Tài liệu liên quan

- `docs/srs.md`: đặc tả yêu cầu phần mềm.
- `docs/architecture.drawio`: sơ đồ kiến trúc.
- `docs/erd.drawio`: sơ đồ cơ sở dữ liệu.
- `docs/usecase.drawio`: sơ đồ use case.
- `docs/test-plan.md`: kế hoạch kiểm thử.
- `docs/test-cases.md`: các trường hợp kiểm thử.
- `docs/test-report.md`: báo cáo kiểm thử.
- `docs/bug-log.md`: nhật ký lỗi.
- `docs/deployment-guide.md`: hướng dẫn triển khai bằng tiếng Anh.
- `docs/security-checklist.md`: danh sách kiểm tra bảo mật.
- `docs/thay-doi-thiet-ke.md`: thay đổi thiết kế.
- `docs/ai-disclosure.md`: khai báo sử dụng AI.

## 10. Phiên bản

**v0.2:** Phiên bản đã phát hành trước đó.

**v1.0:** Phiên bản dự kiến nộp BT3, bao gồm Docker reproducibility, tài liệu triển khai, kiểm tra bảo mật và API documentation.

Release hiện có: https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/releases/tag/v0.2

Tag `v1.0` sẽ được tạo sau khi hoàn thành và kiểm tra đầy đủ các yêu cầu Buổi 15–16.