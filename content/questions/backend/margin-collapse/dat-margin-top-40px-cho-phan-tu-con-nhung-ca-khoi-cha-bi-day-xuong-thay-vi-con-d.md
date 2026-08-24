---
id: dat-margin-top-40px-cho-phan-tu-con-nhung-ca-khoi-cha-bi-day-xuong-thay-vi-con-d
position: backend
technology: margin-collapse
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt `margin-top: 40px` cho phần tử con nhưng cả khối cha bị đẩy xuống thay vì con dịch trong cha. Vì sao và chặn thế nào?

## Question (EN)
A child has `margin-top: 40px` but the whole parent block moves down instead of the child moving inside it. Why, and how do you stop it?

## Đáp án chi tiết (VI)
Đó là **margin collapsing** giữa cha và con đầu tiên: khi không có gì ngăn cách ở cạnh trên (không border, không padding, không nội dung inline), margin-top của con **thoát ra ngoài** và hợp nhất với margin-top của cha. Giá trị cuối cùng là số **lớn nhất**, không phải tổng.\
\
Ba trường hợp collapse: giữa hai anh em kề nhau, giữa cha và con đầu/cuối, và margin trên/dưới của một khối rỗng tự hợp nhất.\
\
Cách chặn:\
\
```css\
.parent { padding-top: 1px; }      /* hoặc border-top */\
.parent { display: flow-root; }    /* tạo BFC, sạch nhất */\
.parent { display: flex; }         /* flex/grid không có margin collapse */\
```\
\
`display: flow-root` là lựa chọn hiện đại: tạo **block formatting context** mà không thêm pixel hay đổi mô hình layout của con.\
\
Lưu ý phạm vi: margin collapse chỉ xảy ra theo **chiều dọc**, chỉ trong block layout. Bên trong flex/grid container thì không có, đó là lý do `gap` cho khoảng cách đoán trước được.

## Detailed Answer (EN)
This is **margin collapsing** between a parent and its first child: with nothing separating them at the top edge (no border, no padding, no inline content), the child's top margin **escapes** and merges with the parent's. The result is the **larger** of the two, not their sum.\
\
Three collapsing cases: between adjacent siblings, between a parent and its first/last child, and the top and bottom margins of an empty block merging with each other.\
\
Ways to prevent it:\
\
```css\
.parent { padding-top: 1px; }      /* or a border-top */\
.parent { display: flow-root; }    /* creates a BFC, the cleanest fix */\
.parent { display: flex; }         /* flex/grid have no margin collapsing */\
```\
\
`display: flow-root` is the modern choice: it establishes a **block formatting context** without adding pixels or changing how the children lay out.\
\
Scope note: margin collapsing is **vertical only** and only happens in block layout. It never occurs inside a flex or grid container, which is why `gap` yields predictable spacing.
