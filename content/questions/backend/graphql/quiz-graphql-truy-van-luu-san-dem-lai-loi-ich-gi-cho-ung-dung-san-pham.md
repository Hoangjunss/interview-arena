---
id: quiz-graphql-truy-van-luu-san-dem-lai-loi-ich-gi-cho-ung-dung-san-pham
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn lưu sẵn đem lại lợi ích gì cho ứng dụng sản phẩm?

## Đáp án trắc nghiệm
- [ ] Kết quả truy vấn được lưu vĩnh viễn ở server
- [ ] Client không cần biết schema nữa
- [x] Client gửi mã băm thay vì cả tài liệu truy vấn
- [ ] Server tự tối ưu lại truy vấn trước khi chạy

## Giải thích (VI)
Client gửi mã băm của truy vấn thay vì cả tài liệu, nên yêu cầu nhẹ hơn. Quan trọng hơn, server có thể chỉ chấp nhận các truy vấn đã đăng ký, biến danh sách đó thành một hàng rào chặn truy vấn tuỳ ý.

### Giải thích các phương án:
- **Kết quả truy vấn được lưu vĩnh viễn ở server** (Sai): Đây là lưu tài liệu truy vấn chứ không lưu kết quả.
- **Client không cần biết schema nữa** (Sai): Client vẫn phải viết truy vấn theo schema lúc phát triển.
- **Client gửi mã băm thay vì cả tài liệu truy vấn** (Đúng): Giảm dung lượng gửi lên và cho phép máy chủ chỉ chấp nhận các truy vấn đã biết trước.
- **Server tự tối ưu lại truy vấn trước khi chạy** (Sai): Không có bước viết lại truy vấn nào.
