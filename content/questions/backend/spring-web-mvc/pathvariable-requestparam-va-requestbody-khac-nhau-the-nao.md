---
id: pathvariable-requestparam-va-requestbody-khac-nhau-the-nao
position: backend
technology: spring-web-mvc
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@PathVariable, @RequestParam và @RequestBody khác nhau thế nào?

## Question (EN)
How do @PathVariable, @RequestParam, and @RequestBody differ?

## Đáp án chi tiết (VI)
| Annotation | Lấy từ | Ví dụ |\
|---|---|---|\
| `@PathVariable` | URI path segment | `GET /users/42` |\
| `@RequestParam` | Query string | `GET /users?page=2\u0026size=10` |\
| `@RequestBody` | Request body (JSON) | `POST /users` |\
\
- **`@PathVariable`** — resource identifier (ID, slug) trong path, bắt buộc: `@GetMapping(\\"/users/{id}\\")` + `@PathVariable Long id`.\
- **`@RequestParam`** — filter/paging/sort từ query string, optional và có default: `@RequestParam(defaultValue = \\"0\\") int page`.\
- **`@RequestBody`** — payload phức tạp khi create/update: Jackson deserialize JSON body → Java object, thường kèm `@Valid` để validate.\
\
Kết hợp được trong cùng method: path cho ID, query cho option, body cho data.

## Detailed Answer (EN)
| Annotation | Source | Example |\
|---|---|---|\
| `@PathVariable` | URI path segment | `GET /users/42` |\
| `@RequestParam` | Query string | `GET /users?page=2\u0026size=10` |\
| `@RequestBody` | Request body (JSON) | `POST /users` |\
\
- **`@PathVariable`** — resource identifier (ID, slug) in the path, required: `@GetMapping(\\"/users/{id}\\")` + `@PathVariable Long id`.\
- **`@RequestParam`** — filter/paging/sort from the query string, optional with defaults: `@RequestParam(defaultValue = \\"0\\") int page`.\
- **`@RequestBody`** — complex payload for create/update: Jackson deserialises the JSON body → Java object, usually with `@Valid` for validation.\
\
They combine in one method: path for the ID, query for options, body for data.
