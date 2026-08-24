---
id: quiz-qa-kiem-thu-nghich-ly-thuoc-tru-sau-pesticide-paradox-trong-kiem-thu-mo-ta-hien-tuong-gi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nghịch lý thuốc trừ sâu (pesticide paradox) trong kiểm thử mô tả hiện tượng gì?

## Đáp án trắc nghiệm
- [ ] Càng nhiều tester thì càng khó thống nhất kết quả
- [ ] Sửa một lỗi thường làm phát sinh lỗi khác
- [ ] Test tự động luôn kém tin cậy hơn test thủ công
- [x] Bộ test lặp lại mãi sẽ không còn tìm ra lỗi mới

## Giải thích (VI)
Chạy mãi một bộ test thì hiệu quả phát hiện lỗi giảm dần — nó chỉ phủ những đường đã biết, còn lỗi mới nằm ở chỗ chưa ai chạm tới. Bộ test cần được rà soát và bổ sung định kỳ.

### Giải thích các phương án:
- **Càng nhiều tester thì càng khó thống nhất kết quả** (Sai): Không liên quan tới nội dung của nguyên lý.
- **Sửa một lỗi thường làm phát sinh lỗi khác** (Sai): Đó là lỗi hồi quy, khái niệm khác.
- **Test tự động luôn kém tin cậy hơn test thủ công** (Sai): Nguyên lý không so sánh hai hình thức kiểm thử.
- **Bộ test lặp lại mãi sẽ không còn tìm ra lỗi mới** (Đúng): Test cũ chỉ phủ những đường đã biết nên hiệu quả phát hiện giảm dần.
