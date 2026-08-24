---
id: prop-drilling-la-gi-lam-sao-giai-quyet-van-de-nay-trong-du-an-lon
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prop drilling là gì? Làm sao giải quyết vấn đề này trong dự án lớn?

## Question (EN)
What is prop drilling? How do you solve it in a large project?

## Đáp án chi tiết (VI)
Prop drilling là tình trạng phải truyền props qua nhiều tầng component trung gian, dù những component đó không thực sự sử dụng props đó — chỉ đóng vai trò chuyển tiếp. Điều này làm code khó bảo trì và khó refactor. Giải pháp phổ biến gồm: (1) Context API cho state toàn cục đơn giản như theme hoặc user info, (2) Redux hoặc Zustand cho state phức tạp cần nhiều nơi truy cập, (3) composition pattern — truyền JSX làm children thay vì truyền data qua props. Nên chọn giải pháp phù hợp với quy mô dự án, không nên dùng Redux cho mọi trường hợp.

## Detailed Answer (EN)
Prop drilling is when you must pass props through multiple intermediate component layers that don't actually use those props — they just forward them. This makes the code hard to maintain and refactor. Common solutions: (1) Context API for simple global state like theme or user info; (2) Redux or Zustand for complex state accessed in many places; (3) composition pattern — pass JSX as children instead of passing data through props. Choose the solution appropriate for your project scale; Redux is not the right answer for every case.
