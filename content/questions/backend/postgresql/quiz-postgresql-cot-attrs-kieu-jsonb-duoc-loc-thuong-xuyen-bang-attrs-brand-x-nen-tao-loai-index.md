---
id: quiz-postgresql-cot-attrs-kieu-jsonb-duoc-loc-thuong-xuyen-bang-attrs-brand-x-nen-tao-loai-index
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cột attrs kiểu jsonb được lọc thường xuyên bằng attrs @> '{"brand": "x"}'. Nên tạo loại index nào?

## Đáp án trắc nghiệm
- [x] GIN
- [ ] Hash trên cột attrs
- [ ] B-tree trên cột attrs
- [ ] BRIN trên cột attrs

## Giải thích (VI)
GIN (CREATE INDEX ... USING gin (attrs)). GIN tách jsonb thành các phần tử con và lập chỉ mục từng phần, nên các toán tử @>, ?, ?& tra được thẳng vào index. Cùng lý do đó, GIN cũng là lựa chọn cho array và full-text search.

### Giải thích các phương án:
- **GIN** (Đúng): GIN lập chỉ mục từng key/value bên trong jsonb nên hỗ trợ trực tiếp toán tử @>.
- **Hash trên cột attrs** (Sai): Hash chỉ phục vụ so sánh bằng toàn bộ giá trị, không tra được key bên trong.
- **B-tree trên cột attrs** (Sai): B-tree chỉ so sánh cả giá trị jsonb như một khối, không nhìn vào bên trong.
- **BRIN trên cột attrs** (Sai): BRIN dựa vào tương quan giá trị với vị trí vật lý, không áp dụng cho nội dung jsonb.
