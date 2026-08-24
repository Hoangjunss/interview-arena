---
id: microservices-vs-monolith-frontend-architecture-federated-module
position: backend
technology: tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Microservices vs monolith frontend architecture. Federated module?

## Question (EN)
Microservices vs monolith frontend architecture. What is Module Federation?

## Đáp án chi tiết (VI)
Monolith frontend là kiến trúc một repo chứa toàn bộ code frontend, đơn giản nhưng khó scale khi team lớn vì mọi thay đổi đều phải deploy cùng lúc. Micro-frontend chia frontend thành nhiều ứng dụng nhỏ độc lập, mỗi team quản lý và deploy riêng. Module Federation cho phép các ứng dụng chia sẻ dependency tại runtime — ban đầu là tính năng của webpack, nhưng khái niệm này đã không còn giới hạn trong webpack: Vite có @originjs/vite-plugin-federation, Rspack/Rsbuild cũng hỗ trợ native. Đánh đổi là tăng độ phức tạp về infrastructure, versioning, và trải nghiệm nhất quán — chỉ phù hợp cho tổ chức lớn có nhiều team phát triển song song.

## Detailed Answer (EN)
A monolith frontend is a single repo containing all frontend code — simple but hard to scale with large teams since every change requires a coordinated deploy. Micro-frontends split the frontend into multiple independent apps, each managed and deployed by a separate team. Module Federation allows apps to share dependencies at runtime — originally a webpack feature, but the concept is now bundler-agnostic: Vite has @originjs/vite-plugin-federation, and Rspack/Rsbuild support it natively too. The tradeoffs are increased infrastructure complexity, versioning challenges, and consistent UX — only appropriate for large organizations with multiple parallel teams.
