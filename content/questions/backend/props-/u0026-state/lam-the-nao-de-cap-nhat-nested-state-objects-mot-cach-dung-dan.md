---
id: lam-the-nao-de-cap-nhat-nested-state-objects-mot-cach-dung-dan
position: backend
technology: props-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để cập nhật nested state objects một cách đúng đắn?

## Question (EN)
How do you correctly update nested state objects?

## Đáp án chi tiết (VI)
Dùng spread operator để tạo bản sao ở mỗi cấp: `setState(prev =\u003e ({ ...prev, user: { ...prev.user, name: 'new' } }))`. Với nested sâu, xem xét dùng Immer library cho phép viết code mutate nhưng tạo immutable update dưới hood. Cấu trúc state phẳng (flat) cũng giúp tránh vấn đề này.

## Detailed Answer (EN)
Use the spread operator to create a shallow copy at each level: `setState(prev =\u003e ({ ...prev, user: { ...prev.user, name: 'new' } }))`. For deeply nested structures, consider the Immer library, which lets you write mutating-style code while producing immutable updates under the hood. Keeping state as flat as possible also avoids this problem entirely.
