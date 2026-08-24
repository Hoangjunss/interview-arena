---
id: caching-strategies-cho-frontend-app
position: system-design
technology: interview-scenarios
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Caching strategies cho frontend app?

## Question (EN)
What are the caching strategies for a frontend app?

## Đáp án chi tiết (VI)
Có nhiều tầng caching cho frontend application, mỗi tầng phục vụ mục đích khác nhau. Tầng trình duyệt dùng HTTP headers như Cache-Control và ETag để cache tài nguyên tĩnh (JS, CSS, images), giúp giảm network requests khi user quay lại trang.\
\
Tầng ứng dụng dùng React Query hoặc SWR với chiến lược stale-while-revalidate để cache dữ liệu API — hiển thị data cũ ngay lập tức rồi cập nhật phía sau, mang lại trải nghiệm nhanh cho user. Service Worker cho phép xây dựng ứng dụng offline-first bằng cách cache resources trong Cache API.\
\
Ngoài ra còn localStorage cho user preferences, SessionStorage cho form drafts tạm thời, IndexedDB cho tập dữ liệu lớn cần truy vấn, và CDN cho static assets giúp giảm latency theo vùng địa lý.

## Detailed Answer (EN)
Frontend caching operates at multiple layers, each serving a different purpose. Browser layer: HTTP headers like Cache-Control and ETag cache static assets (JS, CSS, images), reducing network requests on return visits. Application layer: React Query or SWR with stale-while-revalidate strategy caches API data — show stale data immediately while revalidating in the background for a fast user experience. Service Workers enable offline-first apps by caching resources in the Cache API. Also: localStorage for user preferences, SessionStorage for temporary form drafts, IndexedDB for large queryable datasets, and a CDN for static assets to reduce geographic latency.
