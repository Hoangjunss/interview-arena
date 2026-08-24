---
id: quiz-postgresql-b-tree-index-loai-mac-dinh-cua-postgresql-phu-hop-cho-nhng-truy-van-nao
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
B-tree index (loại mặc định của PostgreSQL) phù hợp cho những truy vấn nào?

## Đáp án trắc nghiệm
- [x] So sánh =, , BETWEEN và sắp xếp ORDER BY
- [ ] Kiểm tra một mảng có chứa phần tử cho trước hay không
- [ ] Tính khoảng cách gần nhất giữa các điểm toạ độ
- [ ] Tìm kiếm full-text trong nội dung văn bản dài

## Giải thích (VI)
So sánh có thứ tự : =, <, <=, >, >=, BETWEEN, IN, và cả ORDER BY trên cột đó. Vì B-tree lưu giá trị đã sắp xếp nên vừa tra điểm, vừa quét khoảng, vừa trả kết quả đúng thứ tự mà không cần sort thêm.

### Giải thích các phương án:
- **So sánh =, , BETWEEN và sắp xếp ORDER BY** (Đúng): Cấu trúc cây có thứ tự nên tra đẳng thức, quét khoảng và sort đều nhanh.
- **Kiểm tra một mảng có chứa phần tử cho trước hay không** (Sai): Toán tử chứa (@>) trên mảng là địa bàn của GIN, không phải B-tree.
- **Tính khoảng cách gần nhất giữa các điểm toạ độ** (Sai): Truy vấn không gian và nearest-neighbor dùng GiST/SP-GiST.
- **Tìm kiếm full-text trong nội dung văn bản dài** (Sai): Full-text search cần GIN index trên tsvector, B-tree không phục vụ được.
