# TEST REPORT – L8 CSAT/NPS



## 1. Thông tin kiểm thử



- Dự án: L8 – Khảo sát hài lòng CSAT/NPS

- Backend: Node.js, Express

- Database: PostgreSQL

- Công cụ: Node.js Test Runner

- Phương pháp: Unit Testing

- Ngày kiểm thử: 10/11/2026

- Lệnh kiểm thử: `npm.cmd test`

- Minh chứng: `docs/test-results.txt`



## 2. Báo cáo 12 test case



| ID | Loại kiểm thử | Điều kiện / Dữ liệu | Các bước thực hiện | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Minh chứng |

|---|---|---|---|---|---|---|---|

| TC-01 | Invalid Data | rating = 0 | Gửi dữ liệu khảo sát | Từ chối rating nhỏ hơn 1 | Test xác nhận dữ liệu bị từ chối | PASS | [Ảnh TC-01](screenshots/TC-01_Pass.png) |

| TC-02 | Invalid Data | rating = 6 | Gửi dữ liệu khảo sát | Từ chối rating lớn hơn 5 | Test xác nhận dữ liệu bị từ chối | PASS | [Ảnh TC-02](screenshots/TC-02_Pass.png) |

| TC-03 | Boundary | rating = 1, NPS = 0 | Gửi dữ liệu biên dưới | Chấp nhận dữ liệu hợp lệ | Test xác nhận dữ liệu được chấp nhận | PASS | [Ảnh TC-03](screenshots/TC-03_Pass.png) |

| TC-04 | Boundary | rating = 5, NPS = 10 | Gửi dữ liệu biên trên | Chấp nhận dữ liệu hợp lệ | Test xác nhận dữ liệu được chấp nhận | PASS | [Ảnh TC-04](screenshots/TC-04_Pass.png) |

| TC-05 | Data Quality | Phiếu bảo hành không hợp lệ | Gửi khảo sát với phiếu không hợp lệ | Từ chối yêu cầu | Test xác nhận yêu cầu bị từ chối | PASS | [Ảnh TC-05](screenshots/TC-05_Pass.png) |

| TC-06 | Data Quality | Khảo sát đã tồn tại | Gửi khảo sát trùng | Không tạo khảo sát trùng | Test xác nhận yêu cầu bị từ chối | PASS | [Ảnh TC-06](screenshots/TC-06_Pass.png) |

| TC-07 | Happy Path | Khảo sát hợp lệ | Gửi khảo sát với dữ liệu hợp lệ | Chấp nhận khảo sát | Test xác nhận khảo sát được chấp nhận | PASS | [Ảnh TC-07](screenshots/TC-07_Pass.png) |

| TC-08 | Invalid Data | Thiếu rating | Gửi khảo sát thiếu rating | Từ chối yêu cầu | Test xác nhận dữ liệu bị từ chối | PASS | [Ảnh TC-08](screenshots/TC-08_Pass.png) |

| TC-09 | Boundary | ticket_id = 0 | Gửi khảo sát với ID bằng 0 | Từ chối ID không hợp lệ | Test xác nhận ID bị từ chối | PASS | [Ảnh TC-09](screenshots/TC-09_Pass.png) |

| TC-10 | Invalid Data | ticket_id không phải số nguyên | Gửi khảo sát với ID không hợp lệ | Từ chối yêu cầu | Test xác nhận ID bị từ chối | PASS | [Ảnh TC-10](screenshots/TC-10_Pass.png) |

| TC-11 | Boundary | NPS = -1 | Gửi khảo sát với NPS dưới 0 | Từ chối yêu cầu | Test xác nhận NPS bị từ chối | PASS | [Ảnh TC-11](screenshots/TC-11_Pass.png) |

| TC-12 | Security | Không gửi JWT | Gửi DELETE /api/v1/warranty-tickets/1 không có Authorization | HTTP 401, success = false | HTTP 401, success = false | PASS | [Log kiểm thử](test-results.txt) |



## 3. Kết quả tổng hợp



- Tổng số test tự động toàn dự án: **49**

- PASS: **49**

- FAIL: **0**

- Tỷ lệ PASS: **100%**

- Số test case khảo sát được báo cáo: **12**

- Các loại đã thể hiện: Happy Path, Boundary, Invalid Data, Data Quality

- Security và Reproducibility: Có các bài kiểm thử liên quan trong bộ 49 test, cần bổ sung vào báo cáo hoặc dẫn chiếu cụ thể.



## 4. Kết luận



Bộ kiểm thử tự động chạy thành công với 49/49 bài test PASS và không có bài test FAIL. Riêng chức năng khảo sát CSAT/NPS có 12 trường hợp kiểm thử đạt yêu cầu.









## 5. Security Testing

- Không có JWT: HTTP 401 – PASS.
- JWT giả mạo: HTTP 401 – PASS.
- JWT hết hạn: HTTP 401 – PASS.
- Staff gọi DELETE: HTTP 403 – PASS.
- Staff gọi GET: HTTP 200 – PASS.
- File kiểm thử: `tests/auth.api.test.js`.
- Minh chứng: `test-results.txt` và `test-results-rerun.txt`.

## 6. Reproducibility Testing

- Lần chạy 1 trong Docker: 49 PASS, 0 FAIL.
- Lần chạy 2 trong Docker: 49 PASS, 0 FAIL.
- Kết luận: Bộ 49 test đạt 100% PASS trong hai lần chạy liên tiếp trên cùng môi trường Docker.
- Minh chứng: `docs/test-results.txt` và `docs/test-results-rerun.txt`.


