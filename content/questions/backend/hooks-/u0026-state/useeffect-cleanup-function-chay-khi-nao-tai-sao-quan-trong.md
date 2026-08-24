---
id: useeffect-cleanup-function-chay-khi-nao-tai-sao-quan-trong
position: backend
technology: hooks-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useEffect cleanup function chạy khi nào? Tại sao quan trọng?

## Question (EN)
When does the useEffect cleanup function run? Why is it important?

## Đáp án chi tiết (VI)
Cleanup chạy: (1) trước mỗi lần effect re-run khi dependencies thay đổi, (2) khi component unmount. Quan trọng để tránh memory leaks: hủy subscriptions, abort fetch requests, clear timers. \
\
**Ví dụ:** `return () =\u003e controller.abort()` trong fetch effect.

## Detailed Answer (EN)
The cleanup runs: (1) before each effect re-run when dependencies change, and (2) when the component unmounts. It is critical for preventing memory leaks: cancelling subscriptions, aborting fetch requests, and clearing timers. \
\
**Example:** `return () =\u003e controller.abort()` inside a fetch effect.
