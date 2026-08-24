---
id: isolation-levels-trong-postgresql-khac-nhau-the-nao
position: backend
technology: transactions-\u0026-concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Isolation levels trong PostgreSQL khác nhau thế nào?

## Question (EN)
How are PostgreSQL isolation levels different?

## Đáp án chi tiết (VI)
Isolation level quyết định một transaction \\"nhìn thấy\\" công việc đang chạy dở của transaction khác đến đâu. PostgreSQL có ba mức thực tế (Read Uncommitted bị xử lý như Read Committed):\
\
- **Read Committed** (mặc định): mỗi câu lệnh thấy ảnh chụp dữ liệu mới nhất đã commit. Hai lần đọc trong cùng transaction có thể ra khác nhau.\
- **Repeatable Read**: giữ một ảnh chụp cố định suốt transaction, đọc lại vẫn như cũ.\
- **Serializable**: đảm bảo kết quả y như thể các transaction chạy lần lượt; nếu phát hiện xung đột thì hủy một cái để bạn thử lại.\
\
Chọn theo ràng buộc nghiệp vụ. Với đặt chỗ/thanh toán/tồn kho dễ tranh chấp, cần khóa dòng hoặc Serializable + retry, đừng chỉ \\"đọc rồi ghi\\" ở mức Read Committed.

## Detailed Answer (EN)
An isolation level decides how much a transaction can \\"see\\" of another transaction's in-progress work. PostgreSQL has three real levels (Read Uncommitted behaves like Read Committed):\
\
- **Read Committed** (default): each statement sees the latest committed snapshot. Two reads in the same transaction can differ.\
- **Repeatable Read**: keeps one fixed snapshot for the whole transaction, so re-reads stay the same.\
- **Serializable**: guarantees a result as if transactions ran one after another; on conflict it aborts one so you can retry.\
\
Choose by your business invariant. For booking/payment/inventory that easily race, use row locks or Serializable + retry, not just \\"read then write\\" under Read Committed.
