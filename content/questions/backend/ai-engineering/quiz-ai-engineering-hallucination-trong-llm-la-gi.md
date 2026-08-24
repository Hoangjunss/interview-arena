---
id: quiz-ai-engineering-hallucination-trong-llm-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hallucination trong LLM là gì?

## Đáp án trắc nghiệm
- [x] Model sinh thông tin nghe hợp lý nhưng sai hoặc bịa
- [ ] Lỗi kỹ thuật khi API quá tải, trả về nội dung rác không đọc được
- [ ] Hiện tượng model từ chối trả lời vì bộ lọc an toàn
- [ ] Việc model trả lời chậm hơn bình thường khi prompt quá dài

## Giải thích (VI)
Hallucination là khi model sinh ra nội dung nghe thuyết phục nhưng sai sự thật hoặc bịa hoàn toàn — trích dẫn không tồn tại, API không có thật, số liệu tự nghĩ ra. Nguyên nhân gốc: model được huấn luyện để sinh văn bản có xác suất cao, chứ không phải để tra cứu sự thật.

### Giải thích các phương án:
- **Model sinh thông tin nghe hợp lý nhưng sai hoặc bịa** (Đúng): Bản chất là model tối ưu cho tính hợp lý về ngôn ngữ, không phải cho tính đúng về sự thật — và nó giữ nguyên giọng điệu tự tin nên khó phát hiện nếu không kiểm chứng.
- **Lỗi kỹ thuật khi API quá tải, trả về nội dung rác không đọc được** (Sai): Hallucination là văn bản mạch lạc, không phải lỗi hạ tầng.
- **Hiện tượng model từ chối trả lời vì bộ lọc an toàn** (Sai): Đó là từ chối, ngược lại với việc bịa ra nội dung.
- **Việc model trả lời chậm hơn bình thường khi prompt quá dài** (Sai): Đó là vấn đề độ trễ, không liên quan tới độ chính xác.
