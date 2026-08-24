---
id: quiz-docker-vi-sao-tach-apt-get-update-va-apt-get-install-thanh-hai-lenh-run-nhu-duoi-day-la
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao tách apt-get update và apt-get install thành hai lệnh RUN như dưới đây là anti-pattern?

## Đáp án trắc nghiệm
- [ ] Vì apt-get không chạy được qua nhiều lệnh RUN liên tiếp, phải đổi sang apt
- [ ] Vì mỗi RUN tạo một container mới nên biến DEBIAN_FRONTEND bị mất
- [ ] Vì Docker giới hạn mỗi Dockerfile chỉ được một lệnh cài package
- [x] Hai layer khác nhau: sửa dòng install thì layer update vẫn dùng cache cũ

## Giải thích (VI)
Vì cache đánh theo từng layer. Sửa dòng install thì layer update phía trên vẫn hit cache, kết quả là cài package dựa trên danh sách mirror đã cũ — dễ lỗi 404 hoặc dính bản lỗi thời. Gộp lại một RUN nối bằng && để hai bước luôn chạy cùng nhau.

### Giải thích các phương án:
- **Vì apt-get không chạy được qua nhiều lệnh RUN liên tiếp, phải đổi sang apt** (Sai): apt-get chạy bình thường ở nhiều RUN; vấn đề nằm ở cache của layer.
- **Vì mỗi RUN tạo một container mới nên biến DEBIAN_FRONTEND bị mất** (Sai): Biến môi trường đúng là không mang sang RUN khác, nhưng đó không phải lý do chính ở đây.
- **Vì Docker giới hạn mỗi Dockerfile chỉ được một lệnh cài package** (Sai): Không tồn tại giới hạn nào như vậy.
- **Hai layer khác nhau: sửa dòng install thì layer update vẫn dùng cache cũ** (Đúng): Đây chính là lỗi "cache-busting" kinh điển: danh sách package đã lỗi thời nên cài về phiên bản cũ hoặc lỗi 404 vì file đã bị gỡ khỏi mirror. Phải gộp update và install vào cùng một RUN.
