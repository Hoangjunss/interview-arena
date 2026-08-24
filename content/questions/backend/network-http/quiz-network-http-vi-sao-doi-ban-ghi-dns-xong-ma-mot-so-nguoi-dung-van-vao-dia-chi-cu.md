---
id: quiz-network-http-vi-sao-doi-ban-ghi-dns-xong-ma-mot-so-nguoi-dung-van-vao-dia-chi-cu
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao đổi bản ghi DNS xong mà một số người dùng vẫn vào địa chỉ cũ?

## Đáp án trắc nghiệm
- [ ] Máy chủ tên có thẩm quyền cập nhật theo lịch hằng ngày
- [ ] Do bản ghi mới chưa được ký bằng chứng chỉ
- [x] Bản ghi cũ còn trong cache tới khi hết TTL
- [ ] Bản ghi mới cần được duyệt thủ công trước khi có hiệu lực

## Giải thích (VI)
Vì TTL : các phân giải trung gian và chính máy người dùng còn giữ bản ghi cũ trong cache cho tới khi hết thời gian sống. Muốn đổi nhanh, hãy hạ TTL xuống trước vài ngày rồi mới đổi bản ghi.

### Giải thích các phương án:
- **Máy chủ tên có thẩm quyền cập nhật theo lịch hằng ngày** (Sai): Máy chủ có thẩm quyền cập nhật ngay khi bạn sửa.
- **Do bản ghi mới chưa được ký bằng chứng chỉ** (Sai): Không phải yêu cầu để bản ghi có hiệu lực.
- **Bản ghi cũ còn trong cache tới khi hết TTL** (Đúng): Client và phân giải trung gian giữ kết quả cho tới hết thời gian sống.
- **Bản ghi mới cần được duyệt thủ công trước khi có hiệu lực** (Sai): Không có bước duyệt nào trong DNS.
