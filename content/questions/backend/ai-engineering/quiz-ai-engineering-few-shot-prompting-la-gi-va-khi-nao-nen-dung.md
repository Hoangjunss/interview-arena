---
id: quiz-ai-engineering-few-shot-prompting-la-gi-va-khi-nao-nen-dung
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Few-shot prompting là gì và khi nào nên dùng?

## Đáp án trắc nghiệm
- [x] Đưa vài ví dụ vào–ra mẫu vào prompt để model suy ra khuôn mẫu
- [ ] Chia nhỏ câu hỏi phức tạp thành nhiều lượt gọi API liên tiếp
- [ ] Huấn luyện lại model trên vài mẫu dữ liệu để cập nhật trọng số
- [ ] Gửi cùng một câu hỏi vài lần rồi lấy câu trả lời xuất hiện nhiều nhất

## Giải thích (VI)
Few-shot là đưa vài cặp ví dụ đầu vào–đầu ra vào prompt để model bắt chước khuôn mẫu. Hiệu quả nhất khi cần định dạng đầu ra nhất quán hoặc khi tác vụ có quy ước riêng khó diễn đạt. Trọng số model không hề thay đổi — mọi thứ chỉ nằm trong context.

### Giải thích các phương án:
- **Đưa vài ví dụ vào–ra mẫu vào prompt để model suy ra khuôn mẫu** (Đúng): Ví dụ cụ thể truyền đạt khuôn mẫu hiệu quả hơn mô tả trừu tượng — hữu ích khi định dạng đầu ra khó mô tả bằng lời hoặc khi tác vụ có quy ước riêng.
- **Chia nhỏ câu hỏi phức tạp thành nhiều lượt gọi API liên tiếp** (Sai): Đó là prompt chaining, không phải few-shot.
- **Huấn luyện lại model trên vài mẫu dữ liệu để cập nhật trọng số** (Sai): Trọng số không đổi; ví dụ chỉ nằm trong prompt tại lúc chạy.
- **Gửi cùng một câu hỏi vài lần rồi lấy câu trả lời xuất hiện nhiều nhất** (Sai): Đó là self-consistency, một kỹ thuật khác.
