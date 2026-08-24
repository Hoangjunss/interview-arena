---
id: grpc-va-minimal-apis-khac-nhau-nhu-the-nao-khi-dung-cho-giao-tiep-giua-cac-servi
position: backend
technology: modern-.net
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
gRPC và Minimal APIs khác nhau như thế nào khi dùng cho giao tiếp giữa các service?

## Question (EN)
How do gRPC and Minimal APIs differ for inter-service communication?

## Đáp án chi tiết (VI)
gRPC dùng HTTP/2 với binary serialization (Protocol Buffers); Minimal APIs dùng REST với JSON text. gRPC: nhanh hơn, tốn băng thông ít hơn, hỗ trợ streaming thực sự (server, client, bidirectional). REST: đơn giản hơn, browser-friendly, tooling phổ biến. Chọn gRPC cho backend-to-backend hiệu năng cao; dùng REST cho public API và browser client. .NET 8+ hỗ trợ cả hai tốt như nhau. Quyết định dựa trên yêu cầu về latency, băng thông và client đích.

## Detailed Answer (EN)
gRPC uses HTTP/2 binary serialization (Protocol Buffers); Minimal APIs use REST with JSON. gRPC offers faster throughput, lower bandwidth usage, and true streaming support (server, client, bidirectional). REST is simpler, browser-friendly, and uses standard tooling. Choose gRPC for high-performance backend-to-backend communication; use REST for public APIs and browser clients. .NET 8+ supports both equally well. Decision depends on latency, bandwidth, and target client requirements.
