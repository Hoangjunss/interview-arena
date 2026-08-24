---
id: app-nestjs-bao-nest-can-t-resolve-dependencies-of-the-orderservice-nguyen-nhan-v
position: backend
technology: modules-\u0026-di
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
App NestJS báo `Nest can't resolve dependencies of the OrderService (?)` — nguyên nhân và cách đọc thông báo lỗi này?

## Question (EN)
A NestJS app fails with `Nest can't resolve dependencies of the OrderService (?)` — what causes it and how do you read that message?

## Đáp án chi tiết (VI)
NestJS **không có registry provider toàn cục**: mỗi module là một phạm vi DI riêng. Muốn `OrderService` (ở `OrderModule`) inject được `UserService` (ở `UserModule`) thì phải đủ **hai vế**:\
\
1. `UserModule` **export** `UserService`.\
2. `OrderModule` **import** `UserModule`.\
\
```ts\
@Module({ providers: [UserService], exports: [UserService] })\
export class UserModule {}\
\
@Module({ imports: [UserModule], providers: [OrderService] })\
export class OrderModule {}\
```\
\
**Đọc thông báo lỗi:** dấu `?` cho biết Nest không xác định được kiểu ở vị trí tham số đó; con số trong `at index [1]` là **vị trí tham số constructor** bị thiếu; phần cuối cho biết Nest đang tìm trong **context module nào**.\
\
Ba nguyên nhân hay gặp ngoài việc quên `exports`: thiếu `@Injectable()` trên class provider; inject theo interface (interface không tồn tại lúc runtime, phải dùng token); và circular import giữa hai module.

## Detailed Answer (EN)
NestJS has **no global provider registry**: each module is its own DI scope. For `OrderService` (in `OrderModule`) to inject `UserService` (in `UserModule`), **both** must hold:\
\
1. `UserModule` **exports** `UserService`.\
2. `OrderModule` **imports** `UserModule`.\
\
```ts\
@Module({ providers: [UserService], exports: [UserService] })\
export class UserModule {}\
\
@Module({ imports: [UserModule], providers: [OrderService] })\
export class OrderModule {}\
```\
\
**Reading the message:** the `?` means Nest could not determine the type at that position; the number in `at index [1]` is the **constructor parameter position** that failed; the tail tells you **which module context** Nest searched.\
\
Besides a missing `exports`, three frequent causes: no `@Injectable()` on the provider class; injecting by interface (interfaces do not exist at runtime — you need a token); and a circular import between two modules.
