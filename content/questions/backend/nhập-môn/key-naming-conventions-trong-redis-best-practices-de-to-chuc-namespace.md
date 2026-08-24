---
id: key-naming-conventions-trong-redis-best-practices-de-to-chuc-namespace
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key naming conventions trong Redis: best practices để tổ chức namespace?

## Question (EN)
Key naming conventions in Redis: best practices for organizing namespaces?

## Đáp án chi tiết (VI)
Best practice là dùng dấu hai chấm `:` làm separator để tạo namespace hierarchy, ví dụ: `user:1001:profile`, `user:1001:session`, `product:sku:ABC123:stock`. Các rule quan trọng: dùng tên có ý nghĩa và mô tả rõ object type + identifier + attribute (ví dụ: `order:order_id:status`); tránh key quá dài (mỗi key đều tốn memory cho metadata overhead); tránh key quá ngắn khó đọc; thống nhất format trong toàn team và document lại. Dùng `SCAN` thay vì `KEYS *` khi cần tìm key theo pattern vì KEYS block Redis; `SCAN` iteration không block. Đối với hot key (một key được access cực nhiều), có thể dùng local cache hoặc key sharding (`user:1001:profile:shard:3`). Một pattern hay là thêm version vào key namespace để dễ cache invalidation hàng loạt: `v2:user:1001:profile` — khi cần invalidate tất cả, chỉ cần tăng version prefix.

## Detailed Answer (EN)
The best practice is to use colons `:` as separators to create a namespace hierarchy, e.g., `user:1001:profile`, `user:1001:session`, `product:sku:ABC123:stock`. Key rules: use descriptive names that clearly indicate object type + identifier + attribute (e.g., `order:order_id:status`); avoid overly long keys (every key incurs memory overhead for metadata); avoid overly short keys that are hard to read; agree on a consistent format across the team and document it. Use `SCAN` instead of `KEYS *` when searching for keys by pattern, since `KEYS` blocks Redis; `SCAN` is iterative and non-blocking. For hot keys (accessed extremely frequently), consider local caching or key sharding (`user:1001:profile:shard:3`). A useful pattern is adding a version to the namespace for bulk cache invalidation: `v2:user:1001:profile` — to invalidate everything, simply increment the version prefix.
