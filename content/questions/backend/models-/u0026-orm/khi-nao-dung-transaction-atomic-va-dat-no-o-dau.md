---
id: khi-nao-dung-transaction-atomic-va-dat-no-o-dau
position: backend
technology: models-\u0026-orm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng `transaction.atomic()` và đặt nó ở đâu?

## Question (EN)
When should you use `transaction.atomic()` and where do you put it?

## Đáp án chi tiết (VI)
`transaction.atomic()` bọc một khối code thành transaction theo nguyên tắc *all or nothing*. Bên trong raise exception → mọi `INSERT/UPDATE/DELETE` đã chạy trong khối đó được rollback hết.\
\
Dùng khi nhiều bước nghiệp vụ phải nhất quán với nhau: tạo đơn hàng + trừ kho + ghi audit log. Hoặc khi dùng `select_for_update()` để khoá hàng chống race condition.\
\
```python\
from django.db import transaction\
\
with transaction.atomic():\
    order = Order.objects.create(...)\
    Stock.objects.filter(sku=sku).update(qty=F('qty') - 1)\
    AuditLog.objects.create(action='order.created', order=order)\
```\
\
Nên đặt ở **layer service**, không phải view, để dễ test và tái sử dụng. Hoặc dán decorator `@transaction.atomic` lên function service.\
\
Một cái sai rất phổ biến là gọi external API (HTTP, email, webhook) bên trong `atomic` — vừa chậm vừa dễ lỗi nửa chừng (mạng treo, response lâu). Cách đúng là `transaction.on_commit(lambda: send_email(...))` — Django chỉ chạy callback đó *sau* khi transaction commit thành công.

## Detailed Answer (EN)
**`transaction.atomic()`** wraps a block of code in a transaction — *all or nothing*. If anything inside raises, every `INSERT/UPDATE/DELETE` already executed in the block is rolled back.\
\
Use it when several business steps must stay consistent: create an order + decrement stock + write an audit log. Or when using `select_for_update()` to lock rows against race conditions.\
\
```python\
from django.db import transaction\
\
with transaction.atomic():\
    order = Order.objects.create(...)\
    Stock.objects.filter(sku=sku).update(qty=F('qty') - 1)\
    AuditLog.objects.create(action='order.created', order=order)\
```\
\
Place it in the **service layer**, not the view, for easier testing and reuse. Or apply `@transaction.atomic` as a decorator on the service function.\
\
**Note:** Do not call external APIs (HTTP, email, webhooks) inside `atomic` — slow and may fail mid-way. Use `transaction.on_commit(lambda: send_email(...))` to run *after* a successful commit.
