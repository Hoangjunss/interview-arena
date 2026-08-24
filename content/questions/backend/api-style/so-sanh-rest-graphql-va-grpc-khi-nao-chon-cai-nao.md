---
id: so-sanh-rest-graphql-va-grpc-khi-nao-chon-cai-nao
position: backend
technology: api-style
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh REST, GraphQL và gRPC — khi nào chọn cái nào?

## Question (EN)
Compare REST, GraphQL, and gRPC — when to choose each?

## Đáp án chi tiết (VI)
- **REST**: nhiều endpoint theo tài nguyên, thường trả JSON trên HTTP (không phụ thuộc phiên bản HTTP cụ thể). Đơn giản, cache HTTP tốt, phổ biến rộng rãi. Điểm yếu: hay **over-fetch/under-fetch** (trả dư hoặc thiếu field, phải gọi nhiều lần).\
- **GraphQL**: một endpoint, client tự khai báo cần đúng field nào → loại bỏ over/under-fetch, hợp UI phức tạp/nhiều nguồn. Đổi lại: khó cache HTTP, dễ query nặng, cần chống N+1 phía server.\
- **gRPC**: RPC nhị phân trên **HTTP/2 + Protocol Buffers**, có contract chặt và streaming hai chiều. Nhanh, nhẹ, hợp **giao tiếp service-to-service nội bộ**; nhưng browser gọi trực tiếp khó, payload nhị phân khó kiểm tra trực tiếp.

## Detailed Answer (EN)
- **REST**: many resource endpoints, usually JSON over HTTP (not tied to any specific HTTP version). Simple, great HTTP caching, universally known. Weakness: **over-/under-fetching** (returning too much/too little, needing multiple round-trips).\
- **GraphQL**: a single endpoint where the client declares exactly which fields it needs → removes over/under-fetch, fits complex UIs aggregating many sources. Costs: hard HTTP caching, easy to write heavy queries, and you must guard against N+1 on the server.\
- **gRPC**: binary RPC over **HTTP/2 + Protocol Buffers**, strict contract and bidirectional streaming. Fast and compact, ideal for **internal service-to-service** calls; but hard to call directly from browsers and hard to inspect by eye.
