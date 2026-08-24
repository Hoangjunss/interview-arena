---
id: quy-tac-cua-hooks-rules-of-hooks-la-gi
position: backend
technology: advanced-hooks
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy tắc của Hooks (Rules of Hooks) là gì?

## Question (EN)
What are the Rules of Hooks?

## Đáp án chi tiết (VI)
Hai quy tắc bắt buộc:\
\
- (1) Chỉ gọi hooks ở top level — không trong vòng lặp, điều kiện hay hàm lồng, vì React theo dõi hooks theo thứ tự gọi mỗi render.\
- (2) Chỉ gọi hooks trong function component hoặc custom hook, không trong class hay hàm JS thông thường.\
\
Vi phạm gây lỗi runtime khó debug. Cài `eslint-plugin-react-hooks` để bắt lỗi ngay lúc viết code thay vì lúc chạy.

## Detailed Answer (EN)
Two mandatory rules:\
\
- (1) Only call hooks at the top level — never inside loops, conditions, or nested functions — because React tracks hooks by their call order on each render.\
- (2) Only call hooks inside function components or custom hooks, not in classes or regular JS functions.\
\
Violations cause hard-to-debug runtime errors. Install `eslint-plugin-react-hooks` to catch violations at write time rather than at runtime.
