---
id: quiz-csharp-khac-biet-chinh-gia-abstract-class-va-interface-trong-c-ke-tu-c-8-la-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt chính giữa abstract class và interface trong C# (kể từ C# 8) là gì?

## Đáp án trắc nghiệm
- [x] Chỉ kế thừa được một abstract class nhưng implement được nhiều interface
- [ ] Abstract class có thể được khởi tạo trực tiếp bằng new, còn interface thì không
- [ ] Một class có thể kế thừa nhiều abstract class cùng lúc, giống như implement nhiều interface
- [ ] Interface không bao giờ có thể chứa phần thân method, còn abstract class thì có

## Giải thích (VI)
Điểm khác nền tảng: một class chỉ kế thừa được một abstract class (đơn kế thừa) nhưng implement được nhiều interface. Abstract class có thể mang state — field, constructor, method đã cài đặt — mô hình quan hệ "is-a" và chia sẻ code cơ sở. Interface mô tả một hợp đồng/khả năng ("can-do"), không có instance field; từ C# 8 nó có thể có default method nhưng vẫn không lưu trạng thái.

### Giải thích các phương án:
- **Chỉ kế thừa được một abstract class nhưng implement được nhiều interface** (Đúng): Đây là khác biệt cốt lõi còn đúng: đơn kế thừa lớp vs đa implement interface, và abstract class có state/constructor còn interface không có instance field. Abstract class còn mang được state (field, constructor), trong khi interface không có instance field.
- **Abstract class có thể được khởi tạo trực tiếp bằng new, còn interface thì không** (Sai): Không thể new một abstract class trực tiếp — phải qua lớp con cụ thể, giống như interface phải qua lớp implement.
- **Một class có thể kế thừa nhiều abstract class cùng lúc, giống như implement nhiều interface** (Sai): C# chỉ cho đơn kế thừa lớp; đa kế thừa nhiều abstract class là không được phép.
- **Interface không bao giờ có thể chứa phần thân method, còn abstract class thì có** (Sai): Từ C# 8, interface hỗ trợ default implementation (có thân method). Nên "interface không bao giờ có thân method" không còn đúng.
