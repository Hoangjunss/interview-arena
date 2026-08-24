---
id: event-khac-delegate-nhu-the-nao
position: backend
technology: events
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event khác delegate như thế nào?

## Question (EN)
How does an event differ from a delegate?

## Đáp án chi tiết (VI)
`event` là một lớp **bọc bảo vệ** quanh một delegate. Bản thân delegate là \\"kiểu\\" giữ danh sách method; `event` thêm giới hạn **quyền truy cập** để đóng gói mô hình publisher/subscriber.\
\
Từ **bên ngoài** class khai báo, với một `event` bạn **chỉ** làm được:\
- `+=` để đăng ký, `-=` để hủy đăng ký.\
\
Bạn **không** thể:\
- Gán đè `=` (xóa sạch mọi subscriber của người khác).\
- **Kích hoạt (raise)** event từ ngoài — chỉ chính class chủ mới được gọi.\
\
```csharp\
public event EventHandler? Saved;   // ngoài class chỉ được += / -=\
// còn delegate public thì ai cũng gọi được, gán = được → mất kiểm soát\
```\
\
**Chốt:** delegate là cơ chế; event là **hợp đồng an toàn** dựng trên delegate — publisher độc quyền phát tín hiệu, subscriber chỉ được lắng nghe. Đây là lý do API .NET công khai `event` chứ không công khai delegate field trần.

## Detailed Answer (EN)
An `event` is a **protective wrapper** around a delegate. The delegate itself is the \\"type\\" that holds the method list; `event` adds **access restrictions** to encapsulate the publisher/subscriber model.\
\
From **outside** the declaring class, an `event` lets you **only**:\
- `+=` to subscribe and `-=` to unsubscribe.\
\
You **cannot**:\
- Reassign with `=` (which would wipe out everyone else's subscribers).\
- **Raise** the event from outside — only the owning class may invoke it.\
\
```csharp\
public event EventHandler? Saved;   // outside the class: only += / -=\
// a public delegate field, by contrast, anyone can invoke or reassign → no control\
```\
\
**Bottom line:** the delegate is the mechanism; the event is a **safe contract** built on it — the publisher exclusively raises the signal and subscribers may only listen. That is why .NET APIs expose `event`s rather than bare delegate fields.
