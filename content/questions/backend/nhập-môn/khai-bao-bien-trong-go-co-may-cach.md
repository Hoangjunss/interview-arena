---
id: khai-bao-bien-trong-go-co-may-cach
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo biến trong Go có mấy cách?

## Question (EN)
How many ways can you declare variables in Go?

## Đáp án chi tiết (VI)
3 cách: (1) `var name string = \\"Go\\"` (đầy đủ). (2) `var name = \\"Go\\"` (type inference). (3) `name := \\"Go\\"` (short declaration, chỉ trong function). `:=` phổ biến nhất. `var` dùng ở package level hoặc khi cần zero value. Go không có `let`/`const` như JS.

## Detailed Answer (EN)
There are 3 ways: (1) `var name string = \\"Go\\"` (full declaration). (2) `var name = \\"Go\\"` (type inference). (3) `name := \\"Go\\"` (short declaration, only inside functions). `:=` is the most common. `var` is used at package level or when you need the zero value explicitly. Go has no `let`/`const` like JavaScript.
