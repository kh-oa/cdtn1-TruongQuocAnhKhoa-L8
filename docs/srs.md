



 
CHUYÊN ĐỀ TỐT NGHIỆP 1
NGÀNH: CÔNG NGHỆ THÔNG TIN




SVTH: Trương Quốc Anh Khoa
MSSV: 2374802013450
GVHD: TS. Nguyễn Trí Hải











ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS RÚT GỌN)
Hệ thống khảo sát mức độ hài lòng sau bảo hành
Sinh viên: Trương Quốc Anh Khoa – MSSV: 2374802013450 – Track: SE – Luồng: L8 Phiên bản 1.0 – Chuyên đề tốt nghiệp 1 – Bài tập 1 (Buổi 4)
1.	Bảng SRS rút gọn
1.1.	Giới thiệu và phạm vi
1.1.1.	Bối cảnh và luồng nghiệp vụ
Sau khi trung tâm hoàn tất bảo hành, khách hàng cần có cách phản hồi về chất lượng dịch vụ để Marketing và Quản lý trung tâm theo dõi mức độ hài lòng. Luồng nghiệp vụ được chọn: khảo sát mức độ hài lòng của khách hàng sau bảo hành. Phạm vi gồm mở và gửi phiếu khảo sát, đánh giá 1–5 sao, xem lịch sử phiếu đã gửi, xem kết quả, chỉ số CSAT/NPS và báo cáo tổng hợp.
1.1.2.	Điều chủ ý KHÔNG làm (WON'T) và hướng mở rộng (COULD)
•	WON'T – ô nhận xét bằng văn bản tự do: đã cân nhắc và loại khỏi phiên bản này; phản hồi chỉ gồm số sao.
•	WON'T – sửa hoặc xóa phiếu khảo sát sau khi đã gửi: để bảo toàn số liệu CSAT/NPS.
•	WON'T – tự động nhắc khách hàng điền khảo sát qua SMS hoặc email.
•	WON'T – xử lý phiếu bảo hành và chăm sóc khách hàng sau khảo sát: thuộc hệ thống khác.
•	Hướng mở rộng (COULD): US6, US7, US8 (CSAT/NPS, kết quả theo kỹ thuật viên, báo cáo tổng hợp) không hiện thực trong học phần này.
1.1.3.	Bảng thuật ngữ
Mỗi khái niệm chỉ dùng một tên duy nhất trong SRS và mọi sơ đồ.

Thuật ngữ	Định nghĩa
Phiếu bảo hành	Hồ sơ yêu cầu bảo hành của khách hàng tại trung tâm.
Phiếu khảo sát	Biểu mẫu đánh giá dịch vụ gắn với một phiếu bảo hành đã hoàn tất.
Trung tâm	Trung tâm bảo hành cung cấp dịch vụ.
Kỹ thuật viên	Nhân viên trực tiếp xử lý phiếu bảo hành.
CSAT	Chỉ số hài lòng = số phiếu khảo sát có 4–5 sao / tổng số phiếu khảo sát đã gửi
× 100%.
NPS	Chỉ số sẵn sàng giới thiệu, quy đổi từ số sao: 5 sao là người ủng hộ, 4 sao là trung lập, 1–3 sao là người phê phán; NPS = % người ủng hộ − % người phê phán. (Giả định quy đổi, cần xác nhận.)

1.1.4.	Chuẩn tham chiếu
Cấu trúc SRS này là bản rút gọn theo tinh thần của ISO/IEC/IEEE 29148, không tuân thủ đầy đủ chuẩn.
 
1.2.	Các bên liên quan và vai trò người dùng
Quyền hạn dưới đây suy ra từ các User Story, cần xác nhận với đối tượng nghiệp vụ. Phiên bản này không có actor không phải người.

Actor	Vai trò	Được làm	Không được làm
Khách hàng	Người đã hoàn tất bảo hành	Mở, đánh giá và gửi phiếu khảo sát của mình; xem lịch sử phiếu đã gửi của mình.	Xem hoặc sửa phiếu của khách khác; sửa hoặc xóa phiếu đã gửi; xem CSAT/NPS và báo cáo.
Marketing	Theo dõi mức độ hài lòng	Xem kết quả khảo sát; xem CSAT/NPS.	Gửi, sửa, xóa phiếu khảo sát; xem kết quả theo từng kỹ thuật viên.
Quản lý trung tâm	Theo dõi chất lượng phục vụ	Xem kết quả theo từng kỹ thuật viên; xem báo cáo tổng hợp.	Gửi, sửa, xóa phiếu khảo sát.


1.3.	Yêu cầu chức năng
1.3.1	User Story và mức MoSCoW

Mã	User Story	MoSCoW
US1	Là khách hàng, tôi muốn mở phiếu khảo sát sau khi hoàn tất bảo hành để đánh giá chất lượng dịch vụ.	MUST
US2	Là khách hàng, tôi muốn đánh giá mức độ hài lòng từ 1 đến 5 sao để thể hiện mức độ hài lòng của mình.	MUST
US3	Là khách hàng, tôi muốn xem lại lịch sử các phiếu khảo sát đã gửi để theo dõi phản hồi của mình.	SHOULD
US4	Là khách hàng, tôi muốn gửi phiếu khảo sát sau khi hoàn thành đánh giá để lưu lại phản hồi của mình.	MUST
US5	Là Marketing, tôi muốn xem kết quả khảo sát của khách hàng để theo dõi mức độ hài lòng.	SHOULD
US6	Là Marketing, tôi muốn xem chỉ số CSAT/NPS được tổng hợp từ kết quả khảo sát để theo dõi chất lượng dịch vụ.	COULD
US7	Là Quản lý trung tâm, tôi muốn xem kết quả khảo sát theo từng kỹ thuật viên để theo dõi chất lượng phục vụ.	COULD
US8	Là Quản lý trung tâm, tôi muốn xem báo cáo tổng hợp mức độ hài lòng của khách hàng để theo dõi tình hình dịch vụ.	COULD

Tiêu chí chấp nhận Given–When–Then của ba story MUST (US1, US2, US4) nằm ở Phụ lục B.

1.3.2	Yêu cầu chức năng (FR)

Mã	Yêu cầu chức năng (mỗi dòng một yêu cầu kiểm chứng được)
FR1	Hệ thống cho phép khách hàng mở phiếu khảo sát khi phiếu bảo hành ở trạng thái "Hoàn tất".
FR2	Hệ thống từ chối mở phiếu khảo sát khi phiếu bảo hành chưa "Hoàn tất" và hiển thị thông báo nêu lý do.
FR3	Hệ thống hiển thị phiếu khảo sát đã gửi ở chế độ chỉ xem, không cho sửa số sao.
FR4	Hệ thống cho phép khách hàng chọn mức hài lòng là số nguyên từ 1 đến 5 sao.
 
Mã	Yêu cầu chức năng (mỗi dòng một yêu cầu kiểm chứng được)
FR5	Hệ thống lưu phiếu khảo sát với trạng thái "Đã gửi" và thời điểm gửi khi khách hàng bấm "Gửi".
FR6	Hệ thống từ chối gửi phiếu khảo sát chưa chọn số sao và báo lỗi nêu rõ.
FR7	Khi lưu phiếu thất bại, hệ thống giữ nguyên lựa chọn của khách hàng, báo lỗi và không tạo bản ghi trùng.
FR8	Hệ thống hiển thị danh sách phiếu khảo sát khách hàng đã gửi, sắp xếp theo ngày gửi mới nhất.
FR9	Hệ thống hiển thị kết quả các phiếu khảo sát cho Marketing.
FR10	Hệ thống tính và hiển thị CSAT từ các phiếu khảo sát đã gửi.
FR11	Hệ thống tính và hiển thị NPS từ các phiếu khảo sát đã gửi.
FR12	Hệ thống hiển thị kết quả khảo sát nhóm theo từng kỹ thuật viên cho Quản lý trung tâm.
FR13	Hệ thống tạo báo cáo tổng hợp mức độ hài lòng của khách hàng cho Quản lý trung tâm.

1.4.	Yêu cầu phi chức năng
Các ngưỡng là giá trị đề xuất, cần đối chiếu với nhu cầu thực tế của trung tâm.

Mã	Loại	Yêu cầu (có ngưỡng đo được)
NFR1	Hiệu năng	Mở phiếu khảo sát (FR1) trong ≤ 2 giây ở phân vị 95 với 100 người dùng đồng thời.
NFR2	Hiệu năng	Gửi phiếu khảo sát (FR5) phản hồi trong ≤ 3 giây ở phân vị 95.
NFR3	Sẵn sàng	Hệ thống hoạt động ≥ 99,5% thời gian mỗi tháng.
NFR4	Bảo mật	Khách hàng chỉ truy cập được phiếu khảo sát của chính mình: 100% yêu cầu truy cập phiếu của khách khác bị từ chối; phiên đăng nhập tự hết hạn sau 30 phút không hoạt động.
NFR5	Khả dụng	Khách hàng hoàn thành phiếu khảo sát trong ≤ 60 giây và ≤ 5 thao tác;
hiển thị đủ nội dung trên màn hình rộng ≥ 360 px.
NFR6	Tin cậy	0 phiếu khảo sát bị mất sau khi hệ thống báo gửi thành công.


1.5.	Ràng buộc và quy tắc nghiệp vụ

Mã	Quy tắc
BR1	Chỉ phiếu bảo hành ở trạng thái "Hoàn tất" mới được khảo sát.
BR2	Mỗi phiếu bảo hành có tối đa một phiếu khảo sát. (Giả định, cần xác nhận.)
BR3	Mức hài lòng là số nguyên từ 1 đến 5.
BR4	Phiếu khảo sát đã gửi không được sửa hoặc xóa.
BR5	Khách hàng chỉ xem phiếu khảo sát của chính mình; Marketing và Quản lý trung tâm xem kết quả của mọi khách hàng.
 

1.6.	Bảng truy vết yêu cầu


FR	User Story	Use Case	MoSCoW
FR1	US1	UC01 – Mở phiếu khảo sát	MUST
FR2	US1	UC01 – Mở phiếu khảo sát	MUST
FR3	US1, US2	UC01 – Mở phiếu khảo sát	MUST
FR4	US2	UC02 – Đánh giá mức độ hài lòng	MUST
FR5	US4	UC04 – Gửi phiếu khảo sát	MUST
FR6	US4	UC04 – Gửi phiếu khảo sát	MUST
FR7	US4	UC04 – Gửi phiếu khảo sát	MUST
FR8	US3	UC03 – Xem lịch sử khảo sát	SHOULD
FR9	US5	UC05 – Xem kết quả khảo sát	SHOULD
FR10	US6	UC06 – Xem chỉ số CSAT/NPS	COULD
FR11	US6	UC06 – Xem chỉ số CSAT/NPS	COULD
FR12	US7	UC07 – Xem kết quả khảo sát theo kỹ thuật viên	COULD
FR13	US8	UC08 – Xem báo cáo tổng hợp mức độ hài lòng	COULD


2.	Use Case
 
2.1.	Use Case Diagram
Sơ đồ có ranh giới hệ thống, actor nằm ngoài ranh giới và có chú thích; lưu tại file docs/usecase.drawio. Danh sách use case:

Hình 1. Use Case Diagram – Hệ thống khảo sát mức độ hài lòng sau bảo hành (file gốc: docs/usecase.drawio)

Mã	Use Case	Actor
UC01	Mở phiếu khảo sát	Khách hàng
UC02	Đánh giá mức độ hài lòng	Khách hàng
UC03	Xem lịch sử khảo sát	Khách hàng
UC04	Gửi phiếu khảo sát	Khách hàng
UC05	Xem kết quả khảo sát	Marketing
UC06	Xem chỉ số CSAT/NPS	Marketing
UC07	Xem kết quả khảo sát theo kỹ thuật viên	Quản lý trung tâm
UC08	Xem báo cáo tổng hợp mức độ hài lòng	Quản lý trung tâm
 
3.	Thiết kế kiến trúc
3.1.	Sơ đồ kiến trúc





3.2.	giải thích lựa chọn kiến trúc
-	Vì NFR1 và NFR2 yêu cầu mở phiếu ≤ 2s và gửi phiếu ≤ 3s (ở p95 với 100 người dùng đồng thời), tôi chọn kiến trúc phân lớp một khối (Monolith) gọi hàm trực tiếp nội bộ, đánh đổi là khả năng mở rộng độc lập cho từng chức năng bị hạn chế.
-	Vì NFR4 yêu cầu từ chối 100% truy cập trái phép và hết hạn phiên sau 30 phút, tôi chọn tập trung xác thực/phân quyền tại Lớp API Controller, đánh đổi là tăng nhẹ độ trễ xử lý do kiểm tra middleware ở mỗi request.
-	Vì NFR6 yêu cầu 0 phiếu bị mất sau khi gửi thành công, tôi chọn CSDL Quan hệ kết hợp Database Transaction tại Lớp Repository, đánh đổi là chi phí I/O ghi cao hơn so với NoSQL.4.
 
4.	Mô hình dữ liệu theo chuyên ngành
4.1.	ERD


4.2.	SQL DDL skeleton
 
  

5.	Wireframe 3 màn hình

6.	Khai báo sử dụng công cụ AI
Em điền cột cuối bằng thông tin thật. Nếu không dùng AI thì ghi "không sử dụng".

Công cụ AI	Dùng để làm gì	Em kiểm chứng và chỉnh sửa thế nào
Claude (Anthropic)	Vẽ Use Case Diagram (file draw.io và ảnh) và soạn đặc tả use case UC01	Đối chiếu tên use case, actor, mã US/FR/BR với SRS mục 1.2–1.6; kiểm tra luồng chính và luồng ngoại lệ khớp Phụ lục B
Claude (Anthropic)	Soạn sơ đồ kiến trúc phân lớp và bốn câu giải thích lựa chọn kiến trúc	Đối chiếu từng ngưỡng NFR1, NFR2, NFR4, NFR5, NFR6 với SRS mục 1.4;
kiểm tra mỗi câu có đủ ngưỡng và đánh đổi
Claude (Anthropic)	Thiết kế ERD 4 bảng và viết SQL DDL skeleton	Đối chiếu ràng buộc với BR2, BR3, BR4; đối chiếu tên cột với wireframe
 
Công cụ AI	Dùng để làm gì	Em kiểm chứng và chỉnh sửa thế nào
Claude (Anthropic)	Vẽ wireframe 3 màn hình	Đối chiếu mỗi trường hiển thị với ERD, nhãn với bảng thuật ngữ SRS mục 1.1.3, và nối về use case UC01–UC04
Tôi xác nhận đã đọc, hiểu và chịu trách nhiệm về toàn bộ nội dung nộp.
Họ tên:Trương Quốc Anh Khoa
MSSV: 2374802013450
Ngày: 08/10/2026
