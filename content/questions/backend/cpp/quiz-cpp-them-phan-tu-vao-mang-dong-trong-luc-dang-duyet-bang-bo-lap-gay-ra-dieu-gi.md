---
id: quiz-cpp-them-phan-tu-vao-mang-dong-trong-luc-dang-duyet-bang-bo-lap-gay-ra-dieu-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thêm phần tử vào mảng động trong lúc đang duyệt bằng bộ lặp gây ra điều gì?

## Đáp án trắc nghiệm
- [ ] Chương trình báo lỗi ngay tại dòng thêm phần tử
- [x] Bộ lặp có thể trở nên vô hiệu
- [ ] Phần tử mới luôn được thêm vào cuối vòng lặp
- [ ] Vòng lặp tự động bỏ qua phần tử vừa thêm vào

## Giải thích (VI)
Bộ lặp có thể trở nên vô hiệu : khi container cấp phát lại, toàn bộ phần tử chuyển sang vùng nhớ mới và bộ lặp cũ trỏ vào vùng đã giải phóng. Dùng tiếp là hành vi không xác định, thường không sập ngay nên rất khó lần.

### Giải thích các phương án:
- **Chương trình báo lỗi ngay tại dòng thêm phần tử** (Sai): Thường không có lỗi rõ ràng, sự cố xảy ra sau đó.
- **Bộ lặp có thể trở nên vô hiệu** (Đúng): Việc cấp phát lại chuyển toàn bộ phần tử sang vùng nhớ mới nên bộ lặp cũ trỏ vào vùng đã giải phóng.
- **Phần tử mới luôn được thêm vào cuối vòng lặp** (Sai): Vị trí thêm không liên quan tới tính hợp lệ của bộ lặp.
- **Vòng lặp tự động bỏ qua phần tử vừa thêm vào** (Sai): Không có cơ chế nào bảo đảm điều đó.
