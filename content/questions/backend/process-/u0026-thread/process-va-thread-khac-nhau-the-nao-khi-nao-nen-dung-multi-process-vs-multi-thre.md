---
id: process-va-thread-khac-nhau-the-nao-khi-nao-nen-dung-multi-process-vs-multi-thre
position: backend
technology: process-\u0026-thread
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Process và Thread khác nhau thế nào? Khi nào nên dùng multi-process vs multi-thread?

## Question (EN)
How do processes and threads differ? When should you use multi-process vs multi-thread?

## Đáp án chi tiết (VI)
Process là đơn vị thực thi độc lập với không gian bộ nhớ riêng (virtual address space, heap, stack, file descriptors). Thread là đơn vị thực thi nhẹ hơn bên trong process: các thread cùng process chia sẻ heap/code/file descriptors nhưng có stack riêng. Tạo process tốn kém hơn thread (fork copy page tables), giao tiếp giữa process phức tạp hơn (IPC), nhưng cô lập tốt hơn — crash một process không ảnh hưởng process khác.\
\
Multi-process phù hợp: Chrome (mỗi tab là process riêng để cô lập crash/security), Node.js cluster module để tận dụng CPU cores. Multi-thread phù hợp: ứng dụng cần chia sẻ dữ liệu nhiều và frequent (Java web server, game engine). Với Python, GIL (Global Interpreter Lock) ngăn true parallelism trong threads — phải dùng multiprocessing. Go goroutines là green threads cực nhẹ (~2KB stack), runtime scheduler map M goroutines lên N OS threads.

## Detailed Answer (EN)
$89
