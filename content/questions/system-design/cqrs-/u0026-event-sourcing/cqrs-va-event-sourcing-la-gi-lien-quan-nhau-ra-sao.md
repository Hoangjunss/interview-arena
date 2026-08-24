---
id: cqrs-va-event-sourcing-la-gi-lien-quan-nhau-ra-sao
position: system-design
technology: cqrs-\u0026-event-sourcing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CQRS và Event Sourcing là gì? Liên quan nhau ra sao?

## Question (EN)
What are CQRS and Event Sourcing, and how do they relate?

## Đáp án chi tiết (VI)
**CQRS** (Command Query Responsibility Segregation): tách **model ghi** (command — thay đổi trạng thái) khỏi **model đọc** (query). Cho phép tối ưu riêng — ghi chuẩn hóa, đọc denormalized/replica — và scale đọc/ghi độc lập. Đổi lại: phức tạp hơn và thường **eventual consistency** giữa hai phía.\
\
**Event Sourcing**: thay vì lưu **trạng thái hiện tại**, lưu **chuỗi sự kiện bất biến** dẫn tới trạng thái đó; trạng thái = replay các event. Lợi: audit log đầy đủ, xem lại quá khứ, rebuild view. Đổi lại: query trạng thái hiện tại khó hơn, phải xử lý versioning cho schema event.\
\
Hai mẫu **hay đi cùng nhưng độc lập**: event là nguồn ghi, CQRS dựng các read-model (projection) từ event. Chỉ dùng khi domain thực sự cần — đừng mặc định áp cho CRUD thường.

## Detailed Answer (EN)
**CQRS** (Command Query Responsibility Segregation): separate the **write model** (commands — state changes) from the **read model** (queries). This lets you optimize each independently — normalized writes, denormalized/replica reads — and scale reads/writes separately. The cost: more complexity and usually **eventual consistency** between the two sides.\
\
**Event Sourcing**: instead of storing **current state**, store the **immutable sequence of events** that led to it; state = replaying the events. Benefits: full audit log, time-travel, rebuildable views. The cost: querying current state is harder, and you must handle event-schema versioning.\
\
The two patterns **often pair but are independent**: events are the source of writes, and CQRS builds read-models (projections) from them. Use only when the domain truly needs it — do not default to it for ordinary CRUD.
