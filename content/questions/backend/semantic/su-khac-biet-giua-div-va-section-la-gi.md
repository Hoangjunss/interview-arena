---
id: su-khac-biet-giua-div-va-section-la-gi
position: backend
technology: semantic
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa `\u003cdiv\u003e` và `\u003csection\u003e` là gì?

## Question (EN)
What is the difference between `\u003cdiv\u003e` and `\u003csection\u003e`?

## Đáp án chi tiết (VI)
`\u003cdiv\u003e` là **container không mang nghĩa**; `\u003csection\u003e` là **một khối nội dung có chủ đề riêng**.\
\
```html\
\u003c!-- div: chỉ để bọc cho layout --\u003e\
\u003cdiv class=\\"grid\\"\u003e\
  \u003csection\u003e\
    \u003ch2\u003eMô tả sản phẩm\u003c/h2\u003e\
    \u003cp\u003e...\u003c/p\u003e\
  \u003c/section\u003e\
  \u003csection\u003e\
    \u003ch2\u003eĐánh giá\u003c/h2\u003e\
    \u003cp\u003e...\u003c/p\u003e\
  \u003c/section\u003e\
\u003c/div\u003e\
```\
\
Quy tắc quyết định:\
- Chỉ cần chỗ để gắn `display:flex`, padding, background → **`\u003cdiv\u003e`**.\
- Khối này có **tiêu đề riêng** và có thể xuất hiện trong mục lục của trang → **`\u003csection\u003e`**.\
\
Spec nói rõ: `\u003csection\u003e` **nên luôn có heading**. Một `\u003csection\u003e` không heading thì với screen reader gần như vô dụng, và đúng ra nên là `\u003cdiv\u003e`.\
\
**Lưu ý:** đổi hết `\u003cdiv\u003e` thành `\u003csection\u003e` cho \\"semantic hơn\\" là phản tác dụng — landmark bị loãng, screen reader phải đọc qua hàng chục region vô danh.

## Detailed Answer (EN)
`\u003cdiv\u003e` is a **meaningless container**; `\u003csection\u003e` is a **thematic block of content**.\
\
```html\
\u003c!-- div: purely for layout --\u003e\
\u003cdiv class=\\"grid\\"\u003e\
  \u003csection\u003e\
    \u003ch2\u003eProduct description\u003c/h2\u003e\
    \u003cp\u003e...\u003c/p\u003e\
  \u003c/section\u003e\
  \u003csection\u003e\
    \u003ch2\u003eReviews\u003c/h2\u003e\
    \u003cp\u003e...\u003c/p\u003e\
  \u003c/section\u003e\
\u003c/div\u003e\
```\
\
How to decide:\
- You just need something to hang `display:flex`, padding or a background on → **`\u003cdiv\u003e`**.\
- The block has **its own heading** and would belong in a page outline → **`\u003csection\u003e`**.\
\
The spec is explicit: a `\u003csection\u003e` **should always have a heading**. A headingless section is nearly useless to a screen reader and should have been a `\u003cdiv\u003e`.\
\
**Note:** replacing every `\u003cdiv\u003e` with `\u003csection\u003e` to be \\"more semantic\\" backfires — the landmark list gets diluted and screen readers wade through dozens of unnamed regions.
