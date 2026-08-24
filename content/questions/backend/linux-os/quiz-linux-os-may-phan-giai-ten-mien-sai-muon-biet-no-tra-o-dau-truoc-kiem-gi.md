---
id: quiz-linux-os-may-phan-giai-ten-mien-sai-muon-biet-no-tra-o-dau-truoc-kiem-gi
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Máy phân giải tên miền sai, muốn biết nó tra ở đâu trước. Kiểm gì?

## Đáp án trắc nghiệm
- [ ] DNS công cộng như 8.8.8.8 nếu đã cấu hình trước đó
- [ ] DNS server của hệ thống trước, /etc/hosts chỉ là dự phòng
- [ ] Cache của trình duyệt trước khi hỏi hệ điều hành
- [x] /etc/hosts trước, rồi tới DNS server trong resolv.conf

## Giải thích (VI)
/etc/hosts được tra trước , sau đó mới tới nameserver khai trong /etc/resolv.conf (thứ tự thật do nsswitch.conf quy định). Một dòng cũ sót lại trong hosts là nguyên nhân rất hay gặp.

### Giải thích các phương án:
- **DNS công cộng như 8.8.8.8 nếu đã cấu hình trước đó** (Sai): Đó chỉ là một trong các nameserver được khai trong resolv.conf.
- **DNS server của hệ thống trước, /etc/hosts chỉ là dự phòng** (Sai): Thứ tự ngược lại: tệp hosts được ưu tiên.
- **Cache của trình duyệt trước khi hỏi hệ điều hành** (Sai): Trình duyệt có cache riêng nhưng không quyết định thứ tự của hệ thống.
- **/etc/hosts trước, rồi tới DNS server trong resolv.conf** (Đúng): Một dòng cũ trong /etc/hosts sẽ ghi đè mọi kết quả từ DNS.
