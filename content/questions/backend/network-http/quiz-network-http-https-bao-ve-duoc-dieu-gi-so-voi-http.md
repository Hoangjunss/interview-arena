---
id: quiz-network-http-https-bao-ve-duoc-dieu-gi-so-voi-http
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTPS bảo vệ được điều gì so với HTTP?

## Đáp án trắc nghiệm
- [ ] Chỉ giấu tên miền đang truy cập khỏi nhà mạng
- [x] Mã hóa, chống sửa đổi, xác thực máy chủ
- [ ] Bảo đảm ứng dụng phía sau không có lỗ hổng
- [ ] Chỉ mã hóa nội dung, không xác thực máy chủ

## Giải thích (VI)
Ba thứ: bí mật (bên thứ ba không đọc được nội dung), toàn vẹn (không sửa được trên đường), xác thực máy chủ (chứng chỉ chứng minh bạn đang nói chuyện với đúng tên miền đó).

### Giải thích các phương án:
- **Chỉ giấu tên miền đang truy cập khỏi nhà mạng** (Sai): Tên miền vẫn lộ qua truy vấn DNS và trong nhiều trường hợp qua SNI.
- **Mã hóa, chống sửa đổi, xác thực máy chủ** (Đúng): TLS cung cấp cả bí mật, toàn vẹn và xác thực danh tính máy chủ.
- **Bảo đảm ứng dụng phía sau không có lỗ hổng** (Sai): HTTPS chỉ bảo vệ đường truyền, không liên quan tới lỗi ứng dụng.
- **Chỉ mã hóa nội dung, không xác thực máy chủ** (Sai): Chứng chỉ chính là phần xác thực máy chủ.
