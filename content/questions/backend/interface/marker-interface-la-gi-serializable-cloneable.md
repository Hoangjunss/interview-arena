---
id: marker-interface-la-gi-serializable-cloneable
position: backend
technology: interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Marker interface là gì (Serializable, Cloneable)?

## Question (EN)
What is a marker interface (Serializable, Cloneable)?

## Đáp án chi tiết (VI)
**Marker interface** là interface **rỗng** (không method) — chỉ dùng để **gắn nhãn** một class, báo cho JVM/thư viện rằng class đó có một tính chất nào đó. Ví dụ chuẩn: `Serializable`, `Cloneable`, `RandomAccess`.\
\
```java\
class User implements Serializable { } // \\"class này cho phép serialize\\"\
```\
\
Cơ chế: code khác kiểm tra bằng `instanceof`. `ObjectOutputStream` gặp object không phải `Serializable` → ném `NotSerializableException`; `Object.clone()` gặp object không `Cloneable` → `CloneNotSupportedException`.\
\
Ngày nay **annotation** (`@FunctionalInterface`, `@Override`) thường thay vai trò này vì mang được tham số và kiểm tra lúc compile. Nhưng marker interface vẫn hơn ở một điểm: nó **tạo ra một kiểu (type)**, dùng được trong khai báo tham số để compiler ép buộc — điều annotation không làm được.

## Detailed Answer (EN)
A **marker interface** is an **empty** interface (no methods) — used only to **tag** a class, signalling to the JVM/libraries that the class has some property. Canonical examples: `Serializable`, `Cloneable`, `RandomAccess`.\
\
```java\
class User implements Serializable { } // \\"this class may be serialized\\"\
```\
\
Mechanism: other code checks via `instanceof`. `ObjectOutputStream` hitting a non-`Serializable` object throws `NotSerializableException`; `Object.clone()` on a non-`Cloneable` object throws `CloneNotSupportedException`.\
\
Today **annotations** (`@FunctionalInterface`, `@Override`) often fill this role since they carry parameters and are checked at compile time. But a marker interface still wins on one point: it **defines a type**, usable in a parameter declaration so the compiler enforces it — something an annotation cannot do.
