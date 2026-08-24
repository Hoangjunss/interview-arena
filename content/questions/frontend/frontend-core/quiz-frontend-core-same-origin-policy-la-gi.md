---
id: quiz-frontend-core-same-origin-policy-la-gi
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Same-Origin Policy là gì?

## Đáp án trắc nghiệm
- [ ] Hai URL cùng tên miền luôn cùng origin dù khác giao thức hay cổng
- [ ] Nó chặn hoàn toàn mọi request gửi tới domain khác origin
- [x] Script của một origin không được đọc dữ liệu từ origin khác, trừ khi CORS cho phép
- [ ] Quy tắc của server: chỉ chấp nhận request gửi đến từ đúng các địa chỉ IP đã đăng ký trước

## Giải thích (VI)
Same-Origin Policy là chính sách của trình duyệt: script chỉ đọc được dữ liệu từ chính origin của nó. Origin gồm giao thức, tên miền và cổng — khác một trong ba là khác origin. Nó không chặn việc gửi request (ảnh, form, script vẫn tải được), mà chặn việc JavaScript đọc phản hồi và truy cập DOM của origin khác. CORS là cách server cho phép có kiểm soát.

### Giải thích các phương án:
- **Hai URL cùng tên miền luôn cùng origin dù khác giao thức hay cổng** (Sai): Khác http/https hoặc khác cổng là khác origin.
- **Nó chặn hoàn toàn mọi request gửi tới domain khác origin** (Sai): Request vẫn gửi được (ví dụ tải ảnh, gửi form); thứ bị chặn là việc script đọc phản hồi.
- **Script của một origin không được đọc dữ liệu từ origin khác, trừ khi CORS cho phép** (Đúng): Đúng: origin gồm giao thức + tên miền + cổng, khác một trong ba là khác origin. CORS là cơ chế nới lỏng có kiểm soát, và quyền do server cấp qua header phản hồi.
- **Quy tắc của server: chỉ chấp nhận request gửi đến từ đúng các địa chỉ IP đã đăng ký trước** (Sai): Đây là chính sách của trình duyệt, không phải lọc IP ở server.
