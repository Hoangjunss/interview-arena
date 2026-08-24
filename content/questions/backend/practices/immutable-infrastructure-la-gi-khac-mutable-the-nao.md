---
id: immutable-infrastructure-la-gi-khac-mutable-the-nao
position: backend
technology: practices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Immutable infrastructure là gì? Khác mutable thế nào?

## Question (EN)
What is immutable infrastructure and how does it differ from mutable?

## Đáp án chi tiết (VI)
Immutable infrastructure: một khi server/instance đã **triển khai thì không sửa tại chỗ nữa**. Muốn thay đổi (update, patch, đổi config) thì **build image mới rồi thay thế** hoàn toàn instance cũ, không SSH vào chỉnh.\
\
Đối lập là **mutable** (server truyền thống): vá và cập nhật **tại chỗ** qua thời gian → dễ sinh **config drift** (mỗi máy một khác), khó tái tạo, khó debug (\\"sao chỉ máy này lỗi?\\").\
\
Lợi ích của immutable:\
- **Nhất quán**: mọi instance từ cùng một image → không drift.\
- **Deploy/rollback tin cậy**: rollback = quay lại image cũ; hợp blue-green/canary.\
- **Tái tạo được** và dễ scale ngang (tạo nhiều bản y hệt).\
\
Đánh đổi: cần pipeline build image + IaC, dữ liệu **stateful phải tách ra ngoài** (DB, volume, object storage). Liên quan tới **Phoenix Server** (thà dựng lại từ đầu còn hơn vá). Container và AMI-based deploy là hiện thân phổ biến.

## Detailed Answer (EN)
Immutable infrastructure: once a server/instance is **deployed, it is never modified in place**. To change anything (update, patch, config) you **build a new image and replace** the old instance entirely — no SSH-in tweaks.\
\
The opposite is **mutable** (traditional servers): patched and updated **in place** over time → prone to **config drift** (each machine differs), hard to reproduce, hard to debug (\\"why only this box?\\").\
\
Benefits of immutable:\
- **Consistency**: every instance from the same image → no drift.\
- **Reliable deploy/rollback**: rollback = revert to a previous image; fits blue-green/canary.\
- **Reproducible** and easy to scale horizontally (spin up identical copies).\
\
Trade-offs: it needs an image-build pipeline + IaC, and **stateful data must live externally** (DB, volumes, object storage). Related to the **Phoenix Server** idea (rebuild rather than patch). Containers and AMI-based deploys are common embodiments.
