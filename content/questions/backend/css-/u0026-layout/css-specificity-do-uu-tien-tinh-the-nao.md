---
id: css-specificity-do-uu-tien-tinh-the-nao
position: backend
technology: css-\u0026-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSS specificity (độ ưu tiên) tính thế nào?

## Question (EN)
How is CSS specificity calculated?

## Đáp án chi tiết (VI)
Khi nhiều rule cùng nhắm một phần tử, trình duyệt chọn rule có **specificity cao nhất**. Tính theo bộ ba `(A, B, C)`:\
\
- **A** — số **ID** selector (`#id`).\
- **B** — số **class**, **attribute**, **pseudo-class** (`.x`, `[type]`, `:hover`).\
- **C** — số **element** và **pseudo-element** (`div`, `::before`).\
\
So sánh lần lượt A → B → C, bên nào lớn hơn thắng. Ngoài thang này:\
\
- **Inline style** (`style=\\"…\\"`) mạnh hơn mọi selector trong stylesheet.\
- **`!important`** đè lên tất cả (trừ một `!important` khác cùng cấp) — nên tránh, dấu hiệu CSS khó bảo trì.\
- **Cùng specificity** → rule **viết sau** thắng (thứ tự nguồn).\
- **Universal `*`, `:where()`** có specificity **0**.\
\
Thực hành: giữ specificity thấp và đều (ưu tiên class), tránh lồng ID và `!important`.

## Detailed Answer (EN)
When multiple rules target the same element, the browser picks the one with the **highest specificity**, computed as a triple `(A, B, C)`:\
\
- **A** — number of **ID** selectors (`#id`).\
- **B** — number of **classes**, **attributes**, **pseudo-classes** (`.x`, `[type]`, `:hover`).\
- **C** — number of **elements** and **pseudo-elements** (`div`, `::before`).\
\
Compare A → B → C in order; the larger wins. Beyond this scale:\
\
- **Inline styles** (`style=\\"…\\"`) beat any stylesheet selector.\
- **`!important`** overrides everything (except another same-level `!important`) — avoid it; it signals hard-to-maintain CSS.\
- **Equal specificity** → the rule **written later** wins (source order).\
- **Universal `*` and `:where()`** have specificity **0**.\
\
Rule of thumb: keep specificity low and flat (prefer classes), avoid nested IDs and `!important`.
