---
id: quiz-network-http-phuong-thuc-http-nao-duoc-coi-la-an-toan-safe-theo-dac-ta
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phương thức HTTP nào được coi là "an toàn" (safe) theo đặc tả?

## Đáp án trắc nghiệm
- [ ] PUT
- [ ] DELETE
- [x] GET
- [ ] POST

## Giải thích (VI)
GET (cùng với HEAD và OPTIONS) là phương thức an toàn — chỉ đọc, không làm đổi trạng thái. Khái niệm này khác với bất biến khi lặp (idempotent): GET, PUT, DELETE đều bất biến khi lặp, còn POST thì không.

### Giải thích các phương án:
- **PUT** (Sai): Ghi đè tài nguyên nên thay đổi trạng thái.
- **DELETE** (Sai): Xóa tài nguyên nên chắc chắn không an toàn.
- **GET** (Đúng): Chỉ đọc, không được làm thay đổi trạng thái phía máy chủ.
- **POST** (Sai): Dùng để tạo hoặc thay đổi trạng thái.
