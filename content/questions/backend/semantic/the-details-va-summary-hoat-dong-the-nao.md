---
id: the-details-va-summary-hoat-dong-the-nao
position: backend
technology: semantic
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thẻ `\u003cdetails\u003e` và `\u003csummary\u003e` hoạt động thế nào?

## Question (EN)
How do `\u003cdetails\u003e` and `\u003csummary\u003e` work?

## Đáp án chi tiết (VI)
`\u003cdetails\u003e` là accordion **có sẵn trong browser**, không cần JS.\
\
```html\
\u003cdetails name=\\"faq\\"\u003e                \u003c!-- name: chỉ mở 1 cái tại một thời điểm --\u003e\
  \u003csummary\u003eCó hoàn tiền không?\u003c/summary\u003e\
  \u003cp\u003eHoàn 100% trong 7 ngày đầu.\u003c/p\u003e\
\u003c/details\u003e\
\
\u003cdetails open\u003e                       \u003c!-- mở sẵn --\u003e\
  \u003csummary\u003eĐiều khoản\u003c/summary\u003e\
  \u003cp\u003e...\u003c/p\u003e\
\u003c/details\u003e\
```\
\
```css\
details \u003e summary { list-style: none; cursor: pointer; }  /* bỏ mũi tên mặc định */\
details[open] \u003e summary { font-weight: 600; }\
```\
\
Lợi thế so với accordion tự viết: có sẵn bàn phím (Enter/Space), đúng vai trò cho screen reader, và **nội dung bên trong vẫn được Ctrl+F tìm thấy** — browser tự bung ra.\
\
```js\
detailsEl.addEventListener('toggle', () =\u003e console.log(detailsEl.open))\
```\
\
**Lưu ý:** đặt animation `height` cho phần nội dung sẽ không chạy vì browser toggle thẳng `display`. Dùng `::details-content` hoặc animate phần tử con thay vì chính `\u003cdetails\u003e`.

## Detailed Answer (EN)
`\u003cdetails\u003e` is an accordion **built into the browser**, no JS required.\
\
```html\
\u003cdetails name=\\"faq\\"\u003e                \u003c!-- name: only one open at a time --\u003e\
  \u003csummary\u003eDo you offer refunds?\u003c/summary\u003e\
  \u003cp\u003eFull refund within the first 7 days.\u003c/p\u003e\
\u003c/details\u003e\
\
\u003cdetails open\u003e                       \u003c!-- open by default --\u003e\
  \u003csummary\u003eTerms\u003c/summary\u003e\
  \u003cp\u003e...\u003c/p\u003e\
\u003c/details\u003e\
```\
\
```css\
details \u003e summary { list-style: none; cursor: pointer; }  /* drop the default marker */\
details[open] \u003e summary { font-weight: 600; }\
```\
\
What it gives you over a hand-rolled accordion: keyboard support (Enter/Space), the correct screen-reader role, and **content that Ctrl+F can still find** — the browser expands it for you.\
\
```js\
detailsEl.addEventListener('toggle', () =\u003e console.log(detailsEl.open))\
```\
\
**Note:** animating the panel `height` does nothing, because the browser toggles `display` outright. Target `::details-content` or animate an inner wrapper instead of `\u003cdetails\u003e` itself.
