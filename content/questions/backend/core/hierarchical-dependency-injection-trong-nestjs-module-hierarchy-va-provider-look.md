---
id: hierarchical-dependency-injection-trong-nestjs-module-hierarchy-va-provider-look
position: backend
technology: core
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hierarchical Dependency Injection trong NestJS — module hierarchy và provider lookup?

## Question (EN)
Hierarchical Dependency Injection in NestJS — module hierarchy and provider lookup?

## Đáp án chi tiết (VI)
NestJS DI container theo hierarchy: Global providers (APP_GUARD, APP_PIPE...) → Module providers → Controller providers. Khi inject một dependency, NestJS tìm trong:\
1. Module hiện tại\
2. Imported modules (providers được export)\
3. Global modules\
\
**Global providers** khai báo qua `@Global()` module hoặc `useGlobal*()` — available khắp nơi không cần import.\
\
**Module-scoped providers** chỉ visible trong module đó và các module import nó. Phải export provider mới có thể dùng ngoài module.\
\
**Shared Module pattern**: tạo `SharedModule` export các providers dùng chung (PrismaService, ConfigService), import vào các feature modules cần dùng. Tốt hơn `@Global()` vì dependency explicit.\
\
Lưu ý: circular module imports (`ModuleA` imports `ModuleB` và ngược lại) — giải quyết bằng `forwardRef(() =\u003e ModuleB)` trong `imports` array.

## Detailed Answer (EN)
NestJS DI container follows a hierarchy: Global providers → Module providers → Controller providers. When injecting a dependency, NestJS looks in: (1) current module, (2) imported modules (exported providers), (3) global modules.\
\
**Global providers** via `@Global()` module or `useGlobal*()` — available everywhere without importing.\
\
**Module-scoped providers** only visible within that module and modules that import it. Must export to use outside.\
\
**Shared Module pattern**: create `SharedModule` exporting commonly used providers (PrismaService), import in feature modules. Better than `@Global()` for explicit dependencies.\
\
Pitfall: circular module imports (`ModuleA` imports `ModuleB` and vice versa) — resolve with `forwardRef(() =\u003e ModuleB)`.
