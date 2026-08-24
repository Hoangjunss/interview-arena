---
id: quiz-linux-os-df-h-bao-dia-day-nhung-du-sh-cong-lai-nho-hon-nhieu-vi-sao
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
df -h báo đĩa đầy nhưng du -sh / cộng lại nhỏ hơn nhiều. Vì sao?

## Đáp án trắc nghiệm
- [ ] du không đếm được tệp ẩn nên kết quả nhỏ hơn
- [ ] Hai lệnh dùng đơn vị khác nhau nên số liệu bị lệch nhau
- [x] Có tệp đã xoá mà tiến trình vẫn giữ file descriptor
- [ ] df tính cả phần dung lượng dành riêng cho root

## Giải thích (VI)
Thường là tệp đã xoá mà tiến trình còn mở : xoá tên tệp nhưng file descriptor vẫn tồn tại nên dung lượng chưa được thu hồi. Tìm bằng lsof | grep deleted, xử lý bằng restart tiến trình đó.

### Giải thích các phương án:
- **du không đếm được tệp ẩn nên kết quả nhỏ hơn** (Sai): du đếm cả tệp ẩn bình thường.
- **Hai lệnh dùng đơn vị khác nhau nên số liệu bị lệch nhau** (Sai): Cả hai đều theo -h cùng kiểu đơn vị.
- **Có tệp đã xoá mà tiến trình vẫn giữ file descriptor** (Đúng): Dung lượng chỉ được giải phóng khi tiến trình đóng tệp hoặc bị restart.
- **df tính cả phần dung lượng dành riêng cho root** (Sai): Có một phần dự trữ nhưng nó nhỏ, không giải thích được chênh lệch lớn.
