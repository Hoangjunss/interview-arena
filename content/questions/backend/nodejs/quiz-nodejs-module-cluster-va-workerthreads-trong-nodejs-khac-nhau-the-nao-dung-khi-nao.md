---
id: quiz-nodejs-module-cluster-va-workerthreads-trong-nodejs-khac-nhau-the-nao-dung-khi-nao
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module cluster và worker_threads trong Node.js khác nhau thế nào, dùng khi nào?

## Đáp án trắc nghiệm
- [x] cluster fork nhiều TIẾN TRÌNH Node, chia sẻ được server port
- [ ] cluster tạo các luồng nhẹ chia sẻ bộ nhớ với process chính nên rẻ hơn worker threads
- [ ] worker_threads cho phép nhiều thread cùng listen một port, còn cluster thì không
- [ ] Hai module là một, worker_threads chỉ là tên mới của cluster

## Giải thích (VI)
cluster fork nhiều tiến trình Node con — mỗi worker có event loop, V8 và bộ nhớ riêng — và cho phép chúng chia sẻ cùng server port để tận dụng nhiều core cho workload I/O (HTTP server). worker_threads tạo thread trong cùng một tiến trình, trao đổi qua message và chia sẻ được bộ nhớ (SharedArrayBuffer); docs ghi rõ nó hợp cho tác vụ CPU-intensive, không giúp nhiều cho I/O.

### Giải thích các phương án:
- **cluster fork nhiều TIẾN TRÌNH Node, chia sẻ được server port** (Đúng): Đúng theo docs hai module: cluster nhân bản process để phân tải kết nối qua nhiều core; worker threads chạy JS song song trong một process, trao đổi qua message hoặc chia sẻ SharedArrayBuffer — docs worker threads nói rõ nó hữu ích cho CPU-intensive, không giúp nhiều cho I/O. Mỗi tiến trình có event loop và bộ nhớ riêng, phù hợp scale I/O trên nhiều core.
- **cluster tạo các luồng nhẹ chia sẻ bộ nhớ với process chính nên rẻ hơn worker threads** (Sai): cluster fork các PROCESS đầy đủ — mỗi worker có V8 instance và bộ nhớ riêng, nặng hơn thread. Chia sẻ bộ nhớ là khả năng của worker threads (SharedArrayBuffer), không phải cluster.
- **worker_threads cho phép nhiều thread cùng listen một port, còn cluster thì không** (Sai): Ngược lại: chia sẻ server port giữa các worker là tính năng đặc trưng của cluster (master phân phối kết nối). worker threads không có cơ chế chia sẻ port — nó nhắm tới tính toán, không phải phục vụ kết nối.
- **Hai module là một, worker_threads chỉ là tên mới của cluster** (Sai): Là hai module tách biệt với mô hình khác hẳn: cluster = nhiều process, worker threads = nhiều thread trong một process. Cả hai vẫn tồn tại song song trong Node hiện tại.
