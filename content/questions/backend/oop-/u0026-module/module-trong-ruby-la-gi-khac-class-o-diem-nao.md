---
id: module-trong-ruby-la-gi-khac-class-o-diem-nao
position: backend
technology: oop-\u0026-module
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module trong Ruby là gì? Khác class ở điểm nào?

## Question (EN)
What is a module in Ruby? How does it differ from a class?

## Đáp án chi tiết (VI)
Module là tập hợp method và constant — **không thể khởi tạo**, không thể kế thừa. Hai vai trò chính:\
1. **Namespace** — tránh trùng tên: `Payments::Invoice` vs `Mailer::Invoice`.\
2. **Mixin** — `include` vào class để chia sẻ method.\
\
| | Class | Module |\
|---|---|---|\
| Khởi tạo | `new` | Không |\
| Kế thừa | `\u003c` | Không |\
| Mixin | Không | `include` / `extend` / `prepend` |

## Detailed Answer (EN)
A module is a collection of methods and constants — it **cannot be instantiated** and cannot be inherited from. Two main roles:\
1. **Namespace** — prevent name clashes: `Payments::Invoice` vs `Mailer::Invoice`.\
2. **Mixin** — `include` into classes to share methods.\
\
| | Class | Module |\
|---|---|---|\
| Instantiation | `new` | No |\
| Inheritance | `\u003c` | No |\
| Mixin | No | `include` / `extend` / `prepend` |
