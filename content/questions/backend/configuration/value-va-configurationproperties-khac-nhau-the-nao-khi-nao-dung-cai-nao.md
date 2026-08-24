---
id: value-va-configurationproperties-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Value và @ConfigurationProperties khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do @Value and @ConfigurationProperties differ? When should you use each?

## Đáp án chi tiết (VI)
| | **`@Value`** | **`@ConfigurationProperties`** |\
|---|---|---|\
| Binding | 1 property | Nhóm property vào class |\
| Type-safe | Hạn chế (SpEL) | Có — Full type conversion |\
| Validation | Không | Có — `@Validated` + Bean Validation |\
| IDE support | Kém | Có — autocomplete, navigation |\
\
```java\
@Value(\\"${server.port:8080}\\") int port;                    // 1 property\
\
@ConfigurationProperties(prefix = \\"app.mail\\") @Validated    // nhóm property (RECOMMENDED)\
public record MailProps(@NotBlank String host, @Min(1) @Max(65535) int port, boolean ssl) {}\
// bật scan: @ConfigurationPropertiesScan trên class @SpringBootApplication\
```\
\
**`@Value`:** 1 property đơn lẻ, SpEL phức tạp. **`@ConfigurationProperties`:** config có cấu trúc (≥3 key liên quan), cần validation, viết test.

## Detailed Answer (EN)
| | **`@Value`** | **`@ConfigurationProperties`** |\
|---|---|---|\
| Binding | Single property | Group of properties in a class |\
| Type-safe | Limited (SpEL) | Yes — Full type conversion |\
| Validation | No | Yes — `@Validated` + Bean Validation |\
| IDE support | Poor | Yes — autocomplete, navigation |\
\
```java\
@Value(\\"${server.port:8080}\\") int port;                    // single property\
\
@ConfigurationProperties(prefix = \\"app.mail\\") @Validated    // grouped (RECOMMENDED)\
public record MailProps(@NotBlank String host, @Min(1) @Max(65535) int port, boolean ssl) {}\
// enable scanning: @ConfigurationPropertiesScan on the @SpringBootApplication class\
```\
\
**`@Value`:** a single property, complex SpEL. **`@ConfigurationProperties`:** structured config (3+ related keys), validation needed, tests.
