---
id: delegate-la-gi-multicast-delegate-hoat-dong-the-nao
position: backend
technology: delegates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Delegate là gì? Multicast delegate hoạt động thế nào?

## Question (EN)
What is a delegate? How does a multicast delegate work?

## Đáp án chi tiết (VI)
**Delegate** là một kiểu **an toàn kiểu (type-safe)** trỏ tới một hoặc nhiều method có cùng chữ ký. Nó cho phép truyền method như một tham số — nền tảng của callback, event và LINQ.\
\
```csharp\
Action\u003cstring\u003e log = Console.WriteLine;\
log(\\"hello\\");            // gọi qua delegate\
```\
\
**Multicast:** một delegate có thể giữ **danh sách nhiều method** (invocation list). Dùng `+=` để thêm, `-=` để bớt; khi gọi, tất cả chạy **theo thứ tự đăng ký**.\
\
```csharp\
Action pipe = () =\u003e Console.Write(\\"A\\");\
pipe += () =\u003e Console.Write(\\"B\\");\
pipe();                  // in \\"AB\\"\
```\
\
Lưu ý: với delegate có giá trị trả về, multicast chỉ trả về **kết quả của method cuối cùng** (các kết quả trước bị bỏ). Nếu một method trong chuỗi ném exception, các method còn lại **không chạy**. `Func\u003c\u003e`, `Action\u003c\u003e`, `Predicate\u003c\u003e` là các delegate dựng sẵn của .NET.

## Detailed Answer (EN)
A **delegate** is a **type-safe** type that points to one or more methods sharing the same signature. It lets you pass a method as a parameter — the basis of callbacks, events, and LINQ.\
\
```csharp\
Action\u003cstring\u003e log = Console.WriteLine;\
log(\\"hello\\");            // invoke via the delegate\
```\
\
**Multicast:** a single delegate can hold a **list of methods** (invocation list). Use `+=` to add and `-=` to remove; when invoked, all run **in subscription order**.\
\
```csharp\
Action pipe = () =\u003e Console.Write(\\"A\\");\
pipe += () =\u003e Console.Write(\\"B\\");\
pipe();                  // prints \\"AB\\"\
```\
\
Note: for a delegate with a return value, multicast returns only the **last method's result** (earlier ones are discarded). If one method in the chain throws, the remaining ones **do not run**. `Func\u003c\u003e`, `Action\u003c\u003e`, and `Predicate\u003c\u003e` are .NET's built-in delegate types.
