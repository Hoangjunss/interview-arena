---
id: quiz-cs-fundamentals-dieu-gi-xay-ra-dau-tien-khi-trinh-duyet-can-mo-mot-ten-mien-chua-tung-truy-cap
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra đầu tiên khi trình duyệt cần mở một tên miền chưa từng truy cập?

## Đáp án trắc nghiệm
- [ ] Bắt tay TLS để thiết lập kênh mã hoá với máy chủ đích
- [x] Phân giải DNS để lấy địa chỉ IP tương ứng với tên miền
- [ ] Kiểm tra chứng chỉ của máy chủ trong kho tin cậy của hệ điều hành
- [ ] Gửi request HTTP GET tới máy chủ để lấy tài liệu HTML

## Giải thích (VI)
Phân giải DNS. Mạng định tuyến theo địa chỉ IP chứ không theo tên miền, nên trình duyệt phải hỏi resolver để đổi tên miền thành IP trước. Sau đó mới lần lượt tới bắt tay TCP, bắt tay TLS, rồi gửi request HTTP.

### Giải thích các phương án:
- **Bắt tay TLS để thiết lập kênh mã hoá với máy chủ đích** (Sai): Bắt tay TLS diễn ra sau khi đã có kết nối TCP, mà kết nối TCP lại cần biết IP — nên DNS vẫn phải đi trước.
- **Phân giải DNS để lấy địa chỉ IP tương ứng với tên miền** (Đúng): Giao thức TCP/IP định tuyến theo địa chỉ IP chứ không theo tên, nên phải có IP trước khi mở được kết nối.
- **Kiểm tra chứng chỉ của máy chủ trong kho tin cậy của hệ điều hành** (Sai): Việc kiểm tra chứng chỉ nằm trong bắt tay TLS, tức sau DNS và sau khi kết nối TCP đã được thiết lập.
- **Gửi request HTTP GET tới máy chủ để lấy tài liệu HTML** (Sai): Request HTTP chỉ gửi được khi kết nối đã mở; đây là bước gần cuối trong chuỗi chứ không phải bước đầu tiên.
