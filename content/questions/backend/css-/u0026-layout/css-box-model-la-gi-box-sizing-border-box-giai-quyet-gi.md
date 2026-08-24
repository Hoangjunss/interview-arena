---
id: css-box-model-la-gi-box-sizing-border-box-giai-quyet-gi
position: backend
technology: css-\u0026-layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSS box model là gì? `box-sizing: border-box` giải quyết gì?

## Question (EN)
What is the CSS box model? What does `box-sizing: border-box` solve?

## Đáp án chi tiết (VI)
Mỗi phần tử là một hộp gồm 4 lớp từ trong ra ngoài: **content → padding → border → margin**.\
\
- **Mặc định `content-box`**: `width`/`height` chỉ tính **phần content**; padding và border **cộng thêm** vào kích thước hiển thị. Đặt `width: 200px; padding: 20px; border: 2px` → rộng thực tế **244px**, dễ vỡ layout.\
- **`border-box`**: `width`/`height` **đã bao gồm** padding + border; content tự co lại. Đặt `width: 200px` → luôn hiển thị đúng **200px**.\
\
Vì vậy dự án thường reset toàn cục:\
```css\
*, *::before, *::after { box-sizing: border-box; }\
```\
\
Ghi chú: **margin** không bao giờ nằm trong `width`; margin dọc giữa các block có thể **collapse** (gộp) — dễ gây bất ngờ về khoảng cách.

## Detailed Answer (EN)
Every element is a box with 4 layers from inside out: **content → padding → border → margin**.\
\
- **Default `content-box`**: `width`/`height` count only the **content**; padding and border are **added on top** of the rendered size. Setting `width: 200px; padding: 20px; border: 2px` → actual width **244px**, which easily breaks layouts.\
- **`border-box`**: `width`/`height` **include** padding + border; content shrinks to fit. Setting `width: 200px` → always renders at **200px**.\
\
That is why projects usually reset globally:\
```css\
*, *::before, *::after { box-sizing: border-box; }\
```\
\
Note: **margin** is never part of `width`; vertical margins between blocks can **collapse** (merge) — a common spacing surprise.
