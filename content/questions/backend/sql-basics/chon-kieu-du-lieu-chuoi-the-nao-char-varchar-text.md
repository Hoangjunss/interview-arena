---
id: chon-kieu-du-lieu-chuoi-the-nao-char-varchar-text
position: backend
technology: sql-basics
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chọn kiểu dữ liệu chuỗi thế nào: CHAR, VARCHAR, TEXT?

## Question (EN)
How do you choose string data types: CHAR, VARCHAR, TEXT?

## Đáp án chi tiết (VI)
Ba kiểu chuỗi thường gặp:\
\
- **`CHAR(n)`** — độ dài **cố định**, luôn chiếm `n` ký tự (đệm khoảng trắng nếu ngắn hơn). Hợp mã có độ dài đúng bằng nhau (mã quốc gia `CHAR(2)`, mã hash cố định).\
- **`VARCHAR(n)`** — độ dài **thay đổi**, tối đa `n` ký tự, chỉ chiếm đúng phần dùng. Kiểu phổ biến nhất cho tên, email, tiêu đề. `n` là **ràng buộc độ dài**, không phải để tối ưu lưu trữ.\
- **`TEXT`** — chuỗi độ dài **không giới hạn** (theo giới hạn thực tế của hệ). Hợp nội dung dài: mô tả, bài viết, JSON dạng text.\
\
Lưu ý theo hệ:\
- **PostgreSQL**: `varchar(n)`, `text` lưu **như nhau** về hiệu năng — không có lợi ích tốc độ khi giới hạn `n`; chọn `varchar(n)` chỉ khi cần chặn độ dài, còn lại dùng `text`.\
- **MySQL**: `TEXT` khác `VARCHAR` (lưu ngoài dòng, không index full nếu không chỉ định prefix) nên phân biệt rõ hơn.\
\
Nguyên tắc chung: dùng `VARCHAR`/`TEXT` cho hầu hết; `CHAR` chỉ khi độ dài thực sự cố định.

## Detailed Answer (EN)
Three common string types:\
\
- **`CHAR(n)`** — **fixed** length, always occupies `n` characters (space-padded if shorter). Fits codes of exactly equal length (country code `CHAR(2)`, fixed-length hashes).\
- **`VARCHAR(n)`** — **variable** length, up to `n` characters, storing only what is used. The most common type for names, emails, titles. `n` is a **length constraint**, not a storage optimization.\
- **`TEXT`** — **unbounded** string (up to the engine's practical limit). Fits long content: descriptions, articles, JSON stored as text.\
\
Engine notes:\
- **PostgreSQL**: `varchar(n)` and `text` store **identically** performance-wise — there is no speed benefit to limiting `n`; use `varchar(n)` only to enforce a length, otherwise `text`.\
- **MySQL**: `TEXT` differs from `VARCHAR` (stored off-row, not fully indexable without a prefix), so the distinction matters more.\
\
Rule of thumb: use `VARCHAR`/`TEXT` for most cases; reserve `CHAR` for truly fixed-length values.
