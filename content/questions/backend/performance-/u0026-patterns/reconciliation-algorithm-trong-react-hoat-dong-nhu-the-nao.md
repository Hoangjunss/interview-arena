---
id: reconciliation-algorithm-trong-react-hoat-dong-nhu-the-nao
position: backend
technology: performance-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reconciliation algorithm trong React hoạt động như thế nào?

## Question (EN)
How does React's reconciliation algorithm work?

## Đáp án chi tiết (VI)
React dùng heuristic O(n) algorithm thay vì O(n³) để diff trees:\
\
- (1) Elements khác type → destroy và rebuild hoàn toàn.\
- (2) Cùng type → compare props, update chỉ những gì thay đổi.\
- (3) Lists dùng key để match elements giữa renders.\
\
Hiểu algorithm giúp tránh bugs và tối ưu performance.

## Detailed Answer (EN)
React uses an O(n) heuristic algorithm instead of the theoretically optimal O(n³) to diff trees:\
\
- (1) Elements of different types — destroy and rebuild completely.\
- (2) Same type — compare props and update only what changed.\
- (3) Lists — use the key prop to match elements between renders.\
\
Understanding this algorithm helps you avoid bugs and write more performant component trees.
