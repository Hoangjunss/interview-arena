---
id: quiz-html-css-dat-width-200px-cho-mot-the-span-nhung-khong-co-tac-dung-vi-sao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt width: 200px cho một thẻ <span> nhưng không có tác dụng. Vì sao?

## Đáp án trắc nghiệm
- [ ] Phải thêm !important thì width mới áp dụng cho span
- [ ] Width trên span phải khai báo bằng đơn vị %
- [x] <span> là inline element — width/height bị bỏ qua
- [ ] Span chỉ nhận width khi có position: absolute

## Giải thích (VI)
Vì <span> mặc định là inline element: chỉ chiếm chiều rộng theo nội dung, bỏ qua width/height và margin dọc. Muốn đặt kích thước, đổi display: inline-block (vẫn nằm cùng dòng, nhận width/height) hoặc display: block (chiếm cả hàng, bắt đầu dòng mới).

### Giải thích các phương án:
- **Phải thêm !important thì width mới áp dụng cho span** (Sai): !important chỉ giải quyết xung đột cascade; vấn đề ở đây là display type, không phải độ ưu tiên.
- **Width trên span phải khai báo bằng đơn vị %** (Sai): Đơn vị không liên quan; inline element bỏ qua width bất kể px hay %.
- **<span> là inline element — width/height bị bỏ qua** (Đúng): Cần đổi sang inline-block hoặc block. Inline element chỉ rộng theo nội dung và bỏ qua width/height; inline-block giữ khả năng nằm cùng dòng nhưng nhận được kích thước.
- **Span chỉ nhận width khi có position: absolute** (Sai): Absolute quả thật khiến phần tử nhận width (vì bị blockified), nhưng đó là tác dụng phụ kèm thoát flow — cách đúng và tối thiểu là đổi display.
