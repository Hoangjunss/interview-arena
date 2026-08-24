---
id: quiz-thuat-toan-ctdl-mot-ham-de-quy-duyet-danh-sach-lien-ket-n-nut-khong-cap-phat-them-mang-nao-ton-b
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một hàm đệ quy duyệt danh sách liên kết n nút, không cấp phát thêm mảng nào, tốn bao nhiêu bộ nhớ phụ?

## Đáp án trắc nghiệm
- [ ] O(log n), vì đệ quy luôn chia đôi bài toán
- [x] O(n), do n khung hàm nằm trên stack gọi
- [ ] O(1), vì không có cấu trúc dữ liệu nào được tạo
- [ ] Không tốn gì, trình biên dịch luôn khử được đệ quy

## Giải thích (VI)
O(n). Mỗi lần gọi đệ quy đẩy một khung hàm lên stack và các khung chỉ được gỡ khi lần gọi sâu nhất trả về, nên độ sâu n đồng nghĩa với n khung cùng tồn tại. Với danh sách đủ dài, đây chính là nguyên nhân gây tràn stack.

### Giải thích các phương án:
- **O(log n), vì đệ quy luôn chia đôi bài toán** (Sai): Chỉ đệ quy chia đôi mới có độ sâu log n; duyệt danh sách thì sâu n.
- **O(n), do n khung hàm nằm trên stack gọi** (Đúng): Mỗi lần gọi lồng thêm một khung, chỉ được giải phóng khi lần gọi sâu nhất trả về.
- **O(1), vì không có cấu trúc dữ liệu nào được tạo** (Sai): Ngăn xếp gọi cũng là bộ nhớ, chỉ là không do lập trình viên cấp phát tường minh.
- **Không tốn gì, trình biên dịch luôn khử được đệ quy** (Sai): Khử đệ quy đuôi không được bảo đảm; V8 và CPython đều không làm.
