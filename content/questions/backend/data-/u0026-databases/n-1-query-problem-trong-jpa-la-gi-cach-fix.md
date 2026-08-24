---
id: n-1-query-problem-trong-jpa-la-gi-cach-fix
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
N+1 query problem trong JPA là gì? Cách fix?

## Question (EN)
What is the N+1 query problem in JPA? How do you fix it?

## Đáp án chi tiết (VI)
**N+1 problem:** load list entity (1 query), rồi mỗi entity gọi thêm 1 query lấy association → **1 + N query** thay vì 1.\
\
```java\
List\u003cOrder\u003e orders = orderRepo.findAll();          // Query 1\
for (Order o : orders) o.getCustomer().getName();  // Query 2..N+1 → 100 order = 101 query\
```\
\
**Phát hiện:** `spring.jpa.show-sql=true` → thấy query lặp.\
\
**Fix:**\
```java\
// 1. JOIN FETCH\
@Query(\\"SELECT o FROM Order o JOIN FETCH o.customer WHERE o.status = :s\\")\
List\u003cOrder\u003e findByStatus(@Param(\\"s\\") String s);\
\
// 2. @EntityGraph\
@EntityGraph(attributePaths = {\\"customer\\

## Detailed Answer (EN)
**N+1 problem:** loading a list (1 query), then one extra query per entity to fetch an association → **1 + N queries** instead of 1.\
\
```java\
List\u003cOrder\u003e orders = orderRepo.findAll();          // Query 1\
for (Order o : orders) o.getCustomer().getName();  // Queries 2..N+1 → 100 orders = 101 queries\
```\
\
**Detecting:** `spring.jpa.show-sql=true` → spot repeated queries.\
\
**Fixes:**\
```java\
// 1. JOIN FETCH\
@Query(\\"SELECT o FROM Order o JOIN FETCH o.customer WHERE o.status = :s\\")\
List\u003cOrder\u003e findByStatus(@Param(\\"s\\") String s);\
\
// 2. @EntityGraph\
@EntityGraph(attributePaths = {\\"customer\\
