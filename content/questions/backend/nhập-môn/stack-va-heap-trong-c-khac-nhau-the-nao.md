---
id: stack-va-heap-trong-c-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stack và Heap trong C++ khác nhau thế nào?

## Question (EN)
What is the difference between stack and heap memory in C++?

## Đáp án chi tiết (VI)
**Stack:** vùng nhớ tĩnh, cấp phát tự động khi hàm được gọi, giải phóng khi hàm trả về. Truy cập nhanh, kích thước hạn chế (thường vài MB).\
\
**Heap:** vùng nhớ động, cấp phát qua `new`/`malloc`, phải giải phóng thủ công bằng `delete`/`free`. Kích thước lớn hơn nhưng truy cập chậm hơn và dễ bị memory leak.\
\
Hình dung: stack như chồng khay cafeteria — LIFO tự động; heap như kho chứa — lấy gì tự quản lý chỗ để.

## Detailed Answer (EN)
**Stack:** static memory, automatically allocated when a function is called and freed when it returns. Fast access, limited size (typically a few MB).\
\
**Heap:** dynamic memory, allocated via `new`/`malloc` and must be manually freed with `delete`/`free`. Larger but slower and prone to memory leaks.\
\
Mental model: stack is like a cafeteria tray stack — LIFO, automatic; heap is like a storage room — you take something, you manage where it goes.
