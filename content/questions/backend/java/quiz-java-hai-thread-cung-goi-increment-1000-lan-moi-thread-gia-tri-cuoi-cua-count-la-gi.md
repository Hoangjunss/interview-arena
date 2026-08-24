---
id: quiz-java-hai-thread-cung-goi-increment-1000-lan-moi-thread-gia-tri-cuoi-cua-count-la-gi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai thread cùng gọi increment() 1.000 lần mỗi thread. Giá trị cuối của count là gì?

## Đáp án trắc nghiệm
- [ ] Luôn đúng 2000 — JVM tự khoá biến volatile trong suốt phép ++ để tránh race condition
- [ ] Lỗi biên dịch — không được dùng toán tử ++ trên biến khai báo volatile
- [x] Có thể nhỏ hơn 2000 — count++ không atomic; volatile chỉ đảm bảo visibility
- [ ] Luôn đúng 2000 — volatile ép mọi read/write đi thẳng main memory nên hai thread không thể xung đột

## Giải thích (VI)
Kết quả có thể nhỏ hơn 2000. count++ gồm 3 bước: đọc — cộng — ghi, không atomic. volatile chỉ đảm bảo visibility (đọc/ghi đi thẳng main memory), không đảm bảo atomicity: hai thread có thể cùng đọc một giá trị rồi ghi đè lẫn nhau — lost update. Sửa đúng: AtomicInteger.incrementAndGet() (CAS, lock-free) hoặc synchronized quanh phép tăng.

### Giải thích các phương án:
- **Luôn đúng 2000 — JVM tự khoá biến volatile trong suốt phép ++ để tránh race condition** (Sai): volatile không tạo lock nào — nó chỉ chèn memory barrier cho read/write đơn lẻ; phép ++ gồm 3 bước vẫn có thể bị xen giữa.
- **Lỗi biên dịch — không được dùng toán tử ++ trên biến khai báo volatile** (Sai): Cú pháp hoàn toàn hợp lệ và compiler không cảnh báo — đây chính là lý do bug này phổ biến: code trông đúng nhưng race lúc runtime.
- **Có thể nhỏ hơn 2000 — count++ không atomic; volatile chỉ đảm bảo visibility** (Đúng): Đúng: count++ là chuỗi 3 bước read-modify-write. Volatile không biến compound operation thành atomic — hai thread cùng đọc giá trị cũ rồi cùng ghi lại là mất một lần tăng (lost update).
- **Luôn đúng 2000 — volatile ép mọi read/write đi thẳng main memory nên hai thread không thể xung đột** (Sai): Visibility không phải mutual exclusion: cả hai thread vẫn có thể đọc CÙNG giá trị từ main memory, cùng cộng 1, rồi lần lượt ghi đè nhau.
