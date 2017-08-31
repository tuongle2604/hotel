-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 31, 2017 lúc 11:36 SA
-- Phiên bản máy phục vụ: 10.1.21-MariaDB
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `booking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_hotel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`id`, `name`, `img`, `role`, `email`, `password`, `id_hotel`) VALUES
(1, 'update 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/160px-Anonymous_emblem.svg.png', 'root', 'chuasutu@gmail.com', 'U2FsdGVkX1+/uT8zsWdDVswG6Q8XyM/z1joTxBxysaI=', 0),
(2, 'duc le', '/user/upload/default.png', 'root', 'ducle@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 0),
(3, 'manh  le', '/user/upload/default.png', 'root', 'manhle@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 0),
(4, 'mon 2k', '/user/upload/1503767610338user3-128x128.jpg', 'hotel', 'tuongle1@gmail.com', 'U2FsdGVkX1+nkPb6YqxLBz4gDccbW3t4y6tC4geR70o=', 1),
(7, 'voi xanh', '/user/upload/1503815171248user8-128x128.jpg', 'hotel', 'tuongle2@gmail.com', 'U2FsdGVkX1+zzdbwvoiL+PiVYqvnRqTlOi61cMr99PU=', 1),
(8, 'test 2', '/user/upload/1503766178364avatar04.png', 'receptionist', 'tuongle3@gmail.com', 'U2FsdGVkX1+mVWtVLgNheXvOBGdK+M2sBNOzbzRRvb8=', 1),
(9, 'hotel 6', '/user/upload/default.png', 'receptionist', 'tuongle4@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 1),
(10, 'hotel 7', '/user/upload/default.png', 'receptionist', 'tuongle5@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 1),
(11, 'hotel 8', '/user/upload/default.png', 'receptionist', 'tuongle6@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 1),
(12, 'hotel 9', '/user/upload/default.png', 'hotel', 'tuongle7@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(13, 'hotel 10', '/user/upload/default.png', 'receptionist', 'tuongle8@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(14, 'hotel 11', '/user/upload/default.png', 'hotel', 'tuongle9@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(15, 'hotel 12', '/user/upload/default.png', 'receptionist', 'tuongle10@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(16, 'hotel 13', '/user/upload/default.png', 'receptionist', 'tuongle11@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(17, 'hotel 14', '/user/upload/default.png', 'receptionist', 'tuongle12@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(18, 'hotel 15', '/user/upload/default.png', 'receptionist', 'tuongle13@gmail.com', 'U2FsdGVkX1+/uT8zsWdDVswG6Q8XyM/z1joTxBxysaI=', 2),
(19, 'hotel 16', '/user/upload/default.png', 'receptionist', 'tuongle14@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 2),
(20, 'hotel 17', '/user/upload/default.png', 'hotel', 'tuongle15@gmail.com', 'U2FsdGVkX1+/uT8zsWdDVswG6Q8XyM/z1joTxBxysaI=', 3),
(21, 'hotel 18', '/user/upload/default.png', 'hotel', 'tuongle16@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 3),
(22, 'hotel 19', '/user/upload/default.png', 'receptionist', 'tuongle17@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 3),
(23, 'hotel 20', '/user/upload/default.png', 'receptionist', 'tuongle18@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 3),
(24, 'hotel 21', '/user/upload/default.png', 'receptionist', 'tuongle19@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 3),
(25, 'hotel 22', '/user/upload/default.png', 'receptionist', 'tuongle20@gmail.com', 'U2FsdGVkX1+zXwzqpInM8y4mZqVsMWEvKWfH9PZNFlw=', 3),
(26, 'insert 1', '/user/upload/default.png', 'insert1@gmail.com', 'tuongle21@gmail.com', 'U2FsdGVkX18yJEuek4DHE7KvBychV1gGsuQeQ7LNRWUV2cMET3QNScraQMe3qrSL', 6),
(27, 'insert 2', '/user/upload/default.png', 'insert2@gmail.com', 'tuongle22@gmail.com', 'U2FsdGVkX1+nFg1PsM2+6MPBfiEgVhdlhIGfmK4it50EVqffqj9PI/7CBcD4ggs2', 5),
(28, 'add 1', '/user/upload/default.png', 'receptionist', 'add@gmail.com', 'U2FsdGVkX19vCnIkzlmPq8A62wgz0Fx3NjkSWYAv5+g=', 1),
(29, 'image 1', '/user/upload/default.png', 'receptionist', 'image@gmail.com', 'U2FsdGVkX19vG15upXak2XFt1yO0yXz/2tDLKp7CKX0=', 1),
(30, 'image 4', '/user/upload/default.png', 'receptionist', 'image4@gmail.com', 'U2FsdGVkX19blINayQnKaafENB8Y5lTiMScAfLs4qcc=', 1),
(31, 'image 5', '/user/upload/default.png', 'receptionist', 'image5@gmail.com', 'U2FsdGVkX18zpto7tUii5TbDk2LkpKz4PBTAxzbGbOc=', 1),
(32, 'image 6', '/user/upload/default.png', 'receptionist', 'image6@gmail.com', 'U2FsdGVkX19W7vRPPdhRDEjfmZK9etSqjbteZLH5NFw=', 1),
(33, 'image 7', '/user/upload/default.png', 'receptionist', 'image7@gmail.com', 'U2FsdGVkX19Z4zVPcAwxZs0s7wuOJgxABSiZXdHLZBQ=', 1),
(34, 'image 8', '/user/upload/1503749813984avatar5.png', 'receptionist', 'image8@gmail.com', 'U2FsdGVkX1/Pz42ryEUo+gMcCbt5rs7KpEW8uKsb90Y=', 1),
(35, 'chu trau nau', '/user/upload/default.png', 'receptionist', 'chutraunau@gmail.com', 'U2FsdGVkX1/DRyXgYNsH2aW+fp06qrugdRzSTMYXccY=', 2),
(36, 'voi xanh', '/user/upload/default.png', 'hotel', 'voixanh@gmail.com', 'U2FsdGVkX1+6+FOxcMD8mt/cmNIhKqaIyfJXn+P0BYc=', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `updated_phone` varchar(12) DEFAULT NULL,
  `date_created` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `country` varchar(20) NOT NULL,
  `status` text NOT NULL,
  `code` int(11) NOT NULL,
  `creditcard_name` varchar(20) NOT NULL,
  `creditcard_expire_mont` varchar(2) NOT NULL,
  `creditcard_expire_year` varchar(4) NOT NULL,
  `creditcard_number` varchar(15) NOT NULL,
  `creditcard_cvv` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `phone`, `updated_phone`, `date_created`, `gender`, `country`, `status`, `code`, `creditcard_name`, `creditcard_expire_mont`, `creditcard_expire_year`, `creditcard_number`, `creditcard_cvv`) VALUES
(1, 'hung', 'chuasutu@gmail.com', '84935862748', NULL, '2017-08-18', 'nam', 'vietnamese', 'comfirmed', 1234, '', '', '', '', ''),
(2, 'duc', '', '84962408160', NULL, '2017-08-18', '', '', 'unconfirmed', 6540, '', '', '', '', ''),
(3, 'tuong le', 'tuongle@gmail.com', '84962408161', '84962408161', '2017-08-20', 'nam', 'vietnamese', 'confirmed', 3082, '', '', '', '', ''),
(4, '', '', '841679721801', NULL, '2017-08-22', '', '', 'unconfirmed', 9315, '', '', '', '', ''),
(5, 'mon 2k', 'mon2k@gmail.com', '84935862747', NULL, '2017-08-25', 'nam', 'viet nam', 'confirmed', 1140, '', '', '', '', ''),
(6, 'trau nau', 'traunau@gmail.com', '84935862745', NULL, '2017-08-25', 'nam', 'viet nam', 'confirmed', 7330, '', '', '', '', ''),
(7, 'voi xanh', 'voixanh@gmail.com', '84935862746', NULL, '2017-08-25', 'nam', 'viet nam', 'confirmed', 8411, '', '', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `hotel`
--

INSERT INTO `hotel` (`id`, `name`, `location`, `address`) VALUES
(1, 'ngan sao', 'ngoai bien', ''),
(2, 'thanh my', 'cam ranh', ''),
(3, 'hi-otel', 'hcm', ''),
(4, '1 nguoi khoe 2 nguoi vui', 'hcm', ''),
(5, 'evil genius', 'hcm', ''),
(6, 'bk', 'hn', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `detail` varchar(500) NOT NULL,
  `paypal_id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `payment`
