---
id: dup-va-clone-trong-ruby-khac-nhau-the-nao
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`dup` và `clone` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `dup` and `clone` in Ruby?

## Đáp án chi tiết (VI)
Cả hai tạo **shallow copy** của object — instance variable được sao chép theo tham chiếu (nested object vẫn là cùng 1 object). Điểm khác biệt:\
\
| | `dup` | `clone` |\
|---|---|---|\
| Giữ frozen state | Không — luôn tạo object mutable | Có — copy vẫn frozen nếu original frozen |\
| Giữ singleton methods | Không | Có |\
| Giữ extended modules | Không | Có |\
\
```ruby\
original = \\"hello\\".freeze\
\
original.dup.frozen?    # =\u003e false  — unfrozen copy\
original.clone.frozen?  # =\u003e true   — vẫn frozen\
\
# Singleton method\
obj = Object.new\
def obj.greet = \\"hi\\"\
\
obj.dup.greet    # =\u003e NoMethodError — singleton không được copy\
obj.clone.greet  # =\u003e \\"hi\\"\
```\
\
**Quy tắc:** `dup` khi muốn bản sao mutable sạch; `clone` khi cần giữ nguyên tính chất object.

## Detailed Answer (EN)
Both create a **shallow copy** — instance variables are copied by reference (nested objects remain the same). Key differences:\
\
| | `dup` | `clone` |\
|---|---|---|\
| Preserves frozen state | No — always creates mutable copy | Yes — copy is frozen if original is frozen |\
| Preserves singleton methods | No | Yes |\
| Preserves extended modules | No | Yes |\
\
```ruby\
original = \\"hello\\".freeze\
\
original.dup.frozen?    # =\u003e false\
original.clone.frozen?  # =\u003e true\
\
# Singleton method\
obj = Object.new\
def obj.greet = \\"hi\\"\
\
obj.dup.greet    # =\u003e NoMethodError\
obj.clone.greet  # =\u003e \\"hi\\"\
```\
\
**Rule:** use `dup` for a clean mutable copy; use `clone` when the full character of the object must be preserved.
