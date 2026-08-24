---
id: er-diagram-entity-relationship-diagram-la-gi-cac-thanh-phan-chinh
position: backend
technology: database-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ER Diagram (Entity-Relationship Diagram) là gì? Các thành phần chính?

## Question (EN)
What is an ER Diagram (Entity-Relationship Diagram)? What are its main components?

## Đáp án chi tiết (VI)
ER Diagram là bản vẽ schema trước khi code — như bản vẽ nhà trước khi xây, giúp tránh phải đập đi sửa lại tốn kém.\
\
Ba thành phần chính:\
- **Entity** (thực thể = bảng): vẽ hình chữ nhật.\
- **Attribute** (thuộc tính = cột): khóa thì gạch chân.\
- **Relationship** (mối quan hệ) kèm **cardinality** (một/nhiều).\
\
Ký hiệu Crow's Foot (chân quạ) được dùng nhiều hơn Chen: `|` = một, `O` = không, `\u003c`/`\u003e` = nhiều. Đọc ví dụ: `users ||--o{ orders` nghĩa là một user có 0 hoặc nhiều order.\
\
Công cụ: dbdiagram.io (viết bằng code, hợp version control), draw.io, Lucidchart; Prisma còn auto-sinh ERD.\
\
Quy trình thiết kế: (1) tìm các entity từ yêu cầu nghiệp vụ → (2) gán thuộc tính + PK cho mỗi entity → (3) xác định quan hệ và cardinality → (4) tách N-N thành bảng nối → (5) review với team trước khi viết DDL.

## Detailed Answer (EN)
An ER Diagram is a sketch of the schema before you code — like a house blueprint before building, it helps avoid costly tear-down-and-rebuild later.\
\
Three main components:\
- **Entity** (= table): drawn as a rectangle.\
- **Attribute** (= column): the key is underlined.\
- **Relationship** plus its **cardinality** (one/many).\
\
Crow's Foot notation is used more than Chen: `|` = one, `O` = zero, `\u003c`/`\u003e` = many. Reading an example: `users ||--o{ orders` means one user has zero or many orders.\
\
Tools: dbdiagram.io (code-based, version-control friendly), draw.io, Lucidchart; Prisma can also auto-generate ERDs.\
\
Design steps: (1) find entities from business requirements → (2) assign attributes + PK per entity → (3) define relationships and cardinality → (4) resolve N-N into junction tables → (5) review with the team before writing DDL.
