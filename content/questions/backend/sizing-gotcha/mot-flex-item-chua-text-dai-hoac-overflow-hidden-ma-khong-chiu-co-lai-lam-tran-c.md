---
id: mot-flex-item-chua-text-dai-hoac-overflow-hidden-ma-khong-chiu-co-lai-lam-tran-c
position: backend
technology: sizing-gotcha
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một flex item chứa text dài hoặc `overflow: hidden` mà không chịu co lại, làm tràn container. Nguyên nhân và cách sửa?

## Question (EN)
A flex item holding long text (or `overflow: hidden`) refuses to shrink and overflows the container. Why, and how do you fix it?

## Đáp án chi tiết (VI)
Nguyên nhân là **`min-width: auto`** — giá trị mặc định của flex item theo trục chính. Nó nói rằng item không được co nhỏ hơn **kích thước nội dung tối thiểu** (min-content), tức là chữ dài nhất hoặc bề rộng tối thiểu của phần tử con. `flex-shrink: 1` vẫn hoạt động nhưng bị chặn ở ngưỡng đó, nên item đẩy rộng container.\
\
Cách sửa: cho phép co xuống dưới min-content.\
\
```css\
.item {\
  flex: 1;\
  min-width: 0;   /* trục chính là row */\
}\
.item.column-child {\
  min-height: 0;  /* tương ứng khi flex-direction: column */\
}\
```\
\
Dấu hiệu nhận biết: chỉ xảy ra khi con có nội dung không xuống dòng được (URL dài, `white-space: nowrap`, `\u003ctable\u003e`, `\u003cpre\u003e`, hoặc chính nó là flex/grid container). Sau khi đặt `min-width: 0` thì `text-overflow: ellipsis` mới ăn.\
\
Lỗi tương đương ở Grid: dùng `minmax(0, 1fr)` thay cho `1fr`.

## Detailed Answer (EN)
The cause is **`min-width: auto`**, the default minimum size of a flex item on the main axis. It says the item may not shrink below its **min-content size** — the longest unbreakable word or the minimum width of its children. `flex-shrink: 1` still runs, but it is clamped at that floor, so the item pushes the container wider.\
\
The fix is to allow shrinking below min-content:\
\
```css\
.item {\
  flex: 1;\
  min-width: 0;   /* main axis is row */\
}\
.item.column-child {\
  min-height: 0;  /* the equivalent when flex-direction: column */\
}\
```\
\
Tell-tale sign: it only happens when the child holds unbreakable content (a long URL, `white-space: nowrap`, a `\u003ctable\u003e`, a `\u003cpre\u003e`, or a nested flex/grid container). Only after `min-width: 0` will `text-overflow: ellipsis` take effect.\
\
The Grid equivalent of this bug: use `minmax(0, 1fr)` instead of `1fr`.
