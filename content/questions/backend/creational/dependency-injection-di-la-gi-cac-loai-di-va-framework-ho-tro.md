---
id: dependency-injection-di-la-gi-cac-loai-di-va-framework-ho-tro
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency Injection (DI) là gì? Các loại DI và framework hỗ trợ?

## Question (EN)
What is Dependency Injection (DI)? What are the types of DI and what frameworks support it?

## Đáp án chi tiết (VI)
DI là technique mà object nhận dependencies từ bên ngoài thay vì tự tạo — là cơ chế triển khai DIP. Ba loại DI:\
```typescript\
// (1) Constructor Injection (phổ biến nhất)\
class UserService {\
  constructor(private userRepo: UserRepository) {}\
}\
\
// (2) Setter/Property Injection (cho optional dependency)\
class UserService {\
  setRepository(repo: UserRepository) { this.repo = repo }\
}\
\
// (3) Method Injection (chỉ cần cho một operation)\
class UserService {\
  getUser(id: string, repo: UserRepository) { return repo.find(id) }\
}\
```\
Framework DI: NestJS dùng IoC container với decorators `@Injectable()`, `@Inject()` — tự động resolve dependency tree. Trong Go không có framework DI phổ biến, thường dùng manual DI qua `wire` (Google) hoặc constructor functions. \
\
**Lợi ích:** loose coupling, dễ test (inject mock), dễ swap implementation. Anti-pattern: Service Locator (class tự gọi `container.get('UserRepo')`) — tạo hidden dependency.

## Detailed Answer (EN)
$83
