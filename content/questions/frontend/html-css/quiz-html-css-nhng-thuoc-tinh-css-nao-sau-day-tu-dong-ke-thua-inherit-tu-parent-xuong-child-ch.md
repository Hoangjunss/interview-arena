---
id: quiz-html-css-nhng-thuoc-tinh-css-nao-sau-day-tu-dong-ke-thua-inherit-tu-parent-xuong-child-ch
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những thuộc tính CSS nào sau đây tự động kế thừa (inherit) từ parent xuống child? (chọn nhiều)

## Đáp án trắc nghiệm
- [ ] margin
- [x] color
- [ ] border

## Giải thích (VI)
Kế thừa: color, font-family, line-height (nhóm typography/văn bản nói chung: font-size, letter-spacing, text-align... cũng kế thừa). Không kế thừa: margin, border và nhóm box model (padding, width, background). Quy luật nhớ nhanh: thuộc tính về chữ thì kế thừa, thuộc tính về hộp thì không.

### Giải thích các phương án:
- **margin** (Sai): Thuộc tính box model không kế thừa — nếu margin kế thừa, mọi phần tử con sẽ tự thụt lề dây chuyền, layout không kiểm soát nổi.
- **color** (Đúng): Thuộc tính văn bản kế thừa — đặt color trên body là cả trang đổi màu chữ theo.
- **border** (Sai): Không kế thừa — viền của parent không tự xuất hiện trên con; muốn con nhận thì khai báo tường minh border: inherit.
