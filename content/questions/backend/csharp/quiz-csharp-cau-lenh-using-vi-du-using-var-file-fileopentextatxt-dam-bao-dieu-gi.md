---
id: quiz-csharp-cau-lenh-using-vi-du-using-var-file-fileopentextatxt-dam-bao-dieu-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu lệnh using (ví dụ using var file = File.OpenText("a.txt");) đảm bảo điều gì?

## Đáp án trắc nghiệm
- [ ] Mọi exception ném ra bên trong khối using bị nuốt tự động, code phía sau chạy tiếp
- [x] Dispose() của object được gọi khi ra khỏi scope, kể cả khi có exception
- [ ] Chỉ dùng được với các class thao tác file như FileStream, StreamReader
- [ ] Object bị garbage collect ngay lập tức khi ra khỏi khối using

## Giải thích (VI)
using đảm bảo Dispose() được gọi khi thoát scope, kể cả khi exception được ném — compiler sinh code tương đương try/finally với Dispose() trong finally. Nó dùng được với mọi kiểu implement IDisposable, không riêng gì file. Lưu ý: Dispose giải phóng tài nguyên (handle, connection) một cách xác định; bộ nhớ của object vẫn do GC thu hồi sau.

### Giải thích các phương án:
- **Mọi exception ném ra bên trong khối using bị nuốt tự động, code phía sau chạy tiếp** (Sai): using không bắt hay nuốt exception — nó chỉ đảm bảo Dispose() chạy trước khi exception tiếp tục lan lên caller.
- **Dispose() của object được gọi khi ra khỏi scope, kể cả khi có exception** (Đúng): Compiler sinh ra tương đương một khối try/finally. Đúng theo docs: using được biên dịch thành try/finally với Dispose() trong finally, nên tài nguyên luôn được giải phóng xác định dù có exception.
- **Chỉ dùng được với các class thao tác file như FileStream, StreamReader** (Sai): using áp dụng cho bất kỳ kiểu nào implement IDisposable (hoặc IAsyncDisposable với await using): DB connection, HttpClient handler, timer, lock scope...
- **Object bị garbage collect ngay lập tức khi ra khỏi khối using** (Sai): using chỉ gọi Dispose() để giải phóng tài nguyên (file handle, connection...); bộ nhớ của object vẫn do GC thu hồi sau, vào thời điểm không xác định.
