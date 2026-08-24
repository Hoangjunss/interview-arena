---
id: vi-sao-khong-duoc-de-trinh-duyet-goi-thang-vao-elasticsearch
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không được để trình duyệt gọi thẳng vào Elasticsearch?

## Question (EN)
Why must a browser never call Elasticsearch directly?

## Đáp án chi tiết (VI)
Vì credential nằm trong JavaScript là **lộ cho mọi người**, và query DSL đủ mạnh để một người tò mò đọc hết dữ liệu hoặc làm sập cluster.\
\
Các việc kẻ tấn công làm được khi endpoint mở:\
- Query sang index khác (`GET /_all/_search`), đọc dữ liệu nhạy cảm.\
- Gửi aggregation nặng hoặc `size: 100000` để làm cluster OOM.\
- `DELETE /products` nếu credential có quyền ghi.\
\
Kiến trúc đúng: **backend làm proxy**, nhận tham số đã ràng buộc từ client rồi tự dựng query DSL, kèm giới hạn `size`, timeout và rate limit.\
\
```text\
browser -\u003e API cua ban (auth + validate + build DSL) -\u003e Elasticsearch (private network)\
```\
\
Ở tầng cluster nên có thêm: bật security và TLS, tạo role read-only theo từng index, và **không bao giờ để cluster nghe trên IP public**.\
\
Số vụ lộ dữ liệu do Elasticsearch mở public rất nhiều và gần như đều cùng một nguyên nhân: cluster demo được bật lên nhanh rồi trở thành production mà không ai bật lại security.

## Detailed Answer (EN)
Because credentials in JavaScript are **exposed to everyone**, and the query DSL is powerful enough for a curious visitor to read all your data or take the cluster down.\
\
What an attacker can do against an open endpoint:\
- Query other indices (`GET /_all/_search`) and read sensitive data.\
- Send heavy aggregations or `size: 100000` to OOM the cluster.\
- `DELETE /products` if the credential has write access.\
\
The correct architecture: **your backend proxies**, taking constrained parameters from the client and building the DSL itself, with `size` caps, timeouts and rate limiting.\
\
```text\
browser -\u003e your API (auth + validate + build DSL) -\u003e Elasticsearch (private network)\
```\
\
At the cluster level add: enable security and TLS, create per-index read-only roles, and **never bind the cluster to a public IP**.\
\
Publicly exposed Elasticsearch is behind a long list of breaches, almost always from the same cause: a demo cluster spun up quickly that became production with security never turned back on.
