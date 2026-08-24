---
id: deadlock-la-gi-do-dau-va-lam-sao-tranh
position: backend
technology: locking
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deadlock là gì, do đâu và làm sao tránh?

## Question (EN)
What is a deadlock, what causes it and how do you avoid it?

## Đáp án chi tiết (VI)
Deadlock xảy ra khi hai (hoặc nhiều) transaction **chờ khóa của nhau theo vòng tròn**, không ai tiến được. Ví dụ kinh điển:\
- T1 khóa hàng A rồi xin khóa hàng B.\
- T2 khóa hàng B rồi xin khóa hàng A.\
→ Cả hai chờ mãi.\
\
DB (như PostgreSQL) có **bộ phát hiện deadlock**: khi thấy vòng chờ, nó **hủy một transaction** (nạn nhân) với lỗi, transaction kia đi tiếp; app phải bắt lỗi và **retry**.\
\
Cách giảm/tránh:\
- **Khóa tài nguyên theo thứ tự nhất quán** ở mọi nơi (luôn A trước B) → phá vòng chờ.\
- **Giữ transaction ngắn**, chạm ít hàng, commit sớm.\
- Giảm phạm vi/độ lâu của khóa; cân nhắc isolation level phù hợp.\
- Chuẩn bị **retry** cho lỗi deadlock/serialization thay vì coi là fatal.

## Detailed Answer (EN)
A deadlock happens when two (or more) transactions **wait for each other's locks in a cycle**, so none can proceed. Classic example:\
- T1 locks row A then requests row B.\
- T2 locks row B then requests row A.\
→ Both wait forever.\
\
A DB like PostgreSQL has a **deadlock detector**: on spotting a wait cycle it **aborts one transaction** (the victim) with an error, letting the other proceed; the app must catch it and **retry**.\
\
How to reduce/avoid:\
- **Acquire resources in a consistent order** everywhere (always A before B) → breaks the cycle.\
- **Keep transactions short**, touch few rows, commit early.\
- Reduce lock scope/duration; pick an appropriate isolation level.\
- Be ready to **retry** on deadlock/serialization errors instead of treating them as fatal.
