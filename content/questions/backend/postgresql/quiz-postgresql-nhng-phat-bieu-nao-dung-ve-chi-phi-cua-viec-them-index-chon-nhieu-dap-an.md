---
id: quiz-postgresql-nhng-phat-bieu-nao-dung-ve-chi-phi-cua-viec-them-index-chon-nhieu-dap-an
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào đúng về chi phí của việc thêm index? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [ ] Càng nhiều index thì mọi truy vấn SELECT càng nhanh
- [ ] Index chỉ tốn chi phí lúc tạo, về sau không tốn thêm gì
- [x] Mỗi INSERT/UPDATE/DELETE phải cập nhật thêm các index liên quan của bảng

## Giải thích (VI)
Index là đánh đổi đọc-ghi : đọc nhanh hơn, đổi lại mỗi lần ghi phải cập nhật thêm mọi index của bảng, cộng dung lượng đĩa riêng cho từng index. Index thừa (không truy vấn nào dùng) là chi phí thuần — nên tìm và gỡ định kỳ qua pg_stat_user_indexes.

### Giải thích các phương án:
- **Càng nhiều index thì mọi truy vấn SELECT càng nhanh** (Sai): Mỗi truy vấn thường chỉ dùng một vài index; số còn lại không giúp gì cho SELECT.
- **Index chỉ tốn chi phí lúc tạo, về sau không tốn thêm gì** (Sai): Chi phí lớn nhất là bảo trì liên tục khi ghi, không phải lúc tạo.
- **Mỗi INSERT/UPDATE/DELETE phải cập nhật thêm các index liên quan của bảng** (Đúng): Dữ liệu đổi thì mọi index chứa cột liên quan đều phải được ghi theo.