--

INSERT INTO `payment` (`id`, `cost`, `detail`, `paypal_id`) VALUES
(17, 16, '[{\"roomNoomber\":4,\"capacity\":2,\"price\":8},{\"roomNoomber\":5,\"capacity\":2,\"price\":8}]', 'PAY-74G54915NA4921251LGEKBAI'),
(18, 10, '[{\"roomNoomber\":1,\"capacity\":1,\"price\":5},{\"roomNoomber\":2,\"capacity\":1,\"price\":5}]', 'PAY-6Y930102047093315LGEKBKI'),
(19, 10, '[{\"roomNoomber\":5,\"capacity\":1,\"price\":5},{\"roomNoomber\":6,\"capacity\":1,\"price\":5}]', 'PAY-87V12540N38862723LGFUY4Q'),
(20, 10, '[{\"roomNoomber\":3,\"capacity\":1,\"price\":5},{\"roomNoomber\":4,\"capacity\":1,\"price\":5}]', 'PAY-4UD23177LT287510GLGLGMPY'),
(21, 16, '[{\"roomNoomber\":7,\"capacity\":2,\"price\":8},{\"roomNoomber\":8,\"capacity\":2,\"price\":8}]', 'PAY-6AG28542V70138625LGLGM6Q'),
(22, 18, '[{\"roomNoomber\":9,\"capacity\":2,\"price\":8},{\"roomNoomber\":10,\"capacity\":3,\"price\":10}]', 'PAY-285560351R611391DLGLGNNI'),
(25, 10, '[{\"roomNoomber\":1,\"capacity\":1,\"price\":5},{\"roomNoomber\":2,\"capacity\":1,\"price\":5}]', NULL),
(26, 10, '[{\"roomNoomber\":1,\"capacity\":1,\"price\":5},{\"roomNoomber\":2,\"capacity\":1,\"price\":5}]', NULL),
(27, 5, '[{\"roomNoomber\":5,\"capacity\":1,\"price\":5}]', NULL),
(28, 10, '[{\"roomNoomber\":10,\"capacity\":3,\"price\":10}]', 'PAY-13W23737S3048731JLGQQUBQ'),
(29, 10, '[{\"roomNoomber\":5,\"capacity\":1,\"price\":5},{\"roomNoomber\":6,\"capacity\":1,\"price\":5}]', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `id_hotel` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `date_in` date NOT NULL,
  `date_out` date NOT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `reservation`
--

INSERT INTO `reservation` (`id`, `id_hotel`, `customer_id`, `date`, `date_in`, `date_out`, `payment_id`, `payment_method`, `status`) VALUES
(7, 3, 1, '2017-08-08', '2017-08-15', '2017-08-22', 17, 'online', 'no check'),
(8, 2, 1, '2017-08-08', '2017-08-10', '2017-08-15', 18, 'online', 'no check'),
(9, 2, 2, '2017-08-10', '2017-08-11', '2017-08-13', 19, 'online', 'no check'),
(10, 1, 2, '2017-08-15', '2017-08-16', '2017-08-19', 20, 'online', 'checkout'),
(11, 1, 1, '2017-08-14', '2017-08-15', '2017-08-18', 21, 'online', 'checkin'),
(12, 1, 3, '2017-08-19', '2017-08-18', '2017-08-20', 22, 'online', 'checkin'),
(13, 1, 3, '2017-08-25', '2017-08-01', '2017-08-02', 25, 'direct', 'checkout'),
(14, 1, 3, '2017-08-25', '2017-08-26', '2017-08-27', 26, 'direct', 'checkin'),
(15, 1, 6, '2017-08-26', '2017-08-27', '2017-08-28', 27, 'direct', 'checkin'),
(16, 1, 7, '2017-08-26', '2017-08-30', '2017-08-31', 28, 'online', 'no check'),
(17, 1, 5, '2017-08-27', '2017-08-28', '2017-08-29', 29, 'direct', 'checkin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reserved_room`
--

CREATE TABLE `reserved_room` (
  `id` int(11) NOT NULL,
  `reservation_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `reserved_room`
--

INSERT INTO `reserved_room` (`id`, `reservation_id`, `room_id`) VALUES
(12, 7, 22),
(13, 7, 23),
(14, 8, 1),
(15, 8, 2),
(16, 9, 5),
(17, 9, 6),
(18, 10, 3),
(19, 10, 4),
(20, 11, 7),
(21, 11, 8),
(22, 12, 9),
(23, 12, 10),
(24, 13, 1),
(25, 13, 2),
(26, 14, 1),
(27, 14, 2),
(28, 15, 5),
(29, 16, 10),
(30, 17, 5),
(31, 17, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `id` int(255) NOT NULL,
  `id_hotel` int(255) NOT NULL,
  `room_number` int(255) NOT NULL,
  `roomtype_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`id`, `id_hotel`, `room_number`, `roomtype_id`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 3, 1),
(4, 1, 4, 1),
(5, 1, 5, 1),
(6, 1, 6, 1),
(7, 1, 7, 2),
(8, 1, 8, 2),
(9, 1, 9, 2),
(10, 1, 10, 3),
(11, 2, 1, 1),
(12, 2, 2, 1),
(13, 2, 3, 1),
(14, 2, 4, 2),
(15, 2, 5, 2),
(16, 2, 6, 2),
(17, 2, 7, 3),
(18, 2, 8, 3),
(19, 3, 1, 1),
(20, 3, 2, 1),
(21, 3, 3, 1),
(22, 3, 4, 2),
(23, 3, 5, 2),
(24, 3, 6, 2),
(25, 3, 7, 2),
(26, 4, 1, 1),
(27, 4, 2, 1),
(28, 4, 3, 2),
(29, 4, 4, 2),
(30, 5, 1, 1),
(31, 5, 2, 1),
(32, 5, 3, 1),
(33, 5, 4, 2),
(34, 5, 5, 3),
(35, 6, 1, 1),
(36, 6, 2, 1),
(37, 6, 3, 2),
(38, 6, 4, 2),
(39, 6, 5, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_type`
--

CREATE TABLE `room_type` (
  `id` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `room_type`
--

INSERT INTO `room_type` (`id`, `capacity`, `price`) VALUES
(1, 1, 5),
(2, 2, 8),
(3, 3, 10);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `id` (`id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Chỉ mục cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reservation_customer_id` (`customer_id`),
  ADD KEY `fk_reservation_payment_id` (`payment_id`);

--
-- Chỉ mục cho bảng `reserved_room`
--
ALTER TABLE `reserved_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reserved_room_room_id` (`room_id`),
  ADD KEY `fk_reservation_reserved` (`reservation_id`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_room_id_hotel` (`id_hotel`),
  ADD KEY `fk_room_roomtype_id` (`roomtype_id`);

--
-- Chỉ mục cho bảng `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT cho bảng `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT cho bảng `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT cho bảng `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT cho bảng `reserved_room`
--
ALTER TABLE `reserved_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `reserved_room`
--
ALTER TABLE `reserved_room`
  ADD CONSTRAINT `fk_reservation_reserved` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
