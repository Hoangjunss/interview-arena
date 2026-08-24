---
id: quiz-design-patterns-ham-tinh-phi-van-chuyen-co-if-cho-6-nha-van-chuyen-moi-thang-them-mot-cai-patter
position: backend
technology: design-patterns
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm tính phí vận chuyển có if cho 6 nhà vận chuyển, mỗi tháng thêm một cái. Pattern nào phù hợp?

## Đáp án trắc nghiệm
- [ ] Decorator để bọc thêm logic tính phí vào hàm cũ đang có
- [ ] Observer để thông báo khi phí vận chuyển thay đổi
- [ ] Singleton để chỉ có một bộ tính phí trong hệ thống
- [x] Strategy: mỗi nhà vận chuyển một lớp

## Giải thích (VI)
Strategy : định nghĩa một interface ShippingCalculator, mỗi nhà vận chuyển một lớp cài đặt, rồi chọn lớp theo dữ liệu đầu vào. Thêm nhà mới là thêm một tệp, không sửa hàm đang chạy ổn.

### Giải thích các phương án:
- **Decorator để bọc thêm logic tính phí vào hàm cũ đang có** (Sai): Decorator thêm hành vi, không thay hành vi theo từng trường hợp.
- **Observer để thông báo khi phí vận chuyển thay đổi** (Sai): Giải bài toán thông báo, không giải bài toán phân nhánh.
- **Singleton để chỉ có một bộ tính phí trong hệ thống** (Sai): Không liên quan tới việc chọn cách tính theo nhà vận chuyển.
- **Strategy: mỗi nhà vận chuyển một lớp** (Đúng): Thêm nhà vận chuyển là thêm một lớp, không phải sửa hàm đang chạy.
