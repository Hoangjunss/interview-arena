---
id: quiz-ai-engineering-prompt-caching-giam-chi-phi-bang-cach-nao
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prompt caching giảm chi phí bằng cách nào?

## Đáp án trắc nghiệm
- [ ] Nó chuyển request sang model nhỏ hơn khi phát hiện câu hỏi đơn giản
- [x] Phần đầu prompt lặp y hệt được cache và tính giá thấp hơn
- [ ] Nó lưu lại câu trả lời để lần sau hỏi giống hệt thì trả về ngay
- [ ] Nó nén prompt lại để tốn ít token hơn

## Giải thích (VI)
Nhà cung cấp cache phần ĐẦU prompt khi nó giống hệt giữa các request và tính giá thấp hơn đáng kể cho phần đó. Điều kiện: phần cache phải nằm ở đầu và trùng khớp chính xác — nên xếp nội dung cố định lên trước, phần thay đổi xuống sau.

### Giải thích các phương án:
- **Nó chuyển request sang model nhỏ hơn khi phát hiện câu hỏi đơn giản** (Sai): Đó là định tuyến theo độ khó, một kỹ thuật khác.
- **Phần đầu prompt lặp y hệt được cache và tính giá thấp hơn** (Đúng): Phần prefix cố định (system prompt, ví dụ few-shot, tài liệu chung) không phải xử lý lại từ đầu nên được tính rẻ hơn nhiều so với token thường.
- **Nó lưu lại câu trả lời để lần sau hỏi giống hệt thì trả về ngay** (Sai): Đó là cache kết quả ở tầng ứng dụng — khác với prompt caching của nhà cung cấp.
- **Nó nén prompt lại để tốn ít token hơn** (Sai): Không có bước nén nào; số token không đổi, chỉ đơn giá đổi.
