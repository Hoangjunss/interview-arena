---
id: distributed-tracing-la-gi-span-va-trace-khac-nhau-the-nao
position: backend
technology: observability
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Distributed tracing là gì? Span và trace khác nhau thế nào?

## Question (EN)
What is distributed tracing, and how do spans and traces differ?

## Đáp án chi tiết (VI)
Distributed tracing **theo dấu một request khi nó đi qua nhiều service** trong hệ phân tán, để thấy **toàn bộ hành trình** và tìm **điểm chậm/lỗi**. Đây là trụ cột giải quyết câu hỏi \\"request chậm ở đâu?\\" — điều mà log và metric rời rạc khó chỉ ra.\
\
Khái niệm cốt lõi:\
- **Span**: **một đơn vị công việc** — vd một lời gọi service, một truy vấn DB — có thời gian bắt đầu/kết thúc và metadata (tên, trạng thái, tag). Span có thể lồng nhau (cha–con).\
- **Trace**: **cây các span** thuộc **cùng một request**, nối với nhau bằng một **trace id** chung. Nhìn vào trace thấy được thời gian tiêu tốn ở từng chặng.\
- **Context propagation**: truyền **trace id + span id** qua **header** giữa các service để nối các span lại.\
\
**OpenTelemetry** chuẩn hóa việc **sinh và xuất** trace (cũng như metric/log), gửi tới backend như **Jaeger, Tempo, Zipkin**. Cùng với logs và metrics, traces là một trong **ba trụ cột observability**.

## Detailed Answer (EN)
Distributed tracing **follows a request as it travels through many services** in a distributed system, to see the **whole journey** and find **slow spots/failures**. It is the pillar answering \\"where is the request slow?\\" — which scattered logs and metrics struggle to show.\
\
Core concepts:\
- **Span**: **one unit of work** — e.g. a service call, a DB query — with a start/end time and metadata (name, status, tags). Spans can nest (parent–child).\
- **Trace**: the **tree of spans** for **one request**, linked by a shared **trace id**. Looking at a trace shows the time spent at each hop.\
- **Context propagation**: passing the **trace id + span id** via **headers** between services to link spans together.\
\
**OpenTelemetry** standardizes how traces (and metrics/logs) are **generated and exported**, sending them to backends like **Jaeger, Tempo, Zipkin**. Together with logs and metrics, traces are one of the **three pillars of observability**.
