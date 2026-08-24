---
id: quiz-react-usestate-trong-component-duoi-day-hoat-dong-nhu-the-nao
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useState trong component dưới đây hoạt động như thế nào?

## Đáp án trắc nghiệm
- [ ] Mỗi lần component re-render, useState(0) chạy lại và reset count về 0
- [ ] Nên khai báo count bằng let và gán trực tiếp count = count + 1, UI sẽ tự cập nhật theo
- [x] useState(0) trả về mảng gồm giá trị hiện tại và hàm setter; gọi setCount lên lịch một lần re-render với giá trị mới
- [ ] setCount gán giá trị mới vào count ngay lập tức, nên dòng code ngay sau đó đọc được giá trị vừa set

## Giải thích (VI)
useState nhận giá trị khởi tạo và trả về mảng [giá trị hiện tại, hàm setter]. Gọi setter lên lịch re-render với giá trị mới — biến count trong render hiện tại không đổi ngay tại chỗ. Giá trị khởi tạo chỉ dùng ở lần mount đầu; các render sau React trả về state đang lưu. Gán trực tiếp vào biến thường không làm UI cập nhật.

### Giải thích các phương án:
- **Mỗi lần component re-render, useState(0) chạy lại và reset count về 0** (Sai): Sai — đối số của useState chỉ là giá trị KHỞI TẠO, dùng ở lần mount đầu; các render sau React trả về giá trị state đang lưu, không reset.
- **Nên khai báo count bằng let và gán trực tiếp count = count + 1, UI sẽ tự cập nhật theo** (Sai): Sai — gán trực tiếp vào biến không kích hoạt re-render; React chỉ cập nhật UI khi state thay đổi qua setter.
- **useState(0) trả về mảng gồm giá trị hiện tại và hàm setter; gọi setCount lên lịch một lần re-render với giá trị mới** (Đúng): Biến count trong render hiện tại không thay đổi ngay. Đúng: setter không gán giá trị vào biến mà schedule re-render; render tiếp theo gọi lại Counter và useState trả về giá trị mới.
- **setCount gán giá trị mới vào count ngay lập tức, nên dòng code ngay sau đó đọc được giá trị vừa set** (Sai): Sai — count là hằng số của lần render hiện tại; sau khi gọi setCount, đọc count vẫn thấy giá trị cũ cho đến render kế tiếp.
