---
id: quiz-ai-engineering-vi-sao-ung-dung-chat-voi-llm-gan-nhu-luon-dung-streaming
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao ứng dụng chat với LLM gần như luôn dùng streaming?

## Đáp án trắc nghiệm
- [ ] Vì streaming rẻ hơn, nhà cung cấp tính giá thấp hơn cho request dạng stream
- [ ] Vì streaming làm model sinh nhanh hơn hẳn so với gọi thường
- [ ] Vì không stream thì bị giới hạn độ dài câu trả lời ở mức rất thấp
- [x] Model sinh token tuần tự; stream giúp thấy chữ hiện ra gần như tức thì

## Giải thích (VI)
Streaming không làm model nhanh hơn, nhưng đưa chữ đầu tiên tới người dùng sớm hơn rất nhiều. Chỉ số quan trọng ở đây là thời gian tới token đầu tiên (TTFT). Chờ 8 giây màn hình trắng và thấy chữ chạy sau 0.5 giây là hai trải nghiệm hoàn toàn khác nhau.

### Giải thích các phương án:
- **Vì streaming rẻ hơn, nhà cung cấp tính giá thấp hơn cho request dạng stream** (Sai): Giá tính theo token, không phụ thuộc có stream hay không.
- **Vì streaming làm model sinh nhanh hơn hẳn so với gọi thường** (Sai): Tốc độ sinh không đổi; chỉ khác ở cách trả kết quả về.
- **Vì không stream thì bị giới hạn độ dài câu trả lời ở mức rất thấp** (Sai): Giới hạn độ dài do max_tokens quyết định, không do chế độ stream.
- **Model sinh token tuần tự; stream giúp thấy chữ hiện ra gần như tức thì** (Đúng): Streaming rút ngắn thời gian tới token đầu tiên, thứ quyết định cảm nhận của người dùng — tổng thời gian không đổi nhưng cảm giác nhanh hơn hẳn.
