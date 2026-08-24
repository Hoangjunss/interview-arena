---
id: cap-heap-cho-node-elasticsearch-theo-nguyen-tac-nao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấp heap cho node Elasticsearch theo nguyên tắc nào?

## Question (EN)
How do you size the heap for an Elasticsearch node?

## Đáp án chi tiết (VI)
Hai quy tắc: **không quá 50% RAM của máy** và **không quá ~31 GB**.\
\
Vượt 50% RAM là lấy mất phần OS page cache — mà Lucene đọc segment từ file, nên page cache đóng vai trò quyết định với tốc độ search. Cluster nhiều heap mà ít page cache thường chậm hơn cấu hình ngược lại.\
\
Ngưỡng 31 GB là do JVM: quá mốc đó, **compressed oops bị tắt** và con trỏ chuyển sang 64-bit, nên 32 GB heap thực tế chứa được ít object hơn 31 GB.\
\
```bash\
# jvm.options\
-Xms30g\
-Xmx30g   # min = max, tranh resize luc chay\
```\
\
Máy 128 GB RAM thì không cấp 64 GB heap cho một node — cách làm phổ biến là chạy **nhiều node trên một máy**, mỗi node ~30 GB heap.\
\
Dấu hiệu heap thiếu: GC chạy liên tục, `GET /_nodes/stats/jvm` cho thấy heap sau full GC vẫn cao, và bắt đầu thấy `circuit_breaking_exception`. Nguyên nhân gốc thường là quá nhiều shard, fielddata bật nhầm, hoặc aggregation quá nặng chứ không phải máy thiếu RAM.

## Detailed Answer (EN)
Two rules: **no more than 50% of machine RAM** and **no more than about 31 GB**.\
\
Going beyond 50% steals the OS page cache — and since Lucene reads segments from files, page cache largely determines search speed. A cluster with lots of heap and little page cache is usually slower than the reverse.\
\
The 31 GB threshold comes from the JVM: past it, **compressed oops are disabled** and pointers become 64-bit, so a 32 GB heap actually holds fewer objects than a 31 GB one.\
\
```bash\
# jvm.options\
-Xms30g\
-Xmx30g   # min = max, avoids resizing at runtime\
```\
\
On a 128 GB machine you do not give one node a 64 GB heap — the common approach runs **several nodes per machine**, each with about 30 GB.\
\
Signs of heap pressure: constant GC, `GET /_nodes/stats/jvm` showing high heap after full GC, and `circuit_breaking_exception` appearing. The root cause is usually too many shards, fielddata enabled by accident, or overly heavy aggregations rather than an under-specced machine.
