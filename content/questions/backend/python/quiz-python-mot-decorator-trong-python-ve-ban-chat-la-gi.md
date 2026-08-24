---
id: quiz-python-mot-decorator-trong-python-ve-ban-chat-la-gi
position: backend
technology: python
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một decorator trong Python về bản chất là gì?

## Đáp án trắc nghiệm
- [ ] Là một từ khóa (keyword) đặc biệt của Python để đánh dấu hàm quan trọng
- [ ] Là một comment giúp trình biên dịch tối ưu hóa hàm
- [x] Là callable nhận một hàm (hoặc class) và trả về callable khác
- [ ] Là cách khai báo biến toàn cục bên trong hàm

## Giải thích (VI)
Decorator là một callable nhận một hàm (hoặc class) và trả về một callable thay thế, thường bọc thêm hành vi quanh bản gốc. Viết @dec ngay trên def f chỉ là cú pháp gọn cho f = dec(f). Dùng để thêm logging, caching, kiểm tra quyền, đo thời gian... mà không sửa thân hàm gốc.

### Giải thích các phương án:
- **Là một từ khóa (keyword) đặc biệt của Python để đánh dấu hàm quan trọng** (Sai): @ không phải keyword đánh dấu; nó áp một callable lên hàm/class ngay bên dưới.
- **Là một comment giúp trình biên dịch tối ưu hóa hàm** (Sai): Decorator là code chạy thật lúc định nghĩa, không phải comment và không liên quan tối ưu compiler.
- **Là callable nhận một hàm (hoặc class) và trả về callable khác** (Đúng): Decorator là higher-order function; cú pháp @dec chỉ là đường cú pháp (syntactic sugar) cho việc gán lại f = dec(f). Thường bọc thêm hành vi quanh đối tượng gốc.
- **Là cách khai báo biến toàn cục bên trong hàm** (Sai): Khai báo biến toàn cục trong hàm là từ khóa global, không liên quan gì tới decorator.
