---
id: quiz-java-unboxing-null-tu-mapget-doan-code-sau-co-hanh-vi-gi-luc-runtime
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Unboxing null từ Map.get — đoạn code sau có hành vi gì lúc runtime?

## Đáp án trắc nghiệm
- [ ] Ném NoSuchElementException vì Map.of() tạo map immutable không cho truy cập key thiếu
- [ ] In ra 0 — key không tồn tại thì int nhận giá trị mặc định của kiểu số
- [ ] Lỗi biên dịch — không thể gán Integer (object) vào biến kiểu int (primitive)
- [x] Ném NullPointerException — get("b") trả null, unbox Integer null sang int

## Giải thích (VI)
Ném NullPointerException. m.get("b") trả về null vì key không tồn tại. Gán vào biến kiểu int kích hoạt auto-unboxing — tương đương gọi intValue() trên null — gây NPE. Đây là nguồn NPE kín đáo vì không có dấu chấm gọi method nào trong code. Phòng tránh: dùng getOrDefault("b", 0), hoặc nhận Integer rồi check null.

### Giải thích các phương án:
- **Ném NoSuchElementException vì Map.of() tạo map immutable không cho truy cập key thiếu** (Sai): Map immutable chỉ cấm THAY ĐỔI (put/remove); get() với key thiếu vẫn trả null như mọi Map — exception ở đây đến từ unboxing, không từ tính immutable.
- **In ra 0 — key không tồn tại thì int nhận giá trị mặc định của kiểu số** (Sai): Giá trị mặc định 0 chỉ áp dụng cho FIELD chưa gán; ở đây get() trả null và unbox null ném NPE trước khi kịp gán gì.
- **Lỗi biên dịch — không thể gán Integer (object) vào biến kiểu int (primitive)** (Sai): Autoboxing/unboxing (Java 5+) cho phép gán qua lại giữa Integer và int — code biên dịch bình thường; vấn đề chỉ lộ ra lúc runtime khi giá trị là null.
- **Ném NullPointerException — get("b") trả null, unbox Integer null sang int** (Đúng): Đúng: gán Integer vào biến int kích hoạt auto-unboxing (gọi intValue() ngầm); gọi trên null là NPE — một trong các nguồn NPE khó thấy nhất.
