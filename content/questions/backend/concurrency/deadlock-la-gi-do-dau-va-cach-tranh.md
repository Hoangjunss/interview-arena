---
id: deadlock-la-gi-do-dau-va-cach-tranh
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deadlock là gì, do đâu và cách tránh?

## Question (EN)
What is a deadlock, what causes it, and how do you avoid it?

## Đáp án chi tiết (VI)
Deadlock xảy ra khi hai (hoặc nhiều) transaction **chờ khóa của nhau theo vòng**: T1 giữ khóa A và xin B, T2 giữ khóa B và xin A → cả hai kẹt vĩnh viễn.\
\
**Nguyên nhân** điển hình: các transaction khóa **cùng tập bản ghi nhưng theo thứ tự khác nhau**; giữ khóa quá lâu; nâng cấp khóa (đọc rồi mới ghi).\
\
**Cách tránh**:\
- **Khóa theo thứ tự nhất quán**: mọi transaction luôn khóa tài nguyên theo cùng một trình tự (vd tăng dần theo id).\
- **Transaction ngắn**: làm ít việc, commit sớm, giảm thời gian giữ khóa.\
- Giảm phạm vi khóa; cân nhắc **optimistic locking** cho contention cao.\
\
DB (như PostgreSQL) tự **phát hiện deadlock** và hủy một transaction làm nạn nhân (trả lỗi) → app cần **bắt lỗi và retry**.

## Detailed Answer (EN)
A deadlock happens when two (or more) transactions **wait on each other's locks in a cycle**: T1 holds lock A and wants B, T2 holds B and wants A → both stuck forever.\
\
Typical **causes**: transactions locking the **same set of rows but in different orders**; holding locks too long; lock upgrades (read then write).\
\
**How to avoid**:\
- **Lock in a consistent order**: every transaction acquires resources in the same sequence (e.g. ascending by id).\
- **Short transactions**: do less, commit early, reduce lock hold time.\
- Narrow the lock scope; consider **optimistic locking** under high contention.\
\
A DB (like PostgreSQL) **detects deadlocks** and aborts one victim transaction (returns an error) → the app must **catch it and retry**.
