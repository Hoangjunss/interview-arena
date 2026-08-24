---
id: empty-interface-any-dung-khi-nao
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Empty interface (any) dùng khi nào?

## Question (EN)
When should you use the empty interface (any) in Go?

## Đáp án chi tiết (VI)
`any` (alias `interface{}`) chấp nhận mọi type, nhưng cần type assertion để dùng value cụ thể. Go 1.18+ có generics thay thế nhiều use cases.\
```go\
// JSON parsing trả map[string]any\
var result map[string]any\
json.Unmarshal(data, \u0026result)\
\
// Type assertion để lấy giá trị\
func printValue(i any) {\
    // safe assertion\
    if s, ok := i.(string); ok {\
        fmt.Println(\\"string:\\

## Detailed Answer (EN)
`any` (alias for `interface{}`) accepts any type, but you still need a type assertion to use the concrete value. Go 1.18+ generics replace many of these use cases.\
```go\
// JSON parsing returns map[string]any\
var result map[string]any\
json.Unmarshal(data, \u0026result)\
\
// Type assertion to extract the value\
func printValue(i any) {\
    // safe assertion\
    if s, ok := i.(string); ok {\
        fmt.Println(\\"string:\\
