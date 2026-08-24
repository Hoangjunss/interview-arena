---
id: figure-va-figcaption-dung-de-lam-gi
position: backend
technology: semantic
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003cfigure\u003e` và `\u003cfigcaption\u003e` dùng để làm gì?

## Question (EN)
What are `\u003cfigure\u003e` and `\u003cfigcaption\u003e` used for?

## Đáp án chi tiết (VI)
`\u003cfigure\u003e` gói **nội dung minh hoạ tách được** khỏi mạch văn (ảnh, biểu đồ, đoạn code, video); `\u003cfigcaption\u003e` là chú thích của nó, đặt ở đầu hoặc cuối.\
\
```html\
\u003cfigure\u003e\
  \u003cimg src=\\"chart.png\\" alt=\\"Doanh thu tăng từ 2 tỷ lên 5 tỷ trong Q1 2026\\"\u003e\
  \u003cfigcaption\u003eDoanh thu quý 1/2026 theo tháng\u003c/figcaption\u003e\
\u003c/figure\u003e\
```\
\
Điểm hay bị nhầm: **`figcaption` không thay được `alt`**.\
\
| | Ai đọc được | Nói cái gì |\
|---|---|---|\
| `alt` | chỉ screen reader | **nội dung** của ảnh |\
| `\u003cfigcaption\u003e` | mọi người | **ngữ cảnh** của ảnh |\
\
Nếu caption đã mô tả đủ nội dung ảnh thì để `alt=\\"\\"` là đúng — tránh screen reader đọc hai lần.\
\
**Lưu ý:** dùng `\u003cfigure\u003e` cho ảnh trang trí trong layout. Figure hàm ý \\"có thể chuyển sang phụ lục mà bài vẫn đọc được\\" — banner hay icon không thuộc nhóm này, để `\u003cimg\u003e` thường.

## Detailed Answer (EN)
`\u003cfigure\u003e` wraps **self-contained illustrative content** (image, chart, code block, video); `\u003cfigcaption\u003e` is its caption, placed first or last.\
\
```html\
\u003cfigure\u003e\
  \u003cimg src=\\"chart.png\\" alt=\\"Revenue rising from 2B to 5B during Q1 2026\\"\u003e\
  \u003cfigcaption\u003eQ1 2026 revenue by month\u003c/figcaption\u003e\
\u003c/figure\u003e\
```\
\
The usual confusion: **`figcaption` does not replace `alt`**.\
\
| | Who gets it | What it conveys |\
|---|---|---|\
| `alt` | screen readers only | the **content** of the image |\
| `\u003cfigcaption\u003e` | everyone | the **context** of the image |\
\
When the caption already describes the image fully, `alt=\\"\\"` is the right call — it stops screen readers announcing it twice.\
\
**Note:** using `\u003cfigure\u003e` for decorative layout images. Figure implies \\"could move to an appendix and the text still reads\\" — banners and icons do not qualify, plain `\u003cimg\u003e` is right for those.
