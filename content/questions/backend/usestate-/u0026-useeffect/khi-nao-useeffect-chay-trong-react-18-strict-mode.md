---
id: khi-nao-useeffect-chay-trong-react-18-strict-mode
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào useEffect chạy trong React 18 Strict Mode?

## Question (EN)
When does useEffect run in React 18 Strict Mode?

## Đáp án chi tiết (VI)
Trong React 18 Strict Mode development, mỗi component mount-unmount-mount lại để test cleanup. Effect chạy: mount (lần 1) → cleanup → mount (lần 2). Giúp phát hiện bugs do missing cleanup. Production không bị ảnh hưởng. Code đúng cần idempotent: connect/disconnect subscription, fetch với cancel, v.v.

## Detailed Answer (EN)
In React 18 Strict Mode during development, each component goes through mount → unmount → remount to test cleanup correctness. The effect sequence is: run on mount (first) → cleanup → run on remount (second). This helps catch missing cleanup bugs. Production is not affected. Correct code must be idempotent: connect/disconnect subscriptions, fetch with cancellation, etc.
