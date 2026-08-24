---
id: trang-load-cham-approach-debug-tu-dau
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trang load chậm, approach debug từ đầu?

## Question (EN)
A page is loading slowly. What is your debugging approach?

## Đáp án chi tiết (VI)
Khi trang web load chậm, cần debug có hệ thống từ tổng quan đến chi tiết. Bước đầu tiên mở Chrome DevTools tab Network để xem waterfall — tìm các file quá lớn, requests bị blocking, hoặc API response chậm.\
\
Tiếp theo chạy Lighthouse audit để nhận danh sách cụ thể các vấn đề cần khắc phục kèm mức độ ưu tiên. Sau đó dùng tab Performance để record và tìm long tasks (\u003e50ms) gây block main thread, layout thrashing, hoặc excessive reflows. Cuối cùng chạy bundle analyzer để phát hiện dependencies nặng có thể thay thế hoặc lazy load.\
\
Thứ tự fix nên theo impact: tối ưu critical rendering path trước, rồi code splitting, image optimization bằng format WebP/AVIF, và cuối cùng là caching strategy.

## Detailed Answer (EN)
Debug systematically from high-level to detail. First, open Chrome DevTools Network tab to see the waterfall — find oversized files, blocking requests, or slow API responses. Next, run a Lighthouse audit for a prioritized list of specific issues. Then use the Performance tab to record and identify long tasks (\u003e50ms) blocking the main thread, layout thrashing, or excessive reflows. Finally, run a bundle analyzer (webpack-bundle-analyzer or Vite plugin) to spot heavy dependencies that can be replaced or lazy-loaded. Fix in order of impact: optimize the critical rendering path first, then code splitting, image optimization (WebP/AVIF), and finally caching strategy.
