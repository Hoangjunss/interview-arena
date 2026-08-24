---
id: quiz-ml-data-science-tap-validation-dung-de-lam-gi-khac-tap-test-the-nao
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tập validation dùng để làm gì, khác tập test thế nào?

## Đáp án trắc nghiệm
- [x] Validation để chọn mô hình, test để đo lần cuối
- [ ] Validation chỉ cần khi dữ liệu quá nhỏ
- [ ] Validation để huấn luyện, test để chọn mô hình
- [ ] Hai tập này có thể dùng thay nhau tùy tiện

## Giải thích (VI)
Validation dùng để chọn siêu tham số và so sánh các mô hình. Test chỉ dùng một lần ở cuối để ước lượng hiệu năng thật. Nếu liên tục điều chỉnh theo điểm trên tập test, bạn đã gián tiếp huấn luyện trên nó và con số cuối không còn đáng tin.

### Giải thích các phương án:
- **Validation để chọn mô hình, test để đo lần cuối** (Đúng): Chạm vào tập test nhiều lần thì nó mất vai trò đánh giá khách quan.
- **Validation chỉ cần khi dữ liệu quá nhỏ** (Sai): Kích thước dữ liệu không quyết định nhu cầu tách tập.
- **Validation để huấn luyện, test để chọn mô hình** (Sai): Tập validation không dùng để cập nhật tham số mô hình.
- **Hai tập này có thể dùng thay nhau tùy tiện** (Sai): Dùng lẫn lộn sẽ làm ước lượng hiệu năng bị lạc quan.
