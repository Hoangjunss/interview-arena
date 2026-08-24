---
id: quiz-cs-fundamentals-vi-sao-mo-hinh-kim-tu-thap-kiem-thu-khuyen-nghi-nhieu-unit-test-hon-end-to-end-t
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mô hình kim tự tháp kiểm thử khuyến nghị nhiều unit test hơn end-to-end test?

## Đáp án trắc nghiệm
- [ ] Vì công cụ e2e hiện chưa đủ trưởng thành để chạy ổn định trong môi trường CI
- [ ] Vì unit test không cần bảo trì khi mã thay đổi
- [x] Vì unit test nhanh và chỉ đúng chỗ hỏng, còn e2e chậm và dễ nhiễu
- [ ] Vì unit test phát hiện được nhiều loại lỗi hơn e2e test

## Giải thích (VI)
Vì chi phí và tốc độ phản hồi. Unit test chạy trong mili giây, không cần hạ tầng, và khi hỏng thì chỉ thẳng vào hàm sai. E2e test cần cả hệ thống chạy, tốn hàng chục giây tới vài phút, dễ nhiễu do độ trễ mạng hay thời điểm, và khi đỏ thì vẫn phải điều tra để biết tầng nào hỏng.

### Giải thích các phương án:
- **Vì công cụ e2e hiện chưa đủ trưởng thành để chạy ổn định trong môi trường CI** (Sai): Playwright và Cypress chạy ổn định trong CI từ lâu; hạn chế nằm ở thời gian chạy và tính ổn định của bài test, không phải ở công cụ.
- **Vì unit test không cần bảo trì khi mã thay đổi** (Sai): Unit test bám sát cấu trúc mã nên khi tái cấu trúc lại phải sửa nhiều; e2e đi qua giao diện người dùng thường ổn định hơn trước tái cấu trúc nội bộ.
- **Vì unit test nhanh và chỉ đúng chỗ hỏng, còn e2e chậm và dễ nhiễu** (Đúng): Vòng phản hồi ngắn và khoanh vùng lỗi hẹp là hai thứ quyết định chi phí sửa; e2e đắt ở cả hai mặt nên chỉ dùng cho luồng quan trọng nhất.
- **Vì unit test phát hiện được nhiều loại lỗi hơn e2e test** (Sai): E2e bắt được cả lớp lỗi tích hợp mà unit test không thấy — cấu hình sai, hợp đồng API lệch, lỗi hạ tầng — nên phạm vi phát hiện không phải lý do.
