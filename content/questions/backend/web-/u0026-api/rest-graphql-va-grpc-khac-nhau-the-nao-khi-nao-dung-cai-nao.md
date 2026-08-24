---
id: rest-graphql-va-grpc-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: web-\u0026-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
REST, GraphQL và gRPC khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do REST, GraphQL, and gRPC differ? When should you use each?

## Đáp án chi tiết (VI)
REST dùng HTTP verbs (GET/POST/PUT/DELETE) + URL resources, stateless, dễ cache, phổ biến nhất — phù hợp CRUD APIs đơn giản, public APIs, mobile apps.\
\
GraphQL cho phép client chỉ định chính xác data cần lấy qua query language, giải quyết over-fetching/under-fetching của REST, có single endpoint — phù hợp khi nhiều client (web/mobile) cần data shapes khác nhau, hoặc data graph phức tạp.\
\
gRPC dùng Protocol Buffers (binary, nhỏ hơn JSON ~3-5x), HTTP/2 multiplexing, strongly-typed contracts, hỗ trợ streaming bidirectional — phù hợp microservices internal communication, khi performance critical.\
\
Trong thực tế: public-facing API thường dùng REST; BFF (Backend for Frontend) hoặc dashboard phức tạp hỏi dùng GraphQL (Shopify, GitHub); service mesh nội bộ dùng gRPC (Google, Netflix).

## Detailed Answer (EN)
REST uses HTTP verbs (GET/POST/PUT/DELETE) with URL-based resources, is stateless, easy to cache, and the most widely adopted — ideal for simple CRUD APIs, public APIs, and mobile apps.\
\
GraphQL lets clients specify exactly the data they need via a query language, solving REST's over-fetching and under-fetching problems through a single endpoint — great when multiple clients (web/mobile) need different data shapes or when dealing with a complex data graph.\
\
gRPC uses Protocol Buffers (binary format, ~3-5x smaller than JSON), HTTP/2 multiplexing, strongly-typed contracts, and bidirectional streaming — best for internal microservice communication where performance is critical.\
\
In practice: public-facing APIs typically use REST; complex dashboards or BFF (Backend for Frontend) layers often use GraphQL (Shopify, GitHub); internal service meshes use gRPC (Google, Netflix).
