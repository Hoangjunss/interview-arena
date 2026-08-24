---
id: what-is-observability
position: devops
technology: monitoring-observability
level: junior
tags: [observability, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observability là gì và khác gì với monitoring truyền thống? Vì sao các hệ thống microservices hiện đại cần observability thay vì chỉ monitoring?

## Question (EN)
What is observability, and how does it differ from traditional monitoring? Why do modern microservices systems need observability rather than just monitoring?

## Đáp án chi tiết (VI)
**Monitoring** là việc theo dõi một tập hợp các chỉ số/điều kiện đã biết trước (dashboard, alert cho CPU cao, disk đầy...) — trả lời được câu hỏi "hệ thống có đang gặp vấn đề đã biết trước không?".

**Observability** là khả năng **suy luận ra trạng thái nội bộ của hệ thống chỉ từ dữ liệu output bên ngoài** (metrics, logs, traces) — trả lời được cả những câu hỏi **chưa từng nghĩ tới trước đó**, ví dụ "tại sao chỉ user ở region Singapore, dùng app version 2.3, gọi API lúc 14:00-14:05 bị lỗi 502?".

**Khác biệt cốt lõi**:

| | Monitoring | Observability |
|---|---|---|
| Cách tiếp cận | Dashboard/alert định sẵn cho các failure mode đã biết | Khả năng đặt câu hỏi tùy ý (ad-hoc query) trên dữ liệu |
| Phù hợp với | Hệ thống monolith, ít thay đổi | Microservices, hệ thống phân tán, thay đổi liên tục |
| Câu hỏi trả lời | "Có đang down không?" | "Tại sao chỉ nhóm user này bị chậm?" |
| Yêu cầu dữ liệu | Aggregated metrics là đủ | Cần high-cardinality data (structured logs, traces, exemplars) |

**Vì sao microservices cần observability**:
- Với monolith, phần lớn lỗi có thể dự đoán trước (CPU, memory, disk) → monitoring truyền thống đủ dùng.
- Với microservices, một request đi qua hàng chục service, lỗi có thể phát sinh từ tổ hợp bất kỳ (network, retry storm, một phiên bản deploy cụ thể, một tenant cụ thể) — không thể liệt kê hết trước để làm dashboard/alert cho từng trường hợp.
- Observability cho phép engineer **debug được sự cố chưa từng gặp** bằng cách drill-down từ metric bất thường → trace liên quan → log chi tiết, thay vì phải đoán trước và chuẩn bị dashboard cho mọi khả năng.

**Ví dụ thực tế**: Thay vì chỉ có alert "error rate > 5%", một hệ thống observable cho phép query: "trong số các lỗi 500 hôm nay, bao nhiêu % đến từ client version cũ hơn 1.2, và trace của chúng có điểm chung gì?" — đây là câu hỏi không thể trả lời nếu chỉ có dashboard cố định, cần khả năng query linh hoạt trên dữ liệu có cardinality cao (ví dụ dùng exemplars nối metric với trace, hoặc structured logs có thể filter theo field bất kỳ).

**Pitfall**: nhiều team nghĩ "có Grafana + Prometheus là có observability" — thực ra đó vẫn là monitoring nếu chỉ dùng dashboard cố định. Observability đòi hỏi văn hóa và công cụ cho phép **query ad-hoc**, không chỉ xem dashboard đã dựng sẵn.

## Detailed Answer (EN)
**Monitoring** watches a predefined set of known metrics/conditions (dashboards, alerts for high CPU, full disk...) — it answers "is the system experiencing a problem we already anticipated?"

**Observability** is the ability to **infer a system's internal state purely from its external output data** (metrics, logs, traces) — it can answer questions **you never anticipated**, e.g. "why are only users in the Singapore region, on app version 2.3, calling the API between 14:00-14:05, getting 502 errors?"

**Core difference**:

| | Monitoring | Observability |
|---|---|---|
| Approach | Predefined dashboards/alerts for known failure modes | Ability to ask arbitrary (ad-hoc) questions of the data |
| Fits | Monoliths, infrequently changing systems | Microservices, distributed systems, constant change |
| Answers | "Is it down?" | "Why is only this user segment slow?" |
| Data needs | Aggregated metrics suffice | Needs high-cardinality data (structured logs, traces, exemplars) |

**Why microservices need observability**:
- In a monolith, most failure modes are predictable (CPU, memory, disk) — traditional monitoring is enough.
- In microservices, a single request crosses dozens of services; failures can arise from any combination (network, retry storms, a specific deploy version, a specific tenant) — you cannot enumerate every case in advance to build a dashboard/alert for it.
- Observability lets engineers **debug incidents they've never seen before** by drilling down from an anomalous metric → the related trace → the detailed log, instead of having to predict and pre-build a dashboard for every possibility.

**Concrete example**: instead of only having an "error rate > 5%" alert, an observable system lets you query: "of today's 500 errors, what % came from client versions older than 1.2, and what do their traces have in common?" — this can't be answered with a fixed dashboard; it requires flexible querying over high-cardinality data (e.g. exemplars linking metrics to traces, or structured logs filterable on any field).

**Pitfall**: many teams think "we have Grafana + Prometheus, so we have observability" — that's still just monitoring if you only look at pre-built dashboards. Observability requires the culture and tooling to support **ad-hoc queries**, not just viewing dashboards someone already built.
