---
id: goi-api-va-caching-trong-app-mobile-nen-lam-the-nao
position: backend
technology: networking
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi API và caching trong app mobile nên làm thế nào?

## Question (EN)
How should you handle API integration and caching in a mobile app?

## Đáp án chi tiết (VI)
Mạng mobile chập chờn và tốn pin, nên tầng networking cần chắc chắn:\
\
- **Gọi API**: dùng `fetch`/axios (RN), Retrofit (Android), Dio (Flutter). Đặt **timeout**, hủy request khi rời màn, xử lý lỗi và trạng thái loading rõ ràng.\
- **Retry có kiểm soát**: thử lại với **backoff** cho lỗi mạng/5xx; tôn trọng `Retry-After` khi bị `429`.\
- **Caching**:\
  - HTTP cache theo header (`Cache-Control`, `ETag`/`If-None-Match` để validate, tiết kiệm băng thông).\
  - Cache tầng ứng dụng: lưu response vào bộ nhớ/đĩa (SQLite/Room) để đọc offline.\
  - Mẫu **stale-while-revalidate**: hiện dữ liệu cache ngay rồi âm thầm cập nhật (thư viện như React Query/SWR, TanStack Query giúp sẵn cache/invalidation).\
\
Hay hỏi: khác biệt giữa HTTP cache và cache tầng app, và cách chống hiển thị dữ liệu cũ.

## Detailed Answer (EN)
Mobile networks are flaky and battery-costly, so the networking layer must be robust:\
\
- **API calls**: use `fetch`/axios (RN), Retrofit (Android), Dio (Flutter). Set **timeouts**, cancel requests on screen exit, and handle errors and loading states clearly.\
- **Controlled retry**: retry with **backoff** for network/5xx errors; honor `Retry-After` on `429`.\
- **Caching**:\
  - HTTP cache via headers (`Cache-Control`, `ETag`/`If-None-Match` to validate and save bandwidth).\
  - App-level cache: store responses in memory/disk (SQLite/Room) for offline reads.\
  - The **stale-while-revalidate** pattern: show cached data immediately, then refresh silently (libraries like React Query/SWR, TanStack Query provide caching/invalidation).\
\
Common ask: the difference between HTTP cache and app-level cache, and how to avoid showing stale data.
