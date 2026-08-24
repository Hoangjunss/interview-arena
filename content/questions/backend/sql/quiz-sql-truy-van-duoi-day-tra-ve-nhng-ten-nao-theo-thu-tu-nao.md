---
id: quiz-sql-truy-van-duoi-day-tra-ve-nhng-ten-nao-theo-thu-tu-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về những tên nào, theo thứ tự nào?

## Đáp án trắc nghiệm
- [ ] 'B' rồi 'C' — OFFSET 1 nghĩa là bắt đầu từ dòng số 1, tức dòng đầu tiên
- [ ] Không xác định — LIMIT và OFFSET chạy trước ORDER BY nên hai dòng được chọn là ngẫu nhiên
- [ ] 'A' rồi 'C' — ORDER BY mặc định sắp giảm dần nên thứ tự là D, A, C, B
- [x] 'C' rồi 'A' — sắp theo giá tăng dần được B, C, A, D; OFFSET 1 bỏ qua dòng đầu (B), LIMIT 2 lấy hai dòng kế tiếp

## Giải thích (VI)
Trả về 'C' rồi 'A'. Thứ tự xử lý: ORDER BY price ASC xếp thành B(10), C(20), A(30), D(40); OFFSET 1 bỏ qua một dòng đầu (B); LIMIT 2 lấy hai dòng kế tiếp — C và A. Lưu ý: OFFSET là số dòng bị bỏ qua, không phải vị trí bắt đầu; và LIMIT/OFFSET không có ORDER BY sẽ cho kết quả không ổn định giữa các lần chạy.

### Giải thích các phương án:
- **'B' rồi 'C' — OFFSET 1 nghĩa là bắt đầu từ dòng số 1, tức dòng đầu tiên** (Sai): OFFSET đếm số dòng bị bỏ qua chứ không phải vị trí bắt đầu — OFFSET 1 bỏ hẳn dòng đầu (B), kết quả bắt đầu từ dòng thứ hai.
- **Không xác định — LIMIT và OFFSET chạy trước ORDER BY nên hai dòng được chọn là ngẫu nhiên** (Sai): ORDER BY luôn được áp trước LIMIT/OFFSET trong cùng một tầng truy vấn — kết quả hoàn toàn xác định khi khóa sắp xếp không có giá trị trùng.
- **'A' rồi 'C' — ORDER BY mặc định sắp giảm dần nên thứ tự là D, A, C, B** (Sai): Chiều mặc định của ORDER BY là ASC (tăng dần) — và ở đây còn ghi rõ ASC; sắp giảm dần phải viết tường minh DESC.
- **'C' rồi 'A' — sắp theo giá tăng dần được B, C, A, D; OFFSET 1 bỏ qua dòng đầu (B), LIMIT 2 lấy hai dòng kế tiếp** (Đúng): Đúng: thứ tự xử lý là ORDER BY trước, rồi OFFSET bỏ qua số dòng đầu, cuối cùng LIMIT cắt số dòng trả về.
