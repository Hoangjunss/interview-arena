---
id: quiz-postgresql-vi-sao-like-abc-co-the-dung-b-tree-index-con-like-abc-thi-khong
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao LIKE 'abc%' có thể dùng B-tree index còn LIKE '%abc' thì không?

## Đáp án trắc nghiệm
- [ ] Vì '%abc' chứa ký tự đặc biệt nên PostgreSQL từ chối dùng mọi loại index
- [x] Vì prefix cố định biến được thành quét khoảng trên cây; wildcard đứng đầu thì không có điểm vào
- [ ] Vì LIKE chỉ dùng được index khi cột có UNIQUE constraint
- [ ] Vì LIKE có wildcard ở cuối được PostgreSQL dịch thành toán tử = trước khi chạy

## Giải thích (VI)
B-tree sắp chuỗi theo thứ tự từ ký tự đầu tiên. LIKE 'abc%' tương đương khoảng >= 'abc' AND < 'abd' — một dải liên tục trong cây. Còn '%abc' cần biết phần cuối chuỗi, thứ mà cây sắp theo đầu chuỗi không giúp gì được, nên phải quét toàn bộ.

### Giải thích các phương án:
- **Vì '%abc' chứa ký tự đặc biệt nên PostgreSQL từ chối dùng mọi loại index** (Sai): Không có chuyện từ chối; pg trgm vẫn index được pattern có wildcard đứng đầu.
- **Vì prefix cố định biến được thành quét khoảng trên cây; wildcard đứng đầu thì không có điểm vào** (Đúng): B-tree sắp theo thứ tự từ đầu chuỗi nên 'abc%' thu về một dải liên tục trong cây.
- **Vì LIKE chỉ dùng được index khi cột có UNIQUE constraint** (Sai): Tính duy nhất của cột không liên quan tới việc LIKE khớp index hay không.
- **Vì LIKE có wildcard ở cuối được PostgreSQL dịch thành toán tử = trước khi chạy** (Sai): LIKE 'abc%' được dịch thành điều kiện khoảng, không phải phép so sánh bằng.
