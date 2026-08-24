---
id: quiz-ai-engineering-prompt-injection-la-gi-va-vi-sao-kho-chong-triet-de
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prompt injection là gì và vì sao khó chống triệt để?

## Đáp án trắc nghiệm
- [ ] Kẻ tấn công chèn mã SQL vào prompt để truy cập database của model
- [ ] Việc nhà cung cấp tự thêm chỉ dẫn ẩn vào prompt của bạn
- [ ] Lỗi khi prompt vượt quá context window nên bị cắt mất phần đầu
- [x] Nhét chỉ dẫn vào phần dữ liệu để ghi đè ý định ban đầu

## Giải thích (VI)
Prompt injection là nhét chỉ dẫn vào nơi đáng lẽ chỉ là dữ liệu, khiến model làm theo ý kẻ tấn công. Khó chống vì với model, chỉ dẫn và dữ liệu đều chỉ là văn bản — không có ranh giới cứng như giữa code và data trong SQL prepared statement.

### Giải thích các phương án:
- **Kẻ tấn công chèn mã SQL vào prompt để truy cập database của model** (Sai): Đó là SQL injection; prompt injection tác động vào hành vi của model.
- **Việc nhà cung cấp tự thêm chỉ dẫn ẩn vào prompt của bạn** (Sai): Không phải mô tả của prompt injection.
- **Lỗi khi prompt vượt quá context window nên bị cắt mất phần đầu** (Sai): Đó là vấn đề giới hạn context, không phải tấn công.
- **Nhét chỉ dẫn vào phần dữ liệu để ghi đè ý định ban đầu** (Đúng): Đây đúng là nguyên nhân gốc: không tách được kênh lệnh khỏi kênh dữ liệu. Chỉ dẫn có thể nằm trong nội dung người dùng nhập, tài liệu được truy hồi hay trang web model đọc, và model xử lý tất cả trong cùng một dòng văn bản.
