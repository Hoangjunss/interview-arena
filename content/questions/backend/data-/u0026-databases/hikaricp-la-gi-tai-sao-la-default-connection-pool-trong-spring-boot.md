---
id: hikaricp-la-gi-tai-sao-la-default-connection-pool-trong-spring-boot
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HikariCP là gì? Tại sao là default connection pool trong Spring Boot?

## Question (EN)
What is HikariCP? Why is it the default connection pool in Spring Boot?

## Đáp án chi tiết (VI)
**HikariCP** là JDBC connection pool — giữ sẵn pool kết nối DB tái sử dụng thay vì mở/đóng connection mỗi request (mở connection tốn hàng chục ms + handshake).\
\
**Là default của Spring Boot 2+ vì:** nhanh nhất trong benchmark (vs Tomcat CP, DBCP2, C3P0) — overhead borrow/return cực thấp; lightweight (~170KB); reliable.\
\
**Tham số chính** (prefix `spring.datasource.hikari.*`):\
- `maximum-pool-size` — max connection (default 10).\
- `minimum-idle` — số connection idle giữ sẵn.\
- `connection-timeout` — ms chờ lấy connection trước khi throw.\
- `max-lifetime` — tuổi thọ tối đa 1 connection.\
- `leak-detection-threshold` — cảnh báo khi connection bị giữ quá lâu → bắt bug code quên trả pool.\
\
**Pool size:** không phải càng nhiều càng tốt — DB giới hạn concurrent connection. Công thức HikariCP: `(core_count × 2) + effective_spindle_count`; Postgres khuyến nghị 10-20 connection/app instance.

## Detailed Answer (EN)
**HikariCP** is a JDBC connection pool — keeps a reusable pool of DB connections instead of opening/closing one per request (opening a connection costs tens of ms + handshake).\
\
**Default in Spring Boot 2+ because:** fastest in benchmarks (vs Tomcat CP, DBCP2, C3P0) — minimal borrow/return overhead; lightweight (~170 KB); reliable.\
\
**Key parameters** (prefix `spring.datasource.hikari.*`):\
- `maximum-pool-size` — max connections (default 10).\
- `minimum-idle` — idle connections kept ready.\
- `connection-timeout` — ms to wait for a connection before throwing.\
- `max-lifetime` — max lifetime of a connection.\
- `leak-detection-threshold` — warns when a connection is held too long → catches code that forgets to return it.\
\
**Pool size:** more is not better — the DB limits concurrent connections. HikariCP formula: `(core_count × 2) + effective_spindle_count`; Postgres recommends 10-20 connections per app instance.
