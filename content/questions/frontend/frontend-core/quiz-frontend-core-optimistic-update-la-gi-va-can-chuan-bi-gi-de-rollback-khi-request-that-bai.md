---
id: quiz-frontend-core-optimistic-update-la-gi-va-can-chuan-bi-gi-de-rollback-khi-request-that-bai
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Optimistic update là gì và cần chuẩn bị gì để rollback khi request thất bại?

## Đáp án trắc nghiệm
- [ ] Chỉ hiển thị thay đổi sau khi server xác nhận, để dữ liệu hiển thị luôn chính xác tuyệt đối
- [ ] Gửi song song nhiều request giống nhau rồi lấy phản hồi về sớm nhất
- [x] Cập nhật giao diện ngay theo kết quả kỳ vọng, giữ trạng thái cũ để hoàn nguyên khi lỗi
- [ ] Lưu phản hồi vào cache để lần sau hiển thị ngay không cần gọi lại

## Giải thích (VI)
Optimistic update là cập nhật giao diện ngay theo kết quả kỳ vọng, không chờ server — thao tác có cảm giác tức thì. Điều kiện để làm được: giữ lại trạng thái trước khi sửa, khi request thất bại thì khôi phục đúng trạng thái đó và báo lỗi rõ ràng. Hợp với thao tác nhỏ, tỷ lệ thành công cao (thích, đánh dấu, đổi thứ tự); không hợp với thanh toán hay thao tác không hoàn tác được.

### Giải thích các phương án:
- **Chỉ hiển thị thay đổi sau khi server xác nhận, để dữ liệu hiển thị luôn chính xác tuyệt đối** (Sai): Đây là hướng ngược lại (pessimistic) — an toàn hơn nhưng thao tác có cảm giác chậm.
- **Gửi song song nhiều request giống nhau rồi lấy phản hồi về sớm nhất** (Sai): Đó là hedged request, không liên quan tới việc cập nhật giao diện trước.
- **Cập nhật giao diện ngay theo kết quả kỳ vọng, giữ trạng thái cũ để hoàn nguyên khi lỗi** (Đúng): Đúng: điểm mấu chốt là lưu ảnh chụp trạng thái trước khi sửa để còn đường lùi; khi request thất bại thì khôi phục kèm thông báo cho người dùng biết thao tác chưa được ghi nhận.
- **Lưu phản hồi vào cache để lần sau hiển thị ngay không cần gọi lại** (Sai): Đó là caching — nó tăng tốc lần đọc sau, không phải phản hồi tức thì cho thao tác ghi.
