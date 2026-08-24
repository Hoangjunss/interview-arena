---
id: singleton-pattern-la-gi-van-de-cua-no-trong-moi-truong-hien-dai
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Singleton pattern là gì? Vấn đề của nó trong môi trường hiện đại?

## Question (EN)
What is the Singleton pattern? What problems does it cause in modern environments?

## Đáp án chi tiết (VI)
Singleton đảm bảo một class chỉ có duy nhất một instance và cung cấp global access point đến instance đó. Triển khai TypeScript:\
```typescript\
class DatabaseConnection {\
  private static instance: DatabaseConnection\
  private constructor() {}\
  static getInstance() {\
    if (!this.instance) this.instance = new DatabaseConnection()\
    return this.instance\
  }\
}\
```\
Vấn đề: (1) khó unit test vì global state — mock singleton phức tạp; (2) trong Node.js multi-worker hoặc serverless, mỗi worker/function instance có Singleton riêng, không đảm bảo 'single' instance toàn hệ thống; (3) vi phạm SRP và DIP khi class tự quản lý lifecycle của mình; (4) hidden dependency — code dùng `Database.getInstance()` thay vì inject rõ ràng. Thay thế tốt hơn: dùng DI container (NestJS, InversifyJS) quản lý scope của dependency. Singleton hợp lý cho: logger, config manager trong môi trường single-process.

## Detailed Answer (EN)
Singleton ensures a class has only one instance and provides a global access point to it. TypeScript implementation:\
```typescript\
class DatabaseConnection {\
  private static instance: DatabaseConnection\
  private constructor() {}\
  static getInstance() {\
    if (!this.instance) this.instance = new DatabaseConnection()\
    return this.instance\
  }\
}\
```\
Problems: (1) hard to unit test due to global state — mocking a singleton is complex; (2) in Node.js multi-worker or serverless environments, each worker/function has its own Singleton instance, so 'single instance' across the whole system isn't guaranteed; (3) violates SRP and DIP when a class manages its own lifecycle; (4) hidden dependency — code calls `Database.getInstance()` instead of receiving it via injection. Better alternative: use a DI container (NestJS, InversifyJS) to manage dependency scope. Singleton is reasonable for loggers and config managers in single-process environments.
