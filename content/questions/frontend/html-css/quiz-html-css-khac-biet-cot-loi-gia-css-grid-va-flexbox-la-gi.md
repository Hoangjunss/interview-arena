---
id: quiz-html-css-khac-biet-cot-loi-gia-css-grid-va-flexbox-la-gi
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa CSS Grid và Flexbox là gì?

## Đáp án trắc nghiệm
- [ ] Flexbox không center được theo chiều dọc, phải dùng Grid
- [x] Grid là layout 2 chiều, Flexbox là layout 1 chiều
- [ ] Grid chỉ hoạt động với số cột cố định khai báo trước
- [ ] Grid mới và nhanh hơn nên thay thế hoàn toàn Flexbox

## Giải thích (VI)
Grid là hệ layout 2 chiều — kiểm soát rows và columns cùng lúc, hợp cho khung trang tổng thể (header/sidebar/main). Flexbox là 1 chiều — phân bổ item dọc một trục (row hoặc column), hợp cho navigation bar, dàn nút, card nội bộ. Chúng bổ trợ nhau và thường được lồng vào nhau trong cùng một trang.

### Giải thích các phương án:
- **Flexbox không center được theo chiều dọc, phải dùng Grid** (Sai): Flexbox center dọc bình thường bằng align-items: center; đây là một use case kinh điển của nó.
- **Grid là layout 2 chiều, Flexbox là layout 1 chiều** (Đúng): Đây là ranh giới thiết kế của hai spec: Grid kiểm soát đồng thời cả hàng lẫn cột, Flexbox phân bổ item dọc theo một trục chính. Grid xếp theo rows và columns đồng thời; Flexbox theo một trục.
- **Grid chỉ hoạt động với số cột cố định khai báo trước** (Sai): Grid có auto-fit/auto-fill + minmax() để sinh cột linh hoạt theo không gian, không cần cố định số cột.
- **Grid mới và nhanh hơn nên thay thế hoàn toàn Flexbox** (Sai): Hai công cụ bổ trợ nhau, không thay thế: Grid hợp cho khung trang, Flexbox hợp cho dàn hàng trong component; thực tế thường dùng cả hai lồng nhau.
