---
id: custom-routing-khi-index-dem-lai-loi-ich-gi-va-rui-ro-gi
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Custom routing khi index đem lại lợi ích gì và rủi ro gì?

## Question (EN)
What does custom routing gain you and what does it risk?

## Đáp án chi tiết (VI)
Mặc định Elasticsearch chọn shard theo `hash(_id) % number_of_primary_shards`. **Custom routing** cho phép ép các document liên quan nằm chung một shard.\
\
```bash\
PUT /orders/_doc/1?routing=customer_42\
GET /orders/_search?routing=customer_42   # chi cham 1 shard\
```\
\
Lợi ích: query chỉ chạm một shard thay vì fan-out ra tất cả, nên latency giảm rõ và cluster chịu được nhiều query đồng thời hơn. Rất hợp cho hệ multi-tenant nơi mọi query đều có `tenant_id`.\
\
Rủi ro chính là **hot shard**: một khách hàng lớn chiếm 30% dữ liệu sẽ dồn hết vào một shard, làm node đó quá tải trong khi các node khác rảnh. Cân bằng lại rất khó vì routing key đã cố định.\
\
Ràng buộc kèm theo: mọi thao tác `GET`, `update`, `delete` theo `_id` **đều phải truyền đúng routing value**, quên là không tìm thấy document. Khai báo `_routing: { required: true }` trong mapping để lỗi này lộ ra sớm thay vì âm thầm.

## Detailed Answer (EN)
By default Elasticsearch picks a shard with `hash(_id) % number_of_primary_shards`. **Custom routing** forces related documents onto the same shard.\
\
```bash\
PUT /orders/_doc/1?routing=customer_42\
GET /orders/_search?routing=customer_42   # touches one shard only\
```\
\
The gain: queries hit one shard instead of fanning out to all, so latency drops noticeably and the cluster sustains more concurrent queries. It suits multi-tenant systems where every query carries a `tenant_id`.\
\
The main risk is a **hot shard**: one large customer holding 30% of the data lands entirely on a single shard, overloading that node while others idle. Rebalancing is hard because the routing key is fixed.\
\
An accompanying constraint: every `GET`, `update` and `delete` by `_id` **must pass the same routing value**, and forgetting it means the document is not found. Declare `_routing: { required: true }` in the mapping so this fails loudly rather than silently.
