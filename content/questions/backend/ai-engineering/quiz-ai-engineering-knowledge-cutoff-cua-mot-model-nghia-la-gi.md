---
id: quiz-ai-engineering-knowledge-cutoff-cua-mot-model-nghia-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
"Knowledge cutoff" của một model nghĩa là gì?

## Đáp án trắc nghiệm
- [x] Thời endpoint của dữ liệu dùng để huấn luyện model
- [ ] Giới hạn số token tối đa mà model xử lý được trong một lần gọi API
- [ ] Ngưỡng độ tin cậy mà dưới đó model từ chối trả lời
- [ ] Thời điểm nhà cung cấp ngừng hỗ trợ phiên bản model đó

## Giải thích (VI)
Cutoff là mốc thời gian cuối của dữ liệu huấn luyện. Sự kiện sau mốc đó model không biết — và nguy hiểm ở chỗ nó thường không nói "tôi không biết" mà bịa ra thứ nghe hợp lý. Cần thông tin mới thì phải cấp qua RAG hoặc tool tìm kiếm.

### Giải thích các phương án:
- **Thời endpoint của dữ liệu dùng để huấn luyện model** (Đúng): Model chỉ biết những gì có trong dữ liệu huấn luyện tính tới thời điểm đó — hỏi về sự kiện sau mốc này thì nó có thể bịa ra câu trả lời nghe hợp lý.
- **Giới hạn số token tối đa mà model xử lý được trong một lần gọi API** (Sai): Đó là context window.
- **Ngưỡng độ tin cậy mà dưới đó model từ chối trả lời** (Sai): Model không có ngưỡng độ tin cậy hoạt động như vậy.
- **Thời điểm nhà cung cấp ngừng hỗ trợ phiên bản model đó** (Sai): Đó là vòng đời sản phẩm, khác với cutoff dữ liệu.
