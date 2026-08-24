---
id: fr-unit-la-gi
position: backend
technology: grid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
fr unit là gì?

## Question (EN)
What is the fr unit?

## Đáp án chi tiết (VI)
`fr` (fraction) chia **phần không gian còn lại** của grid container sau khi đã trừ mọi kích thước cố định và `gap`.\
\
```css\
.grid {\
  display: grid;\
  grid-template-columns: 200px 1fr 2fr;\
  gap: 16px;\
}\
/* container 1000px:\
   1000 - 200 (cột cố định) - 32 (2 gap) = 768px còn lại\
   1fr = 256px, 2fr = 512px */\
```\
\
Vì sao hơn `%`:\
\
```css\
.a { grid-template-columns: 33.33% 33.33% 33.33%; gap: 16px; }  /* TRÀN: % không trừ gap */\
.b { grid-template-columns: repeat(3, 1fr); gap: 16px; }        /* vừa khít */\
```\
\
Kết hợp với `minmax()` để không co quá nhỏ:\
\
```css\
.cards { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }\
```\
\
**Lưu ý:** `1fr` thực chất là `minmax(auto, 1fr)`, nghĩa là **không co nhỏ hơn nội dung**. Một cột chứa chuỗi dài hoặc `\u003cpre\u003e` sẽ phá vỡ tỉ lệ dù bạn đặt `1fr 1fr`. Cách sửa:\
\
```css\
.grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }\
```\
\
Đây là bug grid hay gặp nhất khi trong ô có bảng hoặc code block.

## Detailed Answer (EN)
`fr` (fraction) divides the **remaining space** in a grid container after all fixed sizes and `gap` have been subtracted.\
\
```css\
.grid {\
  display: grid;\
  grid-template-columns: 200px 1fr 2fr;\
  gap: 16px;\
}\
/* in a 1000px container:\
   1000 - 200 (fixed column) - 32 (two gaps) = 768px left\
   1fr = 256px, 2fr = 512px */\
```\
\
Why it beats `%`:\
\
```css\
.a { grid-template-columns: 33.33% 33.33% 33.33%; gap: 16px; }  /* OVERFLOWS: % ignores gap */\
.b { grid-template-columns: repeat(3, 1fr); gap: 16px; }        /* fits exactly */\
```\
\
Combine with `minmax()` so tracks do not get too narrow:\
\
```css\
.cards { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }\
```\
\
**Note:** `1fr` really means `minmax(auto, 1fr)`, so it **will not shrink below its content**. A column holding a long string or a `\u003cpre\u003e` breaks the ratio even with `1fr 1fr`. The fix:\
\
```css\
.grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }\
```\
\
This is the most common grid bug when cells contain tables or code blocks.
