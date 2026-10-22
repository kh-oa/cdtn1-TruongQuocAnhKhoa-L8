# Báo cáo kiểm thử hệ thống L8 – CSAT/NPS

## 1. Thông tin kiểm thử

- Dự án: L8 – Khảo sát hài lòng CSAT/NPS
- Backend: Node.js, Express
- Frontend: React
- Database: PostgreSQL
- Công cụ kiểm thử: PowerShell, Chrome

## 2. Kết quả kiểm thử

| Mã TC | Trường hợp kiểm thử | Kết quả mong đợi | Thực tế | Trạng thái |
|---|---|---|---|---|
| TC01 | Gửi đánh giá hợp lệ | HTTP 201, lưu khảo sát | Gửi thành công | PASS |
| TC02 | Gửi trùng phiếu bảo hành | HTTP 409 | Hệ thống từ chối | PASS |
| TC03 | Gửi đánh giá 6 sao | HTTP 400 | Hệ thống từ chối | PASS |
| TC04 | Không cung cấp ticket_id | HTTP 400 | Hệ thống từ chối | PASS |
| TC05 | Xem thống kê CSAT | HTTP 200, trả dữ liệu thống kê | Dữ liệu chính xác | PASS |

## 3. Tổng kết

- Tổng số test case: 5
- Số test case PASS: 5
- Số test case FAIL: 0
- Tỷ lệ thành công: 100%

Các chức năng được kiểm thử đã hoạt động đúng theo kết quả mong đợi.