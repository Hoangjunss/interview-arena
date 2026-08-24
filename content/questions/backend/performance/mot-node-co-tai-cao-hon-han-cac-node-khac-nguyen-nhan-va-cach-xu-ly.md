---
id: mot-node-co-tai-cao-hon-han-cac-node-khac-nguyen-nhan-va-cach-xu-ly
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một node có tải cao hơn hẳn các node khác. Nguyên nhân và cách xử lý?

## Question (EN)
One node runs much hotter than the others. What causes it and how do you fix it?

## Đáp án chi tiết (VI)
Đây là **hot spotting**. Bốn nguyên nhân theo tần suất:\
\
1. **Index đang ghi nhiều dồn vào ít node** — với data stream, chỉ index mới nhận write, nên nếu shard của nó nằm chung một node thì node đó gánh hết.\
2. **Custom routing lệch** — một tenant lớn dồn vào một shard.\
3. **Shard phân bố không đều** — Elasticsearch cân bằng theo số shard chứ không theo dung lượng hay tải, nên vài shard lớn có thể nằm chung.\
4. **Node cấu hình yếu hơn** trong cluster không đồng nhất.\
\
Chẩn đoán:\
\
```bash\
GET /_cat/shards?v\u0026s=store:desc      # shard nao lon, nam o node nao\
GET /_cat/nodes?v\u0026h=name,heap.percent,cpu,load_1m\
GET /_nodes/hot_threads              # node do dang ban vi viec gi\
```\
\
Xử lý: đặt `index.routing.allocation.total_shards_per_node` để chặn dồn shard của một index vào một node; dùng `_cluster/reroute` để dời shard nóng; xem lại routing key nếu lệch do tenant.\
\
Gốc rễ thường là mô hình dữ liệu chứ không phải cluster — shard quá lớn hoặc routing chọn sai key.

## Detailed Answer (EN)
This is **hot spotting**. Four causes by frequency:\
\
1. **Heavy write traffic concentrated on few nodes** — with data streams only the newest index takes writes, so if its shards share a node, that node carries everything.\
2. **Skewed custom routing** — one large tenant landing on one shard.\
3. **Uneven shard distribution** — Elasticsearch balances by shard count, not size or load, so several large shards can share a node.\
4. **A weaker node** in a heterogeneous cluster.\
\
Diagnosis:\
\
```bash\
GET /_cat/shards?v\u0026s=store:desc      # which shards are large and where they sit\
GET /_cat/nodes?v\u0026h=name,heap.percent,cpu,load_1m\
GET /_nodes/hot_threads              # what the busy node is actually doing\
```\
\
Fixes: set `index.routing.allocation.total_shards_per_node` to stop one index piling onto one node; use `_cluster/reroute` to move a hot shard; revisit the routing key when a tenant causes the skew.\
\
The root cause is usually the data model rather than the cluster — oversized shards or a badly chosen routing key.
