---
id: quiz-ai-engineering-trong-he-rag-vi-sao-chien-luoc-cat-tai-lieu-chunking-lai-quan-trong
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong hệ RAG, vì sao chiến lược cắt tài liệu (chunking) lại quan trọng?

## Đáp án trắc nghiệm
- [ ] Không quan trọng — vector database tự tối ưu kích thước chunk
- [ ] Chunk càng nhỏ càng tốt vì tiết kiệm chi phí embedding
- [ ] Chunking chỉ ảnh hưởng tốc độ lập chỉ mục, không ảnh hưởng chất lượng trả lời
- [x] Chunk là đơn vị truy hồi: quá nhỏ mất ngữ cảnh, quá to thì vector loãng

## Giải thích (VI)
Chunk vừa là thứ được embed vừa là thứ được đưa vào prompt. Quá nhỏ thì mất ngữ cảnh và câu trả lời bị cụt; quá to thì vector đại diện cho quá nhiều ý nên tìm kém chính xác, đồng thời tốn token. Cắt theo ranh giới ngữ nghĩa tốt hơn cắt theo số ký tự cố định.

### Giải thích các phương án:
- **Không quan trọng — vector database tự tối ưu kích thước chunk** (Sai): Vector database lưu những gì được đưa vào; việc cắt là của ứng dụng.
- **Chunk càng nhỏ càng tốt vì tiết kiệm chi phí embedding** (Sai): Chunk quá nhỏ mất ngữ cảnh và làm chất lượng truy hồi tệ đi.
- **Chunking chỉ ảnh hưởng tốc độ lập chỉ mục, không ảnh hưởng chất lượng trả lời** (Sai): Nó ảnh hưởng trực tiếp tới việc truy hồi đúng đoạn hay không.
- **Chunk là đơn vị truy hồi: quá nhỏ mất ngữ cảnh, quá to thì vector loãng** (Đúng): Chunk vừa là đơn vị embedding vừa là đơn vị đưa vào prompt nên kích thước ảnh hưởng cả hai đầu: phải đủ nhỏ để vector còn tập trung về ngữ nghĩa nhưng đủ lớn để giữ trọn ý.
