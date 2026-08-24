---
id: generator-va-iterator-trong-javascript-la-gi
position: backend
technology: generators-\u0026-iterators
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generator và iterator trong JavaScript là gì?

## Question (EN)
What are generators and iterators in JavaScript?

## Đáp án chi tiết (VI)
- **Iterator**: một object có method `next()` trả về `{ value, done }`. Một object **iterable** có `[Symbol.iterator]()` trả về iterator → dùng được với `for...of`, spread `[...x]`, destructuring.\
- **Generator** — hàm khai báo bằng `function*`: cách viết iterator gọn hơn. Từ khóa **`yield`** **tạm dừng** hàm và trả ra một giá trị, **giữ nguyên local state** giữa các lần gọi `next()`.\
\
Điểm mạnh: sinh giá trị **lazy** (theo yêu cầu) → hợp với chuỗi vô hạn, phân trang, hoặc xử lý stream lớn mà không nạp toàn bộ vào bộ nhớ.\
\
- `yield*` **ủy quyền** cho một iterable khác.\
- Là nền tảng cho **async iterator** dùng với `for await...of`.

## Detailed Answer (EN)
- **Iterator**: an object with a `next()` method returning `{ value, done }`. An **iterable** object has `[Symbol.iterator]()` returning an iterator → usable with `for...of`, spread `[...x]`, and destructuring.\
- **Generator** — a function declared with `function*`: a terser way to write an iterator. The **`yield`** keyword **pauses** the function and returns a value, **preserving local state** between `next()` calls.\
\
Strength: it produces values **lazily** (on demand) → ideal for infinite sequences, pagination, or processing large streams without loading everything into memory.\
\
- `yield*` **delegates** to another iterable.\
- It underpins **async iterators** used with `for await...of`.
