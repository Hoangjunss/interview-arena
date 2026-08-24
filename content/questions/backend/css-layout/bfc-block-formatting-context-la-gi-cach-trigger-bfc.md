---
id: bfc-block-formatting-context-la-gi-cach-trigger-bfc
position: backend
technology: css-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BFC (Block Formatting Context) là gì? Cách trigger BFC?

## Question (EN)
What is BFC (Block Formatting Context)? How do you trigger one?

## Đáp án chi tiết (VI)
BFC (Block Formatting Context) là một vùng layout độc lập trong CSS, nơi các phần tử bên trong không ảnh hưởng đến layout bên ngoài và ngược lại. Cách tạo BFC gồm: overflow: auto hoặc hidden, display: flex hoặc grid, position: absolute hoặc fixed, float: left hoặc right.\
\
BFC hữu ích để giải quyết nhiều vấn đề CSS phổ biến như: ngăn margin collapse giữa parent và child, chứa float element bên trong container, và ngăn text bọc quanh float element. Hiểu BFC giúp debug layout CSS hiệu quả hơn nhiều.

## Detailed Answer (EN)
A BFC (Block Formatting Context) is an independent layout region in CSS where elements inside don't affect the layout outside and vice versa. Ways to create a BFC: `overflow: auto` or `hidden`, `display: flex` or `grid`, `position: absolute` or `fixed`, `float: left` or `right`. BFC is useful for: preventing margin collapse between parent and child, containing floated elements inside a container, and preventing text from wrapping around floated elements. Understanding BFC makes CSS layout debugging significantly easier.
