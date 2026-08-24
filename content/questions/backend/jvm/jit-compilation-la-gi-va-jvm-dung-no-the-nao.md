---
id: jit-compilation-la-gi-va-jvm-dung-no-the-nao
position: backend
technology: jvm
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JIT compilation là gì và JVM dùng nó thế nào?

## Question (EN)
What is JIT compilation and how does the JVM use it?

## Đáp án chi tiết (VI)
**JIT (Just-In-Time) compiler** biên dịch **bytecode → mã máy native** ngay lúc chạy, thay vì thông dịch từng lệnh. JVM khởi động ở chế độ **interpreter** (chạy ngay, không cần warm-up) và song song **đếm số lần** mỗi method/vòng lặp chạy. Khi vượt ngưỡng (\\"hot\\"), JIT dịch phần đó ra native rồi tối ưu.\
\
**HotSpot** dùng **tiered compilation** 2 tầng:\
- **C1 (client):** dịch nhanh, tối ưu nhẹ → có native sớm.\
- **C2 (server):** tối ưu sâu (inlining, loop unrolling, escape analysis) cho code thật sự nóng.\
\
Vì JIT thấy dữ liệu runtime, nó làm được thứ compiler tĩnh không làm: **speculative optimization** (giả định một nhánh không bao giờ chạy) và **deoptimize** khi giả định sai. Đây là lý do Java sau warm-up thường nhanh gần C++.\
\
**Hình dung:** interpreter dịch từng câu như phiên dịch trực tiếp; JIT là dịch sẵn cả đoạn hay lặp lại thành bản chạy thẳng.

## Detailed Answer (EN)
The **JIT (Just-In-Time) compiler** compiles **bytecode → native machine code** at runtime instead of interpreting instruction by instruction. The JVM starts in **interpreter** mode (runs immediately, no warm-up) while **counting** how often each method/loop runs. Once a threshold (\\"hot\\") is crossed, the JIT compiles and optimises that section to native.\
\
**HotSpot** uses two-level **tiered compilation**:\
- **C1 (client):** compiles fast with light optimisation → native code early.\
- **C2 (server):** deep optimisation (inlining, loop unrolling, escape analysis) for genuinely hot code.\
\
Because the JIT sees runtime data, it does what a static compiler cannot: **speculative optimization** (assume a branch never runs) plus **deoptimize** when the assumption breaks. That is why Java after warm-up often approaches C++ speed.\
\
**Picture it:** the interpreter translates line by line like live interpreting; the JIT pre-compiles hot stretches into code that runs straight through.
