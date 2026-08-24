---
id: gap-property-trong-flexbox-la-gi
position: backend
technology: flexbox
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gap property trong Flexbox là gì?

## Question (EN)
What is the gap property in Flexbox?

## Đáp án chi tiết (VI)
`gap` tạo khoảng cách **giữa** các item, không thêm khoảng thừa ở mép container.\
\
```css\
.list {\
  display: flex;\
  flex-wrap: wrap;\
  gap: 16px;              /* cả hàng và cột */\
  row-gap: 24px;          /* tách riêng nếu cần */\
  column-gap: 8px;\
}\
```\
\
So với cách cũ dùng margin:\
\
```css\
/* cách cũ: 2 luật, dễ sai khi item wrap xuống dòng */\
.item { margin-right: 16px; }\
.item:last-child { margin-right: 0; }\
\
/* cách hiện tại */\
.list { gap: 16px; }\
```\
\
Ưu điểm cụ thể:\
- Không có margin thừa ở phần tử đầu/cuối, không cần `:last-child`.\
- **Không bị margin collapsing** — flex/grid vốn không gộp margin, nhưng `gap` còn tránh luôn việc tính toán tay.\
- Khi wrap nhiều dòng, khoảng cách giữa các dòng cũng đúng ngay.\
\
Hỗ trợ: `gap` trong Grid có từ lâu; **trong Flexbox chỉ được hỗ trợ rộng từ 2021** (Safari 14.1+). Code phải chạy trên trình duyệt cũ hơn thì vẫn cần cách margin.\
\
**Lưu ý:** `gap` chỉ có tác dụng trong **flex, grid và multi-column**. Đặt lên container `display: block` thì không xảy ra gì cả.

## Detailed Answer (EN)
$80
