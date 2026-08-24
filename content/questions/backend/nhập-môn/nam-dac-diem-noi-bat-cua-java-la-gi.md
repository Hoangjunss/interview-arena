---
id: nam-dac-diem-noi-bat-cua-java-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Năm đặc điểm nổi bật của Java là gì?

## Question (EN)
What are the five key features of Java?

## Đáp án chi tiết (VI)
- **Hướng đối tượng:** thiết kế xoay quanh class/object — encapsulation, inheritance, polymorphism, abstraction (trừ primitive type).\
- **Độc lập nền tảng (\\"WORA\\"):** `javac` biên dịch ra **bytecode**; JVM trên mọi OS đều chạy được cùng file `.class`.\
- **Robust:** type checking chặt, exception handling, **không có con trỏ** → tránh được lỗi segmentation fault.\
- **Multi-threaded:** `Thread`, `synchronized`, `java.util.concurrent` có sẵn. Java 21 thêm **Virtual Threads** — hàng triệu thread nhẹ.\
- **Bảo mật:** JVM sandbox + bytecode verifier + không truy cập memory trực tiếp.\
\
**Bonus:** **JIT compiler** (HotSpot) optimize hot code lúc runtime → Java thường nhanh ngang C++ ở server workload sau warm-up.

## Detailed Answer (EN)
- **Object-oriented:** designed around classes/objects — encapsulation, inheritance, polymorphism, abstraction (primitives aside).\
- **Platform-independent (\\"WORA\\"):** `javac` produces **bytecode**; the JVM on any OS runs the same `.class` file.\
- **Robust:** strict type checking, exception handling, **no pointers** → avoids whole classes of segfault bugs.\
- **Multi-threaded:** `Thread`, `synchronized`, `java.util.concurrent` are built-in. Java 21 adds **Virtual Threads** — millions of lightweight threads.\
- **Secure:** JVM sandbox + bytecode verifier + no direct memory access.\
\
**Bonus:** the **JIT compiler** (HotSpot) optimises hot code at runtime → Java often matches C++ on server workloads after warm-up.
