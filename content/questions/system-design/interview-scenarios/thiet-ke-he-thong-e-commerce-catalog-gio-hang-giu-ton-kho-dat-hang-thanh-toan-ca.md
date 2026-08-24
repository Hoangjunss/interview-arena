---
id: thiet-ke-he-thong-e-commerce-catalog-gio-hang-giu-ton-kho-dat-hang-thanh-toan-ca
position: system-design
technology: interview-scenarios
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế hệ thống e-commerce (catalog, giỏ hàng, giữ tồn kho, đặt hàng/thanh toán). Các thành phần và điểm nghẽn chính là gì?

## Question (EN)
Design an e-commerce system (catalog, cart, inventory reservation, order/checkout). What are the key components and bottlenecks?

## Đáp án chi tiết (VI)
**Yêu cầu**: duyệt/tìm sản phẩm nhanh, giỏ hàng bền, không bán vượt tồn kho (oversell), checkout tin cậy.\
\
**Thành phần chính**:\
- **Catalog service**: DB sản phẩm + search index (Elasticsearch); đọc nhiều nên đặt cache + CDN cho ảnh.\
- **Cart service**: lưu theo user, thường trên Redis (nhanh, TTL để dọn giỏ bỏ quên).\
- **Inventory service**: *đặt-giữ* (reserve) tồn kho khi vào checkout với TTL, xác nhận khi thanh toán xong, nhả nếu hết hạn. Chống oversell bằng atomic decrement / conditional update.\
- **Order service**: tạo order theo state machine (`pending → paid → fulfilled`).\
- **Payment**: gọi cổng thanh toán bất đồng bộ; dùng *idempotency key* để không trừ tiền hai lần.\
- **Async**: message queue (Kafka) cho email, analytics, trừ kho cuối.\
\
**Đánh đổi / bottleneck**: inventory là điểm tranh chấp cao nhất (flash sale) → dễ nghẽn khóa DB; tách đọc (catalog, eventual) khỏi ghi (order, strong) để scale riêng; dùng saga cho giao dịch trải qua nhiều service.

## Detailed Answer (EN)
$7a
