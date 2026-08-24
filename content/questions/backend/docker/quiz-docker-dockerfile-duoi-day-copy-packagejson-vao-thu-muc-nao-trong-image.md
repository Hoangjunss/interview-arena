---
id: quiz-docker-dockerfile-duoi-day-copy-packagejson-vao-thu-muc-nao-trong-image
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dockerfile dưới đây copy package.json vào thư mục nào trong image?

## Đáp án trắc nghiệm
- [ ] Vào /app, vì COPY luôn dùng thư mục được mkdir gần nhất
- [ ] Vào /app, vì RUN cd /app đã đặt thư mục làm việc cho toàn bộ các lệnh phía sau
- [x] Vào / — mỗi RUN chạy trong shell riêng nên cd không giữ sang lệnh sau
- [ ] Build sẽ lỗi vì bắt buộc phải khai báo WORKDIR trước khi COPY

## Giải thích (VI)
Vào /. Mỗi RUN là một layer với shell riêng, nên cd /app không còn hiệu lực ở lệnh tiếp theo. Cách đúng là WORKDIR /app — nó đặt thư mục làm việc cho mọi lệnh phía sau và tự tạo thư mục nếu chưa có.

### Giải thích các phương án:
- **Vào /app, vì COPY luôn dùng thư mục được mkdir gần nhất** (Sai): COPY không hề theo dõi mkdir; đích đến . là thư mục làm việc hiện tại.
- **Vào /app, vì RUN cd /app đã đặt thư mục làm việc cho toàn bộ các lệnh phía sau** (Sai): Hiệu lực của cd kết thúc ngay khi lệnh RUN đó chạy xong.
- **Vào / — mỗi RUN chạy trong shell riêng nên cd không giữ sang lệnh sau** (Đúng): RUN không giữ trạng thái thư mục hiện hành sang lệnh kế tiếp nên COPY vẫn ở thư mục gốc; muốn đổi thư mục làm việc phải dùng WORKDIR.
- **Build sẽ lỗi vì bắt buộc phải khai báo WORKDIR trước khi COPY** (Sai): Không có ràng buộc đó — không khai báo WORKDIR thì mặc định là /.
