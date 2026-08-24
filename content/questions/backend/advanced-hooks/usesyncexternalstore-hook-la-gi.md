---
id: usesyncexternalstore-hook-la-gi
position: backend
technology: advanced-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useSyncExternalStore hook là gì?

## Question (EN)
What is the useSyncExternalStore hook?

## Đáp án chi tiết (VI)
useSyncExternalStore (React 18) là hook chính thức để subscribe external stores (Redux, Zustand, browser APIs) đảm bảo consistent reads trong concurrent mode. Thay thế manual subscription trong useEffect. Nhận subscribe function và getSnapshot function. Libraries như Redux đã migrate sang hook này thay vì useEffect-based subscription.

## Detailed Answer (EN)
useSyncExternalStore (React 18) is the official hook for subscribing to external stores (Redux, Zustand, browser APIs) while guaranteeing consistent reads in Concurrent Mode. It replaces manual subscription patterns inside useEffect. It takes a subscribe function and a getSnapshot function. Libraries like Redux have migrated to this hook instead of useEffect-based subscriptions.
