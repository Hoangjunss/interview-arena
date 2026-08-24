---
id: dung-web-components-cho-micro-frontend-nhu-the-nao
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng Web Components cho micro-frontend như thế nào?

## Question (EN)
How do you use Web Components for micro-frontends?

## Đáp án chi tiết (VI)
Mỗi micro-frontend được đóng gói thành một custom element (ví dụ `\u003cteam-cart\u003e`), shell chỉ cần đặt thẻ đó vào DOM là xong — đây là cách chuẩn hoá interface giữa các framework khác nhau. Custom Elements cộng Shadow DOM cho phép tách biệt style một cách tự nhiên, và giao tiếp với khung qua attributes (vào) và DOM events (ra). Rất hợp khi cần trộn React, Vue, Angular. Hạn chế: SSR và hydrate phức tạp hơn, một số framework cần wrapper để xuất ra custom element. Lưu ý: Shadow DOM tách biệt style nên design system/theme chung khó lọt vào — dùng CSS custom properties hoặc `::part()` để cho phép tuỳ biến xuyên qua ranh giới shadow.

## Detailed Answer (EN)
Each micro-frontend is packaged as a custom element (e.g., `\u003cteam-cart\u003e`), and the shell just places that tag in the DOM — this standardizes the interface across different frameworks. Custom Elements plus Shadow DOM allow natural style isolation, and communication with the shell happens via attributes (in) and DOM events (out). It fits well when mixing React, Vue, and Angular. Limitations: SSR and hydration are more complex, and some frameworks need a wrapper to emit a custom element. Note: Shadow DOM isolates styles, so a shared design system/theme can't easily get in — use CSS custom properties or `::part()` to allow customization across the shadow boundary.
