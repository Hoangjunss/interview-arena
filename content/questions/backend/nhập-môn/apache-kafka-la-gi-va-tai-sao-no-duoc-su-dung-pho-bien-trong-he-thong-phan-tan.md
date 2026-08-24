---
id: apache-kafka-la-gi-va-tai-sao-no-duoc-su-dung-pho-bien-trong-he-thong-phan-tan
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Apache Kafka là gì và tại sao nó được sử dụng phổ biến trong hệ thống phân tán?

## Question (EN)
What is Apache Kafka and why is it widely used in distributed systems?

## Đáp án chi tiết (VI)
Kafka là distributed event streaming platform cho phép xử lý dữ liệu real-time với throughput cao, latency thấp và khả năng replay message — lý do chính khiến nó phổ biến trong hệ thống phân tán. Apache Kafka được LinkedIn phát triển và open-source năm 2011. Kafka được thiết kế để xử lý luồng dữ liệu thời gian thực với thông lượng cực cao, độ trễ thấp và khả năng mở rộng theo chiều ngang. Điểm mạnh của Kafka so với các message broker truyền thống là khả năng lưu trữ message lâu dài trên disk (không xóa sau khi consumer đọc), cho phép nhiều consumer đọc lại cùng một message. Kafka thường được dùng trong các use case như event sourcing, log aggregation, real-time analytics, data pipeline giữa các microservices, và change data capture (CDC) từ database.

## Detailed Answer (EN)
Kafka is a distributed event streaming platform for processing real-time data with high throughput, low latency, and message replay capability — the main reason it is popular in distributed systems. Apache Kafka was developed by LinkedIn and open-sourced in 2011. It is designed to handle real-time data streams with extremely high throughput, low latency, and horizontal scalability. Unlike traditional message brokers, Kafka retains messages on disk after consumers read them, allowing multiple consumers to replay the same messages. Common use cases include event sourcing, log aggregation, real-time analytics, microservices data pipelines, and change data capture (CDC) from databases.
