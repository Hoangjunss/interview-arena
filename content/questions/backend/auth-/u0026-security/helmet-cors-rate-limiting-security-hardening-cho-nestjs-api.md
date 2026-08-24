---
id: helmet-cors-rate-limiting-security-hardening-cho-nestjs-api
position: backend
technology: auth-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Helmet, CORS, Rate Limiting — security hardening cho NestJS API?

## Question (EN)
Helmet, CORS, Rate Limiting — security hardening for NestJS APIs?

## Đáp án chi tiết (VI)
**Helmet**: HTTP security headers middleware — ngăn chặn XSS, clickjacking, sniffing:\
```typescript\
import helmet from 'helmet';\
app.use(helmet()); // Thêm vào main.ts\
```\
\
**CORS**: chỉ allow origins cụ thể:\
```typescript\
app.enableCors({\
  origin: ['https://yourdomain.com'],\
  credentials: true,\
  methods: ['GET', 'POST', 'PUT', 'DELETE'],\
});\
```\
\
**Rate Limiting** với `@nestjs/throttler`:\
```typescript\
ThrottlerModule.forRoot([\
  { name: 'short', ttl: 1000, limit: 3 },     // 3 req/s\
  { name: 'medium', ttl: 10000, limit: 20 },  // 20 req/10s\
  { name: 'long', ttl: 60000, limit: 100 },   // 100 req/min\
])\
```\
\
**Input sanitization**: `class-validator` + `ValidationPipe` với `whitelist: true` ngăn chặn mass assignment. Dùng `sanitize-html` cho user-generated content. **SQL Injection**: TypeORM parameterized queries tự động escape — không bao giờ dùng raw string interpolation trong queries.

## Detailed Answer (EN)
**Helmet**: HTTP security headers — prevents XSS, clickjacking: `app.use(helmet())`\
\
**CORS**: allow specific origins:\
```typescript\
app.enableCors({ origin: ['https://yourdomain.com'], credentials: true });\
```\
\
**Rate Limiting** with `@nestjs/throttler`:\
```typescript\
ThrottlerModule.forRoot([\
  { name: 'short', ttl: 1000, limit: 3 },\
  { name: 'long', ttl: 60000, limit: 100 },\
])\
```\
\
**Input sanitization**: `ValidationPipe` with `whitelist: true` prevents mass assignment. TypeORM parameterized queries prevent SQL injection — never use raw string interpolation.
