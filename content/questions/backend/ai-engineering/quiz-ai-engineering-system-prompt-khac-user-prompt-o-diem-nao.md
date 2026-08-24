---
id: quiz-ai-engineering-system-prompt-khac-user-prompt-o-diem-nao
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
System prompt khác user prompt ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Hai loại hoàn toàn tương đương, chỉ khác tên gọi trong API
- [ ] System prompt được xử lý nhanh hơn vì nội dung của nó không tính vào token
- [ ] System prompt chỉ đặt được một lần lúc tạo tài khoản API
- [x] System prompt đặt vai trò/quy tắc cho cả hội thoại, do ứng dụng kiểm soát

## Giải thích (VI)
System prompt do ứng dụng viết, đặt vai trò và quy tắc chung; model được huấn luyện để ưu tiên nó. User prompt đến từ người dùng ở từng lượt. Ranh giới này quan trọng về bảo mật: nội dung người dùng luôn phải coi là không đáng tin.

### Giải thích các phương án:
- **Hai loại hoàn toàn tương đương, chỉ khác tên gọi trong API** (Sai): Model được huấn luyện để ưu tiên chỉ dẫn ở system prompt hơn.
- **System prompt được xử lý nhanh hơn vì nội dung của nó không tính vào token** (Sai): Nó vẫn tính đủ token và vẫn ăn vào context window.
- **System prompt chỉ đặt được một lần lúc tạo tài khoản API** (Sai): Nó gửi kèm theo từng request và thay đổi được tùy lúc.
- **System prompt đặt vai trò/quy tắc cho cả hội thoại, do ứng dụng kiểm soát** (Đúng): Phân tách này là nền tảng để thiết kế cả hành vi lẫn ranh giới an toàn: user prompt là nội dung người dùng gửi ở từng lượt và không đáng tin về mặt bảo mật.
