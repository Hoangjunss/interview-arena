---
id: transaction-isolation-levels-trong-spring-read-committed-va-repeatable-read-khac
position: backend
technology: data-\u0026-databases
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction isolation levels trong Spring: READ_COMMITTED và REPEATABLE_READ khác nhau thế nào?

## Question (EN)
Transaction isolation levels in Spring: how do READ_COMMITTED and REPEATABLE_READ differ?

## Đáp án chi tiết (VI)
**Isolation level** quyết định transaction có thấy dữ liệu uncommitted của tx khác không.\
\
| Level | Dirty Read | Non-repeatable | Phantom |\
|---|---|---|---|\
| READ_UNCOMMITTED | Có | Có — | Có |\
| **READ_COMMITTED** (default) | Không | Có | Có — |\
| REPEATABLE_READ | Không | Không — | Có |\
| SERIALIZABLE | Không | Không — | Không |\
\
- **Dirty Read:** đọc data chưa commit của tx khác.\
- **Non-repeatable Read:** đọc cùng row 2 lần → khác nhau (tx khác update).\
- **Phantom Read:** query lại → số row khác (tx khác insert/delete).\
\
Đặt: `@Transactional(isolation = Isolation.REPEATABLE_READ)`.\
\
**Thực tế:** READ_COMMITTED hợp 90%+ (Postgres default); REPEATABLE_READ khi đọc cùng data nhiều lần trong tx (tổng, report); SERIALIZABLE chỉ khi tuyệt đối không chấp nhận phantom (financial ledger). Isolation phụ thuộc DB — không phải DB nào cũng đủ 4 level.

## Detailed Answer (EN)
**Isolation level** determines whether a transaction can see uncommitted data from other transactions.\
\
| Level | Dirty Read | Non-repeatable | Phantom |\
|---|---|---|---|\
| READ_UNCOMMITTED | Yes | Yes — | Yes |\
| **READ_COMMITTED** (default) | No | Yes | Yes — |\
| REPEATABLE_READ | No | No — | Yes |\
| SERIALIZABLE | No | No — | No |\
\
- **Dirty Read:** reading uncommitted data from another transaction.\
- **Non-repeatable Read:** reading the same row twice returns different results (another tx updated it).\
- **Phantom Read:** re-querying returns a different row count (another tx inserted/deleted).\
\
Set: `@Transactional(isolation = Isolation.REPEATABLE_READ)`.\
\
**In practice:** READ_COMMITTED suits 90%+ (Postgres default); REPEATABLE_READ when reading the same data multiple times in one tx (totals, reports); SERIALIZABLE only when phantom reads are unacceptable (financial ledgers). Isolation depends on the DB — not all implement all four levels.
