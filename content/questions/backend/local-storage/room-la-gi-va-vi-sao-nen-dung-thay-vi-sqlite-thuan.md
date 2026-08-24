---
id: room-la-gi-va-vi-sao-nen-dung-thay-vi-sqlite-thuan
position: backend
technology: local-storage
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Room là gì và vì sao nên dùng thay vì SQLite thuần?

## Question (EN)
What is Room and why use it instead of raw SQLite?

## Đáp án chi tiết (VI)
Room là **thư viện persistence (ORM) của Jetpack** bọc quanh SQLite, giảm boilerplate và bắt lỗi sớm.\
\
Ba thành phần:\
- **Entity**: class ánh xạ thành bảng.\
- **DAO**: interface khai báo truy vấn (`@Query`, `@Insert`, `@Update`, `@Delete`).\
- **Database**: lớp trừu tượng chứa DAO và giữ kết nối.\
\
Vì sao hơn SQLite thuần:\
- **Kiểm tra SQL tại compile-time** (sai câu query báo lỗi lúc build, không phải runtime).\
- Tự ánh xạ kết quả sang object, ít code lặp.\
- Tích hợp **Flow/LiveData** → truy vấn phát lại tự động khi dữ liệu đổi, hợp offline-first.\
- Hỗ trợ migration có kiểm soát.\
\
Hay hỏi: vì sao không được chạy query trên main thread (Room ép chạy nền hoặc trả về Flow/suspend).

## Detailed Answer (EN)
Room is **Jetpack's persistence (ORM) library** over SQLite, cutting boilerplate and catching errors early.\
\
Three parts:\
- **Entity**: a class mapped to a table.\
- **DAO**: an interface declaring queries (`@Query`, `@Insert`, `@Update`, `@Delete`).\
- **Database**: an abstract class holding the DAOs and the connection.\
\
Why over raw SQLite:\
- **Compile-time SQL verification** (a bad query fails at build, not runtime).\
- Automatic result-to-object mapping, less repetitive code.\
- **Flow/LiveData** integration → queries re-emit automatically when data changes, ideal for offline-first.\
- Managed migrations.\
\
Common ask: why you must not run queries on the main thread (Room forces background execution or a Flow/suspend return).
