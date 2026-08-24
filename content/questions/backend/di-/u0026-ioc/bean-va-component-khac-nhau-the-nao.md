---
id: bean-va-component-khac-nhau-the-nao
position: backend
technology: di-\u0026-ioc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Bean và @Component khác nhau thế nào?

## Question (EN)
What is the difference between @Bean and @Component?

## Đáp án chi tiết (VI)
| | **`@Component`** | **`@Bean`** |\
|---|---|---|\
| Đặt ở | Class | Method trong `@Configuration` |\
| Tạo bean | Spring `new` qua default constructor | Method return object |\
| Kiểm soát init | Hạn chế | **Linh hoạt** — logic tuỳ ý |\
| Discovery | Component scan | Khai báo tường minh |\
\
**Dùng `@Bean`** (method trong `@Configuration` return object) cho: class thư viện ngoài không gắn `@Component` được (vd `RestTemplate`, `ObjectMapper`), init phức tạp/cần cấu hình (timeout, builder), conditional bean (`@ConditionalOnProperty`), cần nhiều instance khác nhau của cùng class.\
\
**Dùng `@Component`** (và các biến thể `@Service`/`@Repository`/`@Controller`) cho class trong app của bạn, init đơn giản.\
\
Cả 2 mặc định **singleton scope**.

## Detailed Answer (EN)
| | **`@Component`** | **`@Bean`** |\
|---|---|---|\
| Placed on | Class | Method in a `@Configuration` |\
| Bean created | Spring `new`s it via default constructor | The method returns the object |\
| Init control | Limited | **Flexible** — arbitrary logic |\
| Discovery | Component scan | Explicit declaration |\
\
**Use `@Bean`** (a method in a `@Configuration` returning the object) for: third-party classes you cannot annotate with `@Component` (e.g. `RestTemplate`, `ObjectMapper`), complex/configurable init (timeouts, builders), conditional beans (`@ConditionalOnProperty`), multiple distinct instances of one class.\
\
**Use `@Component`** (and its variants `@Service`/`@Repository`/`@Controller`) for your own classes with simple init.\
\
Both default to **singleton scope**.
