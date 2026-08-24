---
id: quiz-csharp-tu-khoa-var-trong-c-vi-du-var-count-10-thuc-chat-lam-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ khoá var trong C# (ví dụ var count = 10;) thực chất làm gì?

## Đáp án trắc nghiệm
- [x] Yêu cầu compiler SUY LUẬN kiểu từ biểu thức khởi tạo ngay lúc biên dịch
- [ ] Tạo biến kiểu động, có thể gán giá trị kiểu bất kỳ về sau như JavaScript
- [ ] Khai báo biến không cần giá trị khởi tạo, kiểu sẽ xác định ở lần gán đầu tiên khi chạy
- [ ] Làm biến chậm hơn vì kiểu phải được xác định lại mỗi lần truy cập lúc runtime

## Giải thích (VI)
var khai báo biến local với kiểu do compiler suy luận từ biểu thức khởi tạo, ngay lúc biên dịch: var count = 10; thì count là int cố định, gán chuỗi vào sẽ lỗi compile. Không phải kiểu động (dynamic mới là kiểu động), không có chi phí runtime — IL giống hệt khai báo tường minh. Bắt buộc có giá trị khởi tạo; var x; không hợp lệ.

### Giải thích các phương án:
- **Yêu cầu compiler SUY LUẬN kiểu từ biểu thức khởi tạo ngay lúc biên dịch** (Đúng): Biến vẫn có kiểu tĩnh cố định (count là int), không phải kiểu động. var là implicitly typed local variable: kiểu được chốt tại compile time từ vế phải; sau đó gán count = "text" báo lỗi biên dịch như khai báo int thường.
- **Tạo biến kiểu động, có thể gán giá trị kiểu bất kỳ về sau như JavaScript** (Sai): Đó là dynamic (bỏ kiểm tra kiểu tĩnh, resolve lúc chạy); var ngược lại — kiểu cố định từ lúc biên dịch, gán sai kiểu là lỗi compile.
- **Khai báo biến không cần giá trị khởi tạo, kiểu sẽ xác định ở lần gán đầu tiên khi chạy** (Sai): var x; không biên dịch được — compiler bắt buộc có biểu thức khởi tạo ngay tại dòng khai báo để suy luận kiểu.
- **Làm biến chậm hơn vì kiểu phải được xác định lại mỗi lần truy cập lúc runtime** (Sai): Suy luận diễn ra một lần lúc biên dịch; IL sinh ra giống hệt khai báo kiểu tường minh nên không có bất kỳ chi phí runtime nào.
