---
id: setting-nao-cua-index-khong-doi-duoc-sau-khi-tao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Setting nào của index không đổi được sau khi tạo?

## Question (EN)
Which index settings cannot be changed after creation?

## Đáp án chi tiết (VI)
Nhóm **static setting** — quan trọng nhất là `number_of_shards`, và toàn bộ phần `analysis` (analyzer, tokenizer, filter). Muốn đổi phải tạo index mới rồi reindex.\
\
```bash\
# doi duoc (dynamic)\
PUT /products/_settings\
{ \\"index\\": { \\"number_of_replicas\\": 2, \\"refresh_interval\\": \\"30s\\" } }\
\
# KHONG doi duoc (static): number_of_shards, analysis.*\
```\
\
Mapping cũng gần như vậy: **thêm field mới thì được, đổi kiểu field đã có thì không**.\
\
Hệ quả thực tế là quyết định lúc tạo index rất quan trọng, và cách phòng thủ chuẩn là **luôn dùng alias**: ứng dụng trỏ vào `products`, còn index thật là `products_v1`. Khi phải đổi static setting, tạo `products_v2`, reindex, chuyển alias — ứng dụng không phải sửa dòng code nào.\
\
Một ngoại lệ hữu ích: `_split` và `_shrink` API đổi được số shard, nhưng có ràng buộc (index phải read-only, số shard mới phải là bội hoặc ước) nên thường vẫn kém linh hoạt hơn reindex.

## Detailed Answer (EN)
The **static** group — most importantly `number_of_shards`, plus the entire `analysis` section (analyzers, tokenizers, filters). Changing them means a new index and a reindex.\
\
```bash\
# changeable (dynamic)\
PUT /products/_settings\
{ \\"index\\": { \\"number_of_replicas\\": 2, \\"refresh_interval\\": \\"30s\\" } }\
\
# NOT changeable (static): number_of_shards, analysis.*\
```\
\
Mappings behave similarly: **adding a new field is fine, changing an existing field type is not**.\
\
The practical consequence is that index-creation decisions matter, and the standard defence is **always using an alias**: the application points at `products` while the real index is `products_v1`. When a static setting must change, create `products_v2`, reindex, switch the alias — no application change at all.\
\
One useful exception: the `_split` and `_shrink` APIs can change shard count, but with constraints (the index must be read-only, and the new count must be a multiple or factor), so a reindex is usually still more flexible.
