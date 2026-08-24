---
id: flex-wrap-hoat-dong-the-nao
position: backend
technology: flexbox
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
flex-wrap hoạt động thế nào?

## Question (EN)
How does flex-wrap work?

## Đáp án chi tiết (VI)
`flex-wrap` quyết định item có được **xuống dòng** khi hết chỗ hay không.\
\
```css\
.row {\
  display: flex;\
  flex-wrap: nowrap;      /* mặc định: ép tất cả trên MỘT dòng, co lại nếu cần */\
}\
\
.tags {\
  display: flex;\
  flex-wrap: wrap;        /* hết chỗ thì xuống dòng */\
  gap: 8px;\
  align-content: flex-start;   /* căn các DÒNG, chỉ có tác dụng khi đã wrap */\
}\
```\
\
Phân biệt hai thuộc tính hay bị lẫn khi đã wrap:\
- `align-items` — căn từng item **trong một dòng**.\
- `align-content` — căn **các dòng với nhau** trong container.\
\
Shorthand gộp hướng và wrap:\
\
```css\
.list { flex-flow: row wrap; }   /* = flex-direction + flex-wrap */\
```\
\
**Lưu ý 1:** `nowrap` không có nghĩa \\"tràn ra ngoài\\" — mặc định item sẽ **co lại** (`flex-shrink: 1`). Chỉ khi nội dung không co được nữa (`min-width: auto`) mới tràn.\
\
**Lưu ý 2:** `align-content` **không có tác dụng khi chỉ có một dòng**. Nhiều người đặt nó rồi tưởng bị lỗi, trong khi thực ra cần `align-items`.

## Detailed Answer (EN)
`flex-wrap` decides whether items may **move to a new line** when space runs out.\
\
```css\
.row {\
  display: flex;\
  flex-wrap: nowrap;      /* default: force everything onto ONE line, shrinking as needed */\
}\
\
.tags {\
  display: flex;\
  flex-wrap: wrap;        /* wrap when room runs out */\
  gap: 8px;\
  align-content: flex-start;   /* aligns the LINES; only matters once wrapping happens */\
}\
```\
\
Two properties people mix up once wrapping is on:\
- `align-items` — aligns each item **within its line**.\
- `align-content` — aligns **the lines** within the container.\
\
The shorthand combines direction and wrapping:\
\
```css\
.list { flex-flow: row wrap; }   /* = flex-direction + flex-wrap */\
```\
\
**Note 1:** `nowrap` does not mean \\"overflow\\" — by default items **shrink** (`flex-shrink: 1`). They only overflow once the content cannot shrink further (`min-width: auto`).\
\
**Note 2:** `align-content` **does nothing with a single line**. People set it, see no change, and assume a bug — what they wanted was `align-items`.
