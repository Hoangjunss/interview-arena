---
id: quiz-system-design-hai-user-cung-dat-ve-cuoi-cung-chan-overbooking-bang-cach-nao-o-tang-db
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai user cùng đặt vé cuối cùng. Chặn overbooking bằng cách nào ở tầng DB?

## Đáp án trắc nghiệm
- [ ] Đặt khoá trong bộ nhớ của ứng dụng khi xử lý đặt vé
- [x] SELECT ... FOR UPDATE hoặc UPDATE kèm điều kiện tồn
- [ ] Xử lý lần lượt bằng một queue chỉ có duy nhất một worker
- [ ] Kiểm tra số vé còn lại rồi mới ghi bản ghi đặt vé

## Giải thích (VI)
Để DB làm trọng tài . Cách gọn nhất là UPDATE có điều kiện: UPDATE seats SET remaining = remaining - 1 WHERE id = ? AND remaining > 0 rồi kiểm tra số dòng bị ảnh hưởng — 0 dòng nghĩa là hết vé. Hoặc SELECT ... FOR UPDATE để khoá bản ghi trong transaction.

### Giải thích các phương án:
- **Đặt khoá trong bộ nhớ của ứng dụng khi xử lý đặt vé** (Sai): Nhiều instance thì khoá trong bộ nhớ không có tác dụng.
- **SELECT ... FOR UPDATE hoặc UPDATE kèm điều kiện tồn** (Đúng): Cả hai đều để DB làm trọng tài, nên chỉ một transaction thắng.
- **Xử lý lần lượt bằng một queue chỉ có duy nhất một worker** (Sai): Đúng đắn nhưng đánh đổi thông lượng cho mọi đơn hàng chỉ vì một trường hợp hiếm.
- **Kiểm tra số vé còn lại rồi mới ghi bản ghi đặt vé** (Sai): Kinh điển của race condition: cả hai đọc cùng thấy còn 1 vé.
