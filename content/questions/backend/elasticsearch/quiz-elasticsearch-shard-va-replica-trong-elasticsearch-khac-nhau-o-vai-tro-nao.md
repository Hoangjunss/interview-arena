---
id: quiz-elasticsearch-shard-va-replica-trong-elasticsearch-khac-nhau-o-vai-tro-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shard và replica trong Elasticsearch khác nhau ở vai trò nào?

## Đáp án trắc nghiệm
- [ ] Shard nằm trên một máy, replica nằm trên cùng máy đó
- [x] Shard chia dữ liệu, replica là bản sao của shard
- [ ] Shard dành cho ghi, replica dành riêng cho việc gộp nhóm
- [ ] Shard là bản sao còn replica là phần dữ liệu gốc

## Giải thích (VI)
Shard chia nhỏ dữ liệu của một chỉ mục để phân tán qua nhiều máy; replica là bản sao của shard, đặt trên máy khác để chịu lỗi và tăng thông lượng đọc. Số shard chính cố định lúc tạo chỉ mục, còn số bản sao đổi được.

### Giải thích các phương án:
- **Shard nằm trên một máy, replica nằm trên cùng máy đó** (Sai): Replica luôn được đặt trên máy khác, nếu không thì mất máy là mất cả hai.
- **Shard chia dữ liệu, replica là bản sao của shard** (Đúng): Shard cho phép mở rộng theo chiều ngang, còn replica cho khả năng chịu lỗi và tăng thông lượng đọc.
- **Shard dành cho ghi, replica dành riêng cho việc gộp nhóm** (Sai): Replica phục vụ đọc nói chung chứ không riêng gộp nhóm.
- **Shard là bản sao còn replica là phần dữ liệu gốc** (Sai): Vai trò ngược lại hoàn toàn.
