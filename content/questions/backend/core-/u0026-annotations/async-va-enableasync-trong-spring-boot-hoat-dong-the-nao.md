---
id: async-va-enableasync-trong-spring-boot-hoat-dong-the-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Async và @EnableAsync trong Spring Boot hoạt động thế nào?

## Question (EN)
How do @Async and @EnableAsync work in Spring Boot?

## Đáp án chi tiết (VI)
`@Async` chạy method trong **thread pool riêng** — non-blocking từ phía caller.\
\
```java\
@SpringBootApplication @EnableAsync\
class App {}\
\
@Service\
class EmailService {\
  @Async\
  public CompletableFuture\u003cVoid\u003e sendWelcome(String email) {\
    mailSender.send(email);\
    return CompletableFuture.completedFuture(null);\
  }\
}\
// caller: emailService.sendWelcome(email);  // fire-and-forget, return ngay\
```\
\
**Thread pool config (quan trọng):**\
```java\
@Bean TaskExecutor taskExecutor() {\
  var exec = new ThreadPoolTaskExecutor();\
  exec.setCorePoolSize(5); exec.setMaxPoolSize(20); exec.setQueueCapacity(100);\
  exec.initialize(); return exec;\
}\
```\
\
**Không có custom executor:** Spring dùng `SimpleAsyncTaskExecutor` (tạo thread mới mỗi task, không pool → OOM khi tải cao). **Lưu ý — giống @Transactional:** `this.method()` bypass proxy → không async; gọi qua bean khác.

## Detailed Answer (EN)
`@Async` runs a method on a **separate thread pool** — non-blocking from the caller's perspective.\
\
```java\
@SpringBootApplication @EnableAsync\
class App {}\
\
@Service\
class EmailService {\
  @Async\
  public CompletableFuture\u003cVoid\u003e sendWelcome(String email) {\
    mailSender.send(email);\
    return CompletableFuture.completedFuture(null);\
  }\
}\
// caller: emailService.sendWelcome(email);  // fire-and-forget, returns immediately\
```\
\
**Thread pool config (important):**\
```java\
@Bean TaskExecutor taskExecutor() {\
  var exec = new ThreadPoolTaskExecutor();\
  exec.setCorePoolSize(5); exec.setMaxPoolSize(20); exec.setQueueCapacity(100);\
  exec.initialize(); return exec;\
}\
```\
\
**Without a custom executor:** Spring uses `SimpleAsyncTaskExecutor` (new thread per task, no pooling → OOM under high load). **Same gotcha as @Transactional:** `this.method()` bypasses the proxy → not async; call through another bean.
