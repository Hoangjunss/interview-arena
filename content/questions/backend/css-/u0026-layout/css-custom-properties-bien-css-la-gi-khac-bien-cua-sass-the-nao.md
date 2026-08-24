---
id: css-custom-properties-bien-css-la-gi-khac-bien-cua-sass-the-nao
position: backend
technology: css-\u0026-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSS custom properties (biến CSS) là gì? Khác biến của Sass thế nào?

## Question (EN)
What are CSS custom properties (variables)? How do they differ from Sass variables?

## Đáp án chi tiết (VI)
CSS custom property = biến khai báo bằng tiền tố `--`, đọc lại bằng hàm `var()`:\
\
```css\
:root { --brand: #0891b2; --gap: 16px; }\
.button { background: var(--brand); padding: var(--gap); }\
```\
\
Đặc điểm quan trọng:\
- **Kế thừa theo cây DOM và có scope**: khai báo ở `:root` là toàn cục; khai báo trong một selector chỉ áp cho phần tử đó và con cháu → **override cục bộ** dễ dàng.\
- **Động lúc runtime**: đổi qua `element.style.setProperty('--brand', ...)` bằng JS, hoặc đổi trong media query / `[data-theme]` → **cả cây tự cập nhật**. Đây là nền tảng của **theming (dark mode)**.\
- `var(--x, fallback)` cho giá trị dự phòng khi biến chưa định nghĩa.\
\
Khác **biến Sass** (`$x`): biến Sass được **biên dịch mất** lúc build — chỉ là hằng số tĩnh, không tồn tại trong CSS xuất ra, không đổi được bằng JS hay theo scope DOM lúc chạy. Custom property **sống trong trình duyệt**, nên linh hoạt hơn cho theme và tương tác động; Sass var vẫn tiện cho logic build-time (loop, tính toán).

## Detailed Answer (EN)
$85
