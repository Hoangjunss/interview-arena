---
id: managed-code-va-unmanaged-code-khac-nhau-the-nao
position: backend
technology: clr-\u0026-types
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Managed code và unmanaged code khác nhau thế nào?

## Question (EN)
How does managed code differ from unmanaged code?

## Đáp án chi tiết (VI)
**Managed code** là code chạy dưới sự quản lý của **CLR (Common Language Runtime)** — C#, F#, VB.NET biên dịch ra **IL** rồi CLR lo giúp: **garbage collection**, **type safety**, kiểm tra biên mảng, xử lý exception, JIT ra mã máy.\
\
**Unmanaged code** chạy **trực tiếp trên hệ điều hành**, không có CLR: C/C++ tự cấp phát và giải phóng bộ nhớ (`malloc`/`free`, `new`/`delete`), không có GC. .NET gọi sang code này qua **P/Invoke** (Win32 API) hoặc **COM interop**.\
\
**Hệ quả cần nhớ:**\
- Bộ nhớ managed do GC theo dõi và thu hồi tự động.\
- **Tài nguyên unmanaged** (file handle, socket, con trỏ native) GC **không biết** cách dọn → phải giải phóng tay qua `IDisposable`/`Dispose` hoặc finalizer.\
\
**Hình dung:** managed code chạy trong \\"sân có trọng tài\\" (CLR lo an toàn và dọn dẹp); unmanaged code chạy ngoài sân, tự chịu trách nhiệm bộ nhớ.

## Detailed Answer (EN)
**Managed code** runs under the **CLR (Common Language Runtime)** — C#, F#, and VB.NET compile to **IL**, and the CLR handles **garbage collection**, **type safety**, array-bounds checks, exception handling, and JIT compilation to machine code.\
\
**Unmanaged code** runs **directly on the OS** without a CLR: C/C++ allocates and frees memory itself (`malloc`/`free`, `new`/`delete`), with no GC. .NET calls into it via **P/Invoke** (Win32 API) or **COM interop**.\
\
**Key consequences:**\
- Managed memory is tracked and reclaimed automatically by the GC.\
- **Unmanaged resources** (file handles, sockets, native pointers) the GC **doesn't know** how to clean → you must release them manually via `IDisposable`/`Dispose` or a finalizer.\
\
**Picture it:** managed code runs \\"on a field with a referee\\" (the CLR handles safety and cleanup); unmanaged code runs off-field, responsible for its own memory.
