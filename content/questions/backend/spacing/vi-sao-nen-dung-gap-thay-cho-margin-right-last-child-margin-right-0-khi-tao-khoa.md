---
id: vi-sao-nen-dung-gap-thay-cho-margin-right-last-child-margin-right-0-khi-tao-khoa
position: backend
technology: spacing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao nên dùng `gap` thay cho `margin-right` + `:last-child { margin-right: 0 }` khi tạo khoảng cách giữa các item?

## Question (EN)
Why prefer `gap` over `margin-right` plus a `:last-child { margin-right: 0 }` reset for spacing items?

## Đáp án chi tiết (VI)
`gap` khai báo khoảng cách **giữa** các item và chỉ áp dụng ở phần ở giữa — không sinh margin thừa ở hai đầu, nên không cần luật bù `:last-child`.\
\
```css\
/* cách cũ: 2 luật, dễ sai khi item wrap xuống dòng */\
.list \u003e * { margin-right: 12px; }\
.list \u003e *:last-child { margin-right: 0; }\
\
/* cách hiện tại */\
.list { display: flex; flex-wrap: wrap; gap: 12px; }\
```\
\
Ưu điểm cụ thể:\
- **Wrap đúng**: khi item xuống dòng, `gap` cũng tạo khoảng cách **giữa các dòng** (`row-gap`); margin-right thì không, phải thêm `margin-bottom` và lại thừa ở dòng cuối.\
- **Không cộng dồn / không collapse**: gap không tham gia margin collapsing nên khoảng cách luôn đúng bằng giá trị khai báo.\
- **Không đụng tới con**: khoảng cách do container quyết định, component con giữ được tính tái sử dụng (không tự mang margin theo).\
\
Lưu ý: `gap` cần container là flex, grid hoặc multi-column. Với phần tử block thường vẫn phải dùng margin.

## Detailed Answer (EN)
`gap` declares spacing **between** items and applies only in between — no leftover margin at the edges, so no compensating `:last-child` rule.\
\
```css\
/* old way: two rules, and it breaks once items wrap */\
.list \u003e * { margin-right: 12px; }\
.list \u003e *:last-child { margin-right: 0; }\
\
/* current way */\
.list { display: flex; flex-wrap: wrap; gap: 12px; }\
```\
\
Concrete advantages:\
- **Wrapping works**: when items wrap, `gap` also spaces **between lines** (`row-gap`); `margin-right` does not, so you add `margin-bottom` and get an extra one after the last row.\
- **No collapsing surprises**: gap never participates in margin collapsing, so the spacing is exactly what you declared.\
- **Children stay clean**: spacing is owned by the container, so child components stay reusable instead of carrying their own margins.\
\
Caveat: `gap` requires a flex, grid, or multi-column container. Plain block elements still need margins.
