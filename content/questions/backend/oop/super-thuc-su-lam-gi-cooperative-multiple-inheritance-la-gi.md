---
id: super-thuc-su-lam-gi-cooperative-multiple-inheritance-la-gi
position: backend
technology: oop
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`super()` thực sự làm gì? Cooperative multiple inheritance là gì?

## Question (EN)
What does `super()` actually do? What is cooperative multiple inheritance?

## Đáp án chi tiết (VI)
`super()` **không** \\"gọi class cha\\" mà **ủy quyền cho class kế tiếp trong MRO** (Method Resolution Order) của instance thực tế. MRO tính bằng thuật toán **C3 linearization**, phụ thuộc lớp cụ thể đang khởi tạo chứ không cố định vào lớp bạn viết `super()`.\
\
Nhờ đó, trong **đa kế thừa**, nếu mọi class trong cây đều gọi `super().method(...)`, chuỗi ủy quyền sẽ nối qua **tất cả** class đúng một lần theo MRO — gọi là **cooperative multiple inheritance**.\
\
Điều kiện để hợp tác đúng: các method cùng chữ ký (hoặc dùng `*args, **kwargs`) và mỗi class đều gọi `super()`. Nếu một class quên gọi, chuỗi bị đứt.

## Detailed Answer (EN)
`super()` does **not** \\"call the parent class\\" — it **delegates to the next class in the MRO** (Method Resolution Order) of the actual instance. The MRO is computed by **C3 linearization** and depends on the concrete class being instantiated, not on where you wrote `super()`.\
\
So in **multiple inheritance**, if every class in the tree calls `super().method(...)`, the delegation chain threads through **all** classes exactly once along the MRO — this is **cooperative multiple inheritance**.\
\
For it to work, methods must share a compatible signature (or use `*args, **kwargs`) and each class must call `super()`. If one class forgets, the chain breaks.
