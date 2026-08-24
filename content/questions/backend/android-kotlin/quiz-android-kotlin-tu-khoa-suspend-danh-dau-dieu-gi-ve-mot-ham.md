---
id: quiz-android-kotlin-tu-khoa-suspend-danh-dau-dieu-gi-ve-mot-ham
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ khoá suspend đánh dấu điều gì về một hàm?

## Đáp án trắc nghiệm
- [ ] Hàm không được phép ném ngoại lệ ra ngoài
- [ ] Hàm luôn chạy trên một background thread riêng
- [ ] Hàm chạy song song với hàm gọi nó
- [x] Hàm tạm dừng rồi tiếp tục, không chặn thread

## Giải thích (VI)
suspend đánh dấu hàm có thể tạm dừng và tiếp tục mà không chặn thread. Trong lúc chờ, thread được trả lại cho việc khác. Nó không nói gì về thread nào sẽ chạy, việc đó do bộ điều phối quyết định.

### Giải thích các phương án:
- **Hàm không được phép ném ngoại lệ ra ngoài** (Sai): Ngoại lệ vẫn ném và lan truyền bình thường.
- **Hàm luôn chạy trên một background thread riêng** (Sai): Luồng chạy do bộ điều phối quyết định chứ không do từ khoá này.
- **Hàm chạy song song với hàm gọi nó** (Sai): Nó vẫn chạy tuần tự trừ khi được khởi chạy song song một cách tường minh.
- **Hàm tạm dừng rồi tiếp tục, không chặn thread** (Đúng): Luồng được trả lại cho việc khác trong lúc chờ nên không tốn tài nguyên như chặn luồng.
