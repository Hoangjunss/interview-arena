---
id: spring-transaction-management-va-transactional-la-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring transaction management và @Transactional là gì?

## Question (EN)
What is Spring transaction management and @Transactional?

## Đáp án chi tiết (VI)
**`@Transactional`** — transaction khai báo: Spring tự `begin → commit → rollback`, không cần `connection.commit()` thủ công. Mọi thao tác DB trong method chạy trong **1 transaction** — bất kỳ bước nào throw exception → rollback toàn bộ (vd placeOrder gồm save order → trừ kho → charge tiền: charge fail thì cả ba cùng rollback).\
\
**Attribute chính:**\
- **`propagation`** — REQUIRED (default), REQUIRES_NEW (luôn tạo mới, suspend cái cũ), NESTED (savepoint).\
- **`isolation`** — READ_COMMITTED (default), REPEATABLE_READ, SERIALIZABLE.\
- **`readOnly=true`** — tắt dirty checking, DB route sang replica.\
- **`rollbackFor`** / **`timeout`** — exception trigger rollback / giây trước khi force rollback.\
\
**Rollback mặc định:** chỉ với **unchecked exception**; checked exception (`IOException`...) **không** rollback trừ khi `rollbackFor = Exception.class`.\
\
**Lưu ý:** gọi method `@Transactional` từ trong cùng class → bypass proxy → mất transaction. Fix: tách sang class khác (xem câu self-invocation).

## Detailed Answer (EN)
$86
