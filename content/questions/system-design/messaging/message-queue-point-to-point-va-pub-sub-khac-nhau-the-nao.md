---
id: message-queue-point-to-point-va-pub-sub-khac-nhau-the-nao
position: system-design
technology: messaging
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Message queue (point-to-point) và pub/sub khác nhau thế nào?

## Question (EN)
Message queue (point-to-point) vs pub/sub — what is the difference?

## Đáp án chi tiết (VI)
Hai mô hình gửi message bất đồng bộ, khác nhau ở **ai nhận message**:\
\
- **Message queue (point-to-point)**: mỗi message được **đúng một consumer** xử lý. Nhiều consumer cùng đọc một queue thì **chia nhau việc** (competing consumers) để tăng throughput, nhưng một message chỉ giao cho một trong số đó. Hợp **phân phối tác vụ**: mỗi job làm đúng một lần (xử lý ảnh, gửi mail).\
- **Pub/sub (publish-subscribe)**: message được **fan-out tới mọi subscriber** đang quan tâm — một sự kiện, nhiều bên nhận đồng thời và độc lập. **Publisher không cần biết** có bao nhiêu/những ai là subscriber. Hợp **phát sự kiện**: một `OrderCreated` cho cả service kho, service email, service analytics cùng phản ứng.\
\
Chốt: **queue = chia việc (mỗi message một người làm)**; **pub/sub = phát broadcast (mỗi message mọi người nghe)**. Nhiều hệ kết hợp: publish sự kiện lên topic, mỗi consumer group có queue riêng để xử lý một lần trong nhóm (vd SNS + SQS, hoặc Kafka với consumer group). Cả hai đều giúp **decoupling** và chịu tải.

## Detailed Answer (EN)
$87
