---
id: quiz-testing-ham-tinh-con-bao-nhieu-ngay-toi-han-test-the-nao-cho-tat-dinh
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm tính "còn bao nhiêu ngày tới hạn" test thế nào cho tất định?

## Đáp án trắc nghiệm
- [x] Truyền thời điểm hiện tại vào như tham số, hoặc fake timer
- [ ] Chỉ chạy test này vào một giờ cố định trong ngày
- [ ] Tính ngày kỳ vọng ngay trong test bằng cùng công thức
- [ ] Chấp nhận sai lệch một ngày trong phần kiểm tra kết quả cuối

## Giải thích (VI)
Đừng để hàm tự đọc đồng hồ: truyền now vào như tham số (hoặc tiêm một clock), khi đó test chỉ là hàm thuần với đầu vào cố định. Nếu không sửa được chữ ký hàm thì dùng fake timer để đóng băng thời gian.

### Giải thích các phương án:
- **Truyền thời điểm hiện tại vào như tham số, hoặc fake timer** (Đúng): Hàm đọc trực tiếp đồng hồ hệ thống thì kết quả đổi theo ngày chạy test.
- **Chỉ chạy test này vào một giờ cố định trong ngày** (Sai): Không khả thi trong CI và không giải quyết gốc vấn đề.
- **Tính ngày kỳ vọng ngay trong test bằng cùng công thức** (Sai): Test sẽ luôn xanh vì nó lặp lại đúng lỗi của code nếu có.
- **Chấp nhận sai lệch một ngày trong phần kiểm tra kết quả cuối** (Sai): Nới lỏng assert sẽ bỏ qua đúng loại lỗi lệch một ngày cần bắt.
