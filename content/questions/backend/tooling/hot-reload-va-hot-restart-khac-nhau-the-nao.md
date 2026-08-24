---
id: hot-reload-va-hot-restart-khac-nhau-the-nao
position: backend
technology: tooling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hot reload và hot restart khác nhau thế nào?

## Question (EN)
What is the difference between hot reload and hot restart?

## Đáp án chi tiết (VI)
- **Hot reload**: nạp mã Dart đã sửa vào máy ảo đang chạy rồi **dựng lại cây widget**, **giữ nguyên state** của app. Rất nhanh (thường dưới 1s), hợp chỉnh UI. Không chạy lại `main()`.\
- **Hot restart**: **khởi động lại app**, dựng lại toàn bộ từ đầu → **mất state**, chạy lại `main()`. Chậm hơn hot reload nhưng nhanh hơn full rebuild.\
\
Một số thay đổi **không hot-reload được**, buộc phải hot restart hoặc full restart: đổi `enum`, đổi kiểu generic, thay đổi `initState`/biến static khởi tạo, và **thay đổi mã native** (cần build lại app).

## Detailed Answer (EN)
- **Hot reload**: injects the changed Dart code into the running VM and **rebuilds the widget tree**, **keeping app state**. Very fast (often under 1s), great for UI tweaks. Does not re-run `main()`.\
- **Hot restart**: **restarts the app**, rebuilding everything from scratch → **state is lost**, `main()` runs again. Slower than hot reload but faster than a full rebuild.\
\
Some changes **cannot hot-reload** and force a hot/full restart: changing an `enum`, changing generic types, altering `initState`/static field initializers, and **native code changes** (which require rebuilding the app).
