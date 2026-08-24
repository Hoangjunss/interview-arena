---
id: optional-chaining-va-nullish-coalescing-giai-quyet-van-de-gi
position: backend
technology: js-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optional chaining `?.` và nullish coalescing `??` giải quyết vấn đề gì?

## Question (EN)
What problems do optional chaining `?.` and nullish coalescing `??` solve?

## Đáp án chi tiết (VI)
- **Optional chaining `?.`**: truy cập property/gọi method lồng sâu mà **không lỗi khi gặp `null`/`undefined`**. `user?.address?.city` — nếu `user` hoặc `address` là `null`/`undefined` thì trả về `undefined` thay vì ném `TypeError`. Dùng được với property (`a?.b`), index (`a?.[i]`), và gọi hàm (`fn?.()`). Nó **short-circuit**: gặp nullish là dừng, không đọc tiếp bên phải.\
- **Nullish coalescing `??`**: trả về vế phải **chỉ khi** vế trái là `null` hoặc `undefined`. `value ?? 'default'`.\
\
Vì sao `??` hơn `||` trong nhiều ca: `||` trả vế phải với **mọi giá trị falsy** — nên `0 || 10` → `10`, `'' || 'x'` → `'x'`, ghi đè nhầm những giá trị hợp lệ. `??` chỉ chặn `null`/`undefined`, giữ nguyên `0`, `''`, `false`.\
\
```js\
const count = data.count ?? 10   // keeps 0 if count is 0\
const name = user?.profile?.name ?? 'Guest'\
```\
\
Lưu ý: không được trộn `??` với `||`/`\u0026\u0026` mà không có ngoặc — cú pháp bắt buộc để tránh nhập nhằng thứ tự.

## Detailed Answer (EN)
- **Optional chaining `?.`**: access nested properties / call methods **without erroring on `null`/`undefined`**. `user?.address?.city` — if `user` or `address` is `null`/`undefined`, it returns `undefined` instead of throwing a `TypeError`. Works with properties (`a?.b`), indexing (`a?.[i]`), and calls (`fn?.()`). It **short-circuits**: on a nullish value it stops and does not evaluate the rest.\
- **Nullish coalescing `??`**: returns the right side **only when** the left is `null` or `undefined`. `value ?? 'default'`.\
\
Why `??` beats `||` in many cases: `||` returns the right side for **any falsy value** — so `0 || 10` → `10`, `'' || 'x'` → `'x'`, wrongly overriding valid values. `??` blocks only `null`/`undefined`, preserving `0`, `''`, `false`.\
\
```js\
const count = data.count ?? 10   // keeps 0 if count is 0\
const name = user?.profile?.name ?? 'Guest'\
```\
\
Note: you cannot mix `??` with `||`/`\u0026\u0026` without parentheses — the syntax requires them to avoid ambiguous precedence.
