---
id: border-va-outline-trong-css-khac-nhau-nhu-the-nao
position: backend
technology: box-model
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`border` và `outline` trong CSS khác nhau như thế nào?

## Question (EN)
How do `border` and `outline` differ in CSS?

## Đáp án chi tiết (VI)
- **`border`**: là **một phần của box model**, vẽ giữa padding và margin, **chiếm chỗ** nên làm tăng kích thước phần tử và **đẩy layout**. Đặt được từng cạnh (`border-top`...) và bo góc theo `border-radius`.\
- **`outline`**: vẽ **bên ngoài** border, **không chiếm chỗ** trong box model nên **không ảnh hưởng layout** (có thể chồng lên phần tử bên cạnh). Không tách riêng từng cạnh, và có `outline-offset` để đẩy ra xa.\
\
Hình dung: border là khung tranh tính vào kích thước bức tranh; outline là vệt sáng highlight vẽ đè bên ngoài, không xê dịch gì.\
\
Outline mặc định dùng làm **focus indicator** — đừng `outline: none` mà không thay bằng chỉ báo focus khác, sẽ hỏng khả năng truy cập (accessibility).

## Detailed Answer (EN)
- **`border`**: part of the **box model**, drawn between padding and margin. It **takes up space**, so it grows the element and **shifts layout**. Can be set per side (`border-top`...) and rounded via `border-radius`.\
- **`outline`**: drawn **outside** the border and takes **no space** in the box model, so it **does not affect layout** (it can overlap neighbors). It is not split per side, and `outline-offset` can push it outward.\
\
Think of it this way: a border is a picture frame counted into the picture size; an outline is a highlight painted outside it that moves nothing.\
\
Outline is the default **focus indicator** — do not `outline: none` without a replacement focus cue, or you break accessibility.
