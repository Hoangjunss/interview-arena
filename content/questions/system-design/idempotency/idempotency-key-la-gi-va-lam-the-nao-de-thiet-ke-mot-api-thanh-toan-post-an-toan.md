---
id: idempotency-key-la-gi-va-lam-the-nao-de-thiet-ke-mot-api-thanh-toan-post-an-toan
position: system-design
technology: idempotency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Idempotency key là gì và làm thế nào để thiết kế một API thanh toán/POST an toàn khi client retry?

## Question (EN)
What is an idempotency key and how do you design a safe payment/POST API for client retries?

## Đáp án chi tiết (VI)
**Vấn đề:** mạng timeout khiến client không biết request đã thành công chưa → retry → tạo **double charge / double order**. POST vốn không idempotent.\
\
**Idempotency key:** client sinh một key duy nhất (UUID) cho mỗi *ý định nghiệp vụ* và gửi qua header `Idempotency-Key`. Server:\
\
1. Khi nhận request, **lưu key + kết quả** vào store (Redis/DB) trong một transaction.\
2. Nếu key **đã tồn tại** → trả về **kết quả đã lưu**, không thực thi lại side-effect.\
3. Nếu key mới → thực thi, lưu response, gắn TTL (Stripe giữ 24h).\
\
```\
INSERT INTO idem (key, status) VALUES ($1, 'in_progress')\
  ON CONFLICT (key) DO NOTHING;   -- 0 rows ⇒ đã có ⇒ trả cached\
```\
\
**Lưu ý:**\
- Xử lý **request đang chạy dở** (in_progress): retry trong lúc bản gốc chưa xong → trả 409 hoặc chờ.\
- Key phải gắn với **nội dung request**; cùng key nhưng body khác ⇒ trả lỗi để tránh nhầm.\
- Khác với việc API tự nhiên idempotent (PUT/DELETE) — đây là idempotency *được áp đặt* cho thao tác có side-effect.

## Detailed Answer (EN)
**Problem:** a network timeout leaves the client unsure if the request succeeded → it retries → **double charge / double order**. POST is not naturally idempotent.\
\
**Idempotency key:** client generates a unique key (UUID) per *business intent* and sends it via `Idempotency-Key` header. Server:\
\
1. On receipt, **store key + result** in a store (Redis/DB) inside a transaction.\
2. If the key **already exists** → return the **stored result**, do not re-run side effects.\
3. If new → execute, store the response, set a TTL (Stripe keeps 24h).\
\
```\
INSERT INTO idem (key, status) VALUES ($1, 'in_progress')\
  ON CONFLICT (key) DO NOTHING;   -- 0 rows ⇒ exists ⇒ return cached\
```\
\
**Notes:**\
- Handle the **in-progress** case: a retry while the original is still running → return 409 or wait.\
- Bind the key to **request content**; same key with a different body ⇒ error to avoid mix-ups.\
- Distinct from naturally idempotent verbs (PUT/DELETE) — this is idempotency *imposed* on a side-effecting operation.
