---
id: classloader-la-gi-va-co-may-loai
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ClassLoader là gì và có mấy loại?

## Question (EN)
What is a ClassLoader and what are its types?

## Đáp án chi tiết (VI)
**ClassLoader** tải file `.class` vào memory lúc runtime.\
\
**3 loại built-in (theo hierarchy):**\
1. **Bootstrap ClassLoader** — JVM built-in (C++), tải core class trong `java.lang`, `java.util` (rt.jar / Java 9+ module).\
2. **Platform ClassLoader** (Java 9+, trước là Extension) — tải các module platform không thuộc core như `java.sql`, `java.xml`, `java.logging`.\
3. **Application ClassLoader** — tải class từ classpath ứng dụng.\
\
**Parent-delegation model:** khi nạp class, con **hỏi cha trước** → đảm bảo core class không bị override (vd `java.lang.String` luôn từ Bootstrap).\
\
```\
Application ClassLoader\
  ↓ delegate trước khi tự load\
Platform ClassLoader\
  ↓\
Bootstrap ClassLoader\
```\
\
**Custom ClassLoader** cho phép:\
- Dynamic loading (plugin, OSGi).\
- Hot-reloading (Spring DevTools).\
- Isolation (mỗi web app trong Tomcat có ClassLoader riêng).\
\
**Khi cần hiểu sâu:** debug `ClassNotFoundException` vs `NoClassDefFoundError`, JAR conflict (cùng class ở 2 JAR), classloader leak trong app server.

## Detailed Answer (EN)
$82
