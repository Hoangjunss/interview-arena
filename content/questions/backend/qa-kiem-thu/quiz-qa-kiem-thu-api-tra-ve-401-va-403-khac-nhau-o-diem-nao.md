---
id: quiz-qa-kiem-thu-api-tra-ve-401-va-403-khac-nhau-o-diem-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API trả về 401 và 403 khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [ ] 401 là sai mật khẩu, 403 là tài khoản bị khóa
- [x] 401 là chưa xác thực, 403 là không đủ quyền
- [ ] 401 do client gây ra, 403 do server gây ra
- [ ] 401 dùng cho web, 403 dùng cho API

## Giải thích (VI)
401 Unauthorized = chưa xác thực hoặc token không hợp lệ, cần đăng nhập lại. 403 Forbidden = đã biết bạn là ai nhưng bạn không có quyền với tài nguyên này. Nhầm hai mã này làm client xử lý sai, ví dụ tự động đăng xuất người dùng khi họ chỉ thiếu quyền.

### Giải thích các phương án:
- **401 là sai mật khẩu, 403 là tài khoản bị khóa** (Sai): Đây là hai tình huống nghiệp vụ, không phải định nghĩa của mã.
- **401 là chưa xác thực, 403 là không đủ quyền** (Đúng): 401 nói về danh tính, 403 nói về quyền của danh tính đã biết.
- **401 do client gây ra, 403 do server gây ra** (Sai): Cả hai đều thuộc nhóm 4xx, tức lỗi phía client.
- **401 dùng cho web, 403 dùng cho API** (Sai): Cả hai mã dùng chung cho mọi loại client.
