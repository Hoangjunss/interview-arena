---
id: cay-phan-cap-exception-trong-ruby-nhu-the-nao-tai-sao-khong-nen-rescue-exception
position: backend
technology: exception-\u0026-gem
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cây phân cấp Exception trong Ruby như thế nào? Tại sao không nên `rescue Exception`?

## Question (EN)
What is the Ruby exception hierarchy? Why should you not `rescue Exception`?

## Đáp án chi tiết (VI)
`Exception` là gốc của toàn bộ cây:\
```\
Exception\
├── StandardError  ← rescue bắt ở đây mặc định\
│   ├── RuntimeError  ← raise không có class → RuntimeError\
│   ├── ArgumentError\
│   ├── TypeError\
│   ├── NoMethodError\
│   ├── ZeroDivisionError\
│   └── ...\
├── SystemExit      ← exit() / at_exit\
├── Interrupt       ← Ctrl+C / SIGINT\
└── NoMemoryError   ← hết RAM\
```\
\
**Tại sao không `rescue Exception`:** nó bắt cả `SystemExit` và `Interrupt` — `Ctrl+C` bị nuốt, process không tắt được. Luôn dùng `rescue StandardError` (hoặc subclass cụ thể).

## Detailed Answer (EN)
`Exception` is the root of the entire tree:\
```\
Exception\
├── StandardError  ← default rescue catches here\
│   ├── RuntimeError  ← bare raise → RuntimeError\
│   ├── ArgumentError\
│   ├── TypeError\
│   ├── NoMethodError\
│   ├── ZeroDivisionError\
│   └── ...\
├── SystemExit      ← exit() / at_exit\
├── Interrupt       ← Ctrl+C / SIGINT\
└── NoMemoryError   ← out of RAM\
```\
\
**Why not `rescue Exception`:** it catches `SystemExit` and `Interrupt` — `Ctrl+C` gets swallowed and the process can't be stopped. Always use `rescue StandardError` (or a specific subclass).
