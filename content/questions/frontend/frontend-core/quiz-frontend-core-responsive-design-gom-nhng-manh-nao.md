---
id: quiz-frontend-core-responsive-design-gom-nhng-manh-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Responsive design gồm những mảnh nào?

## Đáp án trắc nghiệm
- [ ] Phải xây một trang riêng cho di động và chuyển hướng theo user agent
- [ ] Chỉ cần media query; thẻ meta viewport là tuỳ chọn thêm
- [ ] Đặt chiều rộng cố định theo pixel cho mọi khối để layout luôn giống nhau ở mọi máy
- [x] Meta viewport, layout co giãn theo đơn vị tương đối, và media query đổi layout

## Giải thích (VI)
Ba mảnh: thẻ <meta name="viewport" content="width=device-width, initial-scale=1"> để trình duyệt di động dùng đúng chiều rộng thiết bị; layout co giãn bằng đơn vị tương đối, max-width, flexbox/grid; và media query đổi layout ở các mốc. Cách làm mặc định là mobile-first: viết cho màn nhỏ trước rồi mở rộng bằng min-width, vì thêm vào dễ hơn gỡ bỏ.

### Giải thích các phương án:
- **Phải xây một trang riêng cho di động và chuyển hướng theo user agent** (Sai): Đó là cách cũ (m.example.com), tốn chi phí bảo trì gấp đôi.
- **Chỉ cần media query; thẻ meta viewport là tuỳ chọn thêm** (Sai): Thiếu meta viewport, trình duyệt di động giả lập màn hình rộng và thu nhỏ trang, media query không khớp như mong đợi.
- **Đặt chiều rộng cố định theo pixel cho mọi khối để layout luôn giống nhau ở mọi máy** (Sai): Chiều rộng cố định là thứ khiến trang không co giãn được.
- **Meta viewport, layout co giãn theo đơn vị tương đối, và media query đổi layout** (Đúng): Đúng: ba mảnh phải có. Thiếu meta viewport thì trình duyệt di động giả lập màn hình rộng rồi thu nhỏ trang, nên media query cũng không khớp như mong đợi. Container query là lựa chọn mới thay media query.
