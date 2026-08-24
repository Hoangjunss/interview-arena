---
id: quiz-spring-boot-springbootapplication-la-meta-annotation-gop-ba-annotation-nao
position: backend
technology: spring-boot
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@SpringBootApplication là meta-annotation gộp ba annotation nào?

## Đáp án trắc nghiệm
- [ ] @Configuration + @EnableWebMvc + @ComponentScan
- [ ] @Bean + @ComponentScan + @EnableScheduling
- [ ] @Component + @EnableAutoConfiguration + @RestController + @Bean
- [x] @Configuration + @EnableAutoConfiguration + @ComponentScan

## Giải thích (VI)
@SpringBootApplication gộp ba annotation: @Configuration (class là nguồn định nghĩa bean), @EnableAutoConfiguration (bật auto-configuration theo classpath), và @ComponentScan (quét component từ package hiện tại trở xuống). Vì vậy nên đặt class main ở package gốc để @ComponentScan quét được toàn bộ sub-package.

### Giải thích các phương án:
- **@Configuration + @EnableWebMvc + @ComponentScan** (Sai): Sai: @SpringBootApplication dùng @EnableAutoConfiguration, không phải @EnableWebMvc (cái này còn tắt một phần auto-config của MVC).
- **@Bean + @ComponentScan + @EnableScheduling** (Sai): Sai: @Bean đánh dấu method tạo bean và @EnableScheduling bật lập lịch — cả hai không thuộc @SpringBootApplication.
- **@Component + @EnableAutoConfiguration + @RestController + @Bean** (Sai): Sai: @Component và @RestController là stereotype cho class riêng lẻ, không nằm trong @SpringBootApplication.
- **@Configuration + @EnableAutoConfiguration + @ComponentScan** (Đúng): Đúng: đây chính là ba annotation @SpringBootApplication gộp lại — nguồn bean, bật auto-config, và quét component.
