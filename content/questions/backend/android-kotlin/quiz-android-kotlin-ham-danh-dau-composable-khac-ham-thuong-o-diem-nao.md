---
id: quiz-android-kotlin-ham-danh-dau-composable-khac-ham-thuong-o-diem-nao
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm đánh dấu Composable khác hàm thường ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Nó trả về một đối tượng View để gắn vào cây giao diện
- [ ] Nó luôn chạy trên background thread để không chặn giao diện
- [ ] Nó chỉ được gọi đúng một lần trong vòng đời màn hình
- [x] Nó mô tả giao diện và được gọi lại khi state đổi

## Giải thích (VI)
Hàm Composable mô tả giao diện theo state hiện tại và được gọi lại khi state nó đọc thay đổi. Trình biên dịch thêm phần theo dõi để chỉ chạy lại đúng những hàm phụ thuộc dữ liệu đã đổi, thay vì cả cây.

### Giải thích các phương án:
- **Nó trả về một đối tượng View để gắn vào cây giao diện** (Sai): Nó không trả về gì mà phát ra mô tả giao diện.
- **Nó luôn chạy trên background thread để không chặn giao diện** (Sai): Nó chạy trên luồng chính như phần dựng giao diện khác.
- **Nó chỉ được gọi đúng một lần trong vòng đời màn hình** (Sai): Ngược lại, nó được gọi lại nhiều lần khi state thay đổi.
- **Nó mô tả giao diện và được gọi lại khi state đổi** (Đúng): Trình biên dịch thêm phần theo dõi để chỉ chạy lại đúng những hàm phụ thuộc dữ liệu đã đổi.
