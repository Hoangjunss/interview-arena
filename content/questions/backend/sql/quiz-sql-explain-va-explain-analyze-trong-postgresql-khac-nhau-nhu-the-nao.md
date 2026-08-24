---
id: quiz-sql-explain-va-explain-analyze-trong-postgresql-khac-nhau-nhu-the-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
EXPLAIN và EXPLAIN ANALYZE trong PostgreSQL khác nhau như thế nào?

## Đáp án trắc nghiệm
- [ ] Cả hai đều không chạy truy vấn — EXPLAIN ANALYZE chỉ dùng thống kê chi tiết hơn để ước tính chính xác hơn
- [ ] EXPLAIN tự động viết lại truy vấn theo phương án tối ưu nhất rồi lưu lại cho các lần chạy sau
- [ ] EXPLAIN ANALYZE an toàn với mọi loại lệnh vì chế độ phân tích chỉ đọc dữ liệu, không bao giờ ghi
- [x] EXPLAIN chỉ hiện kế hoạch với chi phí ước tính; EXPLAIN ANALYZE chạy thật

## Giải thích (VI)
EXPLAIN hiển thị kế hoạch thực thi mà planner chọn kèm chi phí ước tính — không chạy truy vấn. EXPLAIN ANALYZE thực thi truy vấn thật rồi in kèm số liệu đo được: thời gian và số dòng thực tế của từng bước — công cụ chuẩn để tìm điểm nghẽn. Cẩn trọng: EXPLAIN ANALYZE trên UPDATE/DELETE thay đổi dữ liệu thật, phải bọc trong BEGIN ... ROLLBACK.

### Giải thích các phương án:
- **Cả hai đều không chạy truy vấn — EXPLAIN ANALYZE chỉ dùng thống kê chi tiết hơn để ước tính chính xác hơn** (Sai): EXPLAIN ANALYZE thực thi truy vấn thật sự — số liệu "actual time" và "actual rows" trong kết quả là đo đạc thật, không phải ước tính tinh hơn.
- **EXPLAIN tự động viết lại truy vấn theo phương án tối ưu nhất rồi lưu lại cho các lần chạy sau** (Sai): EXPLAIN chỉ hiển thị kế hoạch mà planner sẽ chọn — nó không sửa truy vấn và không lưu gì; tối ưu là việc của người đọc kế hoạch.
- **EXPLAIN ANALYZE an toàn với mọi loại lệnh vì chế độ phân tích chỉ đọc dữ liệu, không bao giờ ghi** (Sai): Nguy hiểm ngược lại: EXPLAIN ANALYZE trên UPDATE/DELETE/INSERT thực thi lệnh thật và thay đổi dữ liệu thật — đây là cạm bẫy kinh điển, phải bọc BEGIN ... ROLLBACK.
- **EXPLAIN chỉ hiện kế hoạch với chi phí ước tính; EXPLAIN ANALYZE chạy thật** (Đúng): Đúng: khác biệt cốt lõi là có thực thi hay không — ANALYZE cho số liệu thật để đối chiếu với ước tính, đổi lại mọi tác dụng phụ của lệnh đều xảy ra thật. Dạng sau bổ sung thời gian và số dòng thực tế từng bước, nên với lệnh ghi phải bọc trong BEGIN ... ROLLBACK.
