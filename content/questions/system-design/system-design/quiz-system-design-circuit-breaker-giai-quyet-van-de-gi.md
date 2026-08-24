---
id: quiz-system-design-circuit-breaker-giai-quyet-van-de-gi
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Circuit breaker giải quyết vấn đề gì?

## Đáp án trắc nghiệm
- [ ] Cân bằng tải giữa nhiều instance của một service
- [ ] Tự động thử lại request lỗi tới khi thành công
- [x] Dừng gọi service đang lỗi để không tốn tài nguyên chờ
- [ ] Giới hạn số request mà mỗi client được gửi trong một phút

## Giải thích (VI)
Chặn lỗi lan truyền : khi service phụ thuộc lỗi liên tục, breaker mở ra và fail ngay lập tức thay vì để mỗi request chờ timeout. Nhờ đó thread pool không bị chiếm hết và service của bạn còn phục vụ được các luồng khác.

### Giải thích các phương án:
- **Cân bằng tải giữa nhiều instance của một service** (Sai): Đó là việc của load balancer.
- **Tự động thử lại request lỗi tới khi thành công** (Sai): Đó là retry, và circuit breaker tồn tại chính để giới hạn việc retry.
- **Dừng gọi service đang lỗi để không tốn tài nguyên chờ** (Đúng): Fail nhanh giúp giải phóng thread và chặn lỗi lan ra toàn hệ thống.
- **Giới hạn số request mà mỗi client được gửi trong một phút** (Sai): Đó là rate limiting, bảo vệ theo chiều ngược lại.
