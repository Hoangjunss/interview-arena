---
id: sharding-key-trong-mongodb-la-gi-va-chon-the-nao-cho-dung
position: backend
technology: schema-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sharding key trong MongoDB là gì và chọn thế nào cho đúng?

## Question (EN)
What is a sharding key in MongoDB and how to choose a good one?

## Đáp án chi tiết (VI)
Shard key là field (hoặc nhóm field) dùng để chia dữ liệu ra các shard. Chọn đúng là cực kỳ quan trọng vì *rất khó đổi sau này*.\
\
**Ba tiêu chí:**\
- **Cardinality cao (nhiều giá trị khác nhau)**: chọn `status` chỉ có `active`/`inactive` thì tối đa chỉ chia được 2 nhóm — vô dụng.\
- **Phân bố đều**: tránh hot-spot. Key tăng dần đều theo thời gian/ObjectId sẽ khiến mọi lệnh ghi dồn vào shard mới nhất.\
- **Hỗ trợ query**: query thường dùng nên chứa shard key để tránh \\"scatter-gather\\" (hỏi mọi shard). *Hashed* shard key chia tải rất đều nhưng kém cho range query; *ranged* shard key thì ngược lại.

## Detailed Answer (EN)
A shard key is the field (or group of fields) used to distribute data across shards. Choosing well is critical because it is *very hard to change later*.\
\
**Three criteria:**\
- **High cardinality (many distinct values)**: picking `status` with only `active`/`inactive` gives at most 2 groups — useless.\
- **Even distribution**: avoid hot-spots. A key that increases monotonically with time/ObjectId forces all writes onto the newest shard.\
- **Supports queries**: frequent queries should include the shard key to avoid \\"scatter-gather\\" (asking every shard). A *hashed* shard key spreads load very evenly but is poor for range queries; a *ranged* shard key is the opposite.
