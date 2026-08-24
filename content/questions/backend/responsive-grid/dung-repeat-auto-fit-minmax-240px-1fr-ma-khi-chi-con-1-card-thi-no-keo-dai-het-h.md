---
id: dung-repeat-auto-fit-minmax-240px-1fr-ma-khi-chi-con-1-card-thi-no-keo-dai-het-h
position: backend
technology: responsive-grid
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng `repeat(auto-fit, minmax(240px, 1fr))` mà khi chỉ còn 1 card thì nó kéo dài hết hàng. Vì sao? Đổi sang `auto-fill` thì sao?

## Question (EN)
With `repeat(auto-fit, minmax(240px, 1fr))`, a single remaining card stretches across the whole row. Why? What changes with `auto-fill`?

## Đáp án chi tiết (VI)
Vì `auto-fit` **thu gọn (collapse) các track rỗng về 0** rồi để các track có nội dung ăn hết phần dư. Còn 1 card thì mọi track khác biến mất, card duy nhất giãn theo `1fr` chiếm trọn hàng.\
\
`auto-fill` **giữ nguyên các track rỗng**. Card duy nhất chỉ rộng bằng một cột, phần còn lại là ô trống.\
\
```css\
/* card giãn full khi thiếu item */\
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\
\
/* card giữ đúng bề rộng cột, chừa chỗ trống */\
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\
```\
\
Chọn theo ý đồ:\
- Số item ít và muốn lấp đầy chiều rộng → `auto-fit`.\
- Muốn card giữ kích thước ổn định, lưới không nhảy khi danh sách ngắn → `auto-fill`.\
\
Muốn `auto-fit` nhưng chặn card quá rộng: đổi max thành giá trị cụ thể, ví dụ `minmax(240px, 360px)`, hoặc thêm `max-width` cho card bên trong. Khi container rộng hơn tổng track thì hai từ khoá cho kết quả **giống hệt nhau** — khác biệt chỉ lộ ra lúc thiếu item.

## Detailed Answer (EN)
Because `auto-fit` **collapses empty tracks to zero** and lets the populated tracks absorb the leftover space. With one card left, every other track disappears and that card grows via `1fr` to fill the row.\
\
`auto-fill` **keeps the empty tracks**. The single card stays one column wide and the rest of the row is empty space.\
\
```css\
/* card stretches when there are few items */\
grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\
\
/* card keeps its column width, leaving blank space */\
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\
```\
\
Pick by intent:\
- Few items and you want the width filled → `auto-fit`.\
- Cards should keep a stable size and the grid should not jump for short lists → `auto-fill`.\
\
To use `auto-fit` but cap the width, give the max a concrete value such as `minmax(240px, 360px)`, or set `max-width` on the card itself. When the container is wider than the total track size, the two keywords behave **identically** — the difference only shows up when items are scarce.
