---
id: provider-scopes-trong-nestjs-default-request-transient-khac-nhau-gi
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider scopes trong NestJS: DEFAULT, REQUEST, TRANSIENT — khác nhau gì?

## Question (EN)
Provider scopes in NestJS: DEFAULT, REQUEST, TRANSIENT — what are the differences?

## Đáp án chi tiết (VI)
NestJS có 3 provider scopes kiểm soát vòng đời instance:\
\
**DEFAULT (Singleton)**: một instance dùng cho toàn app — đây là default và phổ biến nhất. Phù hợp cho stateless services như `DatabaseService`, `ConfigService`.\
\
**REQUEST**: tạo instance mới cho mỗi incoming request, bị destroy sau khi response xong. Dùng khi service cần lưu request-specific data (tenant context, request ID, user info). Nhược điểm: tốn memory hơn và các dependencies của nó cũng bị kéo thành REQUEST scope.\
\
**TRANSIENT**: tạo instance mới mỗi lần được inject — không share giữa các consumers. Dùng khi cần isolated state mỗi lần dùng.\
\
**Scope injection chain**: nếu SERVICE_A (REQUEST scope) được inject vào SERVICE_B, SERVICE_B cũng tự động trở thành REQUEST scope. Lưu ý: dùng REQUEST scope tràn lan làm giảm performance đáng kể — chỉ dùng khi thực sự cần.

## Detailed Answer (EN)
NestJS has 3 provider scopes controlling instance lifecycle:\
\
**DEFAULT (Singleton)**: one instance for the entire app — the default and most common. Best for stateless services like `DatabaseService`, `ConfigService`.\
\
**REQUEST**: new instance per incoming request, destroyed after response. Use when service needs request-specific data (tenant context, request ID, user info). Downside: higher memory use and all dependencies are pulled into REQUEST scope too.\
\
**TRANSIENT**: new instance each time injected — not shared between consumers. Use for isolated state per injection.\
\
**Scope injection chain**: if SERVICE_A (REQUEST scope) is injected into SERVICE_B, SERVICE_B also becomes REQUEST scope automatically. Pitfall: overusing REQUEST scope significantly reduces performance — only use when genuinely needed.
