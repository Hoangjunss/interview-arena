---
id: uu-va-nhuoc-diem-cua-micro-frontend-la-gi
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ưu và nhược điểm của micro-frontend là gì?

## Question (EN)
What are the pros and cons of micro-frontends?

## Đáp án chi tiết (VI)
Tóm tắt: đổi \\"tốc độ tổ chức\\" lấy \\"độ phức tạp kỹ thuật\\".\
\
**Ưu điểm:** (1) team tự chủ — mỗi team sở hữu một mảnh từ đầu đến cuối; (2) deploy độc lập — release riêng, không chờ nhau; (3) scale được tổ chức nhiều team trên cùng sản phẩm; (4) tự do tech stack và nâng cấp dần (migrate khỏi legacy từng phần); (5) tách biệt lỗi nếu thiết kế đúng.\
\
**Nhược điểm:** (1) payload lớn do duplicate dependency nếu chia sẻ không tốt; (2) phức tạp vận hành — nhiều pipeline, versioning, orchestration; (3) khó giữ UI/UX nhất quán → cần design system chung; (4) debug và observability xuyên nhiều mảnh khó hơn monolith; (5) overhead không đáng nếu team/app nhỏ.\
\
Lưu ý: chỉ chọn micro-frontend khi điểm nghẽn của monolith (các team xung đột khi làm chung, deploy nghẽn cổ chai) đã lớn hơn chi phí phức tạp mà nó mang lại — đừng chọn vì hype.

## Detailed Answer (EN)
In short: you trade \\"organizational speed\\" for \\"technical complexity\\".\
\
**Pros:** (1) team autonomy — each team owns a piece end-to-end; (2) independent deployment — release without waiting on others; (3) organizational scaling across many teams on one product; (4) freedom of tech stack and incremental migration away from legacy; (5) fault isolation when designed well.\
\
**Cons:** (1) larger payloads from duplicate dependencies if sharing isn't done well; (2) operational complexity — many pipelines, versioning, orchestration; (3) hard to keep UI/UX consistent → needs a shared design system; (4) cross-piece debugging and observability are harder than a monolith; (5) overhead that isn't worth it for a small team or app.\
\
Note: adopt micro-frontends only when the monolith's problems (teams conflicting with each other, deployment bottlenecks) already outweighs the added complexity — don't pick them for hype.
