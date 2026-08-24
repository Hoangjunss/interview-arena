---
id: quiz-redis-muon-biet-vi-sao-redis-cham-dot-ngot-nen-xem-gi-truoc
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn biết vì sao Redis chậm đột ngột, nên xem gì trước?

## Đáp án trắc nghiệm
- [ ] Tăng maxmemory lên gấp đôi
- [x] SLOWLOG và INFO
- [ ] Thêm một bản sao để chia tải đọc
- [ ] Khởi động lại tiến trình Redis rồi theo dõi tiếp một lúc

## Giải thích (VI)
SLOWLOG GET cho biết lệnh nào vượt ngưỡng thời gian, INFO cho biết bộ nhớ đã dùng, tỉ lệ hit, số kết nối, tình trạng persistence và replication. Hai lệnh này thường chỉ ra ngay nguyên nhân.

### Giải thích các phương án:
- **Tăng maxmemory lên gấp đôi** (Sai): Đổi cấu hình trước khi biết nguyên nhân là đoán mò.
- **SLOWLOG và INFO** (Đúng): Phần lớn sự cố độ trễ đến từ một lệnh chặn hoặc từ việc bộ nhớ chạm ngưỡng.
- **Thêm một bản sao để chia tải đọc** (Sai): Đó là giải pháp mở rộng, không phải bước chẩn đoán.
- **Khởi động lại tiến trình Redis rồi theo dõi tiếp một lúc** (Sai): Khởi động lại xoá luôn bằng chứng và có thể mất dữ liệu chưa kịp ghi.
