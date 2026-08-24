---
id: spring-framework-va-spring-boot-khac-nhau-the-nao
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Framework và Spring Boot khác nhau thế nào?

## Question (EN)
How do Spring Framework and Spring Boot differ?

## Đáp án chi tiết (VI)
Spring Boot **không thay thế** Spring Framework — nó là lớp tiện ích **xây trên** Spring để bỏ cấu hình thủ công.\
\
| | **Spring Framework** | **Spring Boot** |\
|---|---|---|\
| Vai trò | Nền tảng cốt lõi (IoC, DI, AOP, MVC) | Lớp tiện ích trên Spring |\
| Cấu hình | Thủ công (XML / nhiều Java config) | Auto-configuration |\
| Dependency | Tự khai từng cái + lo version | Starter gom sẵn, version tương thích |\
| Server | Deploy `.war` vào Tomcat ngoài | Embedded server (`java -jar`) |\
| Khởi tạo | Tự setup | Spring Initializr trong vài phút |\
\
**Quan hệ:** mọi tính năng Spring Boot đều là Spring Framework bên dưới (`@Autowired`, `@Transactional`, Spring MVC...). Spring Boot chỉ thêm auto-config + starter + embedded server.\
\
**Trả lời ngắn khi phỏng vấn:** \\"Spring Framework cung cấp IoC/DI và module cốt lõi nhưng cần nhiều cấu hình; Spring Boot xây trên Spring, dùng convention-over-configuration để chạy ngay với cấu hình tối thiểu.\\"

## Detailed Answer (EN)
Spring Boot **does not replace** Spring Framework — it is a convenience layer **built on top of** Spring that removes manual configuration.\
\
| | **Spring Framework** | **Spring Boot** |\
|---|---|---|\
| Role | Core platform (IoC, DI, AOP, MVC) | Convenience layer on Spring |\
| Configuration | Manual (XML / lots of Java config) | Auto-configuration |\
| Dependencies | Declare each + manage versions | Starters bundle them at compatible versions |\
| Server | Deploy a `.war` to external Tomcat | Embedded server (`java -jar`) |\
| Setup | Manual | Spring Initializr in minutes |\
\
**Relationship:** every Spring Boot feature is Spring Framework underneath (`@Autowired`, `@Transactional`, Spring MVC...). Spring Boot only adds auto-config + starters + an embedded server.\
\
**Concise interview answer:** \\"Spring Framework provides IoC/DI and the core modules but needs a lot of configuration; Spring Boot builds on Spring and uses convention-over-configuration so the app runs with minimal setup.\\"
