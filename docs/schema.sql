CREATE DATABASE IF NOT EXISTS khao_sat_bao_hanh
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE khao_sat_bao_hanh;
CREATE TABLE vai_tro (
  ma_vai_tro   INT          NOT NULL AUTO_INCREMENT,
  ten_vai_tro  VARCHAR(30)  NOT NULL,
  CONSTRAINT pk_vai_tro      PRIMARY KEY (ma_vai_tro),
  CONSTRAINT uk_vai_tro_ten  UNIQUE (ten_vai_tro)
) ENGINE=InnoDB;
CREATE TABLE nguoi_dung (
  ma_nguoi_dung  INT           NOT NULL AUTO_INCREMENT,
  ten_dang_nhap  VARCHAR(50)   NOT NULL,
  mat_khau_bam   VARCHAR(255)  NOT NULL,         
  ho_ten         VARCHAR(100)  NOT NULL,
  ma_vai_tro     INT           NOT NULL,
  CONSTRAINT pk_nguoi_dung      PRIMARY KEY (ma_nguoi_dung),
  CONSTRAINT uk_nguoi_dung_ten  UNIQUE (ten_dang_nhap),
  CONSTRAINT fk_nguoi_dung_vai_tro
    FOREIGN KEY (ma_vai_tro) REFERENCES vai_tro (ma_vai_tro)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE TABLE ky_thuat_vien (
  ma_ky_thuat_vien  INT           NOT NULL AUTO_INCREMENT,
  ho_ten            VARCHAR(100)  NOT NULL,
  CONSTRAINT pk_ky_thuat_vien PRIMARY KEY (ma_ky_thuat_vien)
) ENGINE=InnoDB;
CREATE TABLE phieu_khao_sat (
  ma_phieu_khao_sat  INT          NOT NULL AUTO_INCREMENT,
  ma_phieu_bh        VARCHAR(20)  NOT NULL,      
  ma_khach_hang      INT          NOT NULL,
  ma_ky_thuat_vien   INT          NOT NULL,
  so_sao             TINYINT      NOT NULL,
  trang_thai         VARCHAR(10)  NOT NULL DEFAULT 'Đã gửi',
  thoi_diem_gui      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_phieu_khao_sat       PRIMARY KEY (ma_phieu_khao_sat),
  CONSTRAINT uk_phieu_khao_sat_bh    UNIQUE (ma_phieu_bh),
  CONSTRAINT ck_phieu_khao_sat_sao   CHECK (so_sao BETWEEN 1 AND 5),
  CONSTRAINT ck_phieu_khao_sat_tt    CHECK (trang_thai = 'Đã gửi'),
  CONSTRAINT fk_phieu_khao_sat_kh
    FOREIGN KEY (ma_khach_hang)    REFERENCES nguoi_dung (ma_nguoi_dung)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_phieu_khao_sat_ktv
    FOREIGN KEY (ma_ky_thuat_vien) REFERENCES ky_thuat_vien (ma_ky_thuat_vien)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
CREATE INDEX ix_phieu_khao_sat_kh_ngay  ON phieu_khao_sat (ma_khach_hang, thoi_diem_gui DESC);
CREATE INDEX ix_phieu_khao_sat_ktv      ON phieu_khao_sat (ma_ky_thuat_vien);
DELIMITER $$
CREATE TRIGGER trg_phieu_khao_sat_khong_sua
BEFORE UPDATE ON phieu_khao_sat FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'BR4: phieu khao sat da gui khong duoc sua';
END$$
CREATE TRIGGER trg_phieu_khao_sat_khong_xoa
BEFORE DELETE ON phieu_khao_sat FOR EACH ROW
BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'BR4: phieu khao sat da gui khong duoc xoa';
END$$
DELIMITER ;
INSERT INTO vai_tro (ten_vai_tro) VALUES
  ('Khach hang'), ('Marketing'), ('Quan ly trung tam');
