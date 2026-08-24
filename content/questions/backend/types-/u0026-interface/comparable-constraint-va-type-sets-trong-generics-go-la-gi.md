---
id: comparable-constraint-va-type-sets-trong-generics-go-la-gi
position: backend
technology: types-\u0026-interface
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Comparable constraint và type sets trong generics Go là gì?

## Question (EN)
What are the comparable constraint and type sets in Go generics?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
In Go generics, a **constraint** is an interface defining the type set of accepted types. **`comparable`** is a built-in constraint enabling `==`/`!=` — required when using a type parameter as a map key.\
\
```go\
// comparable — enables == and map key usage\
func Contains[T comparable](slice []T, item T) bool {\
    for _, v := range slice {\
        if v == item { return true }\
    }\
    return false\
}\
\
// Type set constraint — numeric types only\
type Number interface {\
    int | int8 | int16 | int32 | int64 | float32 | float64\
}\
\
func Sum[T Number](nums []T) T {\
    var total T\
    for _, n := range nums { total += n }\
    return total\
}\
\
// ~ tilde means \\"underlying type\\"\
type Integer interface { ~int | ~int64 }\
```\
\
**`~T`** allows custom types built on top of an underlying type to satisfy the constraint — e.g., `type MyInt int` satisfies `~int`.
