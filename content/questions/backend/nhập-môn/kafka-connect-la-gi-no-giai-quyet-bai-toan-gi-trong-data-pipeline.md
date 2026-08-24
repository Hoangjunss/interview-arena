---
id: kafka-connect-la-gi-no-giai-quyet-bai-toan-gi-trong-data-pipeline
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kafka Connect là gì? Nó giải quyết bài toán gì trong data pipeline?

## Question (EN)
What is Kafka Connect? What problem does it solve in data pipelines?

## Đáp án chi tiết (VI)
Kafka Connect là framework tích hợp sẵn trong Kafka ecosystem để kết nối Kafka với các external system (database, file system, cloud storage, search engine) mà không cần viết code. Kafka Connect có hai loại connector: Source Connector (đọc data từ external system vào Kafka, ví dụ: Debezium CDC từ PostgreSQL) và Sink Connector (ghi data từ Kafka ra external system, ví dụ: Elasticsearch Sink). Connect chạy ở chế độ distributed với worker pool, tự động handle fault tolerance và load balancing. Ví dụ thực tế: dùng Debezium Source Connector để capture mọi thay đổi trong MySQL database, publish vào Kafka topic, sau đó Elasticsearch Sink Connector index data để search — toàn bộ pipeline không cần viết một dòng code custom nào.

## Detailed Answer (EN)
Kafka Connect is a built-in framework in the Kafka ecosystem for integrating Kafka with external systems (databases, file systems, cloud storage, search engines) without writing custom code. It provides two types of connectors: Source Connectors (read data from external systems into Kafka, e.g., Debezium CDC from PostgreSQL) and Sink Connectors (write data from Kafka to external systems, e.g., Elasticsearch Sink). Connect runs in distributed mode with a worker pool, automatically handling fault tolerance and load balancing. A practical example: use a Debezium Source Connector to capture all MySQL changes into Kafka topics, then an Elasticsearch Sink Connector indexes the data for search — the entire pipeline requires zero custom code.
