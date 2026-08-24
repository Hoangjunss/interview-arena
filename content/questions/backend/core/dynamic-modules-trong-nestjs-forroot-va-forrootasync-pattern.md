---
id: dynamic-modules-trong-nestjs-forroot-va-forrootasync-pattern
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic Modules trong NestJS — forRoot và forRootAsync pattern?

## Question (EN)
Dynamic Modules in NestJS — forRoot and forRootAsync patterns?

## Đáp án chi tiết (VI)
Dynamic modules cho phép configure module lúc runtime với tham số — khác static modules cấu hình cứng trong code.\
\
`forRoot(options)` là synchronous factory nhận options và trả về `DynamicModule`. `forRootAsync(options)` hỗ trợ async config như đọc từ `ConfigService`:\
\
```typescript\
// Cách implement forRootAsync trong custom module\
static forRootAsync(options: AsyncOptions): DynamicModule {\
  return {\
    module: DatabaseModule,\
    imports: options.imports || [],\
    providers: [\
      {\
        provide: DATABASE_OPTIONS,\
        useFactory: options.useFactory,\
        inject: options.inject || [],\
      },\
      DatabaseService,\
    ],\
    exports: [DatabaseService],\
  };\
}\
```\
\
Dùng trong AppModule:\
```typescript\
DatabaseModule.forRootAsync({\
  imports: [ConfigModule],\
  useFactory: (config: ConfigService) =\u003e ({\
    url: config.get('DATABASE_URL'),\
  }),\
  inject: [ConfigService],\
})\
```\
\
Pattern này dùng trong `TypeOrmModule.forRootAsync()`, `JwtModule.registerAsync()`, `CacheModule.registerAsync()`.

## Detailed Answer (EN)
Dynamic modules allow runtime configuration — unlike static modules with hardcoded config.\
\
`forRoot(options)` is a synchronous factory returning a `DynamicModule`. `forRootAsync(options)` supports async config like reading from `ConfigService`:\
\
```typescript\
static forRootAsync(options: AsyncOptions): DynamicModule {\
  return {\
    module: DatabaseModule,\
    imports: options.imports || [],\
    providers: [\
      { provide: DATABASE_OPTIONS, useFactory: options.useFactory, inject: options.inject || [] },\
      DatabaseService,\
    ],\
    exports: [DatabaseService],\
  };\
}\
```\
\
Used in `TypeOrmModule.forRootAsync()`, `JwtModule.registerAsync()`, `CacheModule.registerAsync()`.
