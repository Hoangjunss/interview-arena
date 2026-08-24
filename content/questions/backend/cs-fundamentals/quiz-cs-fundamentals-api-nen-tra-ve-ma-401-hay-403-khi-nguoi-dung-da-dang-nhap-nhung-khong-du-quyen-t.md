---
id: quiz-cs-fundamentals-api-nen-tra-ve-ma-401-hay-403-khi-nguoi-dung-da-dang-nhap-nhung-khong-du-quyen-t
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API nên trả về mã 401 hay 403 khi người dùng đã đăng nhập nhưng không đủ quyền truy cập tài nguyên?

## Đáp án trắc nghiệm
- [ ] 401 Unauthorized — vì người dùng không được phép truy cập
- [ ] 400 Bad Request — vì request không hợp lệ trong ngữ cảnh này
- [x] 403 Forbidden — danh tính đã xác định, vấn đề nằm ở quyền
- [ ] 500 Internal Server Error — để không lộ thông tin về quyền

## Giải thích (VI)
403 Forbidden. Theo RFC 9110, 401 nghĩa là request thiếu thông tin xác thực hợp lệ — server chưa biết bạn là ai, và bắt buộc phải kèm header WWW-Authenticate. 403 nghĩa là server đã biết bạn là ai và vẫn từ chối. Đăng nhập rồi nhưng không đủ quyền chính là trường hợp thứ hai.

### Giải thích các phương án:
- **401 Unauthorized — vì người dùng không được phép truy cập** (Sai): Tên gọi 401 gây hiểu nhầm: theo RFC 9110 nó có nghĩa "chưa xác thực", nên client sẽ hiểu là cần đăng nhập lại dù thực tế đã đăng nhập đúng.
- **400 Bad Request — vì request không hợp lệ trong ngữ cảnh này** (Sai): 400 dành cho request sai cú pháp hoặc sai dữ liệu; ở đây request hoàn toàn hợp lệ, chỉ là chủ thể gọi không được phép.
- **403 Forbidden — danh tính đã xác định, vấn đề nằm ở quyền** (Đúng): 401 nghĩa là chưa xác thực hoặc thông tin xác thực không hợp lệ; khi danh tính đã rõ mà vẫn bị từ chối thì đó là bài toán phân quyền, tức 403.
- **500 Internal Server Error — để không lộ thông tin về quyền** (Sai): 500 báo lỗi phía server và làm hỏng cơ chế giám sát; nếu cần giấu sự tồn tại của tài nguyên thì dùng 404, không dùng 500.
