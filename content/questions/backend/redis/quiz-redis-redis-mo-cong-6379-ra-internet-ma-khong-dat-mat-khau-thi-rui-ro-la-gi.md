---
id: quiz-redis-redis-mo-cong-6379-ra-internet-ma-khong-dat-mat-khau-thi-rui-ro-la-gi
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis mở cổng 6379 ra internet mà không đặt mật khẩu thì rủi ro là gì?

## Đáp án trắc nghiệm
- [ ] Redis tự chặn kết nối từ ngoài mạng nội bộ
- [ ] Không có rủi ro nếu dữ liệu chỉ là cache
- [ ] Chỉ đọc được dữ liệu chứ không ghi được khi thiếu mật khẩu
- [x] Bất kỳ ai cũng đọc, xoá dữ liệu và thay đổi cấu hình

## Giải thích (VI)
Toàn quyền: đọc mọi dữ liệu, FLUSHALL, đổi cấu hình bằng CONFIG SET. Cache thường chứa token phiên nên mất luôn cả khả năng mạo danh người dùng. Tối thiểu phải có: bind vào mạng nội bộ, đặt mật khẩu, và tắt/rename các lệnh nguy hiểm.

### Giải thích các phương án:
- **Redis tự chặn kết nối từ ngoài mạng nội bộ** (Sai): Chế độ bảo vệ chỉ có tác dụng khi chưa cấu hình bind và mật khẩu.
- **Không có rủi ro nếu dữ liệu chỉ là cache** (Sai): Cache vẫn thường chứa token phiên và dữ liệu người dùng.
- **Chỉ đọc được dữ liệu chứ không ghi được khi thiếu mật khẩu** (Sai): Không có xác thực thì mọi lệnh đều chạy được, kể cả lệnh ghi.
- **Bất kỳ ai cũng đọc, xoá dữ liệu và thay đổi cấu hình** (Đúng): Đã có nhiều đợt tấn công tự động xoá sạch dữ liệu rồi để lại thông điệp đòi tiền.
