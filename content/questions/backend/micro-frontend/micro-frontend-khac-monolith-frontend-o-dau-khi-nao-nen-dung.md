---
id: micro-frontend-khac-monolith-frontend-o-dau-khi-nao-nen-dung
position: backend
technology: micro-frontend
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Micro-frontend khác monolith frontend ở đâu? Khi nào nên dùng?

## Question (EN)
How does a micro-frontend differ from a monolith frontend? When should you use it?

## Đáp án chi tiết (VI)
Monolith frontend là một codebase và một lần deploy duy nhất cho toàn bộ UI; micro-frontend là nhiều app deploy độc lập, chia theo team. Lợi ích chính của micro-frontend: team tự chủ, deploy độc lập (không phải release đồng bộ), scale được tổ chức nhiều team, và có thể trộn nhiều framework. Chỉ nên dùng khi có nhiều team lớn cùng làm trên một sản phẩm và codebase đủ phức tạp để monolith trở thành nút thắt. Lưu ý: app nhỏ hoặc một team mà dùng micro-frontend thì chỉ gánh thêm độ phức tạp (nhiều pipeline, duplicate dependency, lo nhất quán UI) mà không nhận lại lợi ích — lúc đó một monolith module hóa tốt là đủ.

## Detailed Answer (EN)
A monolith frontend is a single codebase and a single deployment for the whole UI; a micro-frontend is many independently deployed apps split by team. The main benefits of micro-frontends: team autonomy, independent deployment (no synchronized releases), the ability to scale an organization across many teams, and freedom to mix frameworks. Use it only when several large teams work on one product and the codebase is complex enough that the monolith becomes a bottleneck. Note: a small app or a single team adopting micro-frontends only pays extra complexity (multiple pipelines, duplicate dependencies, consistency concerns) without the payoff — a well-modularized monolith is enough there.
