---
id: dao-data-access-object-trong-room-la-gi
position: backend
technology: data-\u0026-networking
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DAO (Data Access Object) trong Room là gì?

## Question (EN)
What is a DAO (Data Access Object) in Room?

## Đáp án chi tiết (VI)
DAO là interface với các method cho thao tác CRUD trên database. Bạn annotate method với `@Query`, `@Insert`, `@Update`, `@Delete`. Room sinh implementation lúc compile. \
\
**Ví dụ:** `@Query(\\"SELECT * FROM users WHERE id = :id\\") suspend fun getUser(id: Int): User`. DAO là nơi định nghĩa query, và dùng suspend function giúp query tự động chạy trên background thread.

## Detailed Answer (EN)
A DAO is an interface with methods for database CRUD operations annotated with `@Query`, `@Insert`, `@Update`, `@Delete`. Room generates the implementation at compile time. For example: `@Query(\\"SELECT * FROM users WHERE id = :id\\") suspend fun getUser(id: Int): User`. DAOs are where you define your database queries, and using suspend functions allows queries to run on background threads automatically.
