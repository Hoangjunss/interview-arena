---
id: interface-la-gi-va-c-ho-tro-multiple-inheritance-nhu-the-nao
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interface là gì và C# hỗ trợ multiple inheritance như thế nào?

## Question (EN)
What is an interface and how does C# support multiple inheritance?

## Đáp án chi tiết (VI)
Interface là một contract chỉ định các method/property mà class phải implement. C# không hỗ trợ kế thừa nhiều class nhưng cho phép implement nhiều interface. Điều này giúp đạt được polymorphism trên các type không liên quan nhau. Implement nhiều interface để thỏa mãn nhiều contract đồng thời — đây là cách thay thế thực tế cho multiple class inheritance.

## Detailed Answer (EN)
An interface is a contract specifying what methods/properties a class must implement. C# does not support multiple class inheritance but allows implementing multiple interfaces. This enables polymorphism across unrelated types. Implement multiple interfaces to satisfy multiple contracts simultaneously — this is the practical substitute for multiple class inheritance.
