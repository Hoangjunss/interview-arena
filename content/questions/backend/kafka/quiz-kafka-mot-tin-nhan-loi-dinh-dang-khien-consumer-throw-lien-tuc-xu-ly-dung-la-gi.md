---
id: quiz-kafka-mot-tin-nhan-loi-dinh-dang-khien-consumer-throw-lien-tuc-xu-ly-dung-la-gi
position: backend
technology: kafka
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một tin nhắn lỗi định dạng khiến consumer throw liên tục. Xử lý đúng là gì?

## Đáp án trắc nghiệm
- [ ] Xoá tin nhắn khỏi topic bằng lệnh quản trị
- [ ] Bắt lỗi rồi bỏ qua, không ghi lại gì cả
- [ ] Retry mãi tới khi xử lý được vì không được mất dữ liệu
- [x] Đẩy nó sang dead-letter topic rồi commit offset và đi tiếp

## Giải thích (VI)
Dead-letter topic : ghi bản ghi lỗi kèm thông tin lỗi sang một topic riêng, commit offset, rồi xử lý tiếp. Retry mãi sẽ chặn toàn bộ partition — bản ghi phía sau không được xử lý dù chúng hoàn toàn hợp lệ.

### Giải thích các phương án:
- **Xoá tin nhắn khỏi topic bằng lệnh quản trị** (Sai): Không xoá được một bản ghi lẻ trong log; log chỉ ghi thêm.
- **Bắt lỗi rồi bỏ qua, không ghi lại gì cả** (Sai): Đi tiếp được nhưng mất dấu dữ liệu lỗi nên không điều tra được.
- **Retry mãi tới khi xử lý được vì không được mất dữ liệu** (Sai): Bản ghi sai định dạng sẽ không bao giờ xử lý được, và nó chặn cả partition.
- **Đẩy nó sang dead-letter topic rồi commit offset và đi tiếp** (Đúng): Giữ được bản ghi để điều tra mà không chặn toàn bộ partition phía sau.
