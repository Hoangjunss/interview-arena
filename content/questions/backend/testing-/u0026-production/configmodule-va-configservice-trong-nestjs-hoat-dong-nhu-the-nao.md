---
id: configmodule-va-configservice-trong-nestjs-hoat-dong-nhu-the-nao
position: backend
technology: testing-\u0026-production
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ConfigModule và ConfigService trong NestJS hoạt động như thế nào?

## Question (EN)
How do ConfigModule and ConfigService work in NestJS?

## Đáp án chi tiết (VI)
`@nestjs/config` giúp quản lý environment variables an toàn với type-safety. `ConfigModule.forRoot()` với `isGlobal: true` cho phép inject `ConfigService` ở bất kỳ module nào mà không cần import lại.\
\
Validation schema với Joi: `validationSchema: Joi.object({ PORT: Joi.number().default(3000), JWT_SECRET: Joi.string().min(32).required() })` — app sẽ fail ngay khi start nếu env vars thiếu hoặc sai format.\
\
Namespaced config với `registerAs('database', () =\u003e ({ host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT) }))` cho phép nhóm config và inject type-safe qua `@Inject(databaseConfig.KEY) private dbConfig: ConfigType\u003ctypeof databaseConfig\u003e`. `ConfigService.get\u003cstring\u003e('KEY')` dùng khi không cần namespace, `ConfigService.get\u003cstring\u003e('database.host')` với dot notation cho nested config.

## Detailed Answer (EN)
`@nestjs/config` helps manage environment variables safely with type-safety. `ConfigModule.forRoot()` with `isGlobal: true` allows injecting `ConfigService` in any module without re-importing.\
\
Validation schema with Joi: `validationSchema: Joi.object({ PORT: Joi.number().default(3000), JWT_SECRET: Joi.string().min(32).required() })` — the app fails immediately on startup if env vars are missing or malformed.\
\
Namespaced config with `registerAs('database', () =\u003e ({ host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT) }))` groups config and allows type-safe injection via `@Inject(databaseConfig.KEY) private dbConfig: ConfigType\u003ctypeof databaseConfig\u003e`. Use `ConfigService.get\u003cstring\u003e('KEY')` without namespace, or `ConfigService.get\u003cstring\u003e('database.host')` with dot notation for nested config.
