---
id: gil-la-gi-anh-huong-den-threading-va-multiprocessing-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GIL là gì? Ảnh hưởng đến threading và multiprocessing thế nào?

## Question (EN)
What is the GIL? How does it affect threading and multiprocessing?

## Đáp án chi tiết (VI)
GIL (Global Interpreter Lock) là mutex trong CPython đảm bảo chỉ một thread thực thi Python bytecode tại một thời điểm. Ảnh hưởng: (1) I/O-bound tasks — threading vẫn hiệu quả vì GIL được release khi chờ I/O (network, file, DB) (2) CPU-bound tasks — threading KHÔNG cải thiện do GIL → phải dùng `multiprocessing` để bypass GIL và chạy song song thực sự. Lưu ý: GIL không có trong Jython và IronPython. Python 3.13 ra mắt free-threaded build chính thức (`python3.13t`, PEP 703) — GIL tắt per-interpreter; đây là opt-in feature ổn định, không còn là \\"experimental\\". Dự kiến broader adoption trong 3.14+.

## Detailed Answer (EN)
GIL (Global Interpreter Lock) ensures only one thread runs Python bytecode at a time in CPython. Impact: (1) I/O-bound — threading works fine; GIL released while waiting for I/O (2) CPU-bound — threading gives no speedup; use `multiprocessing` to bypass GIL. Python 3.13 ships a free-threaded build (`python3.13t`, PEP 703) — GIL disabled per-interpreter as a stable opt-in feature (not \\"experimental\\"). Broader adoption expected in 3.14+. PyPy, Jython, IronPython also have different GIL behavior.
