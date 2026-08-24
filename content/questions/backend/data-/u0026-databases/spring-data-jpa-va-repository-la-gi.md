---
id: spring-data-jpa-va-repository-la-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Spring Data JPA và @Repository là gì?

## Question (EN)
What is Spring Data JPA and what is the role of @Repository?

## Đáp án chi tiết (VI)
**Spring Data JPA** là abstraction trên JPA — khai báo interface, Spring sinh implementation tự động.\
\
```java\
public interface UserRepository extends JpaRepository\u003cUser, Long\u003e {\
  // Sẵn có: save, findById, findAll, delete, count...\
  Optional\u003cUser\u003e findByEmail(String email);                // query method — derive từ tên\
  Page\u003cUser\u003e findByActive(boolean active, Pageable page);  // pagination/sorting\
\
  @Query(\\"UPDATE User u SET u.active = false WHERE u.id = :id\\")\
  @Modifying int deactivate(@Param(\\"id\\") Long id);         // JPQL/native tuỳ biến\
}\
```\
\
**`@Repository`:** đánh dấu data-access component + tự **dịch exception** DB (`SQLException`) → Spring `DataAccessException` (unchecked, đồng nhất giữa các DB). `JpaRepository` đã có `@Repository` ngầm.\
\
**Lợi ích:** ít code, query type-safe, transaction tự động qua `@Transactional`.

## Detailed Answer (EN)
**Spring Data JPA** is an abstraction over JPA — declare an interface and Spring generates the implementation.\
\
```java\
public interface UserRepository extends JpaRepository\u003cUser, Long\u003e {\
  // Provided: save, findById, findAll, delete, count...\
  Optional\u003cUser\u003e findByEmail(String email);                // query method — derived from name\
  Page\u003cUser\u003e findByActive(boolean active, Pageable page);  // pagination/sorting\
\
  @Query(\\"UPDATE User u SET u.active = false WHERE u.id = :id\\")\
  @Modifying int deactivate(@Param(\\"id\\") Long id);         // custom JPQL/native\
}\
```\
\
**`@Repository`:** marks the data-access component + auto **translates** DB exceptions (`SQLException`) → Spring `DataAccessException` (unchecked, consistent across DBs). `JpaRepository` includes `@Repository` implicitly.\
\
**Benefits:** minimal code, type-safe queries, automatic transactions via `@Transactional`.
