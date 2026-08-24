---
id: flex-1-la-viet-tat-cua-nhung-gia-tri-nao-khac-flex-auto-o-dau
position: backend
technology: flex-shorthand
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`flex: 1` là viết tắt của những giá trị nào? Khác `flex: auto` ở đâu?

## Question (EN)
What does `flex: 1` expand to? How is it different from `flex: auto`?

## Đáp án chi tiết (VI)
`flex: 1` là shorthand của **`flex-grow: 1; flex-shrink: 1; flex-basis: 0%`**.\
\
Điểm mấu chốt là `flex-basis: 0%`: trình duyệt coi kích thước khởi điểm của item là **0**, rồi chia toàn bộ không gian còn lại theo tỉ lệ `flex-grow`. Kết quả là các item cùng `flex: 1` có **bề rộng bằng nhau** bất kể nội dung dài ngắn.\
\
`flex: auto` = `1 1 auto`. Basis là `auto` nên item lấy kích thước nội dung làm mốc, phần dư mới đem chia. Item nội dung dài sẽ **rộng hơn**.\
\
```css\
.equal \u003e * { flex: 1; }      /* 1 1 0%  -\u003e chia đều */\
.natural \u003e * { flex: auto; } /* 1 1 auto -\u003e theo nội dung + chia phần dư */\
```\
\
Các shorthand hay dùng khác: `flex: none` (`0 0 auto`, khoá cứng kích thước), `flex: 0 0 240px` (cột cố định 240px, không co không giãn).

## Detailed Answer (EN)
`flex: 1` is shorthand for **`flex-grow: 1; flex-shrink: 1; flex-basis: 0%`**.\
\
The key part is `flex-basis: 0%`: the browser treats the item's starting size as **0**, then distributes all free space by the `flex-grow` ratio. So items sharing `flex: 1` end up **equal width** regardless of content length.\
\
`flex: auto` is `1 1 auto`. The basis is the content size, and only the leftover space gets distributed, so an item with longer content ends up **wider**.\
\
```css\
.equal \u003e * { flex: 1; }      /* 1 1 0%  -\u003e equal columns */\
.natural \u003e * { flex: auto; } /* 1 1 auto -\u003e content size + share of leftover */\
```\
\
Other common shorthands: `flex: none` (`0 0 auto`, size locked) and `flex: 0 0 240px` (fixed 240px column that neither grows nor shrinks).
