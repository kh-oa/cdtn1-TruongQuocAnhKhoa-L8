# TEST PLAN – HỆ THỐNG KHẢO SÁT CSAT/NPS L8

## 1. Mục tiêu kiểm thử

- Kiểm tra tính chính xác của chức năng gửi phiếu khảo sát.
- Đảm bảo hệ thống từ chối dữ liệu không hợp lệ.
- Kiểm tra giới hạn điểm đánh giá Rating và NPS.
- Kiểm tra trường hợp phiếu bảo hành không hợp lệ và khảo sát trùng.
- Đảm bảo dữ liệu khảo sát hợp lệ được xử lý chính xác.

## 2. Phạm vi kiểm thử

### 2.1. Trong phạm vi

- Kiểm tra chức năng gửi khảo sát CSAT/NPS.
- Kiểm tra Rating từ 1 đến 5.
- Kiểm tra NPS từ 0 đến 10.
- Kiểm tra ticket_id hợp lệ.
- Kiểm tra phiếu bảo hành không hợp lệ.
- Kiểm tra khảo sát trùng.
- Kiểm tra dữ liệu đầu vào bị thiếu hoặc sai định dạng.

### 2.2. Ngoài phạm vi

- Kiểm thử giao diện người dùng React.
- Kiểm thử hiệu năng toàn hệ thống.
- Kiểm thử bảo mật chuyên sâu.
- Kiểm thử tích hợp toàn bộ hệ thống với PostgreSQL.

## 3. Đối tượng kiểm thử

- Module: `src/services/survey.service.js`
- Module: `src/repositories/survey.repository.js`
- Bộ kiểm thử: `tests/survey.service.test.js`
- Chức năng: `submitSurvey()`.

## 4. Môi trường kiểm thử

| Thành phần | Môi trường |
|---|---|
| Hệ điều hành | Windows |
| Ngôn ngữ lập trình | JavaScript |
| Runtime | Node.js |
| Framework Backend | Express |
| Cơ sở dữ liệu dự án | PostgreSQL |
| Công cụ kiểm thử | Node.js Test Runner |
| Công cụ thực thi | PowerShell |
| Trình soạn thảo | Visual Studio Code |

Lệnh thực hiện kiểm thử:

`docker compose exec -T backend npm test`

## 5. Phương pháp kiểm thử

Áp dụng Unit Testing và API Testing bằng Node.js Test Runner. Các kiểm thử service tập trung vào nghiệp vụ khảo sát; các kiểm thử API tập trung vào xác thực JWT và phân quyền người dùng.

Các kỹ thuật được sử dụng:

- Kiểm thử giá trị biên: Rating = 1, Rating = 5, NPS = 0, NPS = 10.
- Kiểm thử dữ liệu không hợp lệ: Rating nhỏ hơn 1 hoặc lớn hơn 5.
- Kiểm thử dữ liệu thiếu: Không cung cấp Rating.
- Kiểm thử định dạng: ticket_id không phải số nguyên.
- Kiểm thử nghiệp vụ: Phiếu bảo hành không hợp lệ và khảo sát trùng.
- Kiểm thử luồng thành công: Gửi khảo sát hợp lệ.

Các hàm repository được giả lập trong những test case cần thiết để kiểm tra xử lý của service độc lập.

## 6. Tiêu chí kiểm thử

### 6.1. Tiêu chí bắt đầu

- Mã nguồn chức năng gửi khảo sát đã được xây dựng.
- Bộ test case đã được chuẩn bị.
- Môi trường Node.js hoạt động.
- Các thư viện cần thiết đã được cài đặt.

### 6.2. Tiêu chí hoàn thành

- Thực hiện đầy đủ 12 test case.
- Các test case có kết quả thực tế phù hợp với kết quả mong đợi.
- Có ảnh chụp minh chứng cho từng test case.
- Không có test case FAIL trong lần chạy kiểm thử được báo cáo.

### 6.3. Tiêu chí PASS/FAIL

- PASS: Kết quả thực tế đáp ứng kết quả mong đợi.
- FAIL: Kết quả thực tế không đáp ứng kết quả mong đợi.

## 7. Lịch trình kiểm thử

| Công việc | Trạng thái |
|---|---|
| Xây dựng 12 test case | Hoàn thành |
| Thực hiện kiểm thử | Hoàn thành |
| Chụp ảnh minh chứng | Hoàn thành |
| Tổng hợp kết quả | Hoàn thành |
| Kiểm tra và hoàn thiện tài liệu | Đang thực hiện |

## 8. Rủi ro và biện pháp xử lý

| Rủi ro | Biện pháp xử lý |
|---|---|
| Dữ liệu đầu vào không hợp lệ | Bổ sung test case kiểm tra dữ liệu |
| Repository trả về dữ liệu không mong đợi | Giả lập dữ liệu để kiểm tra service |
| Môi trường Node.js gặp lỗi | Kiểm tra phiên bản Node.js và thư viện |
| Test case thất bại | Kiểm tra nguyên nhân, sửa lỗi và chạy lại |
| Thiếu ảnh minh chứng | Kiểm tra danh sách ảnh TC-01 đến TC-12 |

## 9. Kết luận

Test Plan được xây dựng nhằm xác định mục tiêu, phạm vi, phương pháp và tiêu chí kiểm thử cho chức năng gửi khảo sát CSAT/NPS.

Bộ kiểm thử hiện có 12 test case. Kết quả báo cáo nghiệp vụ gồm 12 test case. Bộ kiểm thử tự động toàn dự án đã đạt 49 PASS và 0 FAIL qua hai lần chạy liên tiếp trong Docker. Sau khi bổ sung 2 bài kiểm thử xử lý lỗi HTTP 400/500, kết quả chạy mới nhất đạt 51 PASS và 0 FAIL.