---
id: quiz-java-optionalget-tren-optional-rong-doan-code-sau-co-hanh-vi-gi-luc-runtime
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optional.get() trên Optional rỗng — đoạn code sau có hành vi gì lúc runtime?

## Đáp án trắc nghiệm
- [ ] In true rồi in null — Optional bọc giá trị null bên trong nên isPresent() là true
- [ ] In false rồi in null — get() trên Optional rỗng trả về null như Map.get() với key thiếu
- [ ] Ném NullPointerException ngay dòng đầu — Optional không chấp nhận giá trị null
- [x] In false, rồi get() ném NoSuchElementException — ofNullable(null) là Optional rỗng

## Giải thích (VI)
In false, rồi get() ném NoSuchElementException. Optional.ofNullable(null) trả về Optional.empty() (khác Optional.of(null) — ném NPE ngay). get() trên Optional rỗng ném exception chứ không trả null. Gọi get() không kiểm tra trước chỉ đổi NPE thành NoSuchElementException — dùng orElse/orElseGet/orElseThrow hoặc chuỗi map/filter thay thế.

### Giải thích các phương án:
- **In true rồi in null — Optional bọc giá trị null bên trong nên isPresent() là true** (Sai): Optional không "bọc null" — ofNullable(null) cho ra trạng thái rỗng, isPresent() là false; không tồn tại Optional chứa null.
- **In false rồi in null — get() trên Optional rỗng trả về null như Map.get() với key thiếu** (Sai): get() không bao giờ trả null — javadoc quy định ném NoSuchElementException khi rỗng; nếu get() trả null thì Optional mất toàn bộ lý do tồn tại.
- **Ném NullPointerException ngay dòng đầu — Optional không chấp nhận giá trị null** (Sai): Optional.of(null) mới ném NPE; ofNullable được thiết kế đúng cho trường hợp giá trị có thể null — null được chuyển thành Optional.empty().
- **In false, rồi get() ném NoSuchElementException — ofNullable(null) là Optional rỗng** (Đúng): Đúng theo javadoc: ofNullable chấp nhận null và trả Optional.empty(); get() trên empty ném exception chứ không bao giờ trả null.
