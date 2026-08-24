---
id: message-trong-rabbitmq-bao-gom-nhung-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message trong RabbitMQ bao gồm những gì?

## Question (EN)
What is a message in RabbitMQ?

## Đáp án chi tiết (VI)
Message là đơn vị dữ liệu được truyền qua RabbitMQ, gồm hai phần: payload (dữ liệu thực — JSON, binary, text, v.v.) và metadata (headers, properties như delivery mode, correlation ID, timestamp, v.v.). RabbitMQ coi payload là mảng byte không rõ nghĩa — không inspect hay sửa nội dung, ứng dụng tự chịu trách nhiệm serialize/deserialize. Message có thể rất nhỏ (vài byte) hoặc lớn (megabytes), nhưng message quá lớn sẽ ảnh hưởng performance.

## Detailed Answer (EN)
A message consists of a payload (actual data — JSON, binary, text) and metadata (headers, properties like delivery mode, correlation ID, timestamp). RabbitMQ treats the payload as an opaque byte array — it never inspects or modifies content, leaving serialization to the application. Messages can be tiny bytes or large megabytes, though very large ones can impact performance.
