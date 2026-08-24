---
id: cac-mo-hinh-consistency-trong-he-thong-phan-tan-la-gi
position: system-design
technology: fundamentals
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các mô hình Consistency trong hệ thống phân tán là gì?

## Question (EN)
What are the consistency models in distributed systems?

## Đáp án chi tiết (VI)
Các mô hình consistency phổ biến:\
\
- Strong Consistency (Linearizability): sau khi write thành công, mọi read sau đó đều thấy giá trị mới nhất – dễ lập trình nhất nhưng latency cao nhất vì cần coordination giữa các node.\
- Eventual Consistency: dữ liệu sẽ nhất quán sau một khoảng thời gian, nhưng tạm thời có thể đọc dữ liệu cũ – được dùng trong Cassandra, DynamoDB, DNS.\
- Read-your-writes Consistency: sau khi user write, chính user đó luôn đọc được dữ liệu mới nhất (dù user khác chưa thấy) – quan trọng cho UX tốt trong social media.\
- Causal Consistency: các operation có quan hệ nhân quả được nhìn thấy theo đúng thứ tự (A post → B comment → mọi người thấy comment sau post).\
- Monotonic Read: user không bao giờ thấy dữ liệu quay ngược thời gian (không đọc v2 rồi đọc v1).\
\
Lựa chọn consistency model ảnh hưởng trực tiếp đến latency, availability và trải nghiệm người dùng.

## Detailed Answer (EN)
Common consistency models:\
\
- Strong Consistency (Linearizability): after a successful write, every subsequent read returns the latest value — easiest to reason about but highest latency since it requires coordination across nodes.\
- Eventual Consistency: data will become consistent over time, but reads may temporarily return stale values — used in Cassandra, DynamoDB, and DNS.\
- Read-your-writes Consistency: after a user writes data, that same user always reads the latest value (even if other users haven't seen it yet) — important for good UX in social media.\
- Causal Consistency: causally related operations are observed in the correct order (A posts → B comments → everyone sees the comment after the post).\
- Monotonic Read: a user never observes data going backwards in time (won't read v2 and then read v1).\
\
The choice of consistency model directly impacts latency, availability, and user experience.
