---
id: quiz-network-http-ban-ghi-a-va-ban-ghi-cname-khac-nhau-the-nao
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bản ghi A và bản ghi CNAME khác nhau thế nào?

## Đáp án trắc nghiệm
- [x] A trỏ tới IP, CNAME trỏ tới tên miền
- [ ] A dùng cho IPv6, CNAME dùng cho IPv4
- [ ] A trỏ tới tên miền khác, CNAME trỏ tới IP
- [ ] A dùng cho web, CNAME dùng cho email

## Giải thích (VI)
A trỏ tên miền tới một địa chỉ IPv4 (AAAA cho IPv6). CNAME là bí danh trỏ tới một tên miền khác, nên phải phân giải thêm một bước nữa mới ra IP.

### Giải thích các phương án:
- **A trỏ tới IP, CNAME trỏ tới tên miền** (Đúng): CNAME là bí danh, phải phân giải tiếp tên đích.
- **A dùng cho IPv6, CNAME dùng cho IPv4** (Sai): IPv6 dùng bản ghi AAAA.
- **A trỏ tới tên miền khác, CNAME trỏ tới IP** (Sai): Đảo ngược vai trò hai loại bản ghi.
- **A dùng cho web, CNAME dùng cho email** (Sai): Email dùng bản ghi MX.
