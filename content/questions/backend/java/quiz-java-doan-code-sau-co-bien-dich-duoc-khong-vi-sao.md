---
id: quiz-java-doan-code-sau-co-bien-dich-duoc-khong-vi-sao
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau có biên dịch được không? Vì sao?

## Đáp án trắc nghiệm
- [ ] Lỗi biên dịch vì một class không bao giờ được implements hai interface cùng có default method
- [ ] Biên dịch bình thường — bản của A thắng vì A đứng trước trong danh sách implements
- [ ] Biên dịch bình thường — JVM chọn một trong hai bản lúc runtime tuỳ object
- [x] Lỗi biên dịch — C kế thừa hai default hello() trùng signature nên phải tự override

## Giải thích (VI)
Lỗi biên dịch. C kế thừa hai default method hello() trùng signature từ hai interface không liên quan — Java không tự chọn bản nào mà báo lỗi, bắt C override hello() để phân xử. Trong bản override, cú pháp A.super.hello() hoặc B.super.hello() cho phép uỷ quyền tường minh về một bên. Đây là cách Java xử lý diamond problem khi default method (Java 8) đưa code vào interface.

### Giải thích các phương án:
- **Lỗi biên dịch vì một class không bao giờ được implements hai interface cùng có default method** (Sai): Implements nhiều interface có default method là hợp lệ và phổ biến — chỉ lỗi khi hai default TRÙNG signature mà class không override để phân xử.
- **Biên dịch bình thường — bản của A thắng vì A đứng trước trong danh sách implements** (Sai): Thứ tự trong mệnh đề implements không có vai trò gì khi resolve method — không tồn tại quy tắc "interface khai báo trước thắng".
- **Biên dịch bình thường — JVM chọn một trong hai bản lúc runtime tuỳ object** (Sai): Xung đột hai default trùng signature được phát hiện và chặn ngay lúc BIÊN DỊCH — không bao giờ tới lượt runtime quyết định.
- **Lỗi biên dịch — C kế thừa hai default hello() trùng signature nên phải tự override** (Đúng): Đúng: đây là diamond problem phiên bản default method — Java không tự chọn thay lập trình viên mà ép override, trong đó có thể chỉ định A.super.hello() hoặc B.super.hello().
