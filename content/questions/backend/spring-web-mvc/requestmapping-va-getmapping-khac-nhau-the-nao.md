---
id: requestmapping-va-getmapping-khac-nhau-the-nao
position: backend
technology: spring-web-mvc
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@RequestMapping và @GetMapping khác nhau thế nào?

## Question (EN)
How do @RequestMapping and @GetMapping differ?

## Đáp án chi tiết (VI)
`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping` là **shortcut** (composed annotation) của `@RequestMapping(method = ...)`, có từ Spring 4.3:\
\
- `@GetMapping(\\"/users\\")` = `@RequestMapping(value = \\"/users\\

## Detailed Answer (EN)
`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping` are **shortcuts** (composed annotations) for `@RequestMapping(method = ...)`, available since Spring 4.3:\
\
- `@GetMapping(\\"/users\\")` = `@RequestMapping(value = \\"/users\\
