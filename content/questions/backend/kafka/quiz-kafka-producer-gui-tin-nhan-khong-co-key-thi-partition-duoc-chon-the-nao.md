---
id: quiz-kafka-producer-gui-tin-nhan-khong-co-key-thi-partition-duoc-chon-the-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer gửi tin nhắn không có key thì partition được chọn thế nào?

## Đáp án trắc nghiệm
- [ ] Băm nội dung của value để chọn partition
- [ ] Luôn ghi vào partition 0 vì đó là partition mặc định
- [x] Phân bổ đều theo batch giữa các partition sẵn có
- [ ] Broker quyết định theo partition đang rỗi nhất

## Giải thích (VI)
Producer rải đều theo lô (sticky partitioner: gom một batch vào một partition rồi chuyển sang partition khác). Có key thì partition = hash(key) % số partition, nên cùng key luôn cùng partition .

### Giải thích các phương án:
- **Băm nội dung của value để chọn partition** (Sai): Kafka chỉ băm key, không băm value.
- **Luôn ghi vào partition 0 vì đó là partition mặc định** (Sai): Làm vậy sẽ dồn toàn bộ tải vào một partition.
- **Phân bổ đều theo batch giữa các partition sẵn có** (Đúng): Không có key nghĩa là không có bảo đảm thứ tự nào giữa các tin nhắn liên quan.
- **Broker quyết định theo partition đang rỗi nhất** (Sai): Việc chọn partition do producer làm, không phải broker.
