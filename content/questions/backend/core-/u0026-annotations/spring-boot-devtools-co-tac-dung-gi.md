---
id: spring-boot-devtools-co-tac-dung-gi
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Boot DevTools có tác dụng gì?

## Question (EN)
What does Spring Boot DevTools do?

## Đáp án chi tiết (VI)
**DevTools** là optional dependency tăng tốc dev — auto restart + reload khi đổi file. Thêm dependency `spring-boot-devtools` (scope optional).\
\
**Tính năng:**\
- **Automatic restart** — detect file đổi trên classpath → restart context ~1-2s (nhanh nhờ 2 ClassLoader: libs vs app code, chỉ reload app).\
- **LiveReload** — browser tự refresh sau restart.\
- **Property defaults** — tắt cache template (Thymeleaf), bật debug logging.\
\
**Tự động tắt** khi chạy `java -jar` (fully packaged) hoặc môi trường production. **Không dùng trong production** — chậm, không an toàn.

## Detailed Answer (EN)
**DevTools** is an optional dependency that speeds up dev — auto restart + reload on file changes. Add the `spring-boot-devtools` dependency (optional scope).\
\
**Features:**\
- **Automatic restart** — detects classpath file changes → restarts context in ~1-2s (fast via two ClassLoaders: libs vs app code, only app reloads).\
- **LiveReload** — browser auto-refreshes after restart.\
- **Property defaults** — disables template caching (Thymeleaf), enables debug logging.\
\
**Auto-disabled** when running as `java -jar` (fully packaged) or in production. **Do not use in production** — adds overhead, unsafe.
