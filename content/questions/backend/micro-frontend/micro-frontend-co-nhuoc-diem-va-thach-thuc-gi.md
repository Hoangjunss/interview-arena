---
id: micro-frontend-co-nhuoc-diem-va-thach-thuc-gi
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Micro-frontend có nhược điểm và thách thức gì?

## Question (EN)
What are the downsides and challenges of micro-frontends?

## Đáp án chi tiết (VI)
Đổi lấy team autonomy, micro-frontend kéo theo nhiều chi phí: payload lớn hơn vì duplicate dependency (mỗi mảnh có thể mang theo bản thư viện riêng nếu không chia sẻ tốt); độ phức tạp vận hành tăng (nhiều pipeline CI/CD, nhiều artifact, nhiều môi trường); rủi ro UI/UX không nhất quán nếu thiếu design system chung; và debug/observability xuyên nhiều app khó hơn hẳn monolith. Lưu ý: nhiều nhóm sau khi triển khai mới nhận ra \\"lẽ ra một monolith module hóa tốt là đủ\\" — đừng chọn micro-frontend vì hype; chỉ dùng khi quy mô tổ chức và codebase thật sự cần, và đã chấp nhận chi phí phức tạp đi kèm.

## Detailed Answer (EN)
In exchange for team autonomy, micro-frontends bring real costs: larger payloads from duplicate dependencies (each piece may carry its own library copy if sharing isn't done well); higher operational complexity (more CI/CD pipelines, more artifacts, more environments); risk of inconsistent UI/UX without a shared design system; and much harder cross-app debugging/observability than a monolith. Note: many teams realize after adopting it that \\"a well-modularized monolith would have been enough\\" — don't choose micro-frontends for hype; use them only when organization scale and codebase genuinely require it, and after accepting the added complexity cost.
