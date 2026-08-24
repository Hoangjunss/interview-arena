---
id: kafka-streams-va-apache-flink-khi-nao-chon-cai-nao
position: backend
technology: stream-processing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka Streams và Apache Flink — khi nào chọn cái nào?

## Question (EN)
Kafka Streams vs Apache Flink — when do you pick which?

## Đáp án chi tiết (VI)
Cả hai đều xử lý luồng có trạng thái (stateful stream processing), nhưng khác nhau ở **mô hình triển khai**:\
\
- **Kafka Streams:** là một **thư viện client** (JVM) nhúng thẳng vào app của bạn — **không có cluster riêng**. Nguồn vào và đích ra **đều là Kafka**. Scale bằng cách chạy thêm instance của chính app; Kafka lo phân chia partition. Gọn khi bạn đã sống trong hệ sinh thái Kafka và chỉ cần xử lý stream trong một microservice.\
- **Apache Flink:** là một **engine/cluster xử lý riêng** (JobManager + TaskManager), độc lập với Kafka. Hỗ trợ **nhiều nguồn/đích** (Kafka, file, DB, ...), thế mạnh ở **event-time, windowing phức tạp, state backend lớn**, và hợp nhất batch + streaming.\
\
**Chọn thế nào:**\
- **Kafka Streams** khi: dữ liệu vào-ra đều Kafka, muốn một **thư viện** thay vì vận hành cluster, quy mô vừa, gắn chặt microservice.\
- **Flink** khi: cần **nhiều nguồn dữ liệu**, windowing/stateful **phức tạp**, quy mô rất lớn, hoặc muốn một nền tảng xử lý luồng chuyên dụng với công cụ vận hành riêng.

## Detailed Answer (EN)
$85
