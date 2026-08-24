---
id: nhung-van-de-gi-xay-ra-voi-navigator-1-0-named-routes-khi-app-lon
position: backend
technology: navigation-\u0026-routing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những vấn đề gì xảy ra với Navigator 1.0 named routes khi app lớn?

## Question (EN)
What problems occur with Navigator 1.0 named routes at scale?

## Đáp án chi tiết (VI)
Navigator 1.0 yêu cầu quản lý navigation state và back stack thủ công. Named route hoạt động nhưng xử lý deep linking kém — phải thêm nhiều boilerplate. Navigation phức tạp (nested stack, conditional routing) trở nên rối. Toàn bộ navigation tree là global, khó để lý luận. GoRouter giải quyết tất cả bằng cách cung cấp declarative, URL-based routing tự động xử lý back stack và deep linking.

## Detailed Answer (EN)
Navigator 1.0 requires manually managing the navigation state and back stack. Named routes handle deep linking poorly, requiring significant boilerplate. Complex navigation becomes messy. GoRouter solves these by providing declarative, URL-based routing that automatically handles back stack and deep linking.
