---
id: hashmap-hoat-dong-ben-trong-nhu-the-nao
position: backend
technology: collections
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HashMap hoạt động bên trong như thế nào?

## Question (EN)
How does HashMap work internally?

## Đáp án chi tiết (VI)
Cấu trúc lõi: **mảng bucket**; entry được đặt vào bucket theo `hash(key) \u0026 (n - 1)` (n = capacity, luôn là lũy thừa của 2).\
\
**`put(key, value)`:**\
1. Tính hash từ `hashCode()` của key (JDK trộn thêm bit cao để giảm collision).\
2. Định vị bucket. Bucket trống → đặt node mới.\
3. Bucket đã có node → **collision**: duyệt so `equals()` — trùng key thì ghi đè value, không trùng thì nối vào **linked list** của bucket.\
\
**Treeify (Java 8+):** list trong 1 bucket dài quá **8** (và mảng ≥ 64) → chuyển thành **red-black tree** → lookup worst case từ O(n) xuống O(log n) — chống cả tấn công hash collision.\
\
**Resize:** số entry vượt `capacity × load factor` (default **0.75**) → nhân đôi mảng, phân bổ lại entry.\
\
**Hệ quả thực dụng:** key phải override đúng cặp `hashCode()`/`equals()` (xem câu contract) và **nên immutable** — key bị sửa làm đổi hashCode sau khi put thì entry \\"biến mất\\" (nằm sai bucket, không tìm lại được).

## Detailed Answer (EN)
$82
