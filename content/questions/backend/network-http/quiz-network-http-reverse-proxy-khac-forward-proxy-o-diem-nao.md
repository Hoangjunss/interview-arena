---
id: quiz-network-http-reverse-proxy-khac-forward-proxy-o-diem-nao
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Reverse proxy khác forward proxy ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Reverse proxy chỉ dùng cho HTTPS, forward cho HTTP
- [x] Reverse proxy đứng trước máy chủ dịch vụ
- [ ] Hai khái niệm chỉ khác nhau ở cách gọi tên
- [ ] Reverse proxy đứng trước client, forward proxy trước máy chủ

## Giải thích (VI)
Reverse proxy đứng trước máy chủ , nhận yêu cầu thay cho dịch vụ (phân tải, chấm dứt TLS, cache, chặn tấn công). Forward proxy đứng trước client , đại diện người dùng đi ra ngoài (lọc nội dung, ẩn địa chỉ, kiểm soát truy cập trong mạng nội bộ).

### Giải thích các phương án:
- **Reverse proxy chỉ dùng cho HTTPS, forward cho HTTP** (Sai): Cả hai đều xử lý được cả hai giao thức.
- **Reverse proxy đứng trước máy chủ dịch vụ** (Đúng): Một bên đại diện cho dịch vụ, một bên đại diện cho người dùng.
- **Hai khái niệm chỉ khác nhau ở cách gọi tên** (Sai): Vị trí và mục đích khác hẳn nhau.
- **Reverse proxy đứng trước client, forward proxy trước máy chủ** (Sai): Đảo ngược vị trí của hai loại.
