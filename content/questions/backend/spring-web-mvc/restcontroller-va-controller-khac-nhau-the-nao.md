---
id: restcontroller-va-controller-khac-nhau-the-nao
position: backend
technology: spring-web-mvc
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@RestController và @Controller khác nhau thế nào?

## Question (EN)
How do @RestController and @Controller differ?

## Đáp án chi tiết (VI)
| | **`@Controller`** | **`@RestController`** |\
|---|---|---|\
| Trả về | View name (template) | **Data trực tiếp** (JSON/XML) |\
| Dùng cho | Web MVC (Thymeleaf, JSP) | REST API |\
\
`@RestController` = `@Controller` + `@ResponseBody`.\
\
- `@Controller` method trả **view name** — `return \\"home\\"` → ViewResolver tìm template `templates/home.html` render thành HTML.\
- `@RestController` trả **object** — `@ResponseBody` bảo Spring bỏ qua view resolution, dùng Jackson serialize object thẳng thành JSON vào response body.\
\
Cần trả JSON từ 1 method lẻ trong `@Controller` → gắn `@ResponseBody` trên method đó.

## Detailed Answer (EN)
| | **`@Controller`** | **`@RestController`** |\
|---|---|---|\
| Returns | View name (template) | **Data directly** (JSON/XML) |\
| Use case | Web MVC (Thymeleaf, JSP) | REST API |\
\
`@RestController` = `@Controller` + `@ResponseBody`.\
\
- A `@Controller` method returns a **view name** — `return \\"home\\"` → the ViewResolver finds `templates/home.html` and renders HTML.\
- A `@RestController` returns an **object** — `@ResponseBody` tells Spring to skip view resolution and let Jackson serialise the object straight into the response body as JSON.\
\
Need JSON from a single method inside a `@Controller` → annotate that method with `@ResponseBody`.
