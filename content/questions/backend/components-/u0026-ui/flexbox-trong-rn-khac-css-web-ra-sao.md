---
id: flexbox-trong-rn-khac-css-web-ra-sao
position: backend
technology: components-\u0026-ui
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flexbox trong RN khác CSS web ra sao?

## Question (EN)
How does Flexbox in RN differ from CSS on the web?

## Đáp án chi tiết (VI)
RN dùng Yoga engine của Meta — implement subset Flexbox. Khác biệt **quan trọng**:\
\
- **Default `flexDirection` là `column`** (web là `row`). Cần nhớ: `\u003cView\u003e` xếp children **theo chiều dọc** mặc định.\
- **`flex: 1` viết tắt** cho `flexGrow: 1, flexShrink: 1, flexBasis: 0` (đa số case web cũng vậy).\
- **Không có `display: block/inline`** — chỉ flex hoặc absolute. `\u003cText\u003e` luôn inline-like trong cùng một `\u003cText\u003e` cha, ngoài ra render block.\
- **Không có `gap`** đến RN 0.71; từ 0.71+ có `gap`/`rowGap`/`columnGap`.\
- **Không có `auto`** cho margin trong vài context cũ — `marginLeft: 'auto'` để đẩy phải hoạt động trong flex.\
- **`alignSelf: stretch`** là default (web là `auto`).\
- **`%` đơn vị** chỉ work cho width/height/margin/padding/flexBasis — không cho mọi prop.\
- **Không có `float`, `grid`, `multi-column`, `position: sticky`**.\
\
Một số quirk: `aspectRatio` được hỗ trợ, `transform` array thay vì string, `position: absolute` định vị theo gần nhất parent có `position: relative` — giống web.

## Detailed Answer (EN)
$83
