---
id: quiz-redis-mot-key-hash-chua-5-trieu-field-gay-van-de-gi
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một key hash chứa 5 triệu field gây vấn đề gì?

## Đáp án trắc nghiệm
- [x] Mọi lệnh chạm cả key sẽ chặn server và cả key nằm trên một node
- [ ] Redis từ chối tạo hash có quá 1 triệu field trong một key
- [ ] Hash tự chuyển thành sorted set để chịu tải
- [ ] Các field vượt quá sẽ tự bị loại theo LRU

## Giải thích (VI)
Đây là big key : HGETALL hay DEL trên nó chặn luồng đơn hàng chục đến hàng trăm ms, và trong cluster cả key buộc nằm trên một node nên node đó thành điểm nóng. Chia thành nhiều key theo nhóm là cách xử lý.

### Giải thích các phương án:
- **Mọi lệnh chạm cả key sẽ chặn server và cả key nằm trên một node** (Đúng): Xoá hay đọc toàn bộ key lớn giữ luồng đơn rất lâu, và cluster không chia nhỏ một key được.
- **Redis từ chối tạo hash có quá 1 triệu field trong một key** (Sai): Giới hạn thực tế rất lớn, không phải một triệu.
- **Hash tự chuyển thành sorted set để chịu tải** (Sai): Redis không tự đổi kiểu dữ liệu của key.
- **Các field vượt quá sẽ tự bị loại theo LRU** (Sai): Eviction làm việc ở mức key, không loại từng field bên trong.
