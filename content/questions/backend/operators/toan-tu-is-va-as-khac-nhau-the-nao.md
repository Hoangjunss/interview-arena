---
id: toan-tu-is-va-as-khac-nhau-the-nao
position: backend
technology: operators
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử `is` và `as` khác nhau thế nào?

## Question (EN)
How do the `is` and `as` operators differ?

## Đáp án chi tiết (VI)
Cả hai kiểm tra kiểu lúc runtime nhưng trả về khác nhau:\
\
- **`is`**: trả về **`bool`** — đối tượng có tương thích kiểu không. Với **pattern matching** (C# 7+) còn gán luôn biến đã ép kiểu:\
\
```csharp\
if (obj is string s)      // đúng kiểu → gán s, không cần cast lại\
    Console.WriteLine(s.Length);\
```\
\
- **`as`**: **thử ép kiểu**, thành công trả về đối tượng, thất bại trả về **`null`** (không ném exception). Chỉ dùng được cho **reference type** và **nullable type**.\
\
```csharp\
string? s = obj as string;\
if (s != null) { /* ... */ }\
```\
\
**Khác với cast `(T)obj`:** cast trực tiếp ném `InvalidCastException` khi sai kiểu. Chọn:\
- Cần biết đúng/sai kiểu (và dùng luôn): `is` + pattern.\
- Chấp nhận null khi không khớp: `as`.\
- Chắc chắn đúng kiểu, muốn lỗi nếu sai: cast `(T)`.

## Detailed Answer (EN)
Both test a type at runtime but return differently:\
\
- **`is`**: returns a **`bool`** — whether the object is type-compatible. With **pattern matching** (C# 7+) it also binds the cast variable:\
\
```csharp\
if (obj is string s)      // right type → binds s, no re-cast needed\
    Console.WriteLine(s.Length);\
```\
\
- **`as`**: **attempts a cast**, returning the object on success or **`null`** on failure (no exception). Works only for **reference types** and **nullable types**.\
\
```csharp\
string? s = obj as string;\
if (s != null) { /* ... */ }\
```\
\
**Versus a cast `(T)obj`:** a direct cast throws `InvalidCastException` on a wrong type. Choose:\
- Need to know match/no-match (and use it): `is` + pattern.\
- Fine with null when it doesn't match: `as`.\
- Sure of the type, want a failure otherwise: the `(T)` cast.
