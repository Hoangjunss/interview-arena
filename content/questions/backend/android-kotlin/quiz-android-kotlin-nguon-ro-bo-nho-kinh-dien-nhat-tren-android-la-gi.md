---
id: quiz-android-kotlin-nguon-ro-bo-nho-kinh-dien-nhat-tren-android-la-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nguồn rò bộ nhớ kinh điển nhất trên Android là gì?

## Đáp án trắc nghiệm
- [x] Đối tượng sống lâu giữ tham chiếu tới Activity
- [ ] Nạp ảnh từ mạng thay vì từ tài nguyên
- [ ] Dùng danh sách thay vì mảng cho dữ liệu lớn
- [ ] Tạo quá nhiều đối tượng trong một vòng lặp

## Giải thích (VI)
Một đối tượng sống lâu như singleton, biến tĩnh, listener hay coroutine không huỷ giữ tham chiếu tới Activity . Vì Activity bị tạo lại mỗi lần xoay màn hình, mỗi lần như vậy lại thêm một bản cũ không được giải phóng.

### Giải thích các phương án:
- **Đối tượng sống lâu giữ tham chiếu tới Activity** (Đúng): Activity bị tạo lại thường xuyên nên tham chiếu còn treo giữ luôn cả cây view cũ.
- **Nạp ảnh từ mạng thay vì từ tài nguyên** (Sai): Nguồn ảnh không quyết định việc bộ nhớ có được giải phóng hay không.
- **Dùng danh sách thay vì mảng cho dữ liệu lớn** (Sai): Khác biệt về bộ nhớ là nhỏ và không gây rò rỉ.
- **Tạo quá nhiều đối tượng trong một vòng lặp** (Sai): Chúng được thu gom bình thường sau khi hết tham chiếu.
