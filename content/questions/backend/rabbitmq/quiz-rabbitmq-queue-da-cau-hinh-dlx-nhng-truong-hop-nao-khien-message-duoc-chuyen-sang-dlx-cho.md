---
id: quiz-rabbitmq-queue-da-cau-hinh-dlx-nhng-truong-hop-nao-khien-message-duoc-chuyen-sang-dlx-cho
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Queue đã cấu hình DLX. Những trường hợp nào khiến message được chuyển sang DLX? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] Consumer reject/nack với requeue=false
- [ ] Consumer ack message thành công
- [ ] Consumer mất kết nối khi message chưa được ack

## Giải thích (VI)
Ba đường vào DLX: reject/nack với requeue=false , hết TTL , và queue tràn max-length . Mất kết nối thì message được requeue chứ không dead-letter — phân biệt hai đường đi này là điểm hay bị nhầm.

### Giải thích các phương án:
- **Consumer reject/nack với requeue=false** (Đúng): Từ chối không requeue là đường dead-letter phổ biến nhất.
- **Consumer ack message thành công** (Sai): Ack nghĩa là xử lý xong; message bị xoá khỏi queue, không đi đâu cả.
- **Consumer mất kết nối khi message chưa được ack** (Sai): Trường hợp này message được requeue về queue gốc, không phải dead-letter.
