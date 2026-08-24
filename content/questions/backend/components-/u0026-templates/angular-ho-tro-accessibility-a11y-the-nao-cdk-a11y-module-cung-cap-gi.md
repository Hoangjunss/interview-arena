---
id: angular-ho-tro-accessibility-a11y-the-nao-cdk-a11y-module-cung-cap-gi
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular hỗ trợ accessibility (a11y) thế nào? CDK a11y module cung cấp gì?

## Question (EN)
How does Angular support accessibility (a11y)? What does the CDK a11y module provide?

## Đáp án chi tiết (VI)
Angular xây accessible component qua: semantic HTML, ARIA attributes, và **`@angular/cdk/a11y`** (stable) — bộ utility a11y dùng phổ biến trong production.\
\
**Các tool chính của CDK a11y:**\
- **`FocusTrap`** (`cdkTrapFocus`) — giữ focus trong modal/dialog, không cho tab ra ngoài.\
- **`LiveAnnouncer`** — đọc thông báo động cho screen reader (`announce(\\"Đã lưu\\")`).\
- **`FocusMonitor`** — theo dõi focus đến từ chuột/bàn phím/programmatic để style khác nhau.\
- **`cdkAriaLive`**, **`A11yModule`** cho keyboard navigation list (`ListKeyManager`).\
\
```typescript\
constructor(private announcer: LiveAnnouncer) {}\
save() { this.announcer.announce(\\"Đã lưu thành công\\

## Detailed Answer (EN)
Angular builds accessible components via: semantic HTML, ARIA attributes, and **`@angular/cdk/a11y`** (stable) — the a11y utility set widely used in production.\
\
**Key CDK a11y tools:**\
- **`FocusTrap`** (`cdkTrapFocus`) — keeps focus inside a modal/dialog, preventing tabbing out.\
- **`LiveAnnouncer`** — announces dynamic messages to screen readers (`announce(\\"Saved\\")`).\
- **`FocusMonitor`** — tracks whether focus came from mouse/keyboard/programmatic to style differently.\
- **`cdkAriaLive`**, **`A11yModule`** for keyboard list navigation (`ListKeyManager`).\
\
```typescript\
constructor(private announcer: LiveAnnouncer) {}\
save() { this.announcer.announce(\\"Saved successfully\\
