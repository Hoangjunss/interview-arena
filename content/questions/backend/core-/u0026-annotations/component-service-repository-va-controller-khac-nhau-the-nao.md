---
id: component-service-repository-va-controller-khac-nhau-the-nao
position: backend
technology: core-\u0026-annotations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@Component, @Service, @Repository và @Controller khác nhau thế nào?

## Question (EN)
How do @Component, @Service, @Repository, and @Controller differ?

## Đáp án chi tiết (VI)
Tất cả là chuyên biệt hóa của `@Component` → đều được component scan và tạo bean. Khác nhau ở **ngữ nghĩa tầng** + **tính năng thêm**:\
\
| Annotation | Tầng | Tính năng thêm |\
|---|---|---|\
| `@Component` | Generic | Không |\
| `@Service` | Business logic | Không |\
| `@Repository` | Data access (DAO) | Có — Exception translation |\
| `@Controller` | Web (trả view) | Có — Spring MVC handler |\
| `@RestController` | Web (REST API) | Có — `@ResponseBody` mặc định |\
\
**Exception translation của `@Repository`:** Spring tự convert exception DB (`SQLException`, `HibernateException`...) → `DataAccessException` (unchecked, đồng nhất) — caller không cần biết DB backend là gì.\
\
**Best practice:** dùng đúng annotation theo tầng — code tự nói lên kiến trúc (đọc `@Service` biết ngay là business logic) + hưởng tính năng tương ứng. Đừng dùng `@Component` cho mọi thứ.

## Detailed Answer (EN)
All are specialisations of `@Component` → all are component-scanned and created as beans. They differ in **layer semantics** + **extra features**:\
\
| Annotation | Layer | Extra feature |\
|---|---|---|\
| `@Component` | Generic | None |\
| `@Service` | Business logic | None |\
| `@Repository` | Data access (DAO) | Yes — Exception translation |\
| `@Controller` | Web (returns view) | Yes — Spring MVC handler |\
| `@RestController` | Web (REST API) | Yes — `@ResponseBody` by default |\
\
**`@Repository` exception translation:** Spring converts DB exceptions (`SQLException`, `HibernateException`…) → `DataAccessException` (unchecked, uniform) — callers need not know which DB backend is used.\
\
**Best practice:** use the annotation matching the layer — the code documents the architecture (seeing `@Service` instantly signals business logic) + you get the matching features. Do not use `@Component` for everything.
