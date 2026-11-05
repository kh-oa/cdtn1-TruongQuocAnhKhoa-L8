# DANH SÁCH TEST CASE – HỆ THỐNG L8 CSAT/NPS

## 1. Thông tin kiểm thử

- Dự án: L8 – Khảo sát hài lòng CSAT/NPS
- Backend: Node.js, Express
- Frontend: React
- Database: PostgreSQL
- Công cụ: Node.js Test Runner, PowerShell, VS Code
- File kiểm thử: `tests/survey.service.test.js`
- Phương pháp: Unit Testing

## 2. Danh sách 12 test case

| Mã TC | Trường hợp kiểm thử | Kết quả mong đợi | Kết quả thực tế | Trạng thái |
|---|---|---|---|---|
| TC-01 | Từ chối rating nhỏ hơn 1 | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-02 | Từ chối rating lớn hơn 5 | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-03 | Chấp nhận rating = 1, NPS = 0 | Trả về dữ liệu hợp lệ | Chấp nhận thành công | PASS |
| TC-04 | Chấp nhận rating = 5, NPS = 10 | Trả về dữ liệu hợp lệ | Chấp nhận thành công | PASS |
| TC-05 | Phiếu bảo hành không hợp lệ | Lỗi 404 | Hệ thống từ chối | PASS |
| TC-06 | Khảo sát đã tồn tại | Lỗi 409 | Hệ thống từ chối | PASS |
| TC-07 | Gửi khảo sát hợp lệ | Trả về thông tin khảo sát chính xác | Gửi thành công | PASS |
| TC-08 | Thiếu rating | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-09 | ticket_id bằng 0 | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-10 | ticket_id không phải số nguyên | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-11 | NPS nhỏ hơn 0 | Lỗi 400 | Hệ thống từ chối | PASS |
| TC-12 | NPS lớn hơn 10 | Lỗi 400 | Hệ thống từ chối | PASS |

## 3. Kết quả tổng hợp

- Tổng số test case: 12
- Số test PASS: 12
- Số test FAIL: 0
- Tỷ lệ PASS: 100%
- Tỷ lệ FAIL: 0%

## 4. Minh chứng kiểm thử

Các ảnh chụp kết quả kiểm thử được lưu tại `docs/screenshots/`.

| Mã TC | Ảnh minh chứng |
|---|---|
| TC-01 | screenshots/TC-01.png |
| TC-02 | screenshots/TC-02.png |
| TC-03 | screenshots/TC-03.png |
| TC-04 | screenshots/TC-04.png |
| TC-05 | screenshots/TC-05.png |
| TC-06 | screenshots/TC-06.png |
| TC-07 | screenshots/TC-07.png |
| TC-08 | screenshots/TC-08.png |
| TC-09 | screenshots/TC-09.png |
| TC-10 | screenshots/TC-10.png |
| TC-11 | screenshots/TC-11.png |
| TC-12 | screenshots/TC-12.png |

## 5. Kết luận

Qua quá trình kiểm thử đơn vị chức năng gửi khảo sát CSAT/NPS, hệ thống đạt kết quả 12/12 test case PASS, không có test case FAIL.

Các trường hợp kiểm tra dữ liệu đầu vào, giá trị biên, phiếu bảo hành không hợp lệ, khảo sát trùng và gửi khảo sát hợp lệ đều đạt kết quả mong đợi.

Kết luận: Bộ kiểm thử đơn vị đạt tỷ lệ thành công 100%.