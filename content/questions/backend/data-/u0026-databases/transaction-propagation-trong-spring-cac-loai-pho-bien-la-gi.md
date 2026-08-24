---
id: transaction-propagation-trong-spring-cac-loai-pho-bien-la-gi
position: backend
technology: data-\u0026-databases
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Transaction propagation trong Spring: các loại phổ biến là gì?

## Question (EN)
Transaction propagation in Spring: what are the common types?

## Đáp án chi tiết (VI)
**Propagation** xác định hành vi khi method `@Transactional` được gọi từ trong transaction đang có.\
\
| Propagation | Hành vi |\
|---|---|\
| **REQUIRED** (default) | Join transaction hiện có, không có → tạo mới |\
| **REQUIRES_NEW** | Luôn tạo transaction mới, suspend cái cũ |\
| **NESTED** | Nested trong transaction hiện có (savepoint) |\
| **SUPPORTS** | Có thì join, không thì chạy không transaction |\
| **NOT_SUPPORTED** | Suspend transaction, chạy không transaction |\
| **MANDATORY** / **NEVER** | Bắt buộc phải có / bắt buộc không có (sai → exception) |\
\
**Ví dụ điển hình:** `processOrder()` (@Transactional) gọi `auditService.log()` khai báo `propagation = REQUIRES_NEW` → audit log ghi ở transaction **riêng**, vẫn commit kể cả khi order rollback.\
\
**REQUIRES_NEW** dùng cho: audit log, notification — phải persist dù outer transaction fail. **NESTED** dùng cho: rollback từng phần qua savepoint (huỷ bước đó nhưng giữ outer transaction).

## Detailed Answer (EN)
$85
