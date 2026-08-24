---
id: ket-qua-terms-aggregation-co-chinh-xac-tuyet-doi-khong
position: backend
technology: aggregations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kết quả `terms` aggregation có chính xác tuyệt đối không?

## Question (EN)
Are `terms` aggregation results exact?

## Đáp án chi tiết (VI)
Không. Trên index nhiều shard, `terms` agg là **kết quả xấp xỉ**: mỗi shard trả về top N cục bộ rồi coordinating node gộp lại, nên một term xếp thứ 15 ở mọi shard có thể tổng lớn hơn term đang đứng top nhưng vẫn bị bỏ sót.\
\
Response nói thẳng điều đó:\
\
```json\
\\"aggregations\\": {\
  \\"by_brand\\": {\
    \\"doc_count_error_upper_bound\\": 42,   // sai so toi da\
    \\"sum_other_doc_count\\": 1503,         // so doc khong nam trong bucket tra ve\
    \\"buckets\\": [...]\
  }\
}\
```\
\
Cách giảm sai số: tăng `shard_size` (mặc định `size * 1.5 + 10`) để mỗi shard trả nhiều hơn trước khi gộp.\
\
```json\
{ \\"terms\\": { \\"field\\": \\"brand\\

## Detailed Answer (EN)
No. On a multi-shard index a `terms` agg is **approximate**: each shard returns its local top N and the coordinating node merges them, so a term ranked 15th on every shard can outrank the reported top yet be missed entirely.\
\
The response says so explicitly:\
\
```json\
\\"aggregations\\": {\
  \\"by_brand\\": {\
    \\"doc_count_error_upper_bound\\": 42,   // maximum possible error\
    \\"sum_other_doc_count\\": 1503,         // docs outside the returned buckets\
    \\"buckets\\": [...]\
  }\
}\
```\
\
To reduce error, raise `shard_size` (default `size * 1.5 + 10`) so each shard returns more before merging.\
\
```json\
{ \\"terms\\": { \\"field\\": \\"brand\\
