---
id: quiz-csharp-trong-c-khi-gap-await-tren-mot-task-chua-hoan-thanh-dieu-gi-thuc-su-xay-ra
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong C#, khi gặp await trên một Task chưa hoàn thành, điều gì thực sự xảy ra?

## Đáp án trắc nghiệm
- [ ] await chặn (block) thread hiện tại cho tới khi Task hoàn thành, giống Task.Wait()
- [ ] Task bắt đầu chạy chỉ khi gặp await; trước đó nó chưa được khởi động
- [ ] await luôn tạo một thread mới để chạy phần code phía sau nó
- [x] Method trả điều khiển về caller ngay lập tức

## Giải thích (VI)
Khi await một Task chưa xong, method không chặn thread mà trả điều khiển về caller ngay; compiler biến phần còn lại thành continuation, chạy tiếp khi Task hoàn thành. Nhờ vậy một thread (ví dụ UI hay request thread) được giải phóng để làm việc khác thay vì đứng chờ I/O.

### Giải thích các phương án:
- **await chặn (block) thread hiện tại cho tới khi Task hoàn thành, giống Task.Wait()** (Sai): Đó chính là điều await tránh. Task.Wait()/.Result mới block đồng bộ và dễ gây deadlock; await giải phóng thread.
- **Task bắt đầu chạy chỉ khi gặp await; trước đó nó chưa được khởi động** (Sai): Một Task từ method async đã chạy từ khi được gọi (hot task); await chỉ quyết định khi nào chờ kết quả, không phải khi nào bắt đầu.
- **await luôn tạo một thread mới để chạy phần code phía sau nó** (Sai): await không tự spawn thread. Continuation có thể chạy lại trên thread cũ (qua SynchronizationContext) hoặc thread pool, tuỳ ngữ cảnh — không phải luôn thread mới.
- **Method trả điều khiển về caller ngay lập tức** (Đúng): Phần còn lại được đăng ký làm continuation và chạy tiếp khi Task hoàn thành, không chặn thread. await không block: nó đăng ký continuation cho Task và trả control về caller, giải phóng thread cho tới khi Task xong.
