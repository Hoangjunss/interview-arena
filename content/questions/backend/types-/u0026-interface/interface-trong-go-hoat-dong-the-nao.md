---
id: interface-trong-go-hoat-dong-the-nao
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interface trong Go hoạt động thế nào?

## Question (EN)
How do interfaces work in Go?

## Đáp án chi tiết (VI)
Interface = tập hợp method signatures. Implicit implementation: struct tự động satisfy interface nếu có đủ methods (không cần `implements` keyword).\
```go\
// Định nghĩa interface\
type Writer interface {\
    Write([]byte) (int, error)\
}\
\
type Stringer interface {\
    String() string\
}\
\
// Struct tự động satisfy interface\
type MyWriter struct{}\
\
func (w MyWriter) Write(p []byte) (int, error) {\
    fmt.Print(string(p))\
    return len(p), nil\
}\
\
// Dùng interface làm tham số — polymorphism\
func save(w Writer, data []byte) error {\
    _, err := w.Write(data)\
    return err\
}\
\
// Empty interface chấp nhận mọi type\
func printAny(v any) {\
    fmt.Println(v)\
}\
```\
`interface{}` (hoặc `any`) là empty interface chấp nhận mọi type.

## Detailed Answer (EN)
An interface is a set of method signatures. Implementation is implicit: a struct automatically satisfies an interface if it has all required methods — no `implements` keyword.\
```go\
// Define an interface\
type Writer interface {\
    Write([]byte) (int, error)\
}\
\
type Stringer interface {\
    String() string\
}\
\
// Struct implicitly satisfies the interface\
type MyWriter struct{}\
\
func (w MyWriter) Write(p []byte) (int, error) {\
    fmt.Print(string(p))\
    return len(p), nil\
}\
\
// Use interface as parameter — polymorphism\
func save(w Writer, data []byte) error {\
    _, err := w.Write(data)\
    return err\
}\
\
// Empty interface accepts any type\
func printAny(v any) {\
    fmt.Println(v)\
}\
```\
The empty interface `interface{}` (or `any`) accepts any type.
