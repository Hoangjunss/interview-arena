---
id: quiz-ai-engineering-context-window-cua-mot-model-nghia-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Context window của một model nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Kích thước tối đa của file có thể tải lên
- [ ] Khoảng thời gian model ghi nhớ cuộc hội thoại trước khi tự quên
- [x] Tổng token tối đa cho một lần gọi, tính cả prompt lẫn phần sinh ra
- [ ] Số lượng người dùng có thể gọi API đồng thời trên cùng một tài khoản

## Giải thích (VI)
Context window là ngân sách token cho một lần gọi, gồm cả prompt và phần model sinh ra. Model KHÔNG tự nhớ hội thoại — muốn nó biết những gì đã trao đổi thì ứng dụng phải gửi lại lịch sử trong mỗi request, và lịch sử đó cũng ăn vào ngân sách này.

### Giải thích các phương án:
- **Kích thước tối đa của file có thể tải lên** (Sai): Giới hạn tính theo token của nội dung, không theo dung lượng file.
- **Khoảng thời gian model ghi nhớ cuộc hội thoại trước khi tự quên** (Sai): Model không có bộ nhớ theo thời gian; mỗi lần gọi là độc lập và lịch sử phải được gửi lại.
- **Tổng token tối đa cho một lần gọi, tính cả prompt lẫn phần sinh ra** (Đúng): Context window bao gồm cả input và output trong cùng một ngân sách; vượt quá thì API báo lỗi hoặc phần cũ bị cắt bỏ.
- **Số lượng người dùng có thể gọi API đồng thời trên cùng một tài khoản** (Sai): Đó là giới hạn tốc độ (rate limit), không liên quan tới context.
