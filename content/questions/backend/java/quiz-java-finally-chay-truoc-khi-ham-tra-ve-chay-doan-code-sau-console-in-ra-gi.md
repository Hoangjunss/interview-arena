---
id: quiz-java-finally-chay-truoc-khi-ham-tra-ve-chay-doan-code-sau-console-in-ra-gi
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
finally chạy trước khi hàm trả về — chạy đoạn code sau, console in ra gì?

## Đáp án trắc nghiệm
- [x] In "finally" rồi 1 — giá trị return tính trước, finally chạy rồi mới trả về
- [ ] Lỗi biên dịch — không được đặt return bên trong khối try có finally
- [ ] In 1 rồi mới in "finally" — method trả về trước, khối finally chạy dọn dẹp sau
- [ ] Chỉ in 1 — return trong try kết thúc method ngay lập tức nên finally bị bỏ qua

## Giải thích (VI)
In "finally" rồi in 1. Thứ tự theo JLS: biểu thức return trong try được tính trước (giá trị 1 được giữ lại), rồi finally chạy, rồi method trả giá trị đã giữ. finally luôn chạy dù try kết thúc bằng return hay exception — chỉ System.exit() hoặc JVM crash mới bỏ qua. Lưu ý: đặt return trong finally sẽ ghi đè cả return lẫn exception của try — nên tránh.

### Giải thích các phương án:
- **In "finally" rồi 1 — giá trị return tính trước, finally chạy rồi mới trả về** (Đúng): Đúng thứ tự theo JLS: return trong try không nhảy thẳng ra ngoài — control phải đi qua finally trước khi method hoàn tất việc trả giá trị đã tính.
- **Lỗi biên dịch — không được đặt return bên trong khối try có finally** (Sai): return trong try đi kèm finally là cú pháp hợp lệ và phổ biến — JLS định nghĩa rõ thứ tự thực thi cho đúng trường hợp này.
- **In 1 rồi mới in "finally" — method trả về trước, khối finally chạy dọn dẹp sau** (Sai): finally chạy TRƯỚC khi control rời method — nên "finally" xuất hiện trên console trước giá trị 1 mà caller in ra.
- **Chỉ in 1 — return trong try kết thúc method ngay lập tức nên finally bị bỏ qua** (Sai): finally luôn chạy dù try kết thúc bằng return, break hay exception — chỉ System.exit() hoặc JVM crash mới bỏ qua được finally.
