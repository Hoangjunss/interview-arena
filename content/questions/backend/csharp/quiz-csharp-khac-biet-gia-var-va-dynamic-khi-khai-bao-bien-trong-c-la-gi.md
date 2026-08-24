---
id: quiz-csharp-khac-biet-gia-var-va-dynamic-khi-khai-bao-bien-trong-c-la-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa var và dynamic khi khai báo biến trong C# là gì?

## Đáp án trắc nghiệm
- [ ] var có thể được gán lại giá trị thuộc kiểu bất kỳ về sau, còn dynamic thì cố định kiểu
- [ ] dynamic chỉ dùng được cho biến local, giống hệt var
- [ ] Cả var và dynamic đều bỏ qua kiểm tra kiểu lúc biên dịch, chỉ khác cú pháp
- [x] var là suy luận kiểu tĩnh lúc biên dịch; dynamic hoãn kiểm tra kiểu tới runtime

## Giải thích (VI)
var chỉ là suy luận kiểu tĩnh: compiler nhìn biểu thức khởi tạo rồi gán một kiểu cụ thể cố định, kiểm tra kiểu vẫn chặt lúc biên dịch. dynamic là kiểu bỏ kiểm tra tới runtime — mọi truy cập thành viên được phân giải qua DLR/reflection khi chạy, sai thì ném RuntimeBinderException. var là tiện lợi cú pháp; dynamic mới thực sự nới lỏng type checking.

### Giải thích các phương án:
- **var có thể được gán lại giá trị thuộc kiểu bất kỳ về sau, còn dynamic thì cố định kiểu** (Sai): Đảo ngược: biến var đã có kiểu cố định nên không đổi kiểu; dynamic mới cho phép gán và gọi thành viên của kiểu khác nhau lúc runtime.
- **dynamic chỉ dùng được cho biến local, giống hệt var** (Sai): var mới bị giới hạn ở biến local (implicitly typed local). dynamic là một kiểu thật, dùng được cho field, tham số, kiểu trả về.
- **Cả var và dynamic đều bỏ qua kiểm tra kiểu lúc biên dịch, chỉ khác cú pháp** (Sai): var vẫn được kiểm tra kiểu đầy đủ lúc biên dịch; chỉ dynamic mới bỏ kiểm tra tới runtime.
- **var là suy luận kiểu tĩnh lúc biên dịch; dynamic hoãn kiểm tra kiểu tới runtime** (Đúng): var chỉ là suy luận kiểu tĩnh — sau đó biến có kiểu cụ thể cố định. dynamic hoãn mọi phân giải kiểu và thành viên tới lúc chạy. Với dynamic, việc phân giải thành viên do DLR đảm nhiệm lúc chạy.
