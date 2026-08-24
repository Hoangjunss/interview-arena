---
id: quiz-nodejs-nodejs-duoc-mo-ta-la-don-luong-single-threaded-dieu-do-nghia-la-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Node.js được mô tả là "đơn luồng" (single-threaded) — điều đó nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Toàn bộ tiến trình Node chỉ có đúng một OS thread, kể cả cho I/O
- [ ] Node.js đa luồng: mỗi request được cấp một thread riêng để chạy JavaScript
- [ ] Đơn luồng nghĩa là Node chỉ xử lý được một request tại một thời điểm
- [x] Code JavaScript của ứng dụng chạy trên một luồng duy nhất với event loop

## Giải thích (VI)
Chỉ phần thực thi JavaScript là đơn luồng: một luồng chạy code ứng dụng, điều phối bởi event loop. I/O bất đồng bộ được giao cho kernel (epoll/kqueue/IOCP) và thread pool của libuv, nên một tiến trình Node vẫn phục vụ hàng nghìn kết nối đồng thời mà không cần mỗi request một thread.

### Giải thích các phương án:
- **Toàn bộ tiến trình Node chỉ có đúng một OS thread, kể cả cho I/O** (Sai): Tiến trình Node có nhiều thread: libuv duy trì một thread pool (mặc định 4) cho fs, dns.lookup, crypto... Chỉ luồng chạy JS là một.
- **Node.js đa luồng: mỗi request được cấp một thread riêng để chạy JavaScript** (Sai): Đây là mô hình thread-per-request kiểu server truyền thống. Node đi ngược lại: mọi request chia sẻ một luồng chạy JS, điều phối bằng event loop.
- **Đơn luồng nghĩa là Node chỉ xử lý được một request tại một thời điểm** (Sai): Node xen kẽ (interleave) nhiều request trên một luồng: khi request A chờ I/O, event loop phục vụ request B. Chỉ khi code chặn CPU thì các request khác mới phải chờ.
- **Code JavaScript của ứng dụng chạy trên một luồng duy nhất với event loop** (Đúng): I/O bất đồng bộ được giao cho kernel và thread pool của libuv, nên vẫn phục vụ được nhiều kết nối đồng thời. Chỉ phần thực thi JS là đơn luồng. libuv dùng non-blocking I/O của OS (epoll/kqueue/IOCP) và một thread pool cho fs/dns/crypto, nên Node xử lý hàng nghìn kết nối mà không cần mỗi request một thread.
