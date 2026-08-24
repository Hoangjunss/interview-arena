---
id: dispose-khac-finalize-the-nao-idisposable-va-using-dung-ra-sao
position: backend
technology: resource-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Dispose` khác `Finalize` thế nào? `IDisposable` và `using` dùng ra sao?

## Question (EN)
How does `Dispose` differ from `Finalize`? How do `IDisposable` and `using` work?

## Đáp án chi tiết (VI)
Cả hai đều để dọn tài nguyên, khác nhau ở **thời điểm** và **ai gọi**:\
\
- **`Finalize`** (viết dưới dạng destructor `~T()`): do **GC** gọi, **không xác định thời điểm**. Chỉ là lưới an toàn để giải phóng **tài nguyên unmanaged** nếu lập trình viên quên. Làm chậm GC → hạn chế dùng.\
- **`Dispose`** (interface `IDisposable`): **bạn** gọi một cách **xác định**, ngay khi dùng xong (file, socket, DB connection).\
\
**`using`** đảm bảo `Dispose()` luôn được gọi kể cả khi có exception:\
\
```csharp\
using (var file = File.OpenText(\\"a.txt\\"))\
{\
    // ...\
}   // Dispose() gọi tự động ở đây\
\
using var conn = new SqlConnection(cs);   // cú pháp using declaration (C# 8+)\
```\
\
**Dispose pattern** chuẩn: `Dispose()` giải phóng cả managed lẫn unmanaged rồi gọi `GC.SuppressFinalize(this)` để bỏ qua finalizer (vì đã dọn tay). Chỉ viết finalizer khi class **trực tiếp** giữ tài nguyên unmanaged.

## Detailed Answer (EN)
Both clean up resources, but differ in **when** and **who** calls them:\
\
- **`Finalize`** (written as the `~T()` destructor): called by the **GC** at a **non-deterministic** time. It is only a safety net to release **unmanaged resources** if the developer forgot. It slows the GC → use sparingly.\
- **`Dispose`** (the `IDisposable` interface): **you** call it **deterministically**, right when done (files, sockets, DB connections).\
\
**`using`** guarantees `Dispose()` runs even when an exception is thrown:\
\
```csharp\
using (var file = File.OpenText(\\"a.txt\\"))\
{\
    // ...\
}   // Dispose() called automatically here\
\
using var conn = new SqlConnection(cs);   // using declaration (C# 8+)\
```\
\
The standard **dispose pattern**: `Dispose()` frees managed and unmanaged resources, then calls `GC.SuppressFinalize(this)` to skip the finalizer (cleanup already done). Only write a finalizer when the class **directly** holds unmanaged resources.
