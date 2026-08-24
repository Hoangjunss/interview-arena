---
id: quiz-qa-kiem-thu-exit-criteria-trong-ke-hoach-kiem-thu-dung-de-lam-gi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exit criteria trong kế hoạch kiểm thử dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Liệt kê những chức năng không nằm trong phạm vi test
- [x] Chốt trước điều kiện được coi là đã test đủ
- [ ] Xác định ai được quyền đóng một bug đã sửa
- [ ] Ghi lại ngày kết thúc giai đoạn test theo kế hoạch

## Giải thích (VI)
Chốt trước điều kiện nào thì coi là đã kiểm thử đủ: độ phủ yêu cầu, tỉ lệ test case đã chạy, số lỗi mở còn lại theo từng mức severity, và rủi ro còn tồn đọng. Không có tiêu chí này thì "test xong chưa" luôn là tranh cãi cảm tính.

### Giải thích các phương án:
- **Liệt kê những chức năng không nằm trong phạm vi test** (Sai): Đó là phần phạm vi, không phải exit criteria.
- **Chốt trước điều kiện được coi là đã test đủ** (Đúng): Thỏa thuận trước giúp tránh tranh cãi cảm tính vào phút chót.
- **Xác định ai được quyền đóng một bug đã sửa** (Sai): Đây là quy tắc quản lý bug, thuộc quy trình khác.
- **Ghi lại ngày kết thúc giai đoạn test theo kế hoạch** (Sai): Mốc thời gian là lịch, không phải tiêu chí hoàn thành.
