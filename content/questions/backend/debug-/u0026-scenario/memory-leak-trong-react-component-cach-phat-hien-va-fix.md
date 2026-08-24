---
id: memory-leak-trong-react-component-cach-phat-hien-va-fix
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memory leak trong React component, cách phát hiện và fix?

## Question (EN)
Memory leak in a React component. How do you detect and fix it?

## Đáp án chi tiết (VI)
Phát hiện: Chrome DevTools \u003e Memory tab, check heap snapshots. Nguyên nhân: (1) Quên cleanup subscriptions/timers trong useEffect. (2) Event listeners không remove. (3) Abort controller không cancel fetch. Fix: return cleanup function trong useEffect. Pattern: `const controller = new AbortController(); return () =\u003e controller.abort();`

## Detailed Answer (EN)
Detection: Chrome DevTools \u003e Memory tab, compare heap snapshots. Common causes: (1) Forgetting to clean up subscriptions/timers in useEffect. (2) Event listeners not removed. (3) Fetch not cancelled via AbortController. Fix: return a cleanup function from useEffect. Pattern: `const controller = new AbortController(); return () =\u003e controller.abort();`
