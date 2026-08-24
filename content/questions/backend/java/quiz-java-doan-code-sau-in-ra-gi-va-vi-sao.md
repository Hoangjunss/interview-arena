---
id: quiz-java-doan-code-sau-in-ra-gi-va-vi-sao
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra gì, và vì sao?

## Đáp án trắc nghiệm
- [x] true / false / true — hai literal dùng chung String pool, còn new String luôn tạo object mới
- [ ] true / true / true — cả ba biến cùng nội dung "abc" nên JVM tự gộp về một object duy nhất
- [ ] false / false / true — == với String luôn trả false vì String là object, chỉ equals() mới so sánh được
- [ ] true / false / false — equals() của String so sánh reference giống ==, nên khác object là false

## Giải thích (VI)
Kết quả: true / false / true. Hai literal "abc" cùng trỏ một object trong String pool nên a == b là true. new String("abc") luôn tạo object mới ngoài pool nên a == c là false. equals() so sánh nội dung ký tự nên a.equals(c) là true. Quy tắc: so sánh String luôn dùng equals(), không dùng ==.

### Giải thích các phương án:
- **true / false / true — hai literal dùng chung String pool, còn new String luôn tạo object mới** (Đúng): Đúng: literal được intern vào String pool nên a và b cùng reference; new String tạo object riêng ngoài pool nên == là false; equals() so nội dung nên vẫn true.
- **true / true / true — cả ba biến cùng nội dung "abc" nên JVM tự gộp về một object duy nhất** (Sai): new String("abc") luôn tạo object mới ngoài pool — JVM không tự gộp nó với literal, nên a == c là false.
- **false / false / true — == với String luôn trả false vì String là object, chỉ equals() mới so sánh được** (Sai): == so sánh reference và hoàn toàn dùng được với String: hai literal giống nhau trỏ cùng object trong pool nên a == b là true.
- **true / false / false — equals() của String so sánh reference giống ==, nên khác object là false** (Sai): String override equals() để so sánh nội dung ký tự, không phải reference — a.equals(c) là true dù hai object khác nhau.
