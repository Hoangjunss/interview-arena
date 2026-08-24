---
id: quiz-ruby-on-rails-dat-ten-cho-mot-dieu-kien-truy-van-dung-lai-nhieu-noi-co-loi-ich-gi
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt tên cho một điều kiện truy vấn dùng lại nhiều nơi có lợi ích gì?

## Đáp án trắc nghiệm
- [x] Điều kiện nghiệp vụ có tên và nối tiếp được
- [ ] Kết quả được cache tự động giữa các yêu cầu
- [ ] Điều kiện được kiểm tra tính đúng đắn lúc khởi động
- [ ] Truy vấn được thực thi ngay khi định nghĩa

## Giải thích (VI)
Điều kiện nghiệp vụ có tên rõ ràng và nối tiếp được : đọc mã thấy ngay ý định thay vì một chuỗi điều kiện thô, và nhiều điều kiện ghép lại vẫn chỉ tạo ra một truy vấn duy nhất.

### Giải thích các phương án:
- **Điều kiện nghiệp vụ có tên và nối tiếp được** (Đúng): Mã đọc theo ngôn ngữ nghiệp vụ và các điều kiện ghép lại thành một truy vấn duy nhất.
- **Kết quả được cache tự động giữa các yêu cầu** (Sai): Không có bộ đệm tự động nào.
- **Điều kiện được kiểm tra tính đúng đắn lúc khởi động** (Sai): Không có bước kiểm tra như vậy.
- **Truy vấn được thực thi ngay khi định nghĩa** (Sai): Nó vẫn lười thực thi như quan hệ thường.
