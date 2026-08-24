---
id: align-items-va-align-content-khac-nhau-the-nao-vi-sao-dat-align-content-ma-khong
position: backend
technology: alignment
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`align-items` và `align-content` khác nhau thế nào? Vì sao đặt `align-content` mà không thấy gì thay đổi?

## Question (EN)
How do `align-items` and `align-content` differ? Why does setting `align-content` sometimes do nothing?

## Đáp án chi tiết (VI)
- **`align-items`**: căn **từng item** bên trong dòng (line) của nó, theo trục cross.\
- **`align-content`**: căn **cả tập hợp các dòng** so với container, cũng theo trục cross.\
\
`align-content` chỉ có tác dụng khi container có **nhiều dòng** và **còn không gian thừa** trên trục cross. Đó là lý do hay gặp: trong flex container mặc định (`flex-wrap: nowrap`) chỉ có **một dòng** nên `align-content` bị bỏ qua hoàn toàn.\
\
```css\
.wrap {\
  display: flex;\
  flex-wrap: wrap;      /* bắt buộc, nếu không align-content vô nghĩa */\
  height: 400px;        /* phải có không gian thừa */\
  align-content: center; /* dồn các dòng vào giữa */\
  align-items: center;   /* căn item trong từng dòng */\
}\
```\
\
Với Grid thì `align-content` luôn dùng được vì grid vốn nhiều hàng — nó dịch chuyển toàn bộ track theo chiều dọc trong container cao hơn nội dung.

## Detailed Answer (EN)
- **`align-items`**: aligns **each item** within its own line, along the cross axis.\
- **`align-content`**: aligns **the set of lines as a whole** relative to the container, also along the cross axis.\
\
`align-content` only does anything when the container has **multiple lines** and **spare space** on the cross axis. Hence the common surprise: a default flex container (`flex-wrap: nowrap`) has exactly **one line**, so `align-content` is ignored.\
\
```css\
.wrap {\
  display: flex;\
  flex-wrap: wrap;       /* required, otherwise align-content is a no-op */\
  height: 400px;         /* there must be leftover space */\
  align-content: center; /* pack the lines to the middle */\
  align-items: center;   /* align items inside each line */\
}\
```\
\
In Grid, `align-content` always applies because a grid has rows by definition — it shifts the whole set of tracks vertically inside a container taller than its content.
