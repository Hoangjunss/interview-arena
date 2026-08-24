---
id: danh-doi-giua-testcontainers-va-h2-in-memory-database-trong-ci-cd-la-gi
position: backend
technology: testing
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh đổi giữa Testcontainers và H2 in-memory database trong CI/CD là gì?

## Question (EN)
What are the trade-offs between Testcontainers and H2 in-memory databases in CI/CD?

## Đáp án chi tiết (VI)
| | **H2 in-memory** | **Testcontainers** |\
|---|---|---|\
| Tốc độ | **Cực nhanh** (~ms) | Chậm (~5-10s startup) |\
| Setup | Không cần Docker | Cần Docker daemon |\
| Fidelity | **Thấp** — dialect khác prod | **Cao** — DB thật |\
| Stored proc, extension | Không | Có |\
| Migration (Flyway) | Đôi khi fail (dialect) | Có |\
\
**Vấn đề H2:** SQL chạy OK trên H2 nhưng **fail prod** vì khác dialect (`NOW()` vs `CURRENT_TIMESTAMP`, JSON column, regex, full-text) → false sense of safety.\
\
**Hybrid (recommended):** H2 cho dev loop nhanh; **Testcontainers** trong PR/CI để bắt integration bug; không dùng shared test DB (flaky, data pollution).\
\
**Dùng Testcontainers cho:** critical path (payment, order), migration script, stored procedure, native query.\
\
**2026:** Testcontainers thành standard — Spring Boot 3.1+ `@ServiceConnection` giảm config; CI cloud (GitHub Actions...) có sẵn Docker.

## Detailed Answer (EN)
| | **H2 in-memory** | **Testcontainers** |\
|---|---|---|\
| Speed | **Extremely fast** (~ms) | Slower (~5-10s startup) |\
| Setup | No Docker | Needs a Docker daemon |\
| Fidelity | **Low** — dialect differs from prod | **High** — real DB |\
| Stored procs, extensions | No | Yes |\
| Migration (Flyway) | Sometimes fails (dialect) | Yes |\
\
**The H2 problem:** SQL works on H2 but **fails in prod** due to dialect differences (`NOW()` vs `CURRENT_TIMESTAMP`, JSON columns, regex, full-text) → false sense of safety.\
\
**Hybrid (recommended):** H2 for a fast dev loop; **Testcontainers** in PR/CI to catch integration bugs; no shared test DB (flaky, data pollution).\
\
**Use Testcontainers for:** critical paths (payments, orders), migration scripts, stored procedures, native queries.\
\
**2026:** Testcontainers is becoming the standard — Spring Boot 3.1+ `@ServiceConnection` cuts config; cloud CI (GitHub Actions...) ships with Docker.
