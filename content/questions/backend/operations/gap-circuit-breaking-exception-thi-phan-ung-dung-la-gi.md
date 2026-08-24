---
id: gap-circuit-breaking-exception-thi-phan-ung-dung-la-gi
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gặp `circuit_breaking_exception` thì phản ứng đúng là gì?

## Question (EN)
What is the correct response to a `circuit_breaking_exception`?

## Đáp án chi tiết (VI)
Đây là **cơ chế bảo vệ đang làm đúng việc của nó**: Elasticsearch từ chối request để tránh OOM cả node. Nâng ngưỡng breaker là phản ứng sai — nó chỉ đổi một lỗi rõ ràng thành một lần node chết.\
\
Đọc message để biết breaker nào nổ:\
\
```text\
[parent] Data too large, data for [\u003chttp_request\u003e] would be [31.2gb]/[30.6gb]\
```\
\
Các nguyên nhân gốc theo tần suất:\
1. **Aggregation quá nặng** — `terms` với `size: 100000`, hoặc lồng nhiều tầng làm số bucket bùng nổ.\
2. **Bulk batch quá lớn** hoặc quá nhiều bulk chạy song song.\
3. **`fielddata` bật trên field `text`** — nạp cả field lên heap.\
4. **Quá nhiều shard trên một node** — heap bị chiếm bởi overhead của shard.\
\
Xử lý: giảm `size` của aggregation, dùng `composite` agg để phân trang bucket thay vì lấy hết một lần, giảm batch size, và rà lại số shard.\
\
Có thể xem breaker đang giữ bao nhiêu bằng `GET /_nodes/stats/breaker`, và dùng `GET /_nodes/stats/jvm` để xác nhận vấn đề là heap thật chứ không phải một request cá biệt.

## Detailed Answer (EN)
This is **the protection doing its job**: Elasticsearch rejects a request to avoid taking the node down with an OOM. Raising the breaker limit is the wrong reaction — it converts a clear error into a dead node.\
\
Read the message to see which breaker tripped:\
\
```text\
[parent] Data too large, data for [\u003chttp_request\u003e] would be [31.2gb]/[30.6gb]\
```\
\
Root causes by frequency:\
1. **Overly heavy aggregations** — `terms` with `size: 100000`, or deep nesting causing bucket explosion.\
2. **Bulk batches too large** or too many concurrent bulks.\
3. **`fielddata` enabled on a `text` field** — loading the whole field onto the heap.\
4. **Too many shards per node** — heap consumed by per-shard overhead.\
\
Fixes: reduce aggregation `size`, use a `composite` agg to paginate buckets instead of fetching all at once, shrink batch sizes, and review shard counts.\
\
Inspect what breakers hold with `GET /_nodes/stats/breaker`, and confirm with `GET /_nodes/stats/jvm` whether this is real heap pressure or one pathological request.
