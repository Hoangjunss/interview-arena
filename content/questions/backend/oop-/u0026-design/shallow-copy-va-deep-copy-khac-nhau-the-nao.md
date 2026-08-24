---
id: shallow-copy-va-deep-copy-khac-nhau-the-nao
position: backend
technology: oop-\u0026-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Shallow copy và deep copy khác nhau thế nào?

## Question (EN)
How do shallow copy and deep copy differ?

## Đáp án chi tiết (VI)
| | **Shallow copy** | **Deep copy** |\
|---|---|---|\
| Copy gì | Object ngoài cùng; field object bên trong **dùng chung reference** | Đệ quy copy **toàn bộ object graph** |\
| Hệ quả | Sửa object con → **cả 2 bản cùng thấy** | 2 bản độc lập hoàn toàn |\
| Chi phí | Rẻ | Đắt hơn (đi hết graph) |\
\
`Object.clone()` mặc định là **shallow**. Muốn deep copy:\
- **Copy constructor** (khuyến nghị) — tường minh, không dính `Cloneable` (interface bị cộng đồng coi là thiết kế lỗi).\
- Serialize → deserialize (chậm, tiện cho graph phức tạp), hoặc mapper (Jackson, ModelMapper).\
\
**Khi shallow là đủ:** field bên trong đều **immutable** (String, Integer, LocalDate, record) — dùng chung reference cũng không ai sửa được.\
\
**Trap phỏng vấn:** `new ArrayList\u003c\u003e(list)` chỉ copy **list**, không copy phần tử — 2 list khác nhau nhưng element vẫn chung reference; sửa `list.get(0).setX(...)` là bản kia thấy ngay.

## Detailed Answer (EN)
| | **Shallow copy** | **Deep copy** |\
|---|---|---|\
| What is copied | The outer object; inner object fields **share references** | The **entire object graph**, recursively |\
| Consequence | Mutating a child object → **both copies see it** | Two fully independent copies |\
| Cost | Cheap | More expensive (walks the graph) |\
\
`Object.clone()` is **shallow** by default. For deep copies:\
- **Copy constructor** (recommended) — explicit, avoids `Cloneable` (widely considered a broken design).\
- Serialize → deserialize (slow, convenient for complex graphs), or mappers (Jackson, ModelMapper).\
\
**When shallow is enough:** all inner fields are **immutable** (String, Integer, LocalDate, records) — shared references cannot be mutated by anyone.\
\
**Interview trap:** `new ArrayList\u003c\u003e(list)` copies only **the list**, not its elements — two distinct lists whose elements still share references; `list.get(0).setX(...)` is instantly visible in the other copy.
