---
id: noi-chuoi-bang-trong-vong-lap-co-van-de-gi-compiler-dich-a-b-thanh-gi
position: backend
technology: string
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nối chuỗi bằng `+` trong vòng lặp có vấn đề gì? Compiler dịch `a + b` thành gì?

## Question (EN)
What is wrong with concatenating strings using `+` inside a loop? What does the compiler translate `a + b` into?

## Đáp án chi tiết (VI)
`String` bất biến nên mỗi phép `+` tạo ra một chuỗi **mới** và copy toàn bộ nội dung cũ. Trong vòng lặp n lần, tổng khối lượng copy là **O(n²)**.\
\
```java\
String s = \\"\\";\
for (String part : parts) {\
    s += part;               // O(n^2): mỗi vòng copy lại toàn bộ chuỗi\
}\
\
StringBuilder sb = new StringBuilder();\
for (String part : parts) {\
    sb.append(part);         // O(n)\
}\
String result = sb.toString();\
\
String joined = String.join(\\

## Detailed Answer (EN)
$82
