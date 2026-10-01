# L8 – Khảo sát hài lòng CSAT/NPS
Sinh viên: Trương Quốc Anh Khoa - 2374802013450 - Track SE
Học phần:
Chuyên đề Tốt nghiệp 1, HK1 2026-2027
Luồng nghiệp vụ:
L8 – Khảo sát hài lòng CSAT/NPS
## 1. Mục tiêu
Hệ thống hỗ trợ khách hàng đánh giá mức độ hài lòng sau khi hoàn tất bảo hành.
Khách hàng có thể đánh giá từ 1 đến 5 sao và gửi nhận xét về dịch vụ bảo hành.
Hệ thống lưu kết quả khảo sát và tổng hợp chỉ số CSAT/NPS.
Marketing và Quản lý trung tâm có thể theo dõi kết quả khảo sát.
## 2. Yêu cầu môi trường
Node.js 20 LTS
PostgreSQL 16
Biến môi trường: xem `.env.example`
## 3. Hướng dẫn chạy
1. `cp .env.example .env` và điền giá trị
2. `npm install`
3. `npm run db:migrate`
4. `npm run dev` → mở `http://localhost:3000/health`
## 4. Cấu trúc thư mục
* `docs/`: Lưu tài liệu yêu cầu và phân tích hệ thống.
* `src/`: Lưu mã nguồn của hệ thống.
* `tests/`: Lưu các file kiểm thử.
* `data/`: Lưu dữ liệu mẫu của case study.
* `README.md`: Giới thiệu dự án và hướng dẫn sử dụng.
## 5. Kiểm thử
`npm test` → hiển thị số test PASS.
## 6. Trạng thái hiện tại
 Khởi tạo project, smoke test chạy được.
 Hoàn thành tài liệu cơ bản cho luồng L8.
 Module mở và thực hiện khảo sát hài lòng.
 Module lưu kết quả khảo sát.
 Module tổng hợp chỉ số CSAT/NPS.
