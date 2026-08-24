---
id: quiz-csharp-khac-biet-gia-const-va-readonly-trong-c-la-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa const và readonly trong C# là gì?

## Đáp án trắc nghiệm
- [ ] readonly chỉ dùng cho kiểu số, còn const dùng cho mọi kiểu kể cả object phức tạp
- [ ] const có thể gán lại nhiều lần sau khi khai báo, còn readonly thì không
- [x] const là hằng compile-time và ngầm static; readonly gán được trong constructor
- [ ] Cả hai đều tương đương nhau, chỉ khác tên gọi

## Giải thích (VI)
const là hằng compile-time: phải gán ngay khi khai báo bằng một biểu thức hằng, ngầm là static, và giá trị bị inline thẳng vào nơi dùng lúc biên dịch. readonly là hằng runtime: chỉ gán được một lần — khi khai báo hoặc trong constructor — nên giá trị có thể tính lúc chạy và khác nhau theo từng instance. Dùng const cho hằng thật sự bất biến; readonly cho giá trị cố định-sau-khởi-tạo.

### Giải thích các phương án:
- **readonly chỉ dùng cho kiểu số, còn const dùng cho mọi kiểu kể cả object phức tạp** (Sai): Ngược lại: const chỉ áp cho kiểu compile-time constant (số, bool, string, enum, hoặc null); readonly dùng được cho mọi kiểu kể cả reference type.
- **const có thể gán lại nhiều lần sau khi khai báo, còn readonly thì không** (Sai): const không bao giờ gán lại được; readonly cũng chỉ gán một lần (khai báo hoặc constructor), không phải sau đó.
- **const là hằng compile-time và ngầm static; readonly gán được trong constructor** (Đúng): const chốt giá trị lúc biên dịch và bị inline vào call site; readonly cho phép gán trong constructor nên giá trị có thể phụ thuộc runtime/instance. Giá trị const bị inline vào call site, còn readonly cho phép mỗi instance mang giá trị khác nhau.
- **Cả hai đều tương đương nhau, chỉ khác tên gọi** (Sai): Khác nhau rõ: thời điểm cố định giá trị (compile-time vs runtime) và nơi được phép gán.
