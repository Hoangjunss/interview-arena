---
id: jvm-jre-va-jdk-khac-nhau-the-nao
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JVM, JRE và JDK khác nhau thế nào?

## Question (EN)
What is the difference between JVM, JRE, and JDK?

## Đáp án chi tiết (VI)
```\
JDK = JRE + compiler (javac) + tools (jdb, jstack, jmap)\
JRE = JVM + standard libraries\
JVM = bytecode executor + GC + JIT\
```\
\
- **JVM (Java Virtual Machine):** thực thi bytecode, platform-specific (mỗi OS có JVM riêng), cung cấp runtime + GC + JIT.\
- **JRE (Java Runtime Environment):** JVM + thư viện chuẩn. Chạy được app Java đã biên dịch, **không biên dịch được**.\
- **JDK (Java Development Kit):** JRE + compiler `javac` + debugger + tools. Dùng để phát triển.\
\
**Flow:** `.java` → `javac` (JDK) → `.class` bytecode → JVM thực thi.\
\
**2026:** Java 9+ bỏ JRE riêng — chỉ phát hành JDK, dùng `jlink` để tạo runtime tối thiểu cho production (chỉ chứa module cần thiết, giảm size container).

## Detailed Answer (EN)
```\
JDK = JRE + compiler (javac) + tools (jdb, jstack, jmap)\
JRE = JVM + standard libraries\
JVM = bytecode executor + GC + JIT\
```\
\
- **JVM (Java Virtual Machine):** executes bytecode, platform-specific (each OS has its own JVM), provides runtime + GC + JIT.\
- **JRE (Java Runtime Environment):** JVM + standard libraries. Runs compiled Java programs, **cannot compile**.\
- **JDK (Java Development Kit):** JRE + compiler `javac` + debugger + tools. Used for development.\
\
**Flow:** `.java` → `javac` (JDK) → `.class` bytecode → JVM executes.\
\
**2026:** Java 9+ stopped shipping a standalone JRE — only the JDK is published, use `jlink` to build a minimal runtime for production (only the modules you need, smaller container images).
