---
id: giai-thich-kien-truc-kafka-broker-topic-partition-consumer-group-hoat-dong-nhu-t
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích kiến trúc Kafka: Broker, Topic, Partition, Consumer Group hoạt động như thế nào?

## Question (EN)
Explain Kafka's architecture: how do Broker, Topic, Partition, and Consumer Group work?

## Đáp án chi tiết (VI)
Kafka cluster gồm nhiều Broker lưu Topic, mỗi Topic chia thành Partition để song song hoá, và Consumer Group để scale đọc. Broker là một server Kafka chạy độc lập; một Kafka cluster thường có nhiều broker để đảm bảo high availability. Topic là kênh logic để phân loại message (ví dụ: topic 'orders', topic 'payments'). Mỗi topic được chia thành nhiều Partition — đây là đơn vị song song hóa của Kafka; các message trong một partition được sắp xếp theo thứ tự và mỗi message có một offset duy nhất. Consumer Group là nhóm các consumer cùng nhau đọc một topic; mỗi partition chỉ được đọc bởi đúng một consumer trong group tại một thời điểm, cho phép scale out việc tiêu thụ message. \
\
**Ví dụ:** nếu topic có 6 partition và group có 3 consumer, mỗi consumer xử lý 2 partition.

## Detailed Answer (EN)
A Kafka cluster consists of multiple Brokers storing Topics, each Topic split into Partitions for parallelism, and Consumer Groups for scaling reads. A Broker is an individual Kafka server; a Kafka cluster typically runs multiple brokers to ensure high availability. A Topic is a logical channel for categorizing messages (e.g., 'orders', 'payments'). Each topic is split into multiple Partitions — the unit of parallelism in Kafka; messages within a partition are ordered and each has a unique offset. A Consumer Group is a set of consumers that collectively read a topic; each partition is assigned to exactly one consumer in the group at any given time, enabling horizontal scaling of message consumption. For example, if a topic has 6 partitions and the group has 3 consumers, each consumer processes 2 partitions.
