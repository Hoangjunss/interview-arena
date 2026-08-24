---
id: crudrepository-jparepository-va-pagingandsortingrepository-khac-nhau-the-nao
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CrudRepository, JpaRepository và PagingAndSortingRepository khác nhau thế nào?

## Question (EN)
How do CrudRepository, JpaRepository, and PagingAndSortingRepository differ?

## Đáp án chi tiết (VI)
Các interface trong Spring Data hierarchy:\
\
```\
Repository (marker)\
 ├─ CrudRepository / ListCrudRepository     // CRUD: save, findById, findAll, deleteById, count\
 ├─ PagingAndSortingRepository              // findAll(Pageable), findAll(Sort)\
 └─ JpaRepository                           // extends ListCrudRepository + ListPagingAndSortingRepository\
                                            // + saveAll, deleteAllInBatch, getReferenceById, flush\
```\
\
**Lưu ý Spring Data 3.x:** `PagingAndSortingRepository` **không còn extends `CrudRepository`** (khác 2.x) — muốn cả CRUD lẫn paging phải extend cả hai, hoặc đơn giản dùng `JpaRepository` (gộp tất cả + method JPA-specific).\
\
**Thực tế:** hầu hết extend `JpaRepository`. Dùng `CrudRepository` khi muốn interface tối giản, tránh coupling JPA (dễ swap sang MongoDB — các store khác cũng có CrudRepository).\
\
Pagination trả `Page\u003cT\u003e` (`getContent`, `getTotalElements`, `getTotalPages`) — code chi tiết xem câu Pagination \u0026 Sorting.

## Detailed Answer (EN)
The interfaces in the Spring Data hierarchy:\
\
```\
Repository (marker)\
 ├─ CrudRepository / ListCrudRepository     // CRUD: save, findById, findAll, deleteById, count\
 ├─ PagingAndSortingRepository              // findAll(Pageable), findAll(Sort)\
 └─ JpaRepository                           // extends ListCrudRepository + ListPagingAndSortingRepository\
                                            // + saveAll, deleteAllInBatch, getReferenceById, flush\
```\
\
**Spring Data 3.x note:** `PagingAndSortingRepository` **no longer extends `CrudRepository`** (unlike 2.x) — for both CRUD and paging, extend both, or simply use `JpaRepository` (bundles everything + JPA-specific methods).\
\
**In practice:** most repositories extend `JpaRepository`. Use `CrudRepository` for a minimal interface avoiding JPA coupling (easier swap to MongoDB — other stores also provide CrudRepository).\
\
Pagination returns `Page\u003cT\u003e` (`getContent`, `getTotalElements`, `getTotalPages`) — details in the Pagination \u0026 Sorting item.
