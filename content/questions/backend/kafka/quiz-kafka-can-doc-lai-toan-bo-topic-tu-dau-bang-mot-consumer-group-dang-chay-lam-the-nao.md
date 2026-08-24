---
id: quiz-kafka-can-doc-lai-toan-bo-topic-tu-dau-bang-mot-consumer-group-dang-chay-lam-the-nao
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cần đọc lại toàn bộ topic từ đầu bằng một consumer group đang chạy. Làm thế nào?

## Đáp án trắc nghiệm
- [ ] Đặt auto.offset.reset=earliest rồi khởi động lại consumer
- [ ] Xoá topic rồi ghi lại toàn bộ dữ liệu vào
- [ ] Tăng retention của topic lên để dữ liệu cũ hiện lại
- [x] Dừng consumer rồi reset offset của group về earliest

## Giải thích (VI)
Dừng hết consumer của group, rồi kafka-consumer-groups.sh --reset-offsets --to-earliest --execute. auto.offset.reset=earliest không giúp gì ở đây vì group đã có offset commit — nó chỉ áp dụng cho group mới.

### Giải thích các phương án:
- **Đặt auto.offset.reset=earliest rồi khởi động lại consumer** (Sai): Tham số đó chỉ áp dụng khi group chưa có offset đã commit.
- **Xoá topic rồi ghi lại toàn bộ dữ liệu vào** (Sai): Phá dữ liệu của mọi consumer khác và không cần thiết.
- **Tăng retention của topic lên để dữ liệu cũ hiện lại** (Sai): Retention không ảnh hưởng tới vị trí offset của group.
- **Dừng consumer rồi reset offset của group về earliest** (Đúng): kafka-consumer-groups.sh --reset-offsets yêu cầu group không có thành viên nào đang hoạt động.
