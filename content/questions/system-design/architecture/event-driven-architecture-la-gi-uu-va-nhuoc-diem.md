---
id: event-driven-architecture-la-gi-uu-va-nhuoc-diem
position: system-design
technology: architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event-driven architecture là gì? Ưu và nhược điểm?

## Question (EN)
What is event-driven architecture and what are its pros and cons?

## Đáp án chi tiết (VI)
Kiến trúc trong đó các thành phần giao tiếp bằng **event** (sự kiện đã xảy ra, ví dụ `OrderPlaced`) qua một event broker, thay vì gọi trực tiếp lẫn nhau. Producer **phát** event mà **không biết ai tiêu thụ**.\
\
Ưu điểm:\
- **Decoupling mạnh** → dễ thêm consumer mới mà không đụng producer.\
- **Co giãn và chịu tải** tốt nhờ xử lý bất đồng bộ, buffer qua broker.\
- Hợp với **real-time**, tích hợp nhiều hệ.\
\
Nhược điểm:\
- **Khó theo dõi luồng** (flow ẩn qua event) → debug/trace khó, cần observability tốt.\
- Chỉ **eventual consistency**; phải xử lý message trùng/thứ tự.\
- Độ phức tạp vận hành cao hơn gọi trực tiếp.\
\
Các biến thể: event notification, event-carried state transfer, và **event sourcing**.

## Detailed Answer (EN)
An architecture where components communicate through **events** (something that happened, e.g. `OrderPlaced`) via an event broker, instead of calling each other directly. A producer **emits** events **without knowing who consumes** them.\
\
Pros:\
- **Strong decoupling** → add new consumers without touching producers.\
- **Elastic and load-tolerant** thanks to async processing and broker buffering.\
- Fits **real-time** and multi-system integration.\
\
Cons:\
- **Hard-to-follow flow** (logic hides in events) → tricky debugging/tracing, needs good observability.\
- Only **eventual consistency**; must handle duplicate/out-of-order messages.\
- Higher operational complexity than direct calls.\
\
Variants: event notification, event-carried state transfer, and **event sourcing**.
