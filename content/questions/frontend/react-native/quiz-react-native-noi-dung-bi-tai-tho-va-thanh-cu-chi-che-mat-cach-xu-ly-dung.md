---
id: quiz-react-native-noi-dung-bi-tai-tho-va-thanh-cu-chi-che-mat-cach-xu-ly-dung
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nội dung bị tai thỏ và thanh cử chỉ che mất. Cách xử lý đúng?

## Đáp án trắc nghiệm
- [ ] Đặt marginTop theo chiều cao thanh trạng thái
- [x] Dùng vùng an toàn để lấy phần chèn thật
- [ ] Đặt khoảng cách trên cố định khoảng 44 điểm
- [ ] Bật chế độ toàn màn hình cho ứng dụng

## Giải thích (VI)
Dùng ngữ cảnh vùng an toàn để đọc phần chèn thật của thiết bị, rồi áp vào khoảng cách hoặc dùng thành phần bọc sẵn. Số cố định luôn sai trên ít nhất một dòng máy, và lỗi này chỉ lộ ra khi kiểm thử trên nhiều thiết bị.

### Giải thích các phương án:
- **Đặt marginTop theo chiều cao thanh trạng thái** (Sai): Chiều cao thanh trạng thái không bao gồm tai thỏ và thanh cử chỉ dưới.
- **Dùng vùng an toàn để lấy phần chèn thật** (Đúng): Phần chèn khác nhau theo từng máy nên phải đọc giá trị thật thay vì đặt số cố định.
- **Đặt khoảng cách trên cố định khoảng 44 điểm** (Sai): Con số này đúng với một dòng máy và sai với các máy khác.
- **Bật chế độ toàn màn hình cho ứng dụng** (Sai): Toàn màn hình không làm phần cứng che nội dung biến mất.
