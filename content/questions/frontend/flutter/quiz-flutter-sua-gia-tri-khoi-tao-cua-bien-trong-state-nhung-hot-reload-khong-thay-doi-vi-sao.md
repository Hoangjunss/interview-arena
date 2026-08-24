---
id: quiz-flutter-sua-gia-tri-khoi-tao-cua-bien-trong-state-nhung-hot-reload-khong-thay-doi-vi-sao
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sửa giá trị khởi tạo của biến trong State nhưng hot reload không thấy đổi. Vì sao?

## Đáp án trắc nghiệm
- [ ] Biến khởi tạo phải khai báo late thì mới nạp lại được
- [ ] Hot reload bỏ qua mọi thay đổi bên trong lớp State
- [ ] Cần lưu file lần nữa để trình biên dịch nhận thay đổi
- [x] Hot reload giữ nguyên state cũ, chỉ nạp lại code

## Giải thích (VI)
Hot reload nạp code mới nhưng giữ nguyên state đang chạy , nên initState và giá trị khởi tạo không chạy lại. Muốn thấy thay đổi loại này thì dùng hot restart : nó dựng lại toàn bộ ứng dụng từ đầu, mất state nhưng vẫn nhanh hơn build lại.

### Giải thích các phương án:
- **Biến khởi tạo phải khai báo late thì mới nạp lại được** (Sai): Từ khoá late chỉ hoãn thời điểm gán, không liên quan tới hot reload.
- **Hot reload bỏ qua mọi thay đổi bên trong lớp State** (Sai): Code trong State vẫn được nạp lại, chỉ dữ liệu đã khởi tạo là giữ nguyên.
- **Cần lưu file lần nữa để trình biên dịch nhận thay đổi** (Sai): Thay đổi đã được nạp; vấn đề nằm ở state được giữ lại chứ không phải ở việc lưu file.
- **Hot reload giữ nguyên state cũ, chỉ nạp lại code** (Đúng): Giá trị khởi tạo chỉ chạy một lần lúc tạo State, mà State cũ vẫn đang được giữ lại.
