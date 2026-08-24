---
id: khi-nao-nen-dung-structural-patterns-cach-chon-dung
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Structural patterns? Cách chọn đúng?

## Question (EN)
When should you use Structural patterns? How do you choose the right one?

## Đáp án chi tiết (VI)
Structural patterns giải quyết cách compose class và object thành larger structures. Chọn theo use case:\
\
- **Adapter**: tích hợp incompatible interface (thường là third-party lib)\
- **Bridge**: thiết kế mới cần tách abstraction-implementation để scale độc lập\
- **Composite**: dữ liệu có dạng tree, cần treat leaf/branch đồng nhất\
- **Decorator**: thêm behavior tại runtime mà không sửa class gốc\
- **Facade**: đơn giản hóa subsystem phức tạp cho client\
- **Proxy**: control access hoặc add cross-cutting concern (logging, caching, auth)\
- **Flyweight**: memory optimization critical với nhiều objects tương đồng\
\
Nhiều pattern Structural có thể kết hợp — Facade có thể dùng bên trong các Proxy; Decorator và Composite hay đi cùng nhau trong UI tree.

## Detailed Answer (EN)
Structural patterns address how to compose classes and objects into larger structures. Choose by use case: use **Adapter** when integrating an incompatible interface (typically a third-party library); use **Bridge** when a new design needs to separate abstraction from implementation so they can scale independently; use **Composite** when data forms a tree and you need to treat leaves and branches uniformly; use **Decorator** when you need to add behavior at runtime without modifying the original class; use **Facade** when a complex subsystem needs a simpler interface for clients; use **Proxy** when you need access control or want to add a cross-cutting concern (logging, caching, auth) without touching the original; use **Flyweight** when memory optimization is critical and there are large numbers of similar objects. Rule of thumb: many Structural patterns can be combined — a Facade can be backed by Proxies; Decorator and Composite often appear together in UI trees.
