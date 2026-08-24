---
id: single-spa-la-gi-no-giai-quyet-van-de-gi
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
single-spa là gì? Nó giải quyết vấn đề gì?

## Question (EN)
What is single-spa? What problem does it solve?

## Đáp án chi tiết (VI)
single-spa là một framework điều phối (orchestrator): một root-config đăng ký các micro-frontend và quyết định mảnh nào active theo route hiện tại, còn mỗi micro-frontend export các lifecycle `bootstrap` / `mount` / `unmount` để root-config gọi khi vào/rời route. Nhờ vậy bạn có thể chạy nhiều framework (React, Vue, Angular) cùng một trang. Mỗi mảnh khai báo `activeWhen` (ví dụ active khi path bắt đầu bằng `/checkout`). Khác biệt với Module Federation: single-spa phụ trách phần điều phối và vòng đời (cái nào hiện, khi nào mount/unmount), còn Module Federation phụ trách phần nạp và chia sẻ code — trong thực tế hai cái thường được dùng kèm nhau. Lưu ý: vì các app mount/unmount động, mỗi app phải dọn dẹp sạch (event listener, timer) trong `unmount` để tránh rò rỉ bộ nhớ.

## Detailed Answer (EN)
single-spa is an orchestrator framework: a root-config registers the micro-frontends and decides which one is active for the current route, while each micro-frontend exports `bootstrap` / `mount` / `unmount` lifecycles that the root-config calls when entering/leaving a route. This lets you run multiple frameworks (React, Vue, Angular) on one page. Each app declares `activeWhen` (e.g., active when the path starts with `/checkout`). Difference from Module Federation: single-spa handles orchestration and lifecycle (which one shows, when to mount/unmount), while Module Federation handles loading and sharing code — in practice the two are often used together. Note: because apps mount/unmount dynamically, each must clean up thoroughly (event listeners, timers) in `unmount` to avoid memory leaks.
