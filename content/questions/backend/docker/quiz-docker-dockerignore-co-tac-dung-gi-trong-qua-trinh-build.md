---
id: quiz-docker-dockerignore-co-tac-dung-gi-trong-qua-trinh-build
position: backend
technology: docker
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
.dockerignore có tác dụng gì trong quá trình build?

## Đáp án trắc nghiệm
- [ ] .dockerignore chỉ có tác dụng khi container đang chạy, giúp ẩn file khỏi process bên trong
- [x] Loại file/thư mục khỏi build context trước khi context được gửi cho builder
- [ ] Xóa hẳn các file được liệt kê khỏi máy host sau khi build xong
- [ ] Ngăn mọi layer image bị cache để mỗi lần build luôn sạch từ đầu

## Giải thích (VI)
.dockerignore loại file/thư mục khỏi build context trước khi context được gửi cho Docker builder. Lợi ích: build nhanh hơn (ít dữ liệu gửi đi), cache ổn định hơn (COPY . . ít bị nhiễu bởi file không liên quan), và tránh lỡ đưa secrets, .git, node modules local hoặc artifacts lớn vào image. Nó hoạt động lúc build, không xóa file trên host.

### Giải thích các phương án:
- **.dockerignore chỉ có tác dụng khi container đang chạy, giúp ẩn file khỏi process bên trong** (Sai): Sai — nó hoạt động ở thời điểm build, không phải runtime; không liên quan tới việc ẩn file khỏi process.
- **Loại file/thư mục khỏi build context trước khi context được gửi cho builder** (Đúng): Đúng: .dockerignore hoạt động ở khâu chuẩn bị build context — build nhanh hơn, cache ổn định hơn, và tránh lỡ đưa secrets, node modules local hay .git vào image.
- **Xóa hẳn các file được liệt kê khỏi máy host sau khi build xong** (Sai): Sai — .dockerignore không đụng tới file trên host; nó chỉ loại chúng khỏi build context.
- **Ngăn mọi layer image bị cache để mỗi lần build luôn sạch từ đầu** (Sai): Ngược mục đích: .dockerignore giúp cache ổn định hơn (context ít nhiễu hơn), không phải để vô hiệu hóa cache.
