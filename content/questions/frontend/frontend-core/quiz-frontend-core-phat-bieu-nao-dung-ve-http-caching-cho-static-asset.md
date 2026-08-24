---
id: quiz-frontend-core-phat-bieu-nao-dung-ve-http-caching-cho-static-asset
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào đúng về HTTP caching cho static asset?

## Đáp án trắc nghiệm
- [ ] no-cache nghĩa là trình duyệt không được lưu bản sao nào
- [ ] HTML điểm vào nên đặt max-age dài để giảm số request tới server
- [x] File có hash trong tên nên đặt max-age rất dài (cache busting)
- [ ] ETag khiến server phải gửi lại toàn bộ nội dung mỗi lần xác thực

## Giải thích (VI)
Chiến lược chuẩn: asset có hash trong tên (app.9f2c1b.js) đặt Cache-Control: max-age=31536000, immutable; HTML điểm vào đặt no-cache để luôn xác thực lại. no-cache là "lưu nhưng phải hỏi lại", no-store mới là không lưu. ETag/Last-Modified cho phép trả 304 khi nội dung chưa đổi, tiết kiệm băng thông dù vẫn tốn một vòng request.

### Giải thích các phương án:
- **no-cache nghĩa là trình duyệt không được lưu bản sao nào** (Sai): no-cache là lưu nhưng phải xác thực lại trước khi dùng; không lưu gì là no-store.
- **HTML điểm vào nên đặt max-age dài để giảm số request tới server** (Sai): Ngược lại: HTML là chỗ ánh xạ sang các asset đã hash nên phải no-cache, nếu không người dùng kẹt ở bản cũ.
- **File có hash trong tên nên đặt max-age rất dài (cache busting)** (Đúng): Đúng: đổi nội dung là đổi tên file, tên mới là URL mới nên không có nguy cơ phục vụ bản cũ.
- **ETag khiến server phải gửi lại toàn bộ nội dung mỗi lần xác thực** (Sai): Ngược lại: khi nội dung chưa đổi, server trả 304 không kèm body — đó chính là chỗ tiết kiệm băng thông.
