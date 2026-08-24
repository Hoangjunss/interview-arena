---
id: stacking-context-trong-css-tai-sao-z-index-khong-work
position: backend
technology: css-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stacking context trong CSS. Tại sao z-index không work?

## Question (EN)
What is a stacking context in CSS? Why does z-index sometimes not work?

## Đáp án chi tiết (VI)
Stacking context là hệ thống phân lớp trong CSS, mỗi context tạo ra một hệ thống z-index riêng biệt. Các thuộc tính tạo stacking context mới gồm: position kết hợp z-index, opacity nhỏ hơn 1, transform, filter, và nhiều thuộc tính khác. z-index không hoạt động thường vì hai phần tử nằm trong hai stacking context khác nhau — lúc này z-index chỉ so sánh trong cùng context, không xuyên qua được context cha.\
\
Giải pháp là kiểm tra stacking context của các phần tử cha, điều chỉnh cho chúng nằm cùng context, hoặc sắp xếp lại thứ tự HTML.

## Detailed Answer (EN)
A stacking context is a layering system in CSS; each context creates its own independent z-index scope. Properties that create a new stacking context include: `position` + `z-index`, `opacity` less than 1, `transform`, `filter`, and several others. z-index stops working as expected when two elements are in different stacking contexts — z-index only compares within the same context and cannot cross into a parent context. The fix: inspect the stacking contexts of ancestor elements, adjust them so both elements share the same context, or reorder the HTML.
