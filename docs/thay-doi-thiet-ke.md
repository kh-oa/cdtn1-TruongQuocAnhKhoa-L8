
# Thay đổi thiết kế - L8 CSAT/NPS

## 1. Mục đích

Tài liệu ghi nhận các thay đổi và quyết định thiết kế trong quá trình hoàn thiện bài tập 2 của hệ thống khảo sát hài lòng CSAT/NPS.

## 2. Kiến trúc triển khai

Hệ thống sử dụng React và Vite cho giao diện, Node.js và Express cho Backend, PostgreSQL để lưu trữ dữ liệu.

Backend được tổ chức theo các thành phần:
- Routes: tiếp nhận yêu cầu HTTP và trả kết quả cho Client.
- Services: kiểm tra dữ liệu đầu vào và xử lý nghiệp vụ.
- Repositories: thực hiện truy vấn cơ sở dữ liệu.
- Config: cấu hình kết nối PostgreSQL.
- Middlewares: xử lý lỗi chung.

## 3. Các thay đổi được ghi nhận trong BT2

### 3.1. Quản lý cơ sở dữ liệu

Bổ sung các file migration và seed để hỗ trợ khởi tạo cấu trúc bảng và dữ liệu mẫu. Migration sử dụng bảng schema_migrations để ghi nhận các file đã chạy. Seed sử dụng ON CONFLICT để tránh thêm trùng phiếu bảo hành.

### 3.2. Tích hợp Docker

Cấu hình Backend để sử dụng các file trong thư mục db khi chạy trong Docker. Các lệnh migration và seed được thực hiện trong container Backend để sử dụng cấu hình kết nối cơ sở dữ liệu của môi trường Docker.

### 3.3. Kiểm thử

Bổ sung kiểm thử cho các trường hợp dữ liệu hợp lệ, dữ liệu ngoài giới hạn, thiếu hoặc không hợp lệ thông tin phiếu bảo hành và gửi khảo sát trùng.

## 4. Các thay đổi và xác minh trong BT3

### 4.1. Kiểm thử và xử lý lỗi
Bổ sung kiểm thử HTTP 400 và HTTP 500 cho middleware xử lý lỗi. Kết quả kiểm thử tự động mới nhất trong Docker: 51 PASS, 0 FAIL. Bằng chứng: docs/test-results-final.txt.

### 4.2. Xác thực và bảo mật
Xác minh các API thống kê, danh sách và chi tiết khảo sát yêu cầu JWT. Các yêu cầu không có JWT hợp lệ bị từ chối; các yêu cầu có JWT hợp lệ đã được kiểm tra thành công.

### 4.3. Khả năng triển khai lại
Kiểm tra Fresh Clone bằng Docker Compose với database độc lập. Backend health check thành công, dữ liệu seed gồm 3 phiếu bảo hành và 0 khảo sát.

### 4.4. Tài liệu kiểm thử và triển khai
Hoàn thiện Test Plan, Test Report, Bug Log, Deployment Guide, Security Checklist và API Documentation để phục vụ nghiệm thu BT3.
