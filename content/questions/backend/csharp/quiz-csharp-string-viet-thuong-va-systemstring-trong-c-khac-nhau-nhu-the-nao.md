---
id: quiz-csharp-string-viet-thuong-va-systemstring-trong-c-khac-nhau-nhu-the-nao
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
string (viết thường) và System.String trong C# khác nhau như thế nào?

## Đáp án trắc nghiệm
- [x] Không khác gì về hành vi — string là ALIAS (từ khoá C#) cho đúng kiểu System.String của .NET
- [ ] string là value type còn System.String là reference type
- [ ] System.String nhiều tính năng hơn — string không gọi được các method như Format hay Join
- [ ] string cấp phát trên stack, System.String cấp phát trên heap nên hiệu năng khác nhau

## Giải thích (VI)
Không có khác biệt hành vi: string là từ khoá alias của C# cho kiểu .NET System.String — compiler sinh cùng một kiểu, cùng IL. Tương tự: int = System.Int32, bool = System.Boolean, object = System.Object. Quy ước phổ biến (được .NET runtime codebase dùng): viết string cho kiểu dữ liệu, chỉ cần String khi gọi static member mà file có using System; — và ngay cả khi đó string.Format(...) vẫn hợp lệ.

### Giải thích các phương án:
- **Không khác gì về hành vi — string là ALIAS (từ khoá C#) cho đúng kiểu System.String của .NET** (Đúng): Tương tự int là alias của System.Int32. Docs C# định nghĩa các keyword kiểu built-in là alias cho kiểu .NET tương ứng; compiler sinh cùng một kiểu, dùng lẫn nhau hoàn toàn tương đương.
- **string là value type còn System.String là reference type** (Sai): Chúng là CÙNG một kiểu nên không thể khác category; string (cả hai cách viết) là reference type.
- **System.String nhiều tính năng hơn — string không gọi được các method như Format hay Join** (Sai): Vì là cùng một kiểu, mọi member đều có ở cả hai cách viết: string.Format(...) và String.Format(...) gọi đúng cùng một method.
- **string cấp phát trên stack, System.String cấp phát trên heap nên hiệu năng khác nhau** (Sai): Không có khác biệt cấp phát hay hiệu năng nào — hai cách viết biên dịch ra cùng một kiểu, cùng IL.
