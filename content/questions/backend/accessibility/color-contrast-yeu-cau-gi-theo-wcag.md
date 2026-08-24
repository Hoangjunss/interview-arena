---
id: color-contrast-yeu-cau-gi-theo-wcag
position: backend
technology: accessibility
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Color contrast yêu cầu gì theo WCAG?

## Question (EN)
What does WCAG require for color contrast?

## Đáp án chi tiết (VI)
Tỉ lệ tương phản đo độ chênh sáng giữa **màu chữ và màu nền**, tính từ 1:1 (trùng nhau) tới 21:1 (đen trên trắng).\
\
| Nội dung | AA | AAA |\
|---|---|---|\
| Chữ thường | **4.5:1** | 7:1 |\
| Chữ lớn (≥18.66px, hoặc ≥14px in đậm) | **3:1** | 4.5:1 |\
| Viền input, icon mang nghĩa | **3:1** | — |\
\
```css\
/* #999 trên nền trắng = 2.85:1 → trượt AA */\
.meta { color: #949494; }   /* 4.54:1 — vừa đủ đạt */\
```\
\
Công cụ: panel Accessibility trong Chrome DevTools (chọn màu là thấy tỉ lệ ngay), Lighthouse, WebAIM Contrast Checker, axe DevTools.\
\
**Điểm hay bị bỏ sót:** yêu cầu 3:1 **cũng áp cho thành phần giao diện**, không chỉ chữ — viền ô input, icon trạng thái, đường phân cách mang thông tin.\
\
**Lưu ý:** dùng **màu là kênh thông tin duy nhất**. Ô input báo lỗi chỉ bằng viền đỏ thì người mù màu (khoảng 8% nam giới) không phân biệt được. Luôn kèm icon hoặc chữ.

## Detailed Answer (EN)
Contrast ratio measures the luminance gap between **text colour and background**, from 1:1 (identical) to 21:1 (black on white).\
\
| Content | AA | AAA |\
|---|---|---|\
| Body text | **4.5:1** | 7:1 |\
| Large text (\u003e=18.66px, or \u003e=14px bold) | **3:1** | 4.5:1 |\
| Input borders, meaningful icons | **3:1** | — |\
\
```css\
/* #999 on white = 2.85:1 → fails AA */\
.meta { color: #949494; }   /* 4.54:1 — just passes */\
```\
\
Tools: the Accessibility panel in Chrome DevTools (pick a colour and see the ratio live), Lighthouse, WebAIM Contrast Checker, axe DevTools.\
\
**Frequently missed:** the 3:1 requirement **also covers UI components**, not just text — input borders, status icons, meaningful dividers.\
\
**Note:** using **colour as the only channel**. An input that signals an error with a red border alone is invisible to colour-blind users (about 8% of men). Always pair it with an icon or text.
