---
id: provider-va-dependency-injection-trong-nestjs-hoat-dong-nhu-the-nao
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Provider và Dependency Injection trong NestJS hoạt động như thế nào?

## Question (EN)
How do Providers and Dependency Injection work in NestJS?

## Đáp án chi tiết (VI)
Provider là bất kỳ class nào được annotate với `@Injectable()` — services, repositories, factories, helpers. NestJS quản lý vòng đời và inject chúng tự động thông qua constructor injection.\
\
Cách hoạt động: khai báo provider trong `providers` array của module, NestJS IoC container tạo instance và inject vào các class phụ thuộc qua constructor. Reflector đọc TypeScript metadata để biết type cần inject.\
\
Scope của providers: `DEFAULT` (Singleton) — một instance cho toàn app, `REQUEST` — instance mới cho mỗi request, `TRANSIENT` — instance mới mỗi lần inject. Custom providers cho phép linh hoạt hơn: `useValue` để inject giá trị cụ thể, `useFactory` để tạo provider với logic phức tạp, `useClass` để swap implementation.

## Detailed Answer (EN)
A Provider is any class annotated with `@Injectable()` — services, repositories, factories, helpers. NestJS manages their lifecycle and injects them automatically via constructor injection.\
\
How it works: declare providers in the module's `providers` array, the NestJS IoC container creates instances and injects them into dependent classes via constructors. The Reflector reads TypeScript metadata to know which types to inject.\
\
Provider scopes: `DEFAULT` (Singleton) — one instance for the whole app, `REQUEST` — new instance per request, `TRANSIENT` — new instance each time injected. Custom providers offer flexibility: `useValue` to inject a specific value, `useFactory` to create a provider with complex logic, `useClass` to swap implementations.
