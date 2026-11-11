# BUG LOG – L8 CSAT/NPS

## BUG-01: API trả HTTP 500 thay vì HTTP 400

- **Severity:** Major
- **Hiện tượng:** Dữ liệu đăng nhập không hợp lệ khiến API trả HTTP 500 thay vì HTTP 400.
- **Cách tái hiện:** Gửi yêu cầu đăng nhập thiếu username hoặc password.
- **Nguyên nhân:** Middleware xử lý lỗi chưa nhận thuộc tính `err.status`.
- **Cách sửa:** Cập nhật `src/middlewares/error.middleware.js` để xử lý `err.statusCode` và `err.status`.
- **Kiểm tra lại:** Chạy bộ test API authentication; xác nhận lỗi dữ liệu được xử lý với HTTP 400.
- **Trạng thái:** Fixed
- **Commit:** [fb20abb](https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/commit/fb20abb)

## BUG-02: Nhân viên có thể xóa phiếu bảo hành không đúng quyền

- **Severity:** Major
- **Hiện tượng:** Chức năng xóa phiếu bảo hành chưa giới hạn đúng vai trò người dùng.
- **Cách tái hiện:** Đăng nhập bằng tài khoản Staff và gửi yêu cầu DELETE đến `/api/v1/warranty-tickets/:id`.
- **Nguyên nhân:** Route xóa chưa áp dụng kiểm tra quyền Admin.
- **Cách sửa:** Bổ sung middleware `requireRole("admin")` cho chức năng xóa phiếu bảo hành.
- **Kiểm tra lại:** Staff bị từ chối với HTTP 403; Admin được phép thực hiện theo quyền.
- **Trạng thái:** Fixed
- **Commit:** [c629021](https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/commit/c629021)

## BUG-03: Đăng nhập thất bại khi chạy bằng Docker

- **Severity:** Major
- **Hiện tượng:** Đăng nhập trả HTTP 500 khi Backend chạy trong Docker.
- **Cách tái hiện:** Khởi động Docker Compose khi Backend không được truyền biến môi trường `JWT_SECRET`, sau đó thực hiện đăng nhập.
- **Nguyên nhân:** `docker-compose.yml` chưa truyền `JWT_SECRET` vào container Backend.
- **Cách sửa:** Bổ sung `JWT_SECRET: ${JWT_SECRET:?Set JWT_SECRET in .env}` trong phần `backend.environment`.
- **Kiểm tra lại:** Khởi động lại Backend bằng Docker Compose và xác nhận đăng nhập thành công.
- **Trạng thái:** Fixed
- **Commit:** [4d3ea8a](https://github.com/kh-oa/cdtn1-TruongQuocAnhKhoa-L8/commit/4d3ea8a)

## Tổng kết

- **Tổng số lỗi:** 3
- **Severity:** 3 Major
- **Đã sửa:** 3
- **Chưa sửa:** 0
- **Bộ kiểm thử tự động:** 49 PASS / 49 tests (kiểm thử trong Docker ngày 11/11/2026)
