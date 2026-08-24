---
id: string-stringbuilder-va-stringbuffer-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
String, StringBuilder và StringBuffer khác nhau thế nào?

## Question (EN)
What is the difference between String, StringBuilder, and StringBuffer?

## Đáp án chi tiết (VI)
Cả ba giữ chuỗi, khác nhau ở **mutable** và **thread-safe**:\
\
| Loại | Mutable | Thread-safe | Tốc độ |\
|---|---|---|---|\
| **String** | Không (bất biến) | Có (do bất biến) | chậm khi nối nhiều |\
| **StringBuilder** | Có | Không | nhanh nhất |\
| **StringBuffer** | Có | Có (synchronized) | chậm hơn Builder ~10–30% |\
\
```java\
// Nối 10k lần: String tạo ra 10k object tạm thời; StringBuilder sửa tại chỗ\
StringBuilder sb = new StringBuilder();\
for (int i = 0; i \u003c 10_000; i++) sb.append(i);\
String result = sb.toString();\
```\
\
**Vì sao:** `String` bất biến nên mỗi `+` tạo object mới — O(n²) khi lặp. `StringBuilder`/`StringBuffer` có buffer sửa tại chỗ.\
\
**Tóm lại:** đơn luồng (99% trường hợp) → **`StringBuilder`**. Nhiều thread ghi chung 1 buffer → `StringBuffer` (hiếm). Chuỗi cố định/ít nối → `String`. Đừng \\"cho chắc\\" mà chọn `StringBuffer` — synchronized phí vô ích nếu chỉ 1 thread.

## Detailed Answer (EN)
All three hold strings; they differ in **mutability** and **thread safety**:\
\
| Type | Mutable | Thread-safe | Speed |\
|---|---|---|---|\
| **String** | No (immutable) | Yes (by immutability) | slow for heavy concatenation |\
| **StringBuilder** | Yes | No | fastest |\
| **StringBuffer** | Yes | Yes (synchronized) | ~10–30% slower than Builder |\
\
```java\
// Concatenating 10k times: String spawns 10k garbage objects; StringBuilder edits in place\
StringBuilder sb = new StringBuilder();\
for (int i = 0; i \u003c 10_000; i++) sb.append(i);\
String result = sb.toString();\
```\
\
**Why:** `String` is immutable so each `+` creates a new object — O(n²) in a loop. `StringBuilder`/`StringBuffer` use an in-place mutable buffer.\
\
**Bottom line:** single-threaded (99% of cases) → **`StringBuilder`**. Multiple threads writing one shared buffer → `StringBuffer` (rare). Fixed/rarely-joined text → `String`. Do not reach for `StringBuffer` \\"to be safe\\" — its synchronization is wasted on a single thread.
