---
id: logging-best-practices-cho-node-js-production
position: backend
technology: node.js-deep
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Logging best practices cho Node.js production?

## Question (EN)
What are the logging best practices for Node.js in production?

## Đáp án chi tiết (VI)
Logging trong production cần có cấu trúc và chiến lược rõ ràng để debug hiệu quả khi có sự cố. Nên dùng Pino (nhanh nhất, gấp 5 lần Winston) hoặc Winston (linh hoạt hơn, nhiều transports), và format log dưới dạng JSON thay vì text thuần vì JSON dễ parse bởi log aggregators như ELK Stack, Datadog, hay CloudWatch.\
\
Phân chia log levels hợp lý: error cho lỗi cần xử lý ngay, warn cho tình huống bất thường nhưng chưa lỗi, info cho business events quan trọng, debug cho chi tiết kỹ thuật chỉ bật khi cần.\
\
Mỗi request nên có correlation ID (UUID) truyền qua tất cả services để trace toàn bộ luồng xử lý, và tuyệt đối không log sensitive data như passwords, tokens, hay thông tin cá nhân người dùng.

## Detailed Answer (EN)
Production logging needs a clear structure and strategy for effective debugging when incidents occur. Use Pino (fastest, 5x faster than Winston) or Winston (more flexible, many transports). Format logs as JSON rather than plain text — JSON is easily parsed by aggregators like ELK Stack, Datadog, or CloudWatch. Use log levels appropriately: error for issues needing immediate action, warn for anomalies that aren't errors yet, info for important business events, debug for technical details (only enabled when needed). Each request should carry a correlation ID (UUID) propagated across all services to trace the full request flow. Never log sensitive data: passwords, tokens, or personal user information.
