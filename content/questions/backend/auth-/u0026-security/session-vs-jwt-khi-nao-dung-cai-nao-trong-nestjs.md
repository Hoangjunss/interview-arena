---
id: session-vs-jwt-khi-nao-dung-cai-nao-trong-nestjs
position: backend
technology: auth-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Session vs JWT — khi nào dùng cái nào trong NestJS?

## Question (EN)
Session vs JWT — when to use each in NestJS?

## Đáp án chi tiết (VI)
**JWT (Stateless)**: token mang đủ thông tin, server không cần lưu state. Phù hợp:\
- Microservices và distributed systems\
- Mobile apps (localStorage/SecureStorage)\
- Stateless REST APIs\
- Cross-domain authentication\
\
**Sessions (Stateful)**: server lưu session data (DB hoặc Redis), client chỉ giữ session ID trong cookie. Phù hợp:\
- Traditional web apps với server-side rendering\
- Cần revoke session ngay lập tức (banking, admin)\
- Không muốn expose user data trong token\
\
**NestJS Session setup** với `express-session` + Redis:\
```typescript\
app.use(session({\
  store: new RedisStore({ client: redisClient }),\
  secret: process.env.SESSION_SECRET,\
  resave: false,\
  saveUninitialized: false,\
  cookie: { secure: true, httpOnly: true, maxAge: 86400000 },\
}));\
```\
\
Lưu ý JWT: không thể revoke trước khi hết hạn trừ khi maintain blacklist (làm mất đi lợi thế stateless). Lưu ý Session: cần sticky sessions hoặc centralized store (Redis) khi scale horizontally.

## Detailed Answer (EN)
**JWT (Stateless)**: token carries all info, server needs no state. Best for microservices, mobile apps, distributed systems, cross-domain auth.\
\
**Sessions (Stateful)**: server stores session data (DB/Redis), client holds session ID in cookie. Best for traditional web apps, cases requiring immediate revocation (banking), hiding user data from client.\
\
**NestJS Session with Redis**:\
```typescript\
app.use(session({\
  store: new RedisStore({ client: redisClient }),\
  secret: process.env.SESSION_SECRET,\
  cookie: { secure: true, httpOnly: true },\
}));\
```\
\
Pitfall JWT: cannot revoke before expiry without a blacklist (negates stateless advantage). Pitfall Session: needs sticky sessions or centralized store (Redis) when scaling.
