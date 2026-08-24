---
id: quiz-mongodb-replica-set-va-sharding-giai-quyet-hai-van-de-khac-nhau-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Replica set và sharding giải quyết hai vấn đề khác nhau nào?

## Đáp án trắc nghiệm
- [x] Replica set để dự phòng; sharding để mở rộng ngang
- [ ] Cả hai đều nhân bản dữ liệu, chỉ khác số lượng bản sao
- [ ] Replica set để tăng tốc ghi, sharding để tăng tốc đọc
- [ ] Sharding đã thay thế replica set từ MongoDB 5.0

## Giải thích (VI)
Replica set = nhiều bản sao của cùng dữ liệu, cho tính sẵn sàng cao và tự chuyển đổi khi primary hỏng. Sharding = chia dữ liệu theo shard key ra nhiều node, cho khả năng mở rộng vượt giới hạn một máy. Trong thực tế mỗi shard chính là một replica set.

### Giải thích các phương án:
- **Replica set để dự phòng; sharding để mở rộng ngang** (Đúng): Một bên là dự phòng — nhân bản CÙNG tập dữ liệu ra nhiều node, tự bầu primary mới khi hỏng; một bên là mở rộng — CHIA dữ liệu để vượt giới hạn dung lượng và thông lượng ghi của một máy.
- **Cả hai đều nhân bản dữ liệu, chỉ khác số lượng bản sao** (Sai): Sharding chia dữ liệu chứ không nhân bản.
- **Replica set để tăng tốc ghi, sharding để tăng tốc đọc** (Sai): Ngược lại — mọi ghi trong replica set đều qua primary; sharding mới chia tải ghi.
- **Sharding đã thay thế replica set từ MongoDB 5.0** (Sai): Trong cụm sharded, mỗi shard bản thân nó vẫn là một replica set.
