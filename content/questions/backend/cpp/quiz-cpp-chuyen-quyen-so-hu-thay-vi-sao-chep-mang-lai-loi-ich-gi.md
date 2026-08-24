---
id: quiz-cpp-chuyen-quyen-so-hu-thay-vi-sao-chep-mang-lai-loi-ich-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chuyển quyền sở hữu thay vì sao chép mang lại lợi ích gì?

## Đáp án trắc nghiệm
- [x] Tài nguyên chuyển sang, không nhân bản
- [ ] Đối tượng nguồn được giải phóng ngay lập tức
- [ ] Đối tượng trở nên an toàn khi dùng từ nhiều thread
- [ ] Trình biên dịch bỏ qua hàm dựng và hàm huỷ

## Giải thích (VI)
Chuyển quyền sở hữu lấy tài nguyên của đối tượng nguồn thay vì nhân bản dữ liệu . Trả về một container lớn từ hàm hoặc đưa nó vào container khác vì thế không còn tốn kém như trước.

### Giải thích các phương án:
- **Tài nguyên chuyển sang, không nhân bản** (Đúng): Chỉ con trỏ nội bộ được chuyển nên trả về vùng chứa lớn từ hàm không còn tốn kém.
- **Đối tượng nguồn được giải phóng ngay lập tức** (Sai): Đối tượng nguồn vẫn tồn tại nhưng ở trạng thái rỗng hợp lệ.
- **Đối tượng trở nên an toàn khi dùng từ nhiều thread** (Sai): Không liên quan tới an toàn luồng.
- **Trình biên dịch bỏ qua hàm dựng và hàm huỷ** (Sai): Các hàm này vẫn được gọi bình thường.
