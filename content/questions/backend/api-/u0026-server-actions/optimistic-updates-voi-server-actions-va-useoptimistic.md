---
id: optimistic-updates-voi-server-actions-va-useoptimistic
position: backend
technology: api-\u0026-server-actions
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optimistic updates với Server Actions và useOptimistic?

## Question (EN)
How do you implement optimistic updates with Server Actions and useOptimistic?

## Đáp án chi tiết (VI)
useOptimistic (React 19) kết hợp với Server Actions: cập nhật UI ngay trước khi action hoàn thành, rollback nếu fail. `const [optimistic, addOptimistic] = useOptimistic(data, updateFn)`. Trong action handler: `addOptimistic(newItem)` trước `await serverAction()`. Tạo snappy UX dù có network latency.

## Detailed Answer (EN)
useOptimistic (React 19) pairs naturally with Server Actions: update the UI immediately before the action completes and roll back automatically if it fails. `const [optimistic, addOptimistic] = useOptimistic(data, updateFn)`. In the action handler: call `addOptimistic(newItem)` before `await serverAction()`. This creates a snappy UX even with network latency.
