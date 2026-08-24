---
id: quiz-network-http-etag-dung-de-lam-gi
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ETag dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Kiểm chứng bản cache còn đúng hay không
- [ ] Mã hóa nội dung phản hồi trước khi gửi
- [ ] Đánh dấu tài nguyên không được phép cache
- [ ] Nén nội dung để giảm dung lượng truyền

## Giải thích (VI)
Là định danh phiên bản của tài nguyên. Khi bản cache hết hạn, client gửi lại ETag qua If-None-Match; nếu nội dung chưa đổi, máy chủ trả 304 Not Modified không kèm thân phản hồi — tiết kiệm băng thông mà vẫn bảo đảm dữ liệu mới.

### Giải thích các phương án:
- **Kiểm chứng bản cache còn đúng hay không** (Đúng): Client gửi lại ETag, máy chủ trả 304 nếu nội dung chưa đổi.
- **Mã hóa nội dung phản hồi trước khi gửi** (Sai): ETag chỉ là chuỗi định danh phiên bản, không mã hóa gì.
- **Đánh dấu tài nguyên không được phép cache** (Sai): Cấm cache là việc của Cache-Control.
- **Nén nội dung để giảm dung lượng truyền** (Sai): Nén do các header khác điều khiển.
