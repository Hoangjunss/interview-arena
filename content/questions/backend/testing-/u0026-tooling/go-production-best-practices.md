---
id: go-production-best-practices
position: backend
technology: testing-\u0026-tooling
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Go production best practices?

## Question (EN)
What are Go production best practices?

## Đáp án chi tiết (VI)
Khi đưa ứng dụng Go lên production, cần đảm bảo: structured logging (slog, zap, hoặc zerolog) dạng JSON dễ parse, graceful shutdown để không mất request đang xử lý, health check endpoints cho load balancer.\
\
Về config, đọc từ environment variables (viper hoặc envconfig). Dockerfile dùng multi-stage build với scratch hoặc distroless để giảm attack surface và image size xuống 5-15MB. Chất lượng code: race detector (`go test -race`) trong CI và golangci-lint để catch lỗi sớm.\
\
Luôn propagate context xuyên suốt request chain, cấu hình connection pooling hợp lý cho database, và expose metrics qua Prometheus để monitoring hiệu năng.

## Detailed Answer (EN)
For production Go services: use structured logging (slog, zap, zerolog) outputting JSON for log aggregators; implement graceful shutdown to avoid losing in-flight requests; expose health check endpoints for load balancers.\
\
For configuration, read from environment variables (viper, envconfig). Use multi-stage Docker builds with scratch or distroless to shrink image size to 5-15MB and reduce attack surface. Enforce quality via race detector (`go test -race`) in CI and golangci-lint for early detection.\
\
Always propagate context through the full request chain, configure database connection pooling properly, and expose Prometheus metrics for performance monitoring.
