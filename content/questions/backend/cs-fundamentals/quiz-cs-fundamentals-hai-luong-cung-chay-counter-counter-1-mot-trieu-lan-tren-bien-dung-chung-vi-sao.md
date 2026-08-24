---
id: quiz-cs-fundamentals-hai-luong-cung-chay-counter-counter-1-mot-trieu-lan-tren-bien-dung-chung-vi-sao
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai luồng cùng chạy counter = counter + 1 một triệu lần trên biến dùng chung. Vì sao kết quả thường nhỏ hơn hai triệu?

## Đáp án trắc nghiệm
- [ ] Vì bộ lập lịch của hệ điều hành bỏ qua một số lần lặp khi chuyển ngữ cảnh
- [ ] Vì biến chung nằm ở heap mà truy cập heap không đáng tin cậy giữa các luồng
- [x] Vì phép tăng gồm ba bước đọc — cộng — ghi, hai luồng có thể đọc cùng một giá trị cũ rồi ghi đè kết quả của nhau
- [ ] Vì trình biên dịch tối ưu bỏ bớt các lần tăng lặp lại giống nhau

## Giải thích (VI)
Vì counter + 1 không phải một thao tác atomic mà là ba: đọc, cộng, ghi. Nếu luồng B đọc giá trị trước khi luồng A ghi kết quả, cả hai cùng tính từ cùng một giá trị cũ và ghi cùng một kết quả — một lần tăng biến mất. Đây là race condition dạng lost update.

### Giải thích các phương án:
- **Vì bộ lập lịch của hệ điều hành bỏ qua một số lần lặp khi chuyển ngữ cảnh** (Sai): Chuyển ngữ cảnh lưu và khôi phục đầy đủ trạng thái luồng; không có lần lặp nào bị bỏ, vấn đề nằm ở thứ tự đọc/ghi đan xen.
- **Vì biến chung nằm ở heap mà truy cập heap không đáng tin cậy giữa các luồng** (Sai): Truy cập heap hoàn toàn tin cậy; sai lệch đến từ việc thao tác đọc–sửa–ghi không được thực hiện như một đơn vị không thể chia cắt.
- **Vì phép tăng gồm ba bước đọc — cộng — ghi, hai luồng có thể đọc cùng một giá trị cũ rồi ghi đè kết quả của nhau** (Đúng): Phép tăng không atomic: khi luồng B đọc trước lúc luồng A kịp ghi, cả hai cùng tính từ giá trị cũ nên một lần tăng bị mất.
- **Vì trình biên dịch tối ưu bỏ bớt các lần tăng lặp lại giống nhau** (Sai): Tối ưu có thể giữ biến trong thanh ghi nhưng vẫn bảo toàn ngữ nghĩa của luồng đơn; mất mát ở đây là do tranh chấp giữa nhiều luồng.
