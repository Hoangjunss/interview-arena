---
id: event-sourcing-la-gi-khac-gi-voi-luu-trang-thai-hien-tai
position: system-design
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event sourcing là gì? Khác gì với lưu trạng thái hiện tại?

## Question (EN)
What is event sourcing and how does it differ from storing current state?

## Đáp án chi tiết (VI)
Thay vì chỉ lưu **trạng thái hiện tại** (và ghi đè khi thay đổi), event sourcing lưu **toàn bộ chuỗi sự kiện** đã làm thay đổi trạng thái, theo thứ tự. Trạng thái hiện tại được **tái dựng bằng cách replay** các event từ đầu.\
\
Ví dụ tài khoản: thay vì `balance = 120`, ta lưu `Deposited 100`, `Deposited 50`, `Withdrew 30`.\
\
Ưu điểm:\
- **Audit log đầy đủ**, không mất lịch sử; truy vấn được \\"trạng thái tại thời điểm T\\" (temporal query).\
- Tái dựng/replay để sửa lỗi, tạo read model mới, debug.\
- Hợp tự nhiên với event-driven và **CQRS**.\
\
Đánh đổi:\
- **Phức tạp** hơn nhiều; replay lâu → cần **snapshot** định kỳ.\
- **Versioning schema của event** khó; eventual consistency; truy vấn trạng thái hiện tại cần projection riêng.

## Detailed Answer (EN)
Instead of storing only the **current state** (overwriting on change), event sourcing stores the **full sequence of events** that changed the state, in order. Current state is **rebuilt by replaying** the events from the start.\
\
Account example: instead of `balance = 120`, store `Deposited 100`, `Deposited 50`, `Withdrew 30`.\
\
Pros:\
- A **complete audit log**, no lost history; you can query \\"state at time T\\" (temporal queries).\
- Rebuild/replay to fix bugs, build new read models, debug.\
- Fits naturally with event-driven and **CQRS**.\
\
Trade-offs:\
- Much **more complex**; long replays → need periodic **snapshots**.\
- **Event schema versioning** is hard; eventual consistency; querying current state needs a separate projection.
