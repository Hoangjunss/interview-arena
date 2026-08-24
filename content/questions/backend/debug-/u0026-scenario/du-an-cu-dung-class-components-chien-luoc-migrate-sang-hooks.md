---
id: du-an-cu-dung-class-components-chien-luoc-migrate-sang-hooks
position: backend
technology: debug-\u0026-scenario
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dự án cũ dùng Class Components, chiến lược migrate sang Hooks?

## Question (EN)
An old project uses Class Components. What is your strategy for migrating to Hooks?

## Đáp án chi tiết (VI)
Migrate incrementally — không rewrite all-at-once; ưu tiên chuyển đổi khi touch existing code.\
\
(1) Không rewrite toàn bộ cùng lúc. (2) Bắt đầu từ components mới (100% hooks). (3) Khi sửa bug/thêm feature → convert class → function. (4) Extract logic thành custom hooks (reuse). (5) Class + hooks chung sống tốt, không cần migrate hết. (6) Ưu tiên convert: HOCs → custom hooks, lifecycle → useEffect.

## Detailed Answer (EN)
(1) Do not rewrite everything at once. (2) Write all new components with hooks (100%). (3) When fixing a bug or adding a feature → convert that class to a function component. (4) Extract logic into custom hooks for reuse. (5) Class and function components coexist fine — no need to migrate everything. (6) Prioritize converting: HOCs → custom hooks, lifecycle methods → useEffect.
