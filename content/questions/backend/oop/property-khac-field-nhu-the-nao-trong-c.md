---
id: property-khac-field-nhu-the-nao-trong-c
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Property khác field như thế nào trong C#?

## Question (EN)
What are properties and how do they differ from fields in C#?

## Đáp án chi tiết (VI)
Property cung cấp quyền truy cập có kiểm soát vào private field thông qua `get/set` accessors, thực thi encapsulation. Field là biến member trực tiếp. Property cho phép validation, computed values và change notification. Luôn expose public state qua property chứ không phải field. Auto-property (`{ get; set; }`) đơn giản hóa pattern phổ biến nhất.

## Detailed Answer (EN)
Properties provide controlled access to private fields via `get/set` accessors, implementing encapsulation. Fields are direct member variables. Properties enable validation, computed values, and change notifications. Always expose public state through properties, not fields. Auto-properties (`{ get; set; }`) simplify the most common patterns.
