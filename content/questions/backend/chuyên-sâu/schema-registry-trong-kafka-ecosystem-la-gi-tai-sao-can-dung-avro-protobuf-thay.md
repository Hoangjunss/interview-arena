---
id: schema-registry-trong-kafka-ecosystem-la-gi-tai-sao-can-dung-avro-protobuf-thay
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Schema Registry trong Kafka ecosystem là gì? Tại sao cần dùng Avro/Protobuf thay vì JSON?

## Question (EN)
What is Schema Registry in the Kafka ecosystem? Why use Avro/Protobuf instead of JSON?

## Đáp án chi tiết (VI)
Schema Registry (Confluent) là service lưu trữ và quản lý schema của Kafka message, đảm bảo producer và consumer đồng thuận về format dữ liệu. JSON không có schema enforcement — producer có thể thay đổi field name/type mà không báo, khiến consumer bị lỗi. Avro và Protobuf là binary serialization formats: nhỏ hơn JSON ~3-10x (giảm storage và network cost), có schema evolution với compatibility rules (BACKWARD, FORWARD, FULL). Schema Registry lưu schema theo `subject` (mặc định là topic name), assign `schema ID`; message chỉ chứa schema ID (4 bytes) thay vì full schema, consumer lookup schema từ registry khi cần. Khi thêm field mới với default value (BACKWARD compatible), consumer cũ vẫn deserialize được; xóa field hoặc đổi type là BREAKING change bị Schema Registry reject nếu cấu hình không cho phép. Đây là best practice bắt buộc trong production Kafka cluster.

## Detailed Answer (EN)
Schema Registry (Confluent) is a service that stores and manages Kafka message schemas, ensuring producers and consumers agree on data formats. JSON has no schema enforcement — a producer can rename or retype a field without warning, breaking consumers. Avro and Protobuf are binary serialization formats: 3-10x smaller than JSON (reducing storage and network costs) and supporting schema evolution with compatibility rules (BACKWARD, FORWARD, FULL). Schema Registry stores schemas by `subject` (default: topic name) and assigns a `schema ID`; each message carries only the schema ID (4 bytes) rather than the full schema, and consumers look up the schema from the registry as needed. Adding a new field with a default value is BACKWARD compatible and old consumers can still deserialize; removing a field or changing its type is a BREAKING change that Schema Registry will reject if the compatibility mode disallows it. This is a must-follow best practice in any production Kafka cluster.
