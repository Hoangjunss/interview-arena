---
id: quiz-qa-kiem-thu-trong-kiem-thu-dua-tren-rui-ro-muc-rui-ro-cua-mot-chuc-nang-duoc-tinh-the-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong kiểm thử dựa trên rủi ro, mức rủi ro của một chức năng được tính thế nào?

## Đáp án trắc nghiệm
- [ ] Số lượng test case đã viết cho chức năng đó
- [ ] Thời gian phát triển chức năng đó
- [x] Khả năng xảy ra nhân với mức thiệt hại
- [ ] Số dòng code của chức năng đó

## Giải thích (VI)
Rủi ro = khả năng xảy ra × mức thiệt hại . Khả năng nhìn vào độ phức tạp, mức độ thay đổi gần đây, kinh nghiệm của người làm và lịch sử lỗi; thiệt hại nhìn vào tiền, dữ liệu, uy tín và nghĩa vụ pháp lý.

### Giải thích các phương án:
- **Số lượng test case đã viết cho chức năng đó** (Sai): Số test case là kết quả của việc phân tích rủi ro, không phải đầu vào.
- **Thời gian phát triển chức năng đó** (Sai): Thời gian phát triển không phản ánh thiệt hại khi lỗi xảy ra.
- **Khả năng xảy ra nhân với mức thiệt hại** (Đúng): Rủi ro là tích của xác suất và tác động, đây là cơ sở để xếp thứ tự kiểm thử.
- **Số dòng code của chức năng đó** (Sai): Kích thước code chỉ là một tín hiệu phụ, không phải công thức tính rủi ro.
