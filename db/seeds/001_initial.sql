
INSERT INTO warranty_ticket
    (ticket_code, product_name, status, completed_at)
VALUES
    ('BH001', 'Laptop Dell', 'Hoàn tất', CURRENT_TIMESTAMP),
    ('BH002', 'Điện thoại Samsung', 'Hoàn tất', CURRENT_TIMESTAMP),
    ('BH003', 'Máy tính bảng', 'Đang xử lý', NULL)
ON CONFLICT (ticket_code) DO NOTHING;
