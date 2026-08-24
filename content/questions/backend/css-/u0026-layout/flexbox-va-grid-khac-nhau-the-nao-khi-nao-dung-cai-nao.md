---
id: flexbox-va-grid-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: css-\u0026-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flexbox và Grid khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
Flexbox vs Grid — what is the difference and when do you use each?

## Đáp án chi tiết (VI)
- **Flexbox** = layout **một chiều** (hàng *hoặc* cột). Phân bổ không gian dọc theo một trục; hợp khi số item động và bạn muốn chúng tự co giãn/xuống dòng.\
  - Trục chính: `flex-direction`, `justify-content` (căn theo trục chính), `align-items` (căn theo trục phụ), `gap`, `flex: 1`.\
  - Dùng cho: thanh nav, toolbar, hàng nút, căn giữa một khối, danh sách card wrap.\
- **Grid** = layout **hai chiều** (hàng *và* cột cùng lúc). Bạn định nghĩa khung lưới trước rồi đặt item vào.\
  - `grid-template-columns/rows`, `gap`, `grid-area`, `repeat()`, `minmax()`, `fr`.\
  - Dùng cho: layout trang tổng thể, dashboard, gallery, layout phức tạp cần canh cả 2 chiều.\
\
Ghi nhớ: **Flexbox — nội dung định hình layout** (content-first); **Grid — layout định hình nội dung** (layout-first). Thực tế hay **kết hợp**: Grid dựng khung trang, Flexbox căn chi tiết bên trong.

## Detailed Answer (EN)
- **Flexbox** = **one-dimensional** layout (a row *or* a column). It distributes space along one axis; great when the item count is dynamic and you want them to grow/shrink/wrap.\
  - Main axis: `flex-direction`, `justify-content` (main axis), `align-items` (cross axis), `gap`, `flex: 1`.\
  - Use for: navbars, toolbars, button rows, centering a block, wrapping card lists.\
- **Grid** = **two-dimensional** layout (rows *and* columns at once). You define the grid framework first, then place items.\
  - `grid-template-columns/rows`, `gap`, `grid-area`, `repeat()`, `minmax()`, `fr`.\
  - Use for: overall page layout, dashboards, galleries, complex layouts needing alignment in both directions.\
\
Memory hook: **Flexbox — content shapes the layout** (content-first); **Grid — the layout shapes content** (layout-first). In practice they **combine**: Grid for page structure, Flexbox to align details inside.
