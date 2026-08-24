---
id: quiz-cpp-ky-thuat-gan-tai-nguyen-vao-vong-doi-doi-tuong-trong-c-giai-quyet-van-de-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kỹ thuật gắn tài nguyên vào vòng đời đối tượng trong C++ giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Bộ nhớ được thu gom tự động như ngôn ngữ có thu gom rác
- [ ] Đối tượng được chia sẻ an toàn giữa nhiều thread
- [x] Tài nguyên được giải phóng kể cả khi có ngoại lệ
- [ ] Chương trình chạy nhanh hơn nhờ giảm cấp phát

## Giải thích (VI)
Nó bảo đảm tài nguyên được giải phóng kể cả khi hàm thoát ra bằng ngoại lệ , vì hàm huỷ chạy khi stack được tháo gỡ. Đây là nền tảng của smart pointer, khoá tự mở, và các lớp bọc tệp hay kết nối.

### Giải thích các phương án:
- **Bộ nhớ được thu gom tự động như ngôn ngữ có thu gom rác** (Sai): Không có thu gom rác, việc giải phóng diễn ra tại điểm xác định.
- **Đối tượng được chia sẻ an toàn giữa nhiều thread** (Sai): An toàn luồng là vấn đề riêng và cần cơ chế đồng bộ.
- **Tài nguyên được giải phóng kể cả khi có ngoại lệ** (Đúng): Hàm huỷ chạy khi ngăn xếp được tháo gỡ nên không có đường thoát nào bỏ sót việc dọn dẹp.
- **Chương trình chạy nhanh hơn nhờ giảm cấp phát** (Sai): Số lần cấp phát không đổi vì kỹ thuật này.
