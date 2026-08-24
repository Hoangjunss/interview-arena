---
id: raii-trong-c-la-gi-tai-sao-quan-trong
position: backend
technology: con-trỏ-\u0026-bộ-nhớ
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RAII trong C++ là gì? Tại sao quan trọng?

## Question (EN)
What is RAII in C++ and why does it matter?

## Đáp án chi tiết (VI)
RAII (Resource Acquisition Is Initialization): gắn vòng đời tài nguyên (bộ nhớ, file, lock...) vào vòng đời một object trên stack. Cấp tài nguyên trong constructor, giải phóng trong destructor. Khi object ra khỏi scope, destructor tự chạy — tài nguyên được trả lại kể cả khi có exception.\
\
```cpp\
void bad() {\
  FILE* f = fopen(\\"x.txt\\

## Detailed Answer (EN)
RAII (Resource Acquisition Is Initialization): tie a resource's lifetime (memory, file, lock...) to the lifetime of a stack object. Acquire in the constructor, release in the destructor. When the object leaves scope its destructor runs automatically — the resource is released even if an exception is thrown.\
\
```cpp\
void bad() {\
  FILE* f = fopen(\\"x.txt\\
