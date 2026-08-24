---
id: quiz-postgresql-bang-log-500-trieu-dong-chi-ghi-them-theo-thoi-gian-truy-van-chu-yeu-loc-khoang
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bảng log 500 triệu dòng, chỉ ghi thêm theo thời gian, truy vấn chủ yếu lọc khoảng created_at. Index nào tiết kiệm nhất mà vẫn hiệu quả?

## Đáp án trắc nghiệm
- [ ] B-tree trên created at, vì là loại mặc định an toàn nhất
- [ ] Hash trên created at vì bảng quá lớn
- [ ] GIN trên created at để tra khoảng thời gian nhanh
- [x] BRIN trên created at

## Giải thích (VI)
BRIN (Block Range Index). BRIN chỉ lưu min/max của từng dải block thay vì từng dòng, nên với 500 triệu dòng nó chiếm cỡ vài MB trong khi B-tree tương đương chiếm hàng chục GB. Điều kiện tiên quyết: giá trị cột phải tương quan với thứ tự vật lý — bảng log append-only theo thời gian thoả điều kiện này một cách tự nhiên.

### Giải thích các phương án:
- **B-tree trên created at, vì là loại mặc định an toàn nhất** (Sai): B-tree hoạt động nhưng chiếm nhiều GB cho 500 triệu entry — không phải phương án tiết kiệm.
- **Hash trên created at vì bảng quá lớn** (Sai): Hash chỉ hỗ trợ so sánh bằng, không lọc được khoảng thời gian.
- **GIN trên created at để tra khoảng thời gian nhanh** (Sai): GIN dành cho dữ liệu chứa nhiều phần tử con, không dành cho so sánh khoảng.
- **BRIN trên created at** (Đúng): Dữ liệu append-only nên giá trị tương quan chặt với vị trí vật lý — đúng điều kiện BRIN cần.
