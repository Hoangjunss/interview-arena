---
id: quiz-cs-fundamentals-khac-biet-co-ban-gia-process-va-thread-la-gi
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cơ bản giữa process và thread là gì?

## Đáp án trắc nghiệm
- [ ] Process nhẹ hơn thread nên tạo mới nhanh hơn nhiều
- [ ] Thread do hệ điều hành quản lý, process do ngôn ngữ lập trình quản lý
- [ ] Process chạy song song thật còn thread chỉ luân phiên trên một lõi
- [x] Process có không gian địa chỉ riêng; thread cùng process dùng chung

## Giải thích (VI)
Process sở hữu không gian địa chỉ riêng, được hệ điều hành cô lập với nhau. Thread là đơn vị lập lịch bên trong một process: các thread dùng chung heap, mã và file descriptor, chỉ có stack và thanh ghi riêng. Hệ quả: thread trao đổi dữ liệu trực tiếp nhưng cần đồng bộ, process phải qua IPC nhưng lỗi ở process này không làm hỏng process kia.

### Giải thích các phương án:
- **Process nhẹ hơn thread nên tạo mới nhanh hơn nhiều** (Sai): Ngược lại: tạo process phải dựng bảng trang và không gian địa chỉ mới, tốn kém hơn hẳn so với tạo thread trong process sẵn có.
- **Thread do hệ điều hành quản lý, process do ngôn ngữ lập trình quản lý** (Sai): Cả hai đều là đối tượng do hệ điều hành lập lịch; ngôn ngữ chỉ bọc lại API. Green thread do runtime quản lý là khái niệm khác.
- **Process chạy song song thật còn thread chỉ luân phiên trên một lõi** (Sai): Thread cũng được hệ điều hành lập lịch lên nhiều lõi và chạy song song thật; số lõi mới là yếu tố quyết định, không phải việc là thread hay process.
- **Process có không gian địa chỉ riêng; thread cùng process dùng chung** (Đúng): Đây là ranh giới quyết định mọi hệ quả khác: thread chia sẻ heap nên trao đổi dữ liệu trực tiếp và cần đồng bộ, còn process phải giao tiếp qua IPC.
