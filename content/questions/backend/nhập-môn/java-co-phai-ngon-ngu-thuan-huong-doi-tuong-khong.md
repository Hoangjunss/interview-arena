---
id: java-co-phai-ngon-ngu-thuan-huong-doi-tuong-khong
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Java có phải ngôn ngữ thuần hướng đối tượng không?

## Question (EN)
Is Java a purely object-oriented language?

## Đáp án chi tiết (VI)
Không. Java có **primitive types** (`int`, `long`, `double`, `boolean`, `char`...) sống song song với object. Primitive không có method, không gán `null` được. Ngôn ngữ thuần OOP (Smalltalk, Ruby) coi **mọi** thứ là object — kể cả số `5`.\
\
Lý do giữ primitive: **hiệu năng**. `int a = 5` chỉ 4 byte stack; `Integer a = 5` cần object header trên heap + reference. Phép cộng trên `int` là 1 CPU instruction; trên `Integer` phải unbox → cộng → box lại.\
\
Java có **wrapper class** (`Integer`, `Double`...) và **autoboxing** (Java 5+) làm hai thế giới chung sống mượt mà. **Project Valhalla** đang phát triển **value class** — sẽ gần như xoá ranh giới primitive/object trong tương lai.

## Detailed Answer (EN)
No. Java has **primitive types** (`int`, `long`, `double`, `boolean`, `char`...) alongside objects. Primitives have no methods and cannot be `null`. Purely OOP languages (Smalltalk, Ruby) treat *everything* as an object — even the integer `5`.\
\
Why keep primitives: **performance**. `int a = 5` is 4 bytes on the stack; `Integer a = 5` needs an object header on the heap + a reference. Adding two `int`s is one CPU instruction; with `Integer` you unbox → add → maybe re-box.\
\
Java has **wrapper classes** (`Integer`, `Double`...) and **autoboxing** (Java 5+) so the two worlds coexist smoothly. **Project Valhalla** is developing **value classes** that will largely erase the primitive/object boundary.
