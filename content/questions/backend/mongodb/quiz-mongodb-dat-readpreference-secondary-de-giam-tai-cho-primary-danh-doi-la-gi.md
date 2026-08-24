---
id: quiz-mongodb-dat-readpreference-secondary-de-giam-tai-cho-primary-danh-doi-la-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt readPreference: "secondary" để giảm tải cho primary. Đánh đổi là gì?

## Đáp án trắc nghiệm
- [x] Có thể đọc phải dữ liệu cũ do độ trễ sao chép
- [ ] Truy vấn chạy chậm hơn vì secondary có phần cứng yếu hơn
- [ ] Không dùng được index trên secondary
- [ ] Không có đánh đổi nào, nên luôn bật để tăng hiệu năng

## Giải thích (VI)
Đọc từ secondary có thể trả về dữ liệu cũ vì sao chép có độ trễ. Kịch bản hay gặp: người dùng lưu thay đổi rồi trang tải lại đọc từ secondary và hiện dữ liệu cũ. Vì vậy chọn read preference theo từng truy vấn, không bật đại trà.

### Giải thích các phương án:
- **Có thể đọc phải dữ liệu cũ do độ trễ sao chép** (Đúng): Độ trễ sao chép là cái giá trực tiếp của việc đọc từ secondary — vừa ghi xong đọc lại có thể chưa thấy thay đổi.
- **Truy vấn chạy chậm hơn vì secondary có phần cứng yếu hơn** (Sai): Cấu hình phần cứng không phải bản chất của đánh đổi này.
- **Không dùng được index trên secondary** (Sai): Secondary có đầy đủ index giống primary.
- **Không có đánh đổi nào, nên luôn bật để tăng hiệu năng** (Sai): Đánh đổi về tính nhất quán là thật và cần cân nhắc theo từng truy vấn.
