---
id: implement-jwt-authentication-flow-trong-nestjs-voi-nestjs-jwt-va-passport
position: backend
technology: auth-\u0026-security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement JWT Authentication flow trong NestJS với @nestjs/jwt và Passport?

## Question (EN)
Implement JWT Authentication flow in NestJS with @nestjs/jwt and Passport?

## Đáp án chi tiết (VI)
JWT Auth flow gồm hai phần chính: AuthService xác thực credentials và cấp token, JwtStrategy/Guard bảo vệ routes. Cài đặt `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcryptjs`. Tạo `AuthModule` import `JwtModule.registerAsync()` với `ConfigService` để lấy `JWT_SECRET` và `expiresIn`.\
\
`AuthService` có method `login()`: tìm user theo email, compare password với `bcrypt.compare()`, nếu đúng sign JWT với payload `{ sub: userId, email, role }` và trả về `access_token` (ngắn hạn 15m) + `refresh_token` (dài hạn 7d).\
\
`JwtStrategy` extends `PassportStrategy(Strategy)` với config `jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()` và `secretOrKey`. Method `validate(payload)` attach user vào request. Guard `JwtAuthGuard` extends `AuthGuard('jwt')` từ Passport. `@Public()` decorator dùng `SetMetadata` để bỏ qua guard cho login/register endpoints.

## Detailed Answer (EN)
JWT Auth flow has two main parts: AuthService validates credentials and issues tokens; JwtStrategy/Guard protects routes. Install `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcryptjs`. Create `AuthModule` importing `JwtModule.registerAsync()` with `ConfigService` to get `JWT_SECRET` and `expiresIn`.\
\
`AuthService` `login()` method: finds user by email, compares password with `bcrypt.compare()`, signs JWT with payload `{ sub: userId, email, role }`, returns `access_token` (15m) + `refresh_token` (7d).\
\
`JwtStrategy` extends `PassportStrategy(Strategy)` with `jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()`. `validate(payload)` attaches user to request. `JwtAuthGuard` extends `AuthGuard('jwt')`. `@Public()` decorator skips the guard for public endpoints.
