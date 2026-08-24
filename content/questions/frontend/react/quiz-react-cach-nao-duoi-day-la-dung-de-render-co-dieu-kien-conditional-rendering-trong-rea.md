---
id: quiz-react-cach-nao-duoi-day-la-dung-de-render-co-dieu-kien-conditional-rendering-trong-rea
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách nào dưới đây là đúng để render có điều kiện (conditional rendering) trong React?

## Đáp án trắc nghiệm
- [ ] Viết trực tiếp câu lệnh if/else bên trong dấu ngoặc nhọn của JSX
- [ ] Dùng directive như v-if hoặc ngIf đặt trên thẻ JSX
- [ ] React chỉ hỗ trợ ẩn component bằng CSS display: none, không có cách bỏ hẳn khỏi cây render
- [x] Dùng biểu thức JavaScript trong JSX: toán tử ba ngôi hoặc logical AND

## Giải thích (VI)
Conditional rendering trong React dùng biểu thức JavaScript thông thường: toán tử ba ngôi cond ? : để chọn giữa hai nhánh; logical AND cond && để hiện hoặc ẩn một thành phần; if/else hoặc switch đặt bên ngoài return cho logic phức tạp, gán kết quả vào biến rồi nhúng vào JSX. React không có directive kiểu v-if.

### Giải thích các phương án:
- **Viết trực tiếp câu lệnh if/else bên trong dấu ngoặc nhọn của JSX** (Sai): Ngoặc nhọn trong JSX chỉ nhận biểu thức trả về giá trị; if/else là câu lệnh nên đặt trong đó sẽ gây lỗi cú pháp.
- **Dùng directive như v-if hoặc ngIf đặt trên thẻ JSX** (Sai): Đó là directive của Vue/Angular — React không có hệ template directive; điều kiện được diễn đạt bằng chính JavaScript.
- **React chỉ hỗ trợ ẩn component bằng CSS display: none, không có cách bỏ hẳn khỏi cây render** (Sai): Sai — return null hoặc để điều kiện false là component không được render và không tồn tại trong DOM; display: none chỉ ẩn về mặt hiển thị, khác về bản chất.
- **Dùng biểu thức JavaScript trong JSX: toán tử ba ngôi hoặc logical AND** (Đúng): Logic phức tạp thì dùng if/else bên ngoài return, gán kết quả vào biến. Đúng cả ba cách: ternary cho hai nhánh, && cho hiện/ẩn một nhánh, if/else đặt ngoài JSX cho logic nhiều nhánh. Logic phức tạp thì đặt if/else bên ngoài return rồi gán kết quả vào một biến.
