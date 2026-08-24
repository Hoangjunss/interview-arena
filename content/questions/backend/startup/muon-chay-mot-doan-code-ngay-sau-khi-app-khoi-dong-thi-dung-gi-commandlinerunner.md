---
id: muon-chay-mot-doan-code-ngay-sau-khi-app-khoi-dong-thi-dung-gi-commandlinerunner
position: backend
technology: startup
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Muốn chạy một đoạn code ngay sau khi app khởi động thì dùng gì? `CommandLineRunner` khác `@PostConstruct` thế nào?

## Question (EN)
How do you run code right after the app starts? How is `CommandLineRunner` different from `@PostConstruct`?

## Đáp án chi tiết (VI)
Dùng **`ApplicationRunner`** hoặc **`CommandLineRunner`**. Cả hai có duy nhất một method `run(...)`, được gọi **ngay trước khi `SpringApplication.run(...)` trả về** — tức là toàn bộ context đã sẵn sàng, web server đã lên.\
\
```java\
@Component\
public class WarmUpRunner implements ApplicationRunner {\
    private final CacheService cacheService;\
\
    public WarmUpRunner(CacheService cacheService) {\
        this.cacheService = cacheService;\
    }\
\
    @Override\
    public void run(ApplicationArguments args) {\
        cacheService.preload();\
    }\
}\
```\
\
**Khác nhau:**\
- `CommandLineRunner` nhận tham số dạng `String...` thô; `ApplicationRunner` nhận `ApplicationArguments` đã parse sẵn option/non-option.\
- Nhiều runner thì thứ tự chạy điều khiển bằng `@Order` hoặc interface `Ordered`.\
- **`@PostConstruct`** chạy sớm hơn nhiều: ngay khi **bean đó** khởi tạo xong, lúc các bean khác có thể chưa sẵn sàng. Vì vậy chỉ nên dùng cho việc khởi tạo nội bộ của chính bean, không dùng để gọi service khác hay đọc DB lúc boot.

## Detailed Answer (EN)
$87
