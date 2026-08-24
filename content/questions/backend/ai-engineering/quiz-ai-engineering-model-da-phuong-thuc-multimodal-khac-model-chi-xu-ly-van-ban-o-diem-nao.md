---
id: quiz-ai-engineering-model-da-phuong-thuc-multimodal-khac-model-chi-xu-ly-van-ban-o-diem-nao
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model đa phương thức (multimodal) khác model chỉ xử lý văn bản ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Nó hỗ trợ nhiều ngôn ngữ tự nhiên hơn
- [x] Nhận cả ảnh cùng văn bản trong một prompt; ảnh cũng tính thành token
- [ ] Nó tạo ra được ảnh từ mô tả văn bản
- [ ] Nó chạy được trên nhiều loại phần cứng khác nhau, kể cả máy tính cá nhân

## Giải thích (VI)
Model đa phương thức nhận ảnh kèm văn bản trong cùng một prompt. Ảnh được chia thành các mảnh và mã hóa thành token — một ảnh độ phân giải cao có thể tốn cả nghìn token, nên nó ăn vào context window và vào hóa đơn như văn bản.

### Giải thích các phương án:
- **Nó hỗ trợ nhiều ngôn ngữ tự nhiên hơn** (Sai): Đa ngôn ngữ là khái niệm khác với đa phương thức.
- **Nhận cả ảnh cùng văn bản trong một prompt; ảnh cũng tính thành token** (Đúng): Ảnh được mã hoá thành token nên vẫn ăn vào ngân sách context lẫn chi phí; tuỳ model còn nhận thêm âm thanh, video.
- **Nó tạo ra được ảnh từ mô tả văn bản** (Sai): Đó là model sinh ảnh — model đa phương thức ở đây nói về khả năng ĐỌC nhiều loại đầu vào.
- **Nó chạy được trên nhiều loại phần cứng khác nhau, kể cả máy tính cá nhân** (Sai): Không liên quan tới hạ tầng chạy model.
