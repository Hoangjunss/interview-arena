---
id: docker-la-gi-frontend-developer-can-biet-gi-ve-docker
position: backend
technology: docker-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker là gì? Frontend developer cần biết gì về Docker?

## Question (EN)
What is Docker? What does a frontend developer need to know about it?

## Đáp án chi tiết (VI)
Docker đóng gói ứng dụng và dependencies vào container, đảm bảo chạy giống nhau trên mọi máy (dev, staging, production). Frontend dev cần biết: (1) Dockerfile multi-stage — stage 1 build app, stage 2 chỉ copy file build sang nginx/node, giảm image từ 1GB xuống ~100MB. (2) docker-compose.yml để chạy frontend + backend + database cùng lúc bằng `docker-compose up`. (3) .dockerignore loại `node_modules` và `.next` tránh copy file thừa. Lưu ý quan trọng: environment variables phải inject lúc runtime (`docker run -e`), không hardcode vào image vì image dùng chung cho nhiều môi trường.

## Detailed Answer (EN)
Docker packages an application and its dependencies into a container, ensuring it runs identically across all environments (dev, staging, production). Frontend devs should know: (1) Multi-stage Dockerfile — stage 1 builds the app, stage 2 copies only the build output into nginx/node, shrinking the image from 1GB to ~100MB. (2) docker-compose.yml to run frontend + backend + database together with `docker-compose up`. (3) .dockerignore to exclude `node_modules` and `.next` to avoid copying unnecessary files. Critical note: environment variables must be injected at runtime (`docker run -e`), not hardcoded into the image, since one image serves multiple environments.
