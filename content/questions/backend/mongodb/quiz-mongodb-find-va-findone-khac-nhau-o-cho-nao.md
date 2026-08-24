---
id: quiz-mongodb-find-va-findone-khac-nhau-o-cho-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
find() và findOne() khác nhau ở chỗ nào?

## Đáp án trắc nghiệm
- [x] find() trả cursor; findOne() trả một document hoặc null
- [ ] findOne() nhanh hơn vì bỏ qua index
- [ ] find() đọc từ primary, findOne() đọc từ secondary
- [ ] find() chỉ dùng được khi có index, findOne() thì không cần

## Giải thích (VI)
find() trả cursor — phải duyệt hoặc gọi toArray() mới lấy được dữ liệu. findOne() trả thẳng một document, hoặc null khi không khớp. Về hiệu năng, findOne() tương đương find().limit(1).

### Giải thích các phương án:
- **find() trả cursor; findOne() trả một document hoặc null** (Đúng): Khác nhau ở kiểu trả về: cursor để duyệt nhiều document, so với một document đơn lẻ.
- **findOne() nhanh hơn vì bỏ qua index** (Sai): Cả hai đều dùng index như nhau; bỏ qua index chỉ làm chậm đi.
- **find() đọc từ primary, findOne() đọc từ secondary** (Sai): Nơi đọc do read preference quyết định, không phải do tên lệnh.
- **find() chỉ dùng được khi có index, findOne() thì không cần** (Sai): Cả hai chạy được dù có index hay không.
