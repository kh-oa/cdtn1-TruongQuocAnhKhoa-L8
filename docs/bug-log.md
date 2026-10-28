

# Bug Log - L8 CSAT/NPS

## BUG-01: Backend không kết nối được

- Hiện tượng: Không truy cập được `localhost:3000`.
- Nguyên nhân: Backend chưa được khởi động.
- Cách sửa: Khởi động Backend và kiểm tra trạng thái dịch vụ.
- Kiểm tra lại: Truy cập endpoint `/health`.
- Trạng thái: Đã sửa.


## BUG-02: API thiếu requestId trong phản hồi lỗi

- Hiện tượng: API trả HTTP 400 nhưng JSON không có `requestId`.
- Nguyên nhân: Backend đang chạy phiên bản code cũ.
- Cách sửa: Dừng tiến trình Node.js cũ và khởi động lại Backend.
- Kiểm tra lại: Gửi lại yêu cầu không hợp lệ và kiểm tra phản hồi.
- Trạng thái: Đã sửa.


## BUG-03: PowerShell gửi JSON không hợp lệ

- Hiện tượng: API báo lỗi JSON không hợp lệ.
- Nguyên nhân: Cách xử lý dấu nháy trong PowerShell.
- Cách sửa: Sử dụng `curl.exe` với JSON được định dạng đúng.
- Kiểm tra lại: Gửi yêu cầu và kiểm tra phản hồi API.
- Trạng thái: Đã sửa.


## BUG-04: Không chạy được migration từ PowerShell trên máy Windows

- Hiện tượng: Kết nối PostgreSQL thất bại khi chạy migration trực tiếp trên Windows.
- Nguyên nhân: PostgreSQL trong Docker Compose chưa được công bố cổng để kết nối từ máy Windows.
- Cách sửa: Chạy migration bên trong container Backend bằng `docker compose exec backend node db/migrate.js`.
- Kiểm tra lại: Chạy migration trong container và xác nhận thông báo hoàn tất.
- Trạng thái: Đã chạy thành công trong container.

