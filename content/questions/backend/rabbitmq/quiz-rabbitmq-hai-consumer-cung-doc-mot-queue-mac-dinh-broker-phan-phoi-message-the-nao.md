---
id: quiz-rabbitmq-hai-consumer-cung-doc-mot-queue-mac-dinh-broker-phan-phoi-message-the-nao
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai consumer cùng đọc một queue. Mặc định broker phân phối message thế nào?

## Đáp án trắc nghiệm
- [x] Round-robin, lần lượt từng consumer
- [ ] Broker đo tải và chọn consumer đang rảnh nhất
- [ ] Consumer kết nối trước nhận toàn bộ, consumer sau dự phòng
- [ ] Cả hai cùng nhận mỗi message một bản

## Giải thích (VI)
Round-robin : message thứ n cho consumer A, thứ n+1 cho consumer B, xoay vòng đều — mỗi message chỉ giao cho một consumer. Đây chính là mô hình work queue (competing consumers): thêm consumer là tăng khả năng xử lý song song.

### Giải thích các phương án:
- **Round-robin, lần lượt từng consumer** (Đúng): Broker xoay vòng đều giữa các consumer của queue, không nhìn tải thực tế.
- **Broker đo tải và chọn consumer đang rảnh nhất** (Sai): Dispatch mặc định không nhìn tiến độ xử lý; muốn gần như vậy phải set prefetch thấp.
- **Consumer kết nối trước nhận toàn bộ, consumer sau dự phòng** (Sai): Không có ưu tiên theo thứ tự kết nối trong dispatch mặc định.
- **Cả hai cùng nhận mỗi message một bản** (Sai): Một message trong queue chỉ giao cho đúng một consumer; nhân bản là việc của fanout exchange với nhiều queue.
