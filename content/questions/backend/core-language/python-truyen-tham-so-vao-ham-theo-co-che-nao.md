---
id: python-truyen-tham-so-vao-ham-theo-co-che-nao
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Python truyền tham số vào hàm theo cơ chế nào?

## Question (EN)
How does Python pass arguments to functions?

## Đáp án chi tiết (VI)
Python dùng cơ chế thường gọi là **pass-by-object-reference** (hay \\"call by assignment\\"): mỗi tham số được **gán** vào đúng object mà caller truyền vào — không copy object, cũng không phải pass-by-reference kiểu C++.\
\
Hệ quả tùy object là mutable hay không:\
- **Mutable** (list, dict, set): sửa tại chỗ (`.append`, gán phần tử) → caller thấy thay đổi.\
- **Rebind** (gán lại tên tham số) → chỉ đổi tên local, caller không thấy.\
- **Immutable** (int, str, tuple): mọi phép \\"đổi\\" thực ra tạo object mới, bản gốc không đổi.\
\
```python\
def f(xs, n):\
    xs.append(1)   # mutate → caller thấy\
    n = n + 1      # rebind → caller không thấy\
```

## Detailed Answer (EN)
Python uses what is usually called **pass-by-object-reference** (or \\"call by assignment\\"): each parameter is **bound** to the same object the caller passed in — no copy is made, and it is not C++-style pass-by-reference.\
\
The effect depends on mutability:\
- **Mutable** (list, dict, set): mutating in place (`.append`, item assignment) → the caller sees it.\
- **Rebinding** the parameter name → only the local name changes; the caller does not.\
- **Immutable** (int, str, tuple): any \\"change\\" builds a new object, leaving the original untouched.\
\
```python\
def f(xs, n):\
    xs.append(1)   # mutate → caller sees it\
    n = n + 1      # rebind → caller does not\
```
