---
id: quiz-cs-fundamentals-http2-giai-quyet-duoc-han-che-nao-cua-http11-va-van-con-ton-tai-han-che-nao
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP/2 giải quyết được hạn chế nào của HTTP/1.1 và vẫn còn tồn tại hạn chế nào?

## Đáp án trắc nghiệm
- [ ] Giải quyết việc thiếu mã hoá vì HTTP/2 bắt buộc dùng TLS theo chuẩn
- [x] Xoá head-of-line blocking ở tầng ứng dụng, nhưng vẫn còn ở tầng TCP
- [ ] Giải quyết giới hạn kích thước body nhưng vẫn giữ giới hạn số lượng header
- [ ] Giải quyết hoàn toàn mọi dạng head-of-line blocking nhờ nén header HPACK

## Giải thích (VI)
HTTP/2 dùng multiplexing: nhiều request/response chạy song song thành các stream trên một kết nối TCP, xoá head-of-line blocking ở tầng ứng dụng của HTTP/1.1. Nhưng tất cả stream vẫn đi chung một kết nối TCP, nên mất một gói khiến TCP giữ lại toàn bộ dữ liệu phía sau — head-of-line blocking chuyển xuống tầng vận chuyển.

### Giải thích các phương án:
- **Giải quyết việc thiếu mã hoá vì HTTP/2 bắt buộc dùng TLS theo chuẩn** (Sai): Chuẩn HTTP/2 không bắt buộc TLS (có chế độ h2c); chỉ là mọi trình duyệt lớn đều từ chối HTTP/2 không mã hoá.
- **Xoá head-of-line blocking ở tầng ứng dụng, nhưng vẫn còn ở tầng TCP** (Đúng): Nhiều stream chia sẻ một kết nối TCP nên không còn xếp hàng theo request, nhưng mất một gói TCP vẫn chặn mọi stream đi chung kết nối đó.
- **Giải quyết giới hạn kích thước body nhưng vẫn giữ giới hạn số lượng header** (Sai): HTTP/1.1 không có giới hạn kích thước body ở tầng giao thức; các ngưỡng là do server đặt ra, không liên quan tới thay đổi của HTTP/2.
- **Giải quyết hoàn toàn mọi dạng head-of-line blocking nhờ nén header HPACK** (Sai): HPACK nén header để giảm băng thông, không liên quan tới xếp hàng; head-of-line blocking ở tầng TCP vẫn còn nguyên.
