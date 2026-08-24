---
id: quiz-php-b-a-lam-gi
position: backend
technology: php
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
$b = &$a làm gì?

## Đáp án trắc nghiệm
- [ ] Lấy địa chỉ bộ nhớ của $a gán vào $b như con trỏ trong C
- [x] Hai biến cùng trỏ một giá trị — sửa bên nào bên kia cũng thấy
- [ ] Sao chép giá trị của $a sang $b nhưng nhanh hơn gán thường
- [ ] Tạo bản sao chỉ đọc của $a, ghi vào $b sẽ báo lỗi

## Giải thích (VI)
Tạo reference : $a và $b là hai tên của cùng một giá trị, sửa bên nào bên kia cũng thấy. Khác gán thường (copy với array, handle với object), reference là alias thật sự — kể cả gán lại $b = 5 cũng đổi luôn $a.

### Giải thích các phương án:
- **Lấy địa chỉ bộ nhớ của $a gán vào $b như con trỏ trong C** (Sai): Reference của PHP là alias tên biến, không phải con trỏ số học như C.
- **Hai biến cùng trỏ một giá trị — sửa bên nào bên kia cũng thấy** (Đúng): & tạo reference: $a và $b trở thành hai tên cho cùng một vùng dữ liệu.
- **Sao chép giá trị của $a sang $b nhưng nhanh hơn gán thường** (Sai): Reference không phải tối ưu tốc độ; nó thay đổi ngữ nghĩa gán chứ không copy.
- **Tạo bản sao chỉ đọc của $a, ghi vào $b sẽ báo lỗi** (Sai): Không có khái niệm bản sao chỉ đọc; ghi vào $b hợp lệ và ảnh hưởng $a.
