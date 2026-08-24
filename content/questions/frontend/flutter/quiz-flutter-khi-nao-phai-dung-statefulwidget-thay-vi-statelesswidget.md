---
id: quiz-flutter-khi-nao-phai-dung-statefulwidget-thay-vi-statelesswidget
position: frontend
technology: flutter
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào phải dùng StatefulWidget thay vì StatelessWidget?

## Đáp án trắc nghiệm
- [ ] Khi widget có bất kỳ tham số nào truyền từ widget cha
- [ ] Khi widget nằm sâu hơn ba cấp trong cây widget
- [x] Khi widget cần giữ dữ liệu thay đổi giữa các lần build
- [ ] Khi widget cần đọc dữ liệu từ API qua mạng

## Giải thích (VI)
Dùng StatefulWidget khi widget cần giữ dữ liệu thay đổi theo thời gian và tự gọi rebuild, ví dụ ô nhập liệu, bộ đếm, trạng thái đang tải. Nếu mọi thứ hiển thị đều đến từ tham số truyền vào thì StatelessWidget là đủ và rẻ hơn.

### Giải thích các phương án:
- **Khi widget có bất kỳ tham số nào truyền từ widget cha** (Sai): Tham số truyền vào là dữ liệu bất biến, StatelessWidget nhận được bình thường.
- **Khi widget nằm sâu hơn ba cấp trong cây widget** (Sai): Độ sâu trong cây không liên quan tới việc chọn loại widget.
- **Khi widget cần giữ dữ liệu thay đổi giữa các lần build** (Đúng): State tồn tại lâu hơn widget, nên nó là chỗ duy nhất giữ được dữ liệu qua các lần rebuild của cây widget.
- **Khi widget cần đọc dữ liệu từ API qua mạng** (Sai): Gọi API không bắt buộc có state cục bộ nếu kết quả do lớp quản lý state bên ngoài giữ.
