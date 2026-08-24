---
id: scheduled-va-enablescheduling-dung-de-lam-gi
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Scheduled và @EnableScheduling dùng để làm gì?

## Question (EN)
What are @Scheduled and @EnableScheduling used for?

## Đáp án chi tiết (VI)
`@Scheduled` chạy method theo lịch định kỳ — cron job, background task. Bật bằng `@EnableScheduling` trên class config.\
\
```java\
@Scheduled(fixedRate = 300_000)                                    // mỗi 5 phút (tính từ lúc BẮT ĐẦU lần trước)\
void syncExchangeRate() { ... }\
\
@Scheduled(fixedDelay = 30_000)                                    // 30s sau khi lần trước CHẠY XONG\
void cleanupTempFiles() { ... }\
\
@Scheduled(cron = \\"0 0 8 * * MON-FRI\\

## Detailed Answer (EN)
`@Scheduled` runs methods on a recurring schedule — cron jobs, background tasks. Enable with `@EnableScheduling` on a config class.\
\
```java\
@Scheduled(fixedRate = 300_000)                                    // every 5 min (measured from previous START)\
void syncExchangeRate() { ... }\
\
@Scheduled(fixedDelay = 30_000)                                    // 30s after the previous run FINISHES\
void cleanupTempFiles() { ... }\
\
@Scheduled(cron = \\"0 0 8 * * MON-FRI\\
