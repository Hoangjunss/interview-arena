---
id: nhuoc-diem-cua-node-js-la-gi-khi-nao-khong-nen-dung
position: backend
technology: node.js-core
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nhược điểm của Node.js là gì? Khi nào KHÔNG nên dùng?

## Question (EN)
What are the weaknesses of Node.js? When should you NOT use it?

## Đáp án chi tiết (VI)
Điểm mạnh của Node (một luồng + event loop) cũng là điểm yếu: mọi request chia sẻ **một luồng chạy JS**.\
\
- **Tác vụ CPU-bound làm nghẽn event loop**: một vòng lặp nặng hay hàm đồng bộ tốn CPU sẽ **chặn** luồng, khiến mọi request khác phải chờ. Đây là lý do chính khiến Node không hợp cho việc tính toán nặng.\
- Ví dụ nên tránh: xử lý ảnh/video, mã hóa/hash quy mô lớn, nén dữ liệu lớn, tính toán khoa học.\
- Callback lồng nhau dễ rối (giảm nhẹ bằng `async/await`).\
\
**Khi nào không nên dùng**: workload chủ yếu là CPU-bound. Nếu vẫn dùng Node, hãy đẩy phần nặng sang **`worker_threads`**, **child process**, hàng đợi job, hoặc service riêng — để event loop luôn rảnh phục vụ I/O. Node tỏa sáng ở việc I/O-bound (API, realtime, proxy), không phải tính toán thô.

## Detailed Answer (EN)
Node's strength (single thread + event loop) is also its weakness: every request shares **one JS-executing thread**.\
\
- **CPU-bound work blocks the event loop**: a heavy loop or CPU-costly synchronous function **blocks** the thread, forcing every other request to wait. This is the main reason Node is a poor fit for heavy computation.\
- Cases to avoid: image/video processing, large-scale encryption/hashing, big-data compression, scientific computing.\
- Deeply nested callbacks get messy (eased by `async/await`).\
\
**When not to use it**: predominantly CPU-bound workloads. If you still use Node, offload the heavy part to **`worker_threads`**, a **child process**, a job queue, or a separate service — so the event loop stays free for I/O. Node shines at I/O-bound work (APIs, realtime, proxies), not raw computation.
