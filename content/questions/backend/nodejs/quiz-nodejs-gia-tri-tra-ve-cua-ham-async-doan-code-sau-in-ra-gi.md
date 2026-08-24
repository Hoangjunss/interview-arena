---
id: quiz-nodejs-gia-tri-tra-ve-cua-ham-async-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giá trị trả về của hàm async — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] Promise { 1 }
- [ ] 1
- [ ] [object Promise]
- [ ] undefined

## Giải thích (VI)
In Promise { 1 }. Hàm async luôn trả về Promise — return 1 được bọc thành promise resolve với 1. Không await thì console.log nhận chính promise đó, và Node inspect hiển thị kèm giá trị đã resolve. (FREE)

### Giải thích các phương án:
- **Promise { 1 }** (Đúng): Hàm async LUÔN trả về Promise. return 1 được bọc thành promise đã resolve với giá trị 1; gọi hàm mà không await thì nhận về chính promise đó.
- **1** (Sai): Sai — hiểu nhầm phổ biến nhất về async: muốn nhận 1 phải await getValue() hoặc dùng .then. Gọi trực tiếp chỉ nhận promise.
- **[object Promise]** (Sai): Sai — console.log của Node dùng inspect, hiển thị Promise { 1 } kèm giá trị đã resolve, không phải chuỗi ép kiểu [object Promise].
- **undefined** (Sai): Sai — hàm có return 1 rõ ràng; promise trả về resolve với 1, không phải undefined.
