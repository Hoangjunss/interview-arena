---
id: transactions-trong-redis-multi-exec-va-pipeline-khac-nhau-nhu-the-nao
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transactions trong Redis: MULTI/EXEC và pipeline khác nhau như thế nào?

## Question (EN)
Transactions in Redis: how do MULTI/EXEC and pipeline differ?

## Đáp án chi tiết (VI)
Redis Transaction dùng `MULTI`/`EXEC`: các command giữa MULTI và EXEC được queue lại và execute atomically — không có command nào khác được xen vào giữa. Tuy nhiên, Redis transaction không có rollback — nếu một command fail (runtime error như sai kiểu data), các command khác vẫn execute. Lỗi cú pháp (syntax error) khi queue command sẽ khiến toàn bộ transaction bị discard; chỉ runtime error mới bị bỏ qua. `DISCARD` hủy transaction. `WATCH key` cho phép optimistic locking: nếu key thay đổi trước khi EXEC, transaction bị abort (EXEC trả về nil) — dùng để implement compare-and-swap. Pipeline khác với transaction: pipeline đơn giản là gom nhiều command gửi một lần để giảm network round-trip, không đảm bảo atomicity. Ví dụ dùng WATCH: đọc balance, kiểm tra đủ tiền, WATCH balance, MULTI, deduct, EXEC — nếu có race condition thì EXEC fail và retry. Trong thực tế, Lua script thường được ưa hơn MULTI/EXEC vì atomic và flexible hơn.

## Detailed Answer (EN)
Redis transactions use `MULTI`/`EXEC`: commands queued between MULTI and EXEC are executed atomically — no other command can interleave. However, Redis transactions have no rollback — if one command fails at runtime (e.g., wrong data type), the remaining commands still execute. A syntax error while queuing a command causes the entire transaction to be discarded; only runtime errors are silently skipped. `DISCARD` cancels the transaction. `WATCH key` enables optimistic locking: if the watched key changes before EXEC, the transaction is aborted (EXEC returns nil) — used to implement compare-and-swap. A pipeline is different: it simply batches multiple commands into one network call to reduce round-trips, with no atomicity guarantee. Example using WATCH: read balance, verify sufficient funds, WATCH balance, MULTI, deduct, EXEC — if a race condition occurs, EXEC fails and the caller retries. In practice, Lua scripts are often preferred over MULTI/EXEC because they are atomic and more flexible.
