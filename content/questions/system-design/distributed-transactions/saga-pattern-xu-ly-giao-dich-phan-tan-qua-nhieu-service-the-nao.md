---
id: saga-pattern-xu-ly-giao-dich-phan-tan-qua-nhieu-service-the-nao
position: system-design
technology: distributed-transactions
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Saga pattern xử lý giao dịch phân tán qua nhiều service thế nào?

## Question (EN)
How does the saga pattern handle distributed transactions across services?

## Đáp án chi tiết (VI)
Khi một giao dịch trải qua **nhiều microservice** (mỗi service một DB riêng), không thể dùng một transaction ACID chung. **Two-phase commit** thì khóa lâu, kém sẵn sàng, ít dùng.\
\
**Saga** chia giao dịch thành **chuỗi local transaction** ở từng service; sau mỗi bước thành công thì kích hoạt bước kế. Nếu một bước lỗi, saga chạy các **compensating transaction** để **hoàn tác** các bước đã thành công (ví dụ đã trừ kho → cộng lại kho).\
\
Hai kiểu điều phối:\
- **Choreography**: các service phản ứng với event của nhau, không có bộ điều phối trung tâm — đơn giản, nhưng luồng khó theo dõi khi nhiều bước.\
- **Orchestration**: một **orchestrator** trung tâm ra lệnh từng bước và xử lý bù trừ — dễ quản lý/quan sát hơn, nhưng thêm một thành phần.\
\
Đặc điểm: chỉ **eventual consistency**, không cô lập như ACID → cần thiết kế bước bù trừ và xử lý idempotency cẩn thận.

## Detailed Answer (EN)
When a transaction spans **multiple microservices** (each with its own DB), you cannot use one shared ACID transaction. **Two-phase commit** locks for long, hurts availability, and is rarely used.\
\
A **saga** splits the transaction into a **sequence of local transactions** in each service; each success triggers the next step. If a step fails, the saga runs **compensating transactions** to **undo** the completed steps (e.g. stock was decremented → add it back).\
\
Two coordination styles:\
- **Choreography**: services react to each other's events, no central coordinator — simple, but the flow is hard to follow with many steps.\
- **Orchestration**: a central **orchestrator** drives each step and handles compensation — easier to manage/observe, but adds a component.\
\
Characteristics: only **eventual consistency**, no ACID isolation → design compensations and idempotency carefully.
