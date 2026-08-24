---
id: cach-implement-pagination-va-sorting-voi-spring-data-jpa
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách implement Pagination và Sorting với Spring Data JPA?

## Question (EN)
How do you implement pagination and sorting with Spring Data JPA?

## Đáp án chi tiết (VI)
Spring Data cung cấp `Pageable`/`PageRequest` cho pagination và `Sort` cho sorting.\
\
```java\
public interface UserRepository extends JpaRepository\u003cUser, Long\u003e {\
  Page\u003cUser\u003e findByActive(boolean active, Pageable pageable);\
}\
\
@GetMapping(\\"/users\\")\
Page\u003cUserDTO\u003e list(@RequestParam(defaultValue = \\"0\\") int page,\
                   @RequestParam(defaultValue = \\"20\\") int size,\
                   @RequestParam(defaultValue = \\"createdAt\\") String sort) {\
  Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());  // page 0-indexed\
  return userRepo.findByActive(true, pageable).map(userMapper::toDTO);\
}\
```\
\
**`Page` response** gồm: `content`, `totalElements`, `totalPages`, `size`, `number` (trang hiện tại), `first`, `last`.\
\
**Lưu ý:** `Page` thêm 1 count query — với large table hoặc infinite scroll không cần tổng số, dùng `Slice\u003cT\u003e`.

## Detailed Answer (EN)
Spring Data provides `Pageable`/`PageRequest` for pagination and `Sort` for sorting.\
\
```java\
public interface UserRepository extends JpaRepository\u003cUser, Long\u003e {\
  Page\u003cUser\u003e findByActive(boolean active, Pageable pageable);\
}\
\
@GetMapping(\\"/users\\")\
Page\u003cUserDTO\u003e list(@RequestParam(defaultValue = \\"0\\") int page,\
                   @RequestParam(defaultValue = \\"20\\") int size,\
                   @RequestParam(defaultValue = \\"createdAt\\") String sort) {\
  Pageable pageable = PageRequest.of(page, size, Sort.by(sort).descending());  // page 0-indexed\
  return userRepo.findByActive(true, pageable).map(userMapper::toDTO);\
}\
```\
\
**A `Page` response** includes: `content`, `totalElements`, `totalPages`, `size`, `number` (current page), `first`, `last`.\
\
**Note:** `Page` adds a count query — for large tables or infinite scroll that does not need a total, use `Slice\u003cT\u003e`.
