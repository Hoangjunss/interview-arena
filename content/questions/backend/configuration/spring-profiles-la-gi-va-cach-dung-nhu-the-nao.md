---
id: spring-profiles-la-gi-va-cach-dung-nhu-the-nao
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Profiles là gì và cách dùng như thế nào?

## Question (EN)
What are Spring Profiles and how do you use them?

## Đáp án chi tiết (VI)
**Profiles** cho phép config khác nhau theo môi trường (dev/staging/prod) — deploy **1 JAR** cho tất cả.\
\
**File config:** `application.yml` (base) + `application-{dev,prod}.yml` (merge/override khi profile active). Activate: `SPRING_PROFILES_ACTIVE=prod java -jar app.jar`.\
\
**Bean theo profile:** gắn `@Profile(\\"dev\\")` / `@Profile(\\"prod\\")` trên class bean → bean chỉ tồn tại ở env tương ứng (vd `MockMailSender` cho dev, `SmtpMailSender` cho prod). `@Profile(\\"!prod\\")` = mọi env trừ prod.\
\
**Profile groups** (Boot 2.4+): `spring.profiles.group.production: prod, monitoring, security` — activate 1 group bật cả cụm.\
\
**Lưu ý:** secret không để trong `application-prod.yml` trong repo → dùng env var hoặc secret manager.

## Detailed Answer (EN)
**Profiles** allow different configuration per environment (dev/staging/prod) — deploy **one JAR** everywhere.\
\
**Config files:** `application.yml` (base) + `application-{dev,prod}.yml` (merged/overriding when the profile is active). Activate: `SPRING_PROFILES_ACTIVE=prod java -jar app.jar`.\
\
**Profile-specific beans:** annotate bean classes with `@Profile(\\"dev\\")` / `@Profile(\\"prod\\")` → the bean exists only in that env (e.g. `MockMailSender` for dev, `SmtpMailSender` for prod). `@Profile(\\"!prod\\")` = every env except prod.\
\
**Profile groups** (Boot 2.4+): `spring.profiles.group.production: prod, monitoring, security` — activating one group enables the whole set.\
\
**Note:** secrets do not belong in `application-prod.yml` in the repo → use env vars or a secret manager.
