---
id: cqrs-la-gi-va-khi-nao-nen-dung
position: system-design
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CQRS là gì và khi nào nên dùng?

## Question (EN)
What is CQRS and when should you use it?

## Đáp án chi tiết (VI)
CQRS (Command Query Responsibility Segregation) = **tách mô hình ghi (command)** khỏi **mô hình đọc (query)** thay vì dùng chung một model cho cả hai.\
\
- **Command side**: xử lý thay đổi trạng thái, tối ưu cho tính đúng đắn/nghiệp vụ.\
- **Query side**: đọc từ model/kho **được tối ưu riêng cho đọc** (denormalized, precomputed), có thể là DB khác.\
- Hai bên thường đồng bộ qua event → **eventual consistency** giữa ghi và đọc.\
\
Khi nào dùng:\
- Tỉ lệ **đọc/ghi rất lệch** và nhu cầu đọc phức tạp/đa dạng cần scale riêng.\
- Domain phức tạp, hay đi cùng **event sourcing**.\
\
Cảnh báo (theo Fowler): CQRS thêm **độ phức tạp đáng kể**; **đừng dùng cho toàn hệ** — chỉ áp cho bounded context thực sự cần. Với CRUD đơn giản thì lợi bất cập hại.

## Detailed Answer (EN)
CQRS (Command Query Responsibility Segregation) = **separate the write model (commands)** from the **read model (queries)** instead of using one model for both.\
\
- **Command side**: handles state changes, optimized for correctness/business rules.\
- **Query side**: reads from a **read-optimized** model/store (denormalized, precomputed), possibly a different DB.\
- The two are usually synced via events → **eventual consistency** between write and read.\
\
When to use:\
- A very **skewed read/write ratio** and complex/varied read needs that must scale separately.\
- Complex domains, often alongside **event sourcing**.\
\
Caveat (per Fowler): CQRS adds **significant complexity**; **do not apply it system-wide** — only to bounded contexts that truly need it. For simple CRUD it does more harm than good.
