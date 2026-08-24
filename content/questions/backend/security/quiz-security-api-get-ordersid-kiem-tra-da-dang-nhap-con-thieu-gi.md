---
id: quiz-security-api-get-ordersid-kiem-tra-da-dang-nhap-con-thieu-gi
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API GET /orders/:id kiểm tra đã đăng nhập. Còn thiếu gì?

## Đáp án trắc nghiệm
- [ ] Dùng UUID thay cho số tự tăng để làm id của đơn hàng
- [ ] Giới hạn số lần gọi endpoint này mỗi phút
- [ ] Kiểm tra id có đúng định dạng số hợp lệ
- [x] Kiểm tra đơn hàng có thuộc về người đang gọi

## Giải thích (VI)
Thiếu kiểm tra chủ sở hữu (IDOR / broken object level authorization): xác thực chỉ trả lời "anh là ai", còn phải trả lời "anh có quyền với tài nguyên này không". Truy vấn nên là WHERE id = ? AND user_id = ?.

### Giải thích các phương án:
- **Dùng UUID thay cho số tự tăng để làm id của đơn hàng** (Sai): Khó đoán hơn nhưng vẫn không phải kiểm soát truy cập thật sự.
- **Giới hạn số lần gọi endpoint này mỗi phút** (Sai): Chống quét hàng loạt nhưng không chặn được việc đọc trái phép.
- **Kiểm tra id có đúng định dạng số hợp lệ** (Sai): Nên làm nhưng không phải lỗ hổng phân quyền ở đây.
- **Kiểm tra đơn hàng có thuộc về người đang gọi** (Đúng): Thiếu bước này thì đổi id trong URL là đọc được đơn của người khác.
