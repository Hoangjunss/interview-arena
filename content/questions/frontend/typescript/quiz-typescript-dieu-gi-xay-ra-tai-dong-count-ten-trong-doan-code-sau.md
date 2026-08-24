---
id: quiz-typescript-dieu-gi-xay-ra-tai-dong-count-ten-trong-doan-code-sau
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra tại dòng count = "ten" trong đoạn code sau?

## Đáp án trắc nghiệm
- [x] Lỗi compile — biến đã được suy ra kiểu số từ giá trị khởi tạo
- [ ] Hợp lệ tại compile time nhưng gây lỗi khi chạy
- [ ] Hợp lệ — không có type annotation nên count mặc định là any
- [ ] Lỗi compile vì let không cho phép gán lại giá trị

## Giải thích (VI)
Lỗi compile. Type inference suy ra count: number từ giá trị khởi tạo 0 — không cần annotation. Từ đó mọi phép gán phải là number; gán "ten" báo lỗi ngay tại compile time. Nhờ inference, annotation thường chỉ cần cho function parameter, return type, và biến khai báo chưa gán giá trị.

### Giải thích các phương án:
- **Lỗi compile — biến đã được suy ra kiểu số từ giá trị khởi tạo** (Đúng): Không gán string vào được. Không cần annotation, TypeScript vẫn suy kiểu từ giá trị gán ban đầu (0 → number) và giữ kiểu đó cho biến suốt vòng đời. Suy diễn kiểu khoá biến vào kiểu đó nên gán chuỗi vào sau đó không hợp lệ.
- **Hợp lệ tại compile time nhưng gây lỗi khi chạy** (Sai): Ngược lại: đây là lỗi compile time; nếu chỉ là JavaScript thuần thì gán lại kiểu khác chạy bình thường, không có lỗi runtime.
- **Hợp lệ — không có type annotation nên count mặc định là any** (Sai): Biến có giá trị khởi tạo luôn được suy kiểu từ giá trị đó; any ngầm định chỉ xảy ra khi không có cả annotation lẫn thông tin để suy (và bị chặn khi bật noImplicitAny).
- **Lỗi compile vì let không cho phép gán lại giá trị** (Sai): let cho phép gán lại — cấm gán lại là const. Lỗi ở đây nằm ở kiểu, không phải ở việc gán lại.
