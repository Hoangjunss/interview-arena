---
id: stack-overflow-va-heap-overflow-khac-nhau-the-nao
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stack overflow và heap overflow khác nhau thế nào?

## Question (EN)
What is the difference between stack overflow and heap overflow?

## Đáp án chi tiết (VI)
| | **Stack overflow** | **Heap overflow** |\
|---|---|---|\
| Vùng nhớ | Stack (per-thread, ~512KB-1MB) | Heap (shared, GB) |\
| Nguyên nhân | Đệ quy quá sâu, method call lồng | Quá nhiều object/memory leak |\
| Exception | `StackOverflowError` | `OutOfMemoryError: Java heap space` |\
| Phát hiện | **Nhanh, rõ** (stack trace dài) | Chậm, GC chạy hoài rồi mới throw |\
| Debug | Đọc stack trace | Cần heap dump + Eclipse MAT |\
\
```java\
// Stack overflow — đệ quy không có base case\
void recurse() { recurse(); }   // StackOverflowError ngay\
\
// Heap overflow — phình memory\
List\u003cbyte[]\u003e leak = new ArrayList\u003c\u003e();\
while (true) leak.add(new byte[1024 * 1024]);   // OutOfMemoryError sau khi heap đầy\
```\
\
**Phòng tránh:**\
- **Stack:** tránh đệ quy sâu → chuyển iteration; nếu phải đệ quy, dùng tail recursion (Java chưa optimize tail-call, vẫn nên tránh).\
- **Heap:** tăng `-Xmx`, fix memory leak, cache có eviction.\
- Tăng stack size mỗi thread: `-Xss512k` (cẩn thận, mỗi thread × stack size = tổng memory).

## Detailed Answer (EN)
$82
