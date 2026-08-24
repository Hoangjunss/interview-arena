---
id: deep-linking-la-gi-va-gorouter-ho-tro-no-nhu-the-nao
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Deep linking là gì và GoRouter hỗ trợ nó như thế nào?

## Question (EN)
What is deep linking and how does GoRouter support it?

## Đáp án chi tiết (VI)
Deep linking là mở app tại màn hình cụ thể thông qua URL (như `myapp://detail/123`). Deep link đến từ push notification, web link hoặc system intent. GoRouter hỗ trợ deep linking tự động — định nghĩa route như path: `GoRoute(path: '/detail/:id', ...)` và GoRouter khớp URL với màn hình đúng. Điều này cho phép universal links (iOS) và app links (Android) mà không cần setup thêm.

## Detailed Answer (EN)
Deep linking opens your app at a specific screen via a URL. GoRouter supports deep linking automatically by matching URL paths to the correct screens. This enables universal links on iOS and app links on Android without extra setup.
