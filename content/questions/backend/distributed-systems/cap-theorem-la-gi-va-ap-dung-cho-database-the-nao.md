---
id: cap-theorem-la-gi-va-ap-dung-cho-database-the-nao
position: backend
technology: distributed-systems
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CAP theorem là gì và áp dụng cho database thế nào?

## Question (EN)
What is the CAP theorem and how does it apply to databases?

## Đáp án chi tiết (VI)
CAP nói: một hệ dữ liệu phân tán không thể đồng thời đảm bảo cả ba khi có **network partition**:\
\
- **Consistency (C)**: mọi node thấy dữ liệu mới nhất giống nhau (mọi read thấy write gần nhất).\
- **Availability (A)**: mọi request đều nhận phản hồi (không lỗi), dù có thể là dữ liệu cũ.\
- **Partition tolerance (P)**: hệ vẫn chạy khi mạng giữa các node bị chia cắt.\
\
Điểm mấu chốt: **partition là điều bắt buộc phải chịu** trong hệ phân tán (mạng sẽ có lúc đứt), nên thực chất khi có partition ta **phải chọn giữa C và A**:\
- **CP**: khi partition, hy sinh availability để giữ nhất quán (từ chối/chặn request nghi ngờ). Vd PostgreSQL/MySQL dạng cluster, ZooKeeper.\
- **AP**: khi partition, vẫn phục vụ nhưng chấp nhận dữ liệu có thể cũ → **eventual consistency**. Vd Cassandra, DynamoDB, CouchDB.\
\
Lưu ý: khi **không** có partition, hệ có thể vừa nhất quán vừa khả dụng — CAP chỉ ràng buộc lúc partition. Mở rộng hơn có mô hình **PACELC** (thêm đánh đổi latency/consistency lúc bình thường).

## Detailed Answer (EN)
$86
