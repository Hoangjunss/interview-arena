---
id: grpc-trong-go-dung-khi-nao
position: backend
technology: web-\u0026-api
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
gRPC trong Go dùng khi nào?

## Question (EN)
When should you use gRPC in Go?

## Đáp án chi tiết (VI)
RPC framework dùng Protocol Buffers (protobuf). Nhanh hơn REST (binary encoding, HTTP/2). Dùng khi: microservices internal communication, streaming (bidirectional), cần type safety chặt. Define service trong .proto file → `protoc` generate Go code. Hỗ trợ: unary, server streaming, client streaming, bidirectional.

## Detailed Answer (EN)
gRPC is an RPC framework using Protocol Buffers (protobuf). It is faster than REST thanks to binary encoding and HTTP/2. Use it for: microservice-to-microservice communication, streaming (bidirectional), and when strong type safety is required. Define your service in a .proto file → `protoc` generates Go code. Supports: unary, server streaming, client streaming, and bidirectional streaming.
