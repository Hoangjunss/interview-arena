---
id: quiz-ai-engineering-phat-bieu-nao-sau-day-sai-ve-he-thong-rag
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về hệ thống RAG?

## Đáp án trắc nghiệm
- [ ] Hệ RAG chạy kém thường do khâu truy hồi trả sai đoạn, không phải do model
- [ ] Lọc theo quyền phải làm TRƯỚC bước truy hồi, không nhờ prompt
- [x] Truy hồi càng nhiều đoạn đưa vào prompt thì câu trả lời càng chính xác
- [ ] Hybrid search (ngữ nghĩa + từ khoá) thường tốt hơn chỉ dùng một loại

## Giải thích (VI)
Gỡ lỗi RAG bắt đầu từ khâu truy hồi. Hybrid search bù được điểm yếu của embedding với thông tin cần khớp chính xác. Phân quyền phải lọc trước khi truy hồi. Và nhiều đoạn hơn không đồng nghĩa với tốt hơn — nhiễu làm giảm chất lượng.

### Giải thích các phương án:
- **Hệ RAG chạy kém thường do khâu truy hồi trả sai đoạn, không phải do model** (Sai): Phát biểu đúng: model không thể trả lời đúng từ tài liệu không chứa câu trả lời, nên gỡ lỗi phải bắt đầu bằng việc in ra các đoạn được truy hồi.
- **Lọc theo quyền phải làm TRƯỚC bước truy hồi, không nhờ prompt** (Sai): Phát biểu đúng: đã đưa vào prompt thì dữ liệu đã nằm trong tầm với — chỉ dẫn không phải cơ chế phân quyền.
- **Truy hồi càng nhiều đoạn đưa vào prompt thì câu trả lời càng chính xác** (Đúng): Đây là chỗ sai: thêm đoạn không liên quan làm nhiễu và có thể đẩy thông tin đúng vào vùng model ít chú ý.
- **Hybrid search (ngữ nghĩa + từ khoá) thường tốt hơn chỉ dùng một loại** (Sai): Phát biểu đúng: hai phương pháp bù trừ điểm yếu cho nhau — embedding kém với mã sản phẩm và tên riêng hiếm.
