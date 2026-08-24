---
id: autowired-la-gi-va-hoat-dong-the-nao
position: backend
technology: di-\u0026-ioc
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Autowired là gì và hoạt động thế nào?

## Question (EN)
What is @Autowired and how does it work?

## Đáp án chi tiết (VI)
**`@Autowired`** bật tự động inject — Spring resolve và inject bean phù hợp. Đặt được trên constructor, setter, field. **Resolve mặc định by type**; nhiều bean cùng type → ambiguity, fix bằng `@Qualifier(\\"beanName\\")` tại điểm inject hoặc `@Primary` trên bean mặc định. Dependency optional: `@Autowired(required = false)`.\
\
**Quy tắc:**\
- **Nên**: **Constructor injection** — rõ ràng, `final`, dễ test; class có 1 constructor duy nhất thì không cần ghi `@Autowired` (Spring 4.3+).\
- **Không nên**: **Field injection** — ẩn dependency, cần reflection để mock.\
- Setter injection cho dependency optional.\
\
Lombok `@RequiredArgsConstructor` tự sinh constructor cho `final` field — cách viết constructor injection gọn phổ biến.

## Detailed Answer (EN)
**`@Autowired`** enables automatic injection — Spring resolves and injects the matching bean. Works on constructors, setters, fields. **Resolves by type** by default; multiple beans of one type → ambiguity, fixed with `@Qualifier(\\"beanName\\")` at the injection point or `@Primary` on the default bean. Optional dependency: `@Autowired(required = false)`.\
\
**Rules:**\
- **Do**: **Constructor injection** — explicit, `final`, testable; a class with a single constructor needs no `@Autowired` (Spring 4.3+).\
- **Avoid**: **Field injection** — hidden dependencies, reflection needed to mock.\
- Setter injection for optional dependencies.\
\
Lombok's `@RequiredArgsConstructor` generates a constructor for `final` fields — the common concise form of constructor injection.
