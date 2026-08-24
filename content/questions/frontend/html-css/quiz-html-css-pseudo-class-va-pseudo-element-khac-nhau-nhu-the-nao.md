---
id: quiz-html-css-pseudo-class-va-pseudo-element-khac-nhau-nhu-the-nao
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pseudo-class và pseudo-element khác nhau như thế nào?

## Đáp án trắc nghiệm
- [ ] Hai tên gọi cho cùng một khái niệm, :: chỉ là cú pháp mới của :
- [ ] Pseudo-element chỉ hoạt động khi có JavaScript kèm theo
- [ ] Pseudo-class dành cho class, pseudo-element dành cho id
- [x] Pseudo-class chọn theo trạng thái; pseudo-element tạo hoặc chọn phần ảo

## Giải thích (VI)
Pseudo-class (một dấu :) chọn phần tử có thật theo trạng thái hoặc vị trí: :hover, :focus, :first-child, :nth-child(). Pseudo-element (hai dấu ::) tạo hoặc chọn phần ảo không có trong DOM: ::before, ::after, ::first-line, ::placeholder. Nhớ nhanh: class = điều kiện lọc, element = sinh thêm "mảnh" phần tử.

### Giải thích các phương án:
- **Hai tên gọi cho cùng một khái niệm, :: chỉ là cú pháp mới của :** (Sai): Chúng là hai khái niệm khác nhau; CSS3 tách cú pháp :: cho pseudo-element chính là để phân biệt (dù trình duyệt vẫn chấp nhận :before vì tương thích cũ).
- **Pseudo-element chỉ hoạt động khi có JavaScript kèm theo** (Sai): ::before/::after là CSS thuần, tạo nội dung qua thuộc tính content mà không cần JavaScript.
- **Pseudo-class dành cho class, pseudo-element dành cho id** (Sai): Không liên quan tới class/id — cả hai đều đi kèm bất kỳ selector nào (div:hover, p::before).
- **Pseudo-class chọn theo trạng thái; pseudo-element tạo hoặc chọn phần ảo** (Đúng): Pseudo-element tạo hoặc chọn phần ảo của phần tử (::before, ::first-line. Đúng bản chất: pseudo-class lọc phần tử có thật theo điều kiện; pseudo-element trỏ tới một "mảnh" không tồn tại trong DOM. Cú pháp phân biệt bằng : và ::. Ví dụ :hover và :first-child thuộc nhóm đầu, còn ::before và ::first-line thuộc nhóm sau.
