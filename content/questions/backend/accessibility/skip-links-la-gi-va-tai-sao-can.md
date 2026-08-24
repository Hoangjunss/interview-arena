---
id: skip-links-la-gi-va-tai-sao-can
position: backend
technology: accessibility
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Skip links là gì và tại sao cần?

## Question (EN)
What are skip links and why are they needed?

## Đáp án chi tiết (VI)
Skip link là link **ẩn cho tới khi được Tab tới**, đặt đầu trang, cho phép nhảy thẳng xuống nội dung chính.\
\
```html\
\u003cbody\u003e\
  \u003ca class=\\"skip-link\\" href=\\"#main\\"\u003eBỏ qua điều hướng\u003c/a\u003e\
  \u003cheader\u003e\u003cnav\u003e… 30 link …\u003c/nav\u003e\u003c/header\u003e\
  \u003cmain id=\\"main\\" tabindex=\\"-1\\"\u003e…\u003c/main\u003e\
\u003c/body\u003e\
```\
\
```css\
.skip-link {\
  position: absolute;\
  left: 8px;\
  top: -48px;                 /* đẩy khỏi màn hình */\
  transition: top 0.14s ease;\
}\
.skip-link:focus { top: 8px; }   /* hiện ra khi Tab tới */\
```\
\
Vấn đề nó giải: người dùng bàn phím phải Tab qua **toàn bộ menu ở mọi trang** trước khi chạm được nội dung. Với menu 30 link và 5 trang, đó là 150 lần nhấn Tab thừa. WCAG 2.4.1 (Bypass Blocks) yêu cầu có cơ chế này.\
\
**Lưu ý:** dùng `display: none` để ẩn skip link — element `display: none` **không focus được**, nên link không bao giờ hiện ra. Phải đẩy ra ngoài màn hình bằng `position`/`clip`.\
\
**Kiểm tra:** tải trang, nhấn Tab một lần. Link phải hiện ra và Enter phải nhảy đúng xuống `\u003cmain\u003e`.

## Detailed Answer (EN)
$80
