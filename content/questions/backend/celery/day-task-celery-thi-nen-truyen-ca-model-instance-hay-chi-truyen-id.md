---
id: day-task-celery-thi-nen-truyen-ca-model-instance-hay-chi-truyen-id
position: backend
technology: celery
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đẩy task Celery thì nên truyền cả model instance hay chỉ truyền id?

## Question (EN)
When dispatching a Celery task, should you pass the model instance or just the id?

## Đáp án chi tiết (VI)
**Chỉ truyền id (primary key)**, rồi để task tự query lại.\
\
Tham số của task phải đi qua broker nên bị **serialize** (mặc định JSON). Một model instance vừa không serialize được bằng JSON, vừa là **ảnh chụp dữ liệu tại thời điểm đẩy task** — đến lúc worker chạy, bản ghi trong DB có thể đã đổi, và bạn sẽ ghi đè bằng dữ liệu cũ.\
\
```python\
@shared_task\
def send_invoice(order_id):\
    order = Order.objects.get(pk=order_id)   # always the current state\
    ...\
\
send_invoice.delay(order.id)   # not send_invoice.delay(order)\
```\
\
Hệ quả thứ hai: payload nhỏ gọn, message trong queue nhẹ, không bị vỡ khi model đổi field.\
\
**Lưu ý kèm theo:** task chạy trên tiến trình khác nên bản ghi có thể **đã bị xoá** trước khi worker nhận việc — bắt `Model.DoesNotExist` và kết thúc êm thay vì để task fail và retry vô ích.

## Detailed Answer (EN)
**Pass the id (primary key)** and let the task re-query the row.\
\
Task arguments travel through the broker, so they are **serialized** (JSON by default). A model instance is neither JSON-serializable nor safe: it is a **snapshot of the data at dispatch time**, and by the time the worker runs, the row may have changed — you would overwrite it with stale values.\
\
```python\
@shared_task\
def send_invoice(order_id):\
    order = Order.objects.get(pk=order_id)   # always the current state\
    ...\
\
send_invoice.delay(order.id)   # not send_invoice.delay(order)\
```\
\
A second benefit: the payload stays small, queue messages stay light, and nothing breaks when the model gains or loses a field.\
\
**Related caveat:** the task runs in another process, so the row may have been **deleted** before the worker picks the job up — catch `Model.DoesNotExist` and exit quietly instead of letting the task fail and retry pointlessly.
