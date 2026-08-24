---
id: quiz-ai-engineering-token-trong-ng-canh-llm-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Token trong ngữ cảnh LLM là gì?

## Đáp án trắc nghiệm
- [ ] Chuỗi ngẫu nhiên dùng để xác thực khi gọi API, giống API key
- [ ] Mỗi token tương ứng đúng một từ, tách theo dấu cách
- [x] Mảnh văn bản dưới mức từ mà model thực sự xử lý
- [ ] Mỗi token tương ứng đúng một ký tự trong câu đầu vào

## Giải thích (VI)
Token là mảnh văn bản mà model xử lý, thường nhỏ hơn một từ. Tiếng Anh trung bình khoảng 4 ký tự một token; tiếng Việt có dấu tốn nhiều token hơn đáng kể. Mọi giới hạn context và mọi hóa đơn API đều tính theo token, cả đầu vào lẫn đầu ra.

### Giải thích các phương án:
- **Chuỗi ngẫu nhiên dùng để xác thực khi gọi API, giống API key** (Sai): Đó là access token — trùng tên nhưng khác hoàn toàn về khái niệm.
- **Mỗi token tương ứng đúng một từ, tách theo dấu cách** (Sai): Từ dài hoặc hiếm bị cắt thành nhiều token, nên tỉ lệ không phải một-một.
- **Mảnh văn bản dưới mức từ mà model thực sự xử lý** (Đúng): Tokenizer cắt văn bản thành các mảnh dưới mức từ trước khi đưa vào model — thường là một mảnh từ chứ không phải nguyên từ hay nguyên ký tự. Đây cũng là đơn vị dùng để tính giới hạn context và tính tiền.
- **Mỗi token tương ứng đúng một ký tự trong câu đầu vào** (Sai): Một token thường gộp nhiều ký tự; tiếng Anh trung bình khoảng 4 ký tự/token.
