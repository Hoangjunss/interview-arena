---
id: defer-panic-recover-trong-go-dung-khi-nao
position: backend
technology: error-handling-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
defer, panic, recover trong Go dùng khi nào?

## Question (EN)
When are defer, panic, and recover used in Go?

## Đáp án chi tiết (VI)
`defer` đảm bảo một function sẽ được gọi khi function chứa nó return (LIFO). `panic` dừng chương trình khi gặp lỗi không thể khôi phục. `recover` bắt panic bên trong deferred function.\
```go\
// defer — cleanup đảm bảo luôn chạy\
func processFile(path string) error {\
    f, err := os.Open(path)\
    if err != nil {\
        return err\
    }\
    defer f.Close() // luôn đóng file khi function return\
\
    // xử lý file...\
    return nil\
}\
\
// panic + recover — bắt lỗi nghiêm trọng\
func safeDiv(a, b int) (result int, err error) {\
    defer func() {\
        if r := recover(); r != nil {\
            err = fmt.Errorf(\\"recovered: %v\\

## Detailed Answer (EN)
`defer` guarantees a function call when the surrounding function returns (LIFO order). `panic` immediately stops execution on an unrecoverable error. `recover` catches a panic inside a deferred function.\
```go\
// defer — guaranteed cleanup\
func processFile(path string) error {\
    f, err := os.Open(path)\
    if err != nil {\
        return err\
    }\
    defer f.Close() // always closes the file on return\
\
    // process file...\
    return nil\
}\
\
// panic + recover — catch critical failures\
func safeDiv(a, b int) (result int, err error) {\
    defer func() {\
        if r := recover(); r != nil {\
            err = fmt.Errorf(\\"recovered: %v\\
