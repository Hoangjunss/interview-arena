---
id: quiz-linux-os-ssh-bang-khoa-bao-permissions-are-too-open-cho-tep-khoa-rieng-xu-ly
position: backend
technology: linux-os
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SSH bằng khoá báo "permissions are too open" cho tệp khoá riêng. Xử lý?

## Đáp án trắc nghiệm
- [ ] chmod 777 để chắc chắn đọc được không lỗi
- [ ] Chuyển khoá sang định dạng PEM rồi thử kết nối lại
- [ ] Thêm StrictHostKeyChecking no vào cấu hình SSH
- [x] chmod 600 cho tệp khoá riêng

## Giải thích (VI)
chmod 600 ~/.ssh/id_ed25519 — chỉ chủ sở hữu đọc ghi. SSH cố tình từ chối khoá riêng mà người khác trên cùng máy đọc được, vì khoá đó phải coi như đã bị lộ.

### Giải thích các phương án:
- **chmod 777 để chắc chắn đọc được không lỗi** (Sai): Làm ngược lại vấn đề: quyền càng mở thì SSH càng từ chối.
- **Chuyển khoá sang định dạng PEM rồi thử kết nối lại** (Sai): Định dạng khoá không phải nguyên nhân của lỗi quyền.
- **Thêm StrictHostKeyChecking no vào cấu hình SSH** (Sai): Tuỳ chọn đó liên quan tới xác minh host, không phải quyền tệp.
- **chmod 600 cho tệp khoá riêng** (Đúng): SSH từ chối dùng khoá mà user khác trên máy đọc được.
