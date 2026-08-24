---
id: quiz-cs-fundamentals-vi-sao-do-dai-chuoi-chua-emoji-trong-nhieu-ngon-ng-tra-ve-so-lon-hon-so-ky-tu-nh
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao độ dài chuỗi chứa emoji trong nhiều ngôn ngữ trả về số lớn hơn số ký tự nhìn thấy?

## Đáp án trắc nghiệm
- [ ] Vì trình biên dịch chèn thêm ký tự thoát để lưu emoji an toàn
- [ ] Vì emoji được lưu kèm siêu dữ liệu màu sắc và kích thước
- [x] Vì hàm độ dài đếm đơn vị mã (code unit) chứ không đếm ký tự người dùng nhìn thấy
- [ ] Vì chuỗi luôn được lưu dạng UTF-8 nên mỗi emoji chiếm 4 byte

## Giải thích (VI)
Vì hàm độ dài đếm đơn vị mã, không đếm ký tự thị giác. JavaScript và Java đếm đơn vị UTF-16, mà emoji ngoài BMP cần hai đơn vị (surrogate pair). Ngoài ra một emoji "gia đình" hay emoji có màu da là nhiều code point nối bằng ZWJ hoặc modifier — nhìn là một ký tự nhưng thực chất là cả một cụm.

### Giải thích các phương án:
- **Vì trình biên dịch chèn thêm ký tự thoát để lưu emoji an toàn** (Sai): Không có ký tự thoát nào được chèn lúc chạy; giá trị chuỗi trong bộ nhớ đúng bằng nội dung nguồn sau khi giải mã.
- **Vì emoji được lưu kèm siêu dữ liệu màu sắc và kích thước** (Sai): Emoji chỉ là code point Unicode như mọi ký tự khác; màu sắc và hình dạng do font hiển thị quyết định, không được lưu trong chuỗi.
- **Vì hàm độ dài đếm đơn vị mã (code unit) chứ không đếm ký tự người dùng nhìn thấy** (Đúng): Nhiều emoji nằm ngoài BMP nên cần 2 đơn vị UTF-16, và các cụm ghép như emoji gia đình còn gồm nhiều code point nối bằng ZWJ.
- **Vì chuỗi luôn được lưu dạng UTF-8 nên mỗi emoji chiếm 4 byte** (Sai): Số byte UTF-8 đúng là 4 cho nhiều emoji, nhưng JavaScript và Java đếm theo đơn vị UTF-16, còn Python đếm theo code point — không đếm byte.
