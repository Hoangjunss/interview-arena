---
id: oauth-2-1-spring-authorization-server-hoat-dong-nhu-the-nao-trong-kien-truc-micr
position: backend
technology: security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OAuth 2.1 + Spring Authorization Server hoạt động như thế nào trong kiến trúc microservices?

## Question (EN)
How does OAuth 2.1 with Spring Authorization Server work in a microservices architecture?

## Đáp án chi tiết (VI)
**Kiến trúc:** 1 **Authorization Server** (identity provider, phát JWT) → N **Resource Server** (microservices, validate token **cục bộ**, không gọi auth server mỗi request).\
\
**Flow:**\
```\
1. Client → POST /oauth2/token (client credentials / authorization code + PKCE)\
2. AuthServer → trả JWT\
3. Client → GET /api/data, header: Authorization: Bearer \u003cJWT\u003e\
4. ResourceServer → verify chữ ký JWT (public key qua JWKS) + check claims (iss, exp, scope)\
5. Trả 200 / 401\
```\
\
**OAuth 2.1 vs 2.0:** bỏ grant nguy hiểm — Implicit (token trong URL), Password (client cầm credential); **bắt buộc PKCE** với Authorization Code.\
\
Config Resource Server (Spring Security 6): `oauth2ResourceServer(o -\u003e o.jwt(j -\u003e j.jwkSetUri(...)))` — code chi tiết xem câu Authorization Server vs Resource Server.\
\
**Thực tế:** đa số dùng auth server bên thứ ba (Keycloak, Auth0, Okta) thay vì tự build — security phức tạp, dễ sai.

## Detailed Answer (EN)
**Architecture:** one **Authorization Server** (identity provider, issues JWTs) → N **Resource Servers** (microservices, validate tokens **locally**, no auth-server call per request).\
\
**Flow:**\
```\
1. Client → POST /oauth2/token (client credentials / authorization code + PKCE)\
2. AuthServer → returns JWT\
3. Client → GET /api/data, header: Authorization: Bearer \u003cJWT\u003e\
4. ResourceServer → verifies JWT signature (public key via JWKS) + checks claims (iss, exp, scope)\
5. Returns 200 / 401\
```\
\
**OAuth 2.1 vs 2.0:** drops dangerous grants — Implicit (token in URL), Password (client holds credentials); **PKCE required** for Authorization Code.\
\
Resource Server config (Spring Security 6): `oauth2ResourceServer(o -\u003e o.jwt(j -\u003e j.jwkSetUri(...)))` — full code in the Authorization Server vs Resource Server item.\
\
**In practice:** most teams use a third-party auth server (Keycloak, Auth0, Okta) instead of building one — security is complex and error-prone.
