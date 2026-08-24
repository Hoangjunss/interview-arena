---
id: constructor-cua-em-co-8-tham-so-nhieu-cai-optional-goi-ra-toan-null-null-true-ne
position: backend
technology: builder
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Constructor của em có 8 tham số, nhiều cái optional, gọi ra toàn `null, null, true`. Nên xử lý sao?

## Question (EN)
My constructor takes 8 parameters, several optional, and call sites look like `null, null, true`. How should I fix it?

## Đáp án chi tiết (VI)
Đó là **telescoping constructor** — người đọc không biết `true` ở vị trí thứ 6 nghĩa là gì, và hoán đổi hai tham số cùng kiểu thì compiler không bắt được. Hai hướng:\
\
**1. Object tham số (đủ dùng cho phần lớn trường hợp trong TS/JS):**\
\
```ts\
new Report({ from, to, includeDraft: true, format: 'pdf' })\
```\
\
Tên field làm rõ nghĩa, optional bỏ hẳn thay vì truyền `null`.\
\
**2. Builder** — khi việc tạo object gồm **nhiều bước có thứ tự** hoặc cần validate trước khi trả về instance:\
\
```ts\
const query = new QueryBuilder()\
  .from('orders')\
  .where('status', 'paid')\
  .orderBy('created_at')\
  .build()   // Hợp lệate rồi mới tạo object bất biến\
```\
\
`build()` là nơi kiểm tra tổ hợp tham số hợp lệ, nên object sinh ra luôn ở trạng thái đúng.\
\
**Chọn cái nào:** cấu hình phẳng, tạo một phát → object tham số. Dựng dần qua nhiều bước, hoặc cần nhiều biến thể từ cùng một quy trình → Builder.

## Detailed Answer (EN)
That is the **telescoping constructor** problem — nobody can tell what `true` in position six means, and swapping two same-typed arguments compiles fine. Two options:\
\
**1. A parameter object (enough for most TS/JS code):**\
\
```ts\
new Report({ from, to, includeDraft: true, format: 'pdf' })\
```\
\
Field names carry the meaning, and optional values are simply omitted instead of passed as `null`.\
\
**2. Builder** — when construction is a **multi-step, ordered process** or needs validation before an instance exists:\
\
```ts\
const query = new QueryBuilder()\
  .from('orders')\
  .where('status', 'paid')\
  .orderBy('created_at')\
  .build()   // validate, then produce an immutable object\
```\
\
`build()` is where invalid combinations are rejected, so the produced object is always in a valid state.\
\
**Which one:** flat config built in one shot → parameter object. Built up in steps, or several variants from the same process → Builder.
