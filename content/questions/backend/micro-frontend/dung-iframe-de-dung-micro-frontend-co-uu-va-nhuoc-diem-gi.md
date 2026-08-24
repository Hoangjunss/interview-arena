---
id: dung-iframe-de-dung-micro-frontend-co-uu-va-nhuoc-diem-gi
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng iframe để dựng micro-frontend có ưu và nhược điểm gì?

## Question (EN)
What are the pros and cons of using iframes to build micro-frontends?

## Đáp án chi tiết (VI)
iframe cho mức tách biệt mạnh nhất — CSS và JavaScript của mỗi mảnh tách biệt hoàn toàn, không xung đột với nhau — và dễ nhúng app cũ hoặc app khác stack. Nhưng đổi lại UX kém: routing và deep-link khó đồng bộ, chia sẻ state phải qua `postMessage`, tự động resize chiều cao phức tạp, SEO yếu (nội dung trong iframe khó index), accessibility và quản lý focus khó, và tải nặng hơn. Hình dung như nhúng một ứng dụng bên thứ ba vào trang. Lưu ý: dùng iframe cho micro-frontend nội bộ thường mang lại nhiều phiền toái UX hơn là lợi ích — chỉ nên chọn khi cần tách biệt tuyệt đối, ví dụ nhúng app legacy hoặc app bên thứ ba không kiểm soát được.

## Detailed Answer (EN)
Iframes give the strongest isolation — each piece's CSS and JavaScript are fully separated and never collide — and make it easy to embed legacy or different-stack apps. The trade-off is poor UX: routing and deep-linking are hard to sync, sharing state requires `postMessage`, auto-resizing height is awkward, SEO is weak (iframe content is hard to index), accessibility and focus management are difficult, and loading is heavier. Think of it like embedding a third-party application into the page. Note: iframes for internal micro-frontends usually bring more UX problems than benefit — choose them only when you need absolute isolation, e.g., embedding a legacy or uncontrolled third-party app.
