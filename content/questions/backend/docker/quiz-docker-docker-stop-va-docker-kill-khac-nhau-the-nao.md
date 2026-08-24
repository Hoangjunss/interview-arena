---
id: quiz-docker-docker-stop-va-docker-kill-khac-nhau-the-nao
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
docker stop và docker kill khác nhau thế nào?

## Đáp án trắc nghiệm
- [ ] kill gửi SIGTERM còn stop gửi SIGKILL — tên lệnh ngược với hành vi thực tế
- [ ] stop chỉ đóng băng tiến trình và giữ nguyên trạng thái trong RAM, muốn chạy lại phải docker unpause
- [x] stop gửi SIGTERM rồi chờ ân hạn 10 giây mới gửi SIGKILL; kill gửi thẳng SIGKILL
- [ ] Hai lệnh gửi cùng một tín hiệu, chỉ khác ở chỗ stop xóa luôn container sau khi dừng

## Giải thích (VI)
docker stop gửi SIGTERM, chờ khoảng ân hạn mặc định 10 giây rồi mới SIGKILL — ứng dụng kịp đóng kết nối và xả việc dở. docker kill gửi thẳng SIGKILL, tiến trình chết ngay. Đổi thời gian chờ bằng docker stop -t <giây>.

### Giải thích các phương án:
- **kill gửi SIGTERM còn stop gửi SIGKILL — tên lệnh ngược với hành vi thực tế** (Sai): Ngược hoàn toàn: stop mới là lệnh gửi SIGTERM trước.
- **stop chỉ đóng băng tiến trình và giữ nguyên trạng thái trong RAM, muốn chạy lại phải docker unpause** (Sai): Đó là mô tả của docker pause/docker unpause, không phải stop.
- **stop gửi SIGTERM rồi chờ ân hạn 10 giây mới gửi SIGKILL; kill gửi thẳng SIGKILL** (Đúng): Đúng: stop cho ứng dụng cơ hội tắt êm (mặc định 10 giây ân hạn), kill cắt ngay lập tức nên tiến trình không kịp dọn dẹp.
- **Hai lệnh gửi cùng một tín hiệu, chỉ khác ở chỗ stop xóa luôn container sau khi dừng** (Sai): Tín hiệu khác nhau, và không lệnh nào tự xóa container — việc đó là của docker rm.
