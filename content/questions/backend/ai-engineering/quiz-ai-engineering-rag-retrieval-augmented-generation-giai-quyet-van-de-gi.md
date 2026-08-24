---
id: quiz-ai-engineering-rag-retrieval-augmented-generation-giai-quyet-van-de-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RAG (Retrieval-Augmented Generation) giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Nó tăng tốc độ trả lời bằng cách cache câu hỏi thường gặp
- [ ] Nó nén prompt lại để tiết kiệm token
- [ ] Nó huấn luyện lại model trên dữ liệu công ty để model thuộc lòng nội dung
- [x] Cho model đọc dữ liệu nó chưa từng học qua đoạn truy hồi đưa vào prompt

## Giải thích (VI)
RAG đưa tri thức mà model không có vào lúc chạy: tìm đoạn tài liệu liên quan tới câu hỏi rồi chèn vào prompt. Nhờ đó model trả lời được về dữ liệu nội bộ và dữ liệu mới, trích dẫn được nguồn, và cập nhật tri thức chỉ cần cập nhật kho tài liệu.

### Giải thích các phương án:
- **Nó tăng tốc độ trả lời bằng cách cache câu hỏi thường gặp** (Sai): Đó là caching, một kỹ thuật khác hoàn toàn.
- **Nó nén prompt lại để tiết kiệm token** (Sai): RAG thường làm prompt DÀI hơn vì thêm tài liệu vào.
- **Nó huấn luyện lại model trên dữ liệu công ty để model thuộc lòng nội dung** (Sai): Đó là fine-tuning; RAG không thay đổi trọng số model.
- **Cho model đọc dữ liệu nó chưa từng học qua đoạn truy hồi đưa vào prompt** (Đúng): RAG chuyển bài toán từ "model có nhớ không" sang "model có đọc được tài liệu đúng không" — nhờ đó dùng được tài liệu nội bộ, dữ liệu mới hơn thời điểm huấn luyện, giảm bịa và cho phép trích dẫn nguồn.
