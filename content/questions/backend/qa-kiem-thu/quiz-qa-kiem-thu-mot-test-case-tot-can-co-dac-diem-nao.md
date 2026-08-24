---
id: quiz-qa-kiem-thu-mot-test-case-tot-can-co-dac-diem-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một test case tốt cần có đặc điểm nào?

## Đáp án trắc nghiệm
- [ ] Luôn kèm ảnh chụp màn hình cho từng bước
- [ ] Bao phủ càng nhiều chức năng trong một case càng tốt
- [x] Có tiền đề rõ và kết quả mong đợi kiểm chứng được
- [ ] Được viết bằng ngôn ngữ càng chi tiết càng tốt

## Giải thích (VI)
Có tiền đề rõ ràng (tài khoản, dữ liệu, trạng thái), các bước xác định, và kết quả mong đợi kiểm chứng được . Phép thử đơn giản: người khác đọc và chạy lại có ra cùng kết luận pass hay fail không.

### Giải thích các phương án:
- **Luôn kèm ảnh chụp màn hình cho từng bước** (Sai): Ảnh hữu ích cho báo cáo lỗi, không phải yêu cầu của test case.
- **Bao phủ càng nhiều chức năng trong một case càng tốt** (Sai): Case ôm nhiều chức năng thì khi fail không biết chỗ nào hỏng.
- **Có tiền đề rõ và kết quả mong đợi kiểm chứng được** (Đúng): Không có hai thứ này thì người khác chạy lại sẽ ra kết luận khác.
- **Được viết bằng ngôn ngữ càng chi tiết càng tốt** (Sai): Chi tiết quá mức làm chi phí bảo trì tăng mà giá trị không tăng.
