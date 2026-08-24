---
id: margin-collapsing-trong-css-tai-sao-margin-20px-cong-voi-margin-30px-khong-bang
position: backend
technology: css-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Margin collapsing trong CSS. Tại sao margin: 20px cộng với margin: 30px không bằng 50px?

## Question (EN)
What is margin collapsing in CSS? Why doesn't margin: 20px + margin: 30px equal 50px?

## Đáp án chi tiết (VI)
Margin collapsing là hiện tượng margin dọc (vertical) của hai block-level element liền kề bị gộp lại thành một margin duy nhất, lấy giá trị lớn hơn — nên margin 20px + 30px chỉ còn 30px chứ không phải 50px. Margin ngang (horizontal) không bị collapse. Để ngăn collapse, có thể tạo BFC bằng overflow: hidden hoặc dùng padding thay thế. Ngoài ra flexbox và grid cũng không bị margin collapse, nên khi dùng display: flex hoặc grid thì margin luôn cộng đúng như mong đợi.

## Detailed Answer (EN)
Margin collapsing is when the vertical margins of two adjacent block-level elements merge into a single margin equal to the larger of the two — so 20px + 30px becomes 30px, not 50px. Horizontal margins do not collapse. To prevent collapsing, create a BFC with `overflow: hidden` or use padding instead. Flexbox and Grid containers also never experience margin collapse, so in `display: flex` or `display: grid` contexts, margins always add up as expected.
