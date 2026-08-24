---
id: su-khac-biet-giua-authorization-server-va-resource-server-trong-spring-security
position: backend
technology: security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác biệt giữa Authorization Server và Resource Server trong Spring Security 6?

## Question (EN)
What is the difference between an Authorization Server and a Resource Server in Spring Security 6?

## Đáp án chi tiết (VI)
| | **Authorization Server** | **Resource Server** |\
|---|---|---|\
| Vai trò | Identity provider — **phát** token | Bảo vệ API — **validate** token |\
| Trách nhiệm | Xác thực user, phát JWT, refresh, revoke | Verify token, check scope, cho/từ chối request |\
| Library | `spring-authorization-server` | `spring-security-oauth2-resource-server` |\
| Quan hệ | 1 AuthServer → N Resource Server |\
\
**Resource Server config:**\
```java\
http.authorizeHttpRequests(a -\u003e a\
      .requestMatchers(\\"/api/admin/**\\").hasAuthority(\\"SCOPE_admin\\")\
      .anyRequest().authenticated())\
    .oauth2ResourceServer(o -\u003e o.jwt(j -\u003e j.jwkSetUri(\\"https://auth/.well-known/jwks.json\\")));\
```\
\
**Validate (local, không gọi auth server):** lấy public key từ JWKS (cache) → verify chữ ký → check `iss`, `exp`, `aud`, `scope`.\
\
**Thực tế 2026:** đa số dùng Keycloak (self-host) hoặc Auth0/Okta (managed); Spring app chỉ làm Resource Server. Tự viết Authorization Server chỉ khi cần đặc biệt (multi-tenant, custom flow).

## Detailed Answer (EN)
$84
