---
id: quiz-rabbitmq-exchange-va-queue-khac-nhau-the-nao-ve-vai-tro
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Exchange và queue khác nhau thế nào về vai trò?

## Đáp án trắc nghiệm
- [ ] Hai tên gọi khác nhau của cùng một thành phần
- [x] Exchange định tuyến, queue lưu message chờ consumer
- [ ] Queue định tuyến message tới exchange phù hợp
- [ ] Exchange lưu message, queue chỉ là con trỏ đọc của consumer

## Giải thích (VI)
Exchange = bộ định tuyến, queue = bộ đệm lưu trữ. Message đi producer → exchange → (theo binding) → queue → consumer. Exchange không giữ message; nếu không có queue nào nhận thì message biến mất chứ không nằm lại trong exchange.

### Giải thích các phương án:
- **Hai tên gọi khác nhau của cùng một thành phần** (Sai): Chúng là hai thực thể riêng, nối với nhau bằng binding.
- **Exchange định tuyến, queue lưu message chờ consumer** (Đúng): Exchange không giữ message; nó chỉ quyết định message đi sang queue nào.
- **Queue định tuyến message tới exchange phù hợp** (Sai): Chiều đi của message là exchange sang queue, không có chiều ngược lại.
- **Exchange lưu message, queue chỉ là con trỏ đọc của consumer** (Sai): Ngược lại — nơi lưu trữ là queue, exchange không có bộ nhớ đệm message.
