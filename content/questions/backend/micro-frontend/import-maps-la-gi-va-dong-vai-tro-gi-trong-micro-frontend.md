---
id: import-maps-la-gi-va-dong-vai-tro-gi-trong-micro-frontend
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Import maps là gì và đóng vai trò gì trong micro-frontend?

## Question (EN)
What are import maps and what role do they play in micro-frontends?

## Đáp án chi tiết (VI)
Import map khai báo URL thật cho mỗi \\"bare specifier\\" — ví dụ `\\"react\\"` trỏ tới một URL CDN cụ thể — cho phép trình duyệt nạp ES module và chia sẻ dependency lúc runtime mà KHÔNG cần một bundler tích hợp tất cả lại. single-spa dùng import maps để mỗi micro-frontend deploy độc lập nhưng cùng trỏ về một bản React duy nhất (tránh tải trùng). Đổi version thư viện chỉ là sửa map, không phải rebuild toàn bộ host. Trình duyệt hiện đại hỗ trợ import maps natively. Lưu ý: import maps là chuẩn web nhưng trình duyệt cũ cần polyfill (SystemJS); và các micro-frontend vẫn phải đồng thuận version của thư viện chia sẻ để tránh xung đột runtime.

## Detailed Answer (EN)
An import map declares the real URL for each \\"bare specifier\\" — e.g., `\\"react\\"` points to a specific CDN URL — letting the browser load ES modules and share dependencies at runtime WITHOUT a bundler stitching everything together. single-spa uses import maps so each micro-frontend deploys independently yet points to a single copy of React (avoiding duplicate loading). Changing a library version is just editing the map, not rebuilding the whole host. Modern browsers support import maps natively. Note: import maps are a web standard but older browsers need a polyfill (SystemJS); and micro-frontends must still agree on shared library versions to avoid runtime conflicts.
