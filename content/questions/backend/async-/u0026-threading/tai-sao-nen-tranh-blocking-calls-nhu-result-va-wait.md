---
id: tai-sao-nen-tranh-blocking-calls-nhu-result-va-wait
position: backend
technology: async-\u0026-threading
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao nên tránh blocking calls như `.Result` và `.Wait()`?

## Question (EN)
Why should you avoid blocking calls like .Result and .Wait()?

## Đáp án chi tiết (VI)
Các blocking call như `.Result` dừng thread hiện tại lại để chờ task hoàn thành. Trong UI app (WPF, WinForms) hoặc classic ASP.NET (có SynchronizationContext), nếu continuation của task cần dùng đúng thread đó thì cả hai cùng chờ nhau — deadlock thường gặp. Lưu ý: ASP.NET Core (Kestrel) KHÔNG cài SynchronizationContext nên deadlock này không xảy ra ở đó — nhưng vẫn nên tránh `.Result` vì block thread pool. Luôn dùng `await` thay thế.

## Detailed Answer (EN)
Blocking calls like `.Result` halt the current thread waiting for task completion. In UI apps (WPF, WinForms) or classic ASP.NET (which installs a per-request SynchronizationContext), if the task's continuation needs that same thread, both end up waiting — a classic deadlock. Note: ASP.NET Core (Kestrel) does NOT install a SynchronizationContext, so this deadlock does not apply there — but `.Result` should still be avoided as it blocks thread pool threads. Always use `await` instead.
