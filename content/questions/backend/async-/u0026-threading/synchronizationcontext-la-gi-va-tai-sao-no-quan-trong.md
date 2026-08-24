---
id: synchronizationcontext-la-gi-va-tai-sao-no-quan-trong
position: backend
technology: async-\u0026-threading
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SynchronizationContext là gì và tại sao nó quan trọng?

## Question (EN)
What is SynchronizationContext and why does it matter?

## Đáp án chi tiết (VI)
SynchronizationContext đảm bảo async continuations resume trên đúng thread. Trong UI frameworks (WPF, WinForms), UI operations phải chạy trên UI thread — SynchronizationContext xử lý điều này tự động. Classic ASP.NET (System.Web) cũng dùng per-request SynchronizationContext — nhưng ASP.NET Core thì KHÔNG: Core cố tình loại bỏ nó (Kestrel không install SynchronizationContext). `ConfigureAwait(false)` bỏ qua context này, hữu ích trong library code nơi thread cụ thể không quan trọng.

## Detailed Answer (EN)
SynchronizationContext ensures async continuations resume on the correct thread. In UI frameworks (WPF, WinForms), UI operations require the specific UI thread — SynchronizationContext handles this automatically. Classic ASP.NET (System.Web) also used a per-request SynchronizationContext. ASP.NET Core deliberately removed it — Kestrel installs no SynchronizationContext. `ConfigureAwait(false)` bypasses any captured context, useful in library code where thread affinity is irrelevant.
