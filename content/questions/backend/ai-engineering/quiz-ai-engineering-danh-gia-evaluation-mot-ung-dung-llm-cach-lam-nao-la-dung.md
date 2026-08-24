---
id: quiz-ai-engineering-danh-gia-evaluation-mot-ung-dung-llm-cach-lam-nao-la-dung
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh giá (evaluation) một ứng dụng LLM: cách làm nào là đúng?

## Đáp án trắc nghiệm
- [ ] LLM-as-judge chấm chính xác hơn người nên không cần đối chiếu với đánh giá tay
- [ ] Với RAG chỉ cần đo chất lượng câu trả lời cuối, không cần đo khâu truy hồi
- [x] Cần bộ test case cố định có đáp án mong đợi, chạy lại mỗi khi đổi prompt
- [ ] Thử vài câu hỏi thấy trả lời hay là đủ để kết luận hệ thống hoạt động tốt

## Giải thích (VI)
Cần bộ eval cố định chạy lại mỗi lần đổi prompt hoặc model. LLM-as-judge dùng được cho tiêu chí khó chấm máy nhưng phải hiệu chuẩn với người. Hệ RAG phải đo riêng truy hồi và sinh. Thử tay vài câu không phải đánh giá.

### Giải thích các phương án:
- **LLM-as-judge chấm chính xác hơn người nên không cần đối chiếu với đánh giá tay** (Sai): Giám khảo tự động có thiên lệch riêng — phải đối chiếu với đánh giá của người trên một mẫu mới biết nó có đáng tin không.
- **Với RAG chỉ cần đo chất lượng câu trả lời cuối, không cần đo khâu truy hồi** (Sai): Truy hồi và sinh hỏng theo hai kiểu khác nhau và cần cách sửa khác nhau; đo gộp thì không biết phải sửa ở đâu.
- **Cần bộ test case cố định có đáp án mong đợi, chạy lại mỗi khi đổi prompt** (Đúng): Đúng: không có bộ đo cố định thì không phân biệt được cải thiện thật với ấn tượng chủ quan.
- **Thử vài câu hỏi thấy trả lời hay là đủ để kết luận hệ thống hoạt động tốt** (Sai): Thử tay chỉ chạm vào vài trường hợp thuận lợi và bỏ sót hoàn toàn các trường hợp biên.
