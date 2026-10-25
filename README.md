# L8 – Khảo sát hài lòng CSAT/NPS

**Sinh viên:** Trương Quốc Anh Khoa  
**MSSV:** 2374802013450  
**Track:** SE – Software Engineering  
**Học phần:** Chuyên đề Tốt nghiệp 1 – HK1 2026–2027

## 1. Giới thiệu dự án

Hệ thống hỗ trợ khách hàng đánh giá mức độ hài lòng sau khi hoàn tất bảo hành.

Khách hàng có thể đánh giá từ 1 đến 5 sao và gửi nhận xét. Hệ thống lưu kết quả vào cơ sở dữ liệu và hỗ trợ Marketing theo dõi thống kê CSAT.

## 2. Công nghệ sử dụng

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: PostgreSQL 18
- Công cụ: VS Code, pgAdmin 4, Git, GitHub

## 3. Chức năng đã hoàn thành

- Hiển thị danh sách phiếu bảo hành đủ điều kiện khảo sát.
- Khách hàng gửi đánh giá từ 1 đến 5 sao.
- Lưu đánh giá và nhận xét vào PostgreSQL.
- Ngăn gửi đánh giá trùng phiếu bảo hành.
- Kiểm tra dữ liệu đầu vào không hợp lệ.
- Hiển thị thống kê Marketing gồm tổng khảo sát, điểm trung bình, số lượt hài lòng và tỷ lệ CSAT.

## 4. Cấu trúc thư mục

- `frontend/`: Giao diện React.
- `src/`: Backend Node.js và Express.
- `db/`: Các file liên quan đến cơ sở dữ liệu.
- `docs/`: Tài liệu phân tích, thiết kế và kiểm thử.
- `tests/`: Thư mục dành cho kiểm thử.
- `data/`: Dữ liệu của dự án.

## 5. Hướng dẫn chạy dự án

### 5.1. Chuẩn bị

Cài đặt Node.js và PostgreSQL.

Tạo cơ sở dữ liệu `l8_csat_nps` và các bảng cần thiết.

Tạo file `.env` trong thư mục gốc và cấu hình kết nối PostgreSQL theo máy đang sử dụng. Không đưa mật khẩu hoặc file `.env` lên GitHub.

### 5.2. Chạy Backend

Mở Terminal tại thư mục gốc của dự án:

```bash
npm install
node src/server.js
```

Backend chạy tại:

`http://localhost:3000`

Kiểm tra:

`http://localhost:3000/health`

### 5.3. Chạy Frontend

Mở Terminal thứ hai:

```bash
cd frontend
npm install
npm run dev
```

Truy cập:

`http://localhost:5173`

### 5.4. Kiểm tra API

- `GET /api/surveys/eligible-tickets`: Lấy danh sách phiếu đủ điều kiện.
- `POST /api/surveys`: Gửi đánh giá.
- `GET /api/surveys/statistics`: Xem thống kê CSAT.

## 6. Kết quả kiểm thử

Đã thực hiện 5 trường hợp kiểm thử:

| Mã | Nội dung | Kết quả |
|---|---|---|
| TC01 | Gửi đánh giá hợp lệ | PASS |
| TC02 | Không cho gửi trùng phiếu | PASS |
| TC03 | Từ chối đánh giá ngoài 1–5 sao | PASS |
| TC04 | Từ chối khi thiếu phiếu bảo hành | PASS |
| TC05 | Kiểm tra thống kê CSAT | PASS |

**Tổng kết: 5/5 test case PASS.**

Chi tiết xem tại `docs/test-cases.md`.

## 7. Chức năng chưa hoàn thành

- Bổ sung tính toán chỉ số NPS.
- Bổ sung kiểm thử giao diện React.
- Bổ sung hình ảnh minh chứng.
- Hoàn thiện thêm các tài liệu triển khai.

## 8. Kết luận

