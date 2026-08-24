---
id: visitor-pattern-la-gi-khi-nao-day-la-lua-chon-dung
position: backend
technology: behavioral
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Visitor pattern là gì? Khi nào đây là lựa chọn đúng?

## Question (EN)
What is the Visitor pattern? When is it the right choice?

## Đáp án chi tiết (VI)
Visitor cho phép thêm operation mới vào object structure mà không cần sửa class của các objects đó — tách algorithm khỏi data structure nó operates on. Cấu trúc: `interface Visitor { visitCircle(c: Circle): void; visitRectangle(r: Rectangle): void }` — mỗi shape có `accept(visitor: Visitor)` gọi đúng visit method. Vấn đề Visitor giải quyết: khi có stable object hierarchy (ít thêm class mới) nhưng cần thêm nhiều operations mới — với Visitor, thêm operation = thêm Visitor class mới mà không sửa Shape classes. Trade-off vs SOLID: Visitor tuân thủ OCP cho operations nhưng vi phạm OCP cho elements — khi thêm `Triangle`, phải sửa tất cả Visitor. Dùng khi: AST (Abstract Syntax Tree) processing — compiler, code analyzer, transformer; document model với nhiều export format. TypeScript compiler dùng Visitor cho AST traversal. Không dùng khi: object hierarchy thay đổi thường xuyên; khi chỉ cần 1-2 opera"])</script><script>self.__next_f.push([1,"tions — polymorphism đơn giản hơn.

## Detailed Answer (EN)
$85
