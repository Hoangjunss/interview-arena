---
id: springbootapplication-la-gi-gom-nhung-annotation-nao
position: backend
technology: core-\u0026-annotations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@SpringBootApplication là gì? Gồm những annotation nào?

## Question (EN)
What is @SpringBootApplication? Which annotations does it combine?

## Đáp án chi tiết (VI)
`@SpringBootApplication` là **meta-annotation** gộp 3 annotation hay dùng nhất:\
\
| Annotation | Tác dụng |\
|---|---|\
| `@Configuration` | Class là nguồn bean definition |\
| `@EnableAutoConfiguration` | Bật auto-configuration |\
| `@ComponentScan` | Scan component từ package hiện tại trở xuống |\
\
**Dùng:** đặt trên class main (chạy `SpringApplication.run(App.class, args)`) ở **root package** để `@ComponentScan` quét hết sub-package — đặt sai package → bean không được scan.\
\
**Tuỳ chỉnh:** loại auto-config cụ thể bằng `@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)`; đổi phạm vi scan bằng `scanBasePackages`.

## Detailed Answer (EN)
`@SpringBootApplication` is a **meta-annotation** combining the three most-used annotations:\
\
| Annotation | Effect |\
|---|---|\
| `@Configuration` | Class is a bean definition source |\
| `@EnableAutoConfiguration` | Enables auto-configuration |\
| `@ComponentScan` | Scans components from the current package downward |\
\
**Usage:** place it on the main class (running `SpringApplication.run(App.class, args)`) at the **root package** so `@ComponentScan` covers all sub-packages — wrong placement → beans not scanned.\
\
**Customisation:** exclude a specific auto-config with `@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)`; change scan scope with `scanBasePackages`.
