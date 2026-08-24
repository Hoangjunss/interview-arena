---
id: quiz-postgresql-explain-va-explain-analyze-khac-nhau-the-nao
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
EXPLAIN và EXPLAIN ANALYZE khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] EXPLAIN cho truy vấn đọc, EXPLAIN ANALYZE dành riêng cho truy vấn ghi
- [x] EXPLAIN chỉ lập plan; EXPLAIN ANALYZE thực thi thật và trả kèm số liệu đo được
- [ ] EXPLAIN ANALYZE tự chạy thêm lệnh ANALYZE cập nhật thống kê trước khi lập plan
- [ ] EXPLAIN ANALYZE chỉ thêm phần ước lượng chi phí chi tiết hơn cho từng node

## Giải thích (VI)
EXPLAIN chỉ hiện plan với ước lượng (cost, rows dự đoán) mà không chạy truy vấn. EXPLAIN ANALYZE thực thi thật rồi in kèm số đo thực tế: actual time, số dòng thật, số lần loop. So sánh rows ước lượng với rows thực tế là cách chẩn đoán plan kém phổ biến nhất.

### Giải thích các phương án:
- **EXPLAIN cho truy vấn đọc, EXPLAIN ANALYZE dành riêng cho truy vấn ghi** (Sai): Cả hai dùng được cho mọi loại truy vấn, không chia theo đọc/ghi.
- **EXPLAIN chỉ lập plan; EXPLAIN ANALYZE thực thi thật và trả kèm số liệu đo được** (Đúng): Nhờ chạy thật nên thấy được thời gian và số dòng thực tế của từng bước.
- **EXPLAIN ANALYZE tự chạy thêm lệnh ANALYZE cập nhật thống kê trước khi lập plan** (Sai): Từ khoá ANALYZE ở đây không liên quan gì tới lệnh ANALYZE cập nhật thống kê.
- **EXPLAIN ANALYZE chỉ thêm phần ước lượng chi phí chi tiết hơn cho từng node** (Sai): Ước lượng chi phí đã có sẵn trong EXPLAIN thường; ANALYZE thêm số liệu thực.
