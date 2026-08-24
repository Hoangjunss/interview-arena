---
id: hermes-la-gi-khac-jsc-o-dau
position: backend
technology: core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hermes là gì, khác JSC ở đâu?

## Question (EN)
What is Hermes and how is it different from JSC?

## Đáp án chi tiết (VI)
**Hermes** là JavaScript engine open-source do Meta viết cho RN, tối ưu cho mobile. **JSC (JavaScriptCore)** là engine mặc định cũ — chính là engine của Safari/iOS.\
\
Khác biệt chính:\
- **Bytecode pre-compile:** Hermes compile JS bundle thành bytecode lúc build (`hbc` file). App startup không cần parse JS → giảm time-to-interactive 30–50%, đặc biệt thấy rõ trên Android low-end.\
- **Memory:** Hermes tiêu thụ RAM ít hơn JSC ~30% nhờ generational GC và string deduplication.\
- **APK/IPA size:** bytecode + Hermes runtime nhỏ hơn JSC bundle (RN 0.71+ Hermes được lazy-load đẹp).\
- **Async/await native:** Hermes implement async/await không cần regenerator-runtime polyfill.\
- **Debugger:** RN DevTools (RN 0.76+) dựa Chrome DevTools Protocol qua Hermes.\
\
Nhược điểm Hermes: chậm hơn JSC ở vài benchmark CPU-intensive (regex, JSON.parse lớn). Bật Hermes mặc định từ RN 0.70 (Android) và 0.71 (iOS); chỉ tắt khi gặp lib không tương thích.

## Detailed Answer (EN)
**Hermes** is an open-source JavaScript engine Meta built for RN, optimised for mobile. **JSC (JavaScriptCore)** is the legacy default — the same engine that powers Safari/iOS.\
\
Key differences:\
- **Bytecode pre-compilation:** Hermes compiles the JS bundle to bytecode (`hbc`) at build time. App startup skips JS parsing — time-to-interactive drops 30–50%, especially on low-end Android.\
- **Memory:** Hermes uses ~30% less RAM than JSC thanks to generational GC and string deduplication.\
- **APK/IPA size:** bytecode + Hermes runtime is smaller than the JSC payload (RN 0.71+ lazy-loads Hermes nicely).\
- **Native async/await:** Hermes implements them without the regenerator-runtime polyfill.\
- **Debugger:** RN DevTools (RN 0.76+) is built on the Chrome DevTools Protocol via Hermes.\
\
Hermes downsides: slower than JSC on some CPU-bound benchmarks (regex, large `JSON.parse`). It has been the Android default since RN 0.70 and iOS default since 0.71 — only disable it when a library is incompatible.
