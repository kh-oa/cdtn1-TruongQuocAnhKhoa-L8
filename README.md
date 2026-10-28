# L8 – Khảo sát hài lòng CSAT/NPS

**Sinh viên:** Trương Quốc Anh Khoa  
**MSSV:** 2374802013450  
**Track:** SE  
**Luồng:** L8  
**Học phần:** Chuyên đề Tốt nghiệp 1 – HK1 2026–2027

**GitHub:** https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8  
**Release:** v0.2

## 1. Giới thiệu dự án

Hệ thống khảo sát mức độ hài lòng của khách hàng sau khi hoàn tất bảo hành. Khách hàng có thể xem các phiếu bảo hành đủ điều kiện, gửi điểm đánh giá và nhận xét. Hệ thống lưu kết quả và cung cấp thống kê CSAT/NPS.

## 2. Công nghệ sử dụng

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgreSQL 18
- Đóng gói và chạy ứng dụng: Docker Compose
- Kiểm thử: Node.js Test Runner

## 3. Chức năng chính

- Lấy danh sách phiếu bảo hành đủ điều kiện khảo sát.
- Gửi phiếu khảo sát với điểm hài lòng từ 1 đến 5.
- Lưu nhận xét và điểm NPS từ 0 đến 10.
- Kiểm tra dữ liệu đầu vào.
- Ngăn gửi khảo sát trùng cho cùng một phiếu bảo hành.
- Xem danh sách và thống kê khảo sát.

## 4. Cấu trúc dự án

- `frontend/`: giao diện React.
- `src/routes/`: định nghĩa các API route.
- `src/services/`: xử lý nghiệp vụ.
- `src/repositories/`: truy vấn cơ sở dữ liệu.
- `src/middlewares/`: middleware của backend.
- `src/config/`: cấu hình kết nối database.
- `db/migrations/`: các file migration.
- `db/seeds/`: dữ liệu mẫu.
- `tests/`: kiểm thử dịch vụ.
- `docs/`: tài liệu, sơ đồ và nhật ký lỗi.

## 5. Yêu cầu môi trường

- Git
- Docker Desktop có Docker Compose
- Node.js 24 trở lên nếu muốn chạy kiểm thử bằng npm trên máy Windows

## 6. Hướng dẫn tải và chạy dự án

### Bước 1: Clone đúng phiên bản

```bash
git clone --branch v0.2 https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8.git
cd cdtn1-TruongQuocAnhKhoa-L8
```

### Bước 2: Tạo file môi trường

Trên Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Mở file `.env` và đặt `POSTGRES_PASSWORD` thành mật khẩu do người chạy dự án tự chọn. Đặt `DB_PASSWORD` cùng giá trị đó.

Không đưa file `.env` thật lên GitHub.

### Bước 3: Khởi động ứng dụng

```bash
docker compose up -d --build
```

Kiểm tra trạng thái các container:

```bash
docker compose ps
```

### Bước 4: Chạy migration và seed

```bash
docker compose exec backend node db/migrate.js
```

```bash
docker compose exec backend node db/seed.js
```

Có thể chạy lại migration và seed để kiểm tra tính an toàn khi chạy nhiều lần.

### Bước 5: Truy cập ứng dụng

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Health check: http://localhost:3000/health

### Bước 6: Dừng ứng dụng

```bash
docker compose down
```

Lệnh trên dừng các container nhưng giữ volume dữ liệu database.

## 7. Kiểm thử

Cài đặt các package ở thư mục gốc:

```bash
npm ci
```

Chạy kiểm thử:

```bash
npm test
```

Trên Windows PowerShell, có thể dùng:

```powershell
npm.cmd test
```

Các bài kiểm thử hiện có bao gồm dữ liệu hợp lệ, giá trị biên, rating không hợp lệ, phiếu bảo hành không hợp lệ và khảo sát trùng.

## 8. Tài liệu liên quan

- `docs/srs.md`: đặc tả yêu cầu phần mềm.
- `docs/architecture.drawio`: sơ đồ kiến trúc.
- `docs/erd.drawio`: sơ đồ cơ sở dữ liệu.
- `docs/usecase.drawio`: sơ đồ use case.
- `docs/bug-log.md`: nhật ký lỗi.
- `docs/thay-doi-thiet-ke.md`: thay đổi thiết kế.
- `docs/ai-disclosure.md`: khai báo sử dụng AI.

## 9. Phiên bản

Phiên bản nộp bài: `v0.2`.

Release: https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/releases/tag/v0.2
