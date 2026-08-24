---
id: responseentity-trong-spring-mvc-dung-de-lam-gi
position: backend
technology: spring-web-mvc
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ResponseEntity trong Spring MVC dùng để làm gì?

## Question (EN)
What is ResponseEntity used for in Spring MVC?

## Đáp án chi tiết (VI)
`ResponseEntity\u003cT\u003e` cho phép kiểm soát **hoàn toàn HTTP response**: status code, header, body.\
\
```java\
@PostMapping\
ResponseEntity\u003cUser\u003e create(@RequestBody @Valid CreateUserRequest req) {\
  User user = userService.create(req);\
  return ResponseEntity.created(URI.create(\\"/api/users/\\" + user.getId())).body(user);  // 201 + Location\
}\
\
@GetMapping(\\"/{id}\\")\
ResponseEntity\u003cUser\u003e get(@PathVariable Long id) {\
  return userService.findById(id)\
    .map(ResponseEntity::ok)                     // 200 OK\
    .orElse(ResponseEntity.notFound().build());  // 404\
}\
\
@DeleteMapping(\\"/{id}\\")\
ResponseEntity\u003cVoid\u003e delete(@PathVariable Long id) {\
  userService.delete(id);\
  return ResponseEntity.noContent().build();     // 204\
}\
```\
\
**Trả object trực tiếp** → Spring mặc định 200 OK. Dùng `ResponseEntity` khi cần status khác 200, custom header, hoặc body có thể null.

## Detailed Answer (EN)
`ResponseEntity\u003cT\u003e` gives **full control** over the HTTP response: status code, headers, body.\
\
```java\
@PostMapping\
ResponseEntity\u003cUser\u003e create(@RequestBody @Valid CreateUserRequest req) {\
  User user = userService.create(req);\
  return ResponseEntity.created(URI.create(\\"/api/users/\\" + user.getId())).body(user);  // 201 + Location\
}\
\
@GetMapping(\\"/{id}\\")\
ResponseEntity\u003cUser\u003e get(@PathVariable Long id) {\
  return userService.findById(id)\
    .map(ResponseEntity::ok)                     // 200 OK\
    .orElse(ResponseEntity.notFound().build());  // 404\
}\
\
@DeleteMapping(\\"/{id}\\")\
ResponseEntity\u003cVoid\u003e delete(@PathVariable Long id) {\
  userService.delete(id);\
  return ResponseEntity.noContent().build();     // 204\
}\
```\
\
**Returning an object directly** → Spring defaults to 200 OK. Use `ResponseEntity` when you need a non-200 status, custom headers, or a possibly-null body.
