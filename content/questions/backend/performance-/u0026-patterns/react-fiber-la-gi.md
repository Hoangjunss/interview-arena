---
id: react-fiber-la-gi
position: backend
technology: performance-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Fiber là gì?

## Question (EN)
What is React Fiber?

## Đáp án chi tiết (VI)
React Fiber là reimplementation của React's reconciliation algorithm (React 16+). Cho phép chia nhỏ rendering work thành units, có thể pause, resume, hay abort. Enables: incremental rendering, priority-based updates, concurrent features (Suspense, useTransition). Giải quyết vấn đề previous stack reconciler không thể interrupt render.

## Detailed Answer (EN)
React Fiber is a complete reimplementation of React's reconciliation algorithm introduced in React 16. It breaks rendering work into small units that can be paused, resumed, or aborted. This enables incremental rendering, priority-based updates, and all concurrent features like Suspense and useTransition. It solved the core problem with the previous stack reconciler, which could not interrupt a render once started.
