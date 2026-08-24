---
id: componentscan-hoat-dong-the-nao-dat-base-packages-ra-sao
position: backend
technology: component-scan
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@ComponentScan hoạt động thế nào, đặt base packages ra sao?

## Question (EN)
How does @ComponentScan work, and how do you set base packages?

## Đáp án chi tiết (VI)
`@ComponentScan` bảo Spring **quét package** tìm class gắn stereotype (`@Component`, `@Service`, `@Repository`, `@Controller`, `@Configuration`) để đăng ký thành bean.\
\
**Base package mặc định:** package **chứa chính class khai báo** annotation. Vì `@SpringBootApplication` đã gộp sẵn `@ComponentScan`, Spring quét từ package của lớp `main` **trở xuống** — nên đặt lớp `@SpringBootApplication` ở **package gốc** để mọi thứ nằm dưới nó đều được quét.\
\
Chỉ định thủ công khi cần:\
```java\
@ComponentScan(basePackages = { \\"com.app.web\\

## Detailed Answer (EN)
`@ComponentScan` tells Spring to **scan packages** for classes marked with a stereotype (`@Component`, `@Service`, `@Repository`, `@Controller`, `@Configuration`) and register them as beans.\
\
**Default base package:** the package **containing the class that declares** the annotation. Since `@SpringBootApplication` already bundles `@ComponentScan`, Spring scans from the `main` class's package **downward** — so put the `@SpringBootApplication` class in the **root package** so everything beneath it is scanned.\
\
Specify manually when needed:\
```java\
@ComponentScan(basePackages = { \\"com.app.web\\
