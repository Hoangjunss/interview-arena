---
id: quiz-design-patterns-ham-khoi-tao-co-9-tham-so-nhieu-cai-tuy-chon-cach-nao-tot-hon
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm khởi tạo có 9 tham số, nhiều cái tuỳ chọn. Cách nào tốt hơn?

## Đáp án trắc nghiệm
- [ ] Chia lớp đó thành nhiều lớp nhỏ hơn theo từng nhóm tham số
- [ ] Tạo nhiều hàm khởi tạo cho từng tổ hợp tham số
- [x] Nhận một object tham số có tên, hoặc builder
- [ ] Đặt giá trị mặc định cho tất cả tham số tuỳ chọn

## Giải thích (VI)
Nhận một object có tên field (createServer({ port, host, timeout })) — nơi gọi đọc là hiểu, không lo thứ tự, và thêm tuỳ chọn mới không phá chữ ký. Builder phù hợp khi việc dựng có nhiều bước hoặc cần validate dần.

### Giải thích các phương án:
- **Chia lớp đó thành nhiều lớp nhỏ hơn theo từng nhóm tham số** (Sai): Có thể hợp lý nhưng là thay đổi thiết kế lớn hơn nhu cầu.
- **Tạo nhiều hàm khởi tạo cho từng tổ hợp tham số** (Sai): Số tổ hợp tăng nhanh và code trùng lặp nhiều.
- **Nhận một object tham số có tên, hoặc builder** (Đúng): Tham số có tên loại bỏ việc truyền sai thứ tự và đọc được ở nơi gọi.
- **Đặt giá trị mặc định cho tất cả tham số tuỳ chọn** (Sai): Giúp phần nào nhưng nơi gọi vẫn phải đếm đúng vị trí tham số.
