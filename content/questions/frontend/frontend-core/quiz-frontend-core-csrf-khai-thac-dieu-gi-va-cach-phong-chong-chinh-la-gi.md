---
id: quiz-frontend-core-csrf-khai-thac-dieu-gi-va-cach-phong-chong-chinh-la-gi
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSRF khai thác điều gì và cách phòng chống chính là gì?

## Đáp án trắc nghiệm
- [x] Khai thác cookie tự đi kèm request tới domain đích; chặn bằng SameSite và token
- [ ] Không còn tồn tại nữa vì các trình duyệt hiện đại đã chặn hoàn toàn cookie bên thứ ba
- [ ] Chỉ ảnh hưởng tới request GET nên chuyển hết sang POST là an toàn
- [ ] Khai thác lỗ hổng cho phép chèn và chạy script trong trang nạn nhân

## Giải thích (VI)
CSRF lợi dụng việc cookie tự động đi kèm request tới đúng domain: một trang khác dụ trình duyệt gửi request tới ứng dụng mà người dùng đang đăng nhập, và server thực hiện hành động vì thấy cookie hợp lệ. Phòng chống: đặt SameSite=Lax hoặc Strict cho cookie phiên, kiểm tra CSRF token cho các thao tác ghi, và không dùng GET cho hành động thay đổi dữ liệu.

### Giải thích các phương án:
- **Khai thác cookie tự đi kèm request tới domain đích; chặn bằng SameSite và token** (Đúng): Đúng: gốc rễ là cookie tự gửi, nên biện pháp xoay quanh cookie và token xác nhận. Trang khác dụ trình duyệt gửi request tới ứng dụng người dùng đang đăng nhập, và server thực hiện vì thấy cookie hợp lệ.
- **Không còn tồn tại nữa vì các trình duyệt hiện đại đã chặn hoàn toàn cookie bên thứ ba** (Sai): Hạn chế cookie bên thứ ba giúp giảm rủi ro nhưng không thay thế được SameSite và token phía server.
- **Chỉ ảnh hưởng tới request GET nên chuyển hết sang POST là an toàn** (Sai): Form gửi POST cross-site vẫn được; đổi method không phải biện pháp phòng chống.
- **Khai thác lỗ hổng cho phép chèn và chạy script trong trang nạn nhân** (Sai): Đó là XSS; CSRF không cần chạy script trên trang nạn nhân.
