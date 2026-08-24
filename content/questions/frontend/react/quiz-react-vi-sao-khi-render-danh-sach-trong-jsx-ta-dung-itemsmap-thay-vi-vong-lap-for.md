---
id: quiz-react-vi-sao-khi-render-danh-sach-trong-jsx-ta-dung-itemsmap-thay-vi-vong-lap-for
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao khi render danh sách trong JSX ta dùng items.map() thay vì vòng lặp for?

## Đáp án trắc nghiệm
- [x] Vì ngoặc nhọn trong JSX chỉ nhận biểu thức, mà for là câu lệnh
- [ ] Vì for chạy chậm hơn map đáng kể nên React chặn để bảo vệ hiệu năng
- [ ] Nhận định sai — có thể viết vòng lặp for trực tiếp bên trong ngoặc nhọn của JSX
- [ ] Vì React chỉ chấp nhận dữ liệu dạng mảng khi truyền vào component qua props

## Giải thích (VI)
Trong dấu ngoặc nhọn của JSX chỉ đặt được biểu thức — đoạn code trả về một giá trị. Vòng lặp for là câu lệnh, không trả về gì, nên gây lỗi cú pháp nếu đặt trong JSX. items.map(item => ... ) là biểu thức trả về mảng element, nhúng trực tiếp được. Vẫn dùng được for bên ngoài JSX: build mảng trước rồi nhúng biến vào.

### Giải thích các phương án:
- **Vì ngoặc nhọn trong JSX chỉ nhận biểu thức, mà for là câu lệnh** (Đúng): Đúng: JSX compile thành lời gọi hàm, và đối số của hàm phải là biểu thức — map là biểu thức trả về mảng, for là statement nên bị loại. map trả về mảng element nên nhúng thẳng vào JSX được, còn for không trả về giá trị nào.
- **Vì for chạy chậm hơn map đáng kể nên React chặn để bảo vệ hiệu năng** (Sai): Không liên quan hiệu năng — for thậm chí thường nhanh hơn map một chút; giới hạn nằm ở cú pháp biểu thức vs câu lệnh.
- **Nhận định sai — có thể viết vòng lặp for trực tiếp bên trong ngoặc nhọn của JSX** (Sai): Viết for trong ngoặc nhọn JSX gây lỗi cú pháp ngay khi compile — đây chính là điều câu hỏi kiểm tra.
- **Vì React chỉ chấp nhận dữ liệu dạng mảng khi truyền vào component qua props** (Sai): Props nhận mọi kiểu dữ liệu (object, function, string...) — quy tắc này không tồn tại và không phải lý do dùng map.
