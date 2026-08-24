---
id: pipeline-pattern-voi-channels
position: backend
technology: error-handling-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline pattern với channels?

## Question (EN)
What is the pipeline pattern with channels in Go?

## Đáp án chi tiết (VI)
Chain stages qua channels — mỗi stage là goroutine, data chảy qua channels.\
```go\
// Stage 1: generator\
func gen(nums ...int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for _, n := range nums {\
            out \u003c- n\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Stage 2: transform\
func square(in \u003c-chan int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for n := range in {\
            out \u003c- n * n\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Stage 3: filter\
func evens(in \u003c-chan int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for n := range in {\
            if n%2 == 0 {\
                out \u003c- n\
            }\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Compose pipeline\
func main() {\
    for result := range evens(square(gen(1, 2, 3, 4, 5))) {\
        fmt.Println(result) // 4, 16\
    }\
}\
```\
Fan-out: nhiều goroutines đọc cùng channel. Fan-in: merge nhiều channels thành 1.

## Detailed Answer (EN)
Chain processing stages through channels — each stage is a goroutine; data flows through.\
```go\
// Stage 1: generator\
func gen(nums ...int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for _, n := range nums {\
            out \u003c- n\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Stage 2: transform\
func square(in \u003c-chan int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for n := range in {\
            out \u003c- n * n\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Stage 3: filter\
func evens(in \u003c-chan int) \u003c-chan int {\
    out := make(chan int)\
    go func() {\
        for n := range in {\
            if n%2 == 0 {\
                out \u003c- n\
            }\
        }\
        close(out)\
    }()\
    return out\
}\
\
// Compose the pipeline\
func main() {\
    for result := range evens(square(gen(1, 2, 3, 4, 5))) {\
        fmt.Println(result) // 4, 16\
    }\
}\
```\
Fan-out: multiple goroutines reading from the same channel. Fan-in: merging multiple channels into one.
