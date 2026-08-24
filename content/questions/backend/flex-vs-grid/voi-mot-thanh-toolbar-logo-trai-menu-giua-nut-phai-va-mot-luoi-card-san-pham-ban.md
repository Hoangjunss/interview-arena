---
id: voi-mot-thanh-toolbar-logo-trai-menu-giua-nut-phai-va-mot-luoi-card-san-pham-ban
position: backend
technology: flex-vs-grid
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với một thanh toolbar (logo trái, menu giữa, nút phải) và một lưới card sản phẩm, bạn chọn Flexbox hay Grid cho từng cái? Vì sao?

## Question (EN)
For a toolbar (logo left, menu centre, button right) and a product card grid, which do you pick — Flexbox or Grid? Why?

## Đáp án chi tiết (VI)
**Toolbar → Flexbox. Lưới card → Grid.**\
\
Tiêu chí chọn: Flexbox là layout **một chiều** — bố trí một hàng (hoặc một cột) và phân phối không gian dư theo nội dung. Grid là layout **hai chiều** — định nghĩa hàng và cột trước, rồi xếp item vào ô.\
\
```css\
.toolbar {\
  display: flex;\
  align-items: center;\
  gap: 16px;\
}\
.toolbar .menu { flex: 1; } /* đẩy nút sang phải */\
\
.products {\
  display: grid;\
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\
  gap: 16px;\
}\
```\
\
Toolbar cần các phần tử tự co giãn theo nội dung và căn theo trục ngang → Flexbox tự nhiên hơn. Lưới card cần các cột **thẳng hàng cả ngang lẫn dọc** và số cột đổi theo bề rộng → Grid làm được bằng một dòng khai báo, còn Flexbox phải tính `width` theo phần trăm và trừ gap thủ công.\
\
Hai cái không loại trừ nhau: thường Grid cho khung trang, Flexbox cho nội dung bên trong từng ô.

## Detailed Answer (EN)
**Toolbar → Flexbox. Card grid → Grid.**\
\
The deciding factor: Flexbox is **one-dimensional** — lay out a single row (or column) and distribute free space based on content. Grid is **two-dimensional** — you declare rows and columns up front, then place items into cells.\
\
```css\
.toolbar {\
  display: flex;\
  align-items: center;\
  gap: 16px;\
}\
.toolbar .menu { flex: 1; } /* pushes the button to the right */\
\
.products {\
  display: grid;\
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\
  gap: 16px;\
}\
```\
\
A toolbar needs elements that size themselves from content and align on one axis → Flexbox fits. A card grid needs columns that line up **both horizontally and vertically** with a column count that adapts to width → Grid does that in one declaration, while Flexbox would require percentage widths with manual gap subtraction.\
\
They are not mutually exclusive: Grid for the page frame, Flexbox for the content inside each cell is the usual split.
