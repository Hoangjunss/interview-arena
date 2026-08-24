---
id: quiz-rabbitmq-nhng-thiet-lap-nao-can-co-de-message-song-qua-mot-lan-broker-restart-chon-cac-da
position: backend
technology: rabbitmq
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những thiết lập nào cần có để message sống qua một lần broker restart? (chọn các đáp án đúng)

## Đáp án trắc nghiệm
- [ ] Exchange dùng loại direct thay vì fanout
- [ ] Consumer dùng manual ack thay vì autoAck
- [x] Queue khai báo durable

## Giải thích (VI)
Cần CẢ HAI : queue durable và message persistent (delivery_mode=2, trong amqplib là { persistent: true }). Thiếu một trong hai là mất: queue không durable thì cả queue biến mất; message không persistent thì queue còn nhưng ruột rỗng.

### Giải thích các phương án:
- **Exchange dùng loại direct thay vì fanout** (Sai): Loại exchange chỉ quyết định cách định tuyến, không ảnh hưởng độ bền.
- **Consumer dùng manual ack thay vì autoAck** (Sai): Manual ack chống mất message khi CONSUMER chết, không liên quan tới broker restart.
- **Queue khai báo durable** (Đúng): Queue không durable bị xoá khi broker restart, kéo theo toàn bộ message bên trong.
