---
id: quy-tac-legb-khi-python-tra-cuu-ten-la-gi-global-va-nonlocal-khac-nhau-ra-sao
position: backend
technology: core-language
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy tắc LEGB khi Python tra cứu tên là gì? `global` và `nonlocal` khác nhau ra sao?

## Question (EN)
What is the LEGB rule for name lookup? How do `global` and `nonlocal` differ?

## Đáp án chi tiết (VI)
**LEGB** là thứ tự Python tra một tên: **L**ocal (trong hàm hiện tại) → **E**nclosing (hàm bao ngoài) → **G**lobal (module) → **B**uilt-in. Tìm thấy ở tầng nào thì dừng ở đó.\
\
Mặc định, **gán** một tên bên trong hàm sẽ tạo biến Local — che biến cùng tên ở ngoài. Muốn gán ra ngoài phải khai báo:\
- `global x`: gán vào biến ở scope **module**.\
- `nonlocal x`: gán vào biến ở scope **hàm bao gần nhất** (closure), không phải module.\
\
```python\
def outer():\
    x = 1\
    def inner():\
        nonlocal x\
        x = 2      # sửa x của outer\
    inner()\
    return x       # 2\
```

## Detailed Answer (EN)
**LEGB** is the order Python resolves a name: **L**ocal (current function) → **E**nclosing (outer function) → **G**lobal (module) → **B**uilt-in. Lookup stops at the first match.\
\
By default, **assigning** a name inside a function creates a Local variable — shadowing any outer name. To assign outward you must declare:\
- `global x`: bind the variable in **module** scope.\
- `nonlocal x`: bind the variable in the **nearest enclosing function** scope (a closure), not the module.\
\
```python\
def outer():\
    x = 1\
    def inner():\
        nonlocal x\
        x = 2      # mutates outer's x\
    inner()\
    return x       # 2\
```
