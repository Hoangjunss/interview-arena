---
id: api-call-bi-goi-2-lan-trong-useeffect-tai-sao
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API call bị gọi 2 lần trong useEffect, tại sao?

## Question (EN)
An API call fires twice inside useEffect. Why?

## Đáp án chi tiết (VI)
React 18 Strict Mode gọi useEffect 2 lần trong development để detect side effects. Fix: (1) Đây là behavior đúng, production chỉ gọi 1 lần. (2) Dùng cleanup function abort previous request. (3) Hoặc dùng React Query/SWR thay vì fetch trực tiếp trong useEffect.

## Detailed Answer (EN)
React 18 Strict Mode intentionally calls useEffect twice in development to help detect side effects. Fixes: (1) This is the correct behavior — production only calls it once. (2) Add a cleanup function to abort the previous request. (3) Or use React Query/SWR instead of fetching directly in useEffect.
