---
id: health-checks-trong-asp-net-core-la-gi-va-tai-sao-can-thiet-cho-ung-dung-cloud
position: backend
technology: modern-.net
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health Checks trong ASP.NET Core là gì và tại sao cần thiết cho ứng dụng cloud?

## Question (EN)
What are health checks in ASP.NET Core and why are they critical for cloud applications?

## Đáp án chi tiết (VI)
Health checks expose trạng thái ứng dụng qua HTTP endpoint (`/health`). Implement `IHealthCheck`: trả về `HealthCheckResult.Healthy/Degraded/Unhealthy`. Container orchestrator (Kubernetes) dùng liveness probe (có nên restart?) và readiness probe (có nhận traffic?). Kiểm tra: kết nối database, external API, bộ nhớ. Cấu hình: `builder.Services.AddHealthChecks().AddDbContextCheck\u003cMyDbContext\u003e()`. Thiết yếu cho auto-healing deployment và zero-downtime update.

## Detailed Answer (EN)
Health checks expose application status via HTTP endpoints (`/health`). Implement `IHealthCheck` returning `HealthCheckResult.Healthy/Degraded/Unhealthy`. Container orchestrators (Kubernetes) use liveness probes (should it restart?) and readiness probes (should it accept traffic?). Checks cover database connectivity, external APIs, and memory usage. Configure via `builder.Services.AddHealthChecks().AddDbContextCheck\u003cMyDbContext\u003e()`. Essential for auto-healing deployments and zero-downtime updates.
