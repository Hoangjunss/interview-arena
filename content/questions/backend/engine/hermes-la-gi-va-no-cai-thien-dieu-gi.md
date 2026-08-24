---
id: hermes-la-gi-va-no-cai-thien-dieu-gi
position: backend
technology: engine
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hermes là gì và nó cải thiện điều gì?

## Question (EN)
What is Hermes and what does it improve?

## Đáp án chi tiết (VI)
Hermes là **engine JavaScript mã nguồn mở của Meta**, tối ưu riêng cho React Native (mặc định từ RN 0.70+).\
\
Cải thiện:\
- **Thời gian khởi động (TTI) nhanh hơn**: Hermes **biên dịch trước JS sang bytecode** lúc build, nên lúc chạy không phải parse/compile JS → mở app nhanh.\
- **Dùng ít bộ nhớ** và **giảm kích thước app** — quan trọng với thiết bị cấu hình thấp.\
\
Đối chiếu:\
- Thay cho JavaScriptCore (JSC) mặc định trước đây.\
- Kiểm tra đang bật Hermes qua biến toàn cục `HermesInternal`.\
- Hermes tích hợp tốt với kiến trúc mới (JSI).\
\
Hay hỏi: vì sao bytecode-precompile giúp startup (bỏ bước parse JS ở runtime) và đánh đổi khi debug (cần Hermes debugger).

## Detailed Answer (EN)
Hermes is **Meta's open-source JavaScript engine**, tuned specifically for React Native (default since RN 0.70+).\
\
Improvements:\
- **Faster startup (TTI)**: Hermes **precompiles JS to bytecode** at build time, so at runtime there is no JS parse/compile → the app opens faster.\
- **Lower memory use** and **smaller app size** — important on low-end devices.\
\
Context:\
- It replaces the previously default JavaScriptCore (JSC).\
- Check Hermes is on via the `HermesInternal` global.\
- Hermes integrates well with the new architecture (JSI).\
\
Common ask: why bytecode precompilation helps startup (removes runtime JS parsing) and the debugging trade-off (needs the Hermes debugger).
