---
id: pointer-trong-go-la-gi-khi-nao-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pointer trong Go là gì? Khi nào dùng?

## Question (EN)
What are pointers in Go? When should you use them?

## Đáp án chi tiết (VI)
`*int` là pointer type, `\u0026x` lấy address, `*p` dereference. Go không có pointer arithmetic như C. nil pointer gây panic.\
```go\
x := 42\
p := \u0026x      // p là *int, trỏ đến x\
fmt.Println(*p) // 42 — dereference\
\
*p = 100\
fmt.Println(x)  // 100 — modify qua pointer\
\
// Dùng pointer để modify tham số\
func increment(n *int) {\
    *n++\
}\
increment(\u0026x)\
\
// Pointer receiver — modify struct gốc\
func (u *User) SetAge(age int) {\
    u.Age = age\
}\
```\
Dùng pointer khi: (1) muốn modify giá trị gốc. (2) struct lớn (tránh copy). (3) method cần modify receiver.

## Detailed Answer (EN)
`*int` is a pointer type, `\u0026x` gets the address, `*p` dereferences it. Go has no pointer arithmetic. Dereferencing a nil pointer causes a panic.\
```go\
x := 42\
p := \u0026x         // p is *int, points to x\
fmt.Println(*p) // 42 — dereference\
\
*p = 100\
fmt.Println(x)  // 100 — modified via pointer\
\
// Use pointer to mutate a parameter\
func increment(n *int) {\
    *n++\
}\
increment(\u0026x)\
\
// Pointer receiver — mutates the original struct\
func (u *User) SetAge(age int) {\
    u.Age = age\
}\
```\
Use pointers when: (1) you need to modify the original value; (2) working with large structs (avoid copying); (3) a method needs to mutate its receiver.
