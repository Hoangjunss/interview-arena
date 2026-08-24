---
id: quiz-golang-so-sanh-struct-bang-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh struct bằng == — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] true
- [ ] panic
- [ ] compile error
- [ ] false

## Giải thích (VI)
In true. Struct mà mọi field đều comparable (ở đây toàn int) thì so sánh được bằng ==, đối chiếu từng field theo giá trị. a và b cùng {1, 2} nên bằng nhau — không cần reflect.DeepEqual cho trường hợp này. (FREE)

### Giải thích các phương án:
- **true** (Đúng): Struct mà mọi field đều so sánh được (ở đây toàn int) thì tự động comparable; == so sánh từng field theo giá trị. a và b cùng {1, 2} nên bằng nhau.
- **panic** (Sai): Sai — so sánh struct comparable là thao tác tại compile-time, không gây panic.
- **compile error** (Sai): Sai — struct chỉ gồm field comparable nên hợp lệ với ==. Lỗi biên dịch chỉ xảy ra nếu struct chứa field kiểu slice, map hoặc func.
- **false** (Sai): Sai — == trên struct so sánh theo giá trị từng field (không phải theo địa chỉ), và mọi field của a, b đều trùng.
