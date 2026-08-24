---
id: refresh-token-strategy-trong-nestjs-implement-rotation-va-revocation
position: backend
technology: auth-\u0026-security
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Refresh token strategy trong NestJS — implement rotation và revocation?

## Question (EN)
Refresh token strategy in NestJS — implementing rotation and revocation?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
Short-lived access tokens (15m) + long-lived refresh tokens (7d) is the standard pattern.\
\
**Refresh Token Rotation**: each refresh invalidates old token and issues new one — detects theft:\
```typescript\
async refresh(refreshToken: string) {\
  const payload = this.jwtService.verify(refreshToken, { secret: REFRESH_SECRET });\
  const user = await this.usersService.findOne(payload.sub);\
  const isValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken);\
  if (!isValid) throw new ForbiddenException();\
  // Rotate tokens, hash and store new one\
  return this.getTokens(user.id);\
}\
```\
\
**Revocation**: store bcrypt hash of refresh token; on logout set to null. Pitfall: never store plain refresh token in DB.
