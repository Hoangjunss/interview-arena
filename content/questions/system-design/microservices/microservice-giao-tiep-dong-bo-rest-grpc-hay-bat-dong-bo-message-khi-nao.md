---
id: microservice-giao-tiep-dong-bo-rest-grpc-hay-bat-dong-bo-message-khi-nao
position: system-design
technology: microservices
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microservice giao tiếp đồng bộ (REST/gRPC) hay bất đồng bộ (message) khi nào?

## Question (EN)
When should microservices communicate synchronously (REST/gRPC) vs asynchronously (messaging)?

## Đáp án chi tiết (VI)
- **Đồng bộ (request/response)** — REST hoặc **gRPC**: gọi trực tiếp và **chờ phản hồi**. Đơn giản, hợp khi cần kết quả ngay (đọc dữ liệu, xác thực). gRPC nhanh hơn REST (HTTP/2, protobuf, streaming). Nhược điểm: **coupling theo thời gian** — callee chậm/chết thì caller bị ảnh hưởng → cần timeout, retry, circuit breaker.\
- **Bất đồng bộ (message/event)** qua broker (Kafka, RabbitMQ): producer **phát rồi đi tiếp**, không chờ. Ưu: **decoupling mạnh**, chịu tải đột biến (buffer), một consumer chết không chặn producer, dễ fan-out. Nhược: chỉ **eventual consistency**, khó theo dõi luồng, phải xử lý message trùng.\
\
Quy tắc: cần **trả lời tức thì cho user** → đồng bộ; **fire-and-forget, tác vụ nền, nhiều bên tiêu thụ, chịu tải** → bất đồng bộ. Nhiều hệ dùng cả hai tùy luồng.

## Detailed Answer (EN)
- **Synchronous (request/response)** — REST or **gRPC**: call directly and **wait for a response**. Simple, fits when you need the result now (reading data, auth). gRPC is faster than REST (HTTP/2, protobuf, streaming). Downside: **temporal coupling** — a slow/dead callee affects the caller → need timeouts, retries, circuit breakers.\
- **Asynchronous (message/event)** via a broker (Kafka, RabbitMQ): the producer **emits and moves on** without waiting. Pros: **strong decoupling**, spike tolerance (buffering), a dead consumer does not block the producer, easy fan-out. Cons: only **eventual consistency**, harder-to-follow flow, must handle duplicate messages.\
\
Rule: need an **immediate answer for the user** → synchronous; **fire-and-forget, background work, many consumers, load tolerance** → asynchronous. Many systems use both, per flow.
