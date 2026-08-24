---
id: goroutine-la-gi-khac-thread-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Goroutine là gì? Khác thread thế nào?

## Question (EN)
What is a goroutine? How is it different from a thread?

## Đáp án chi tiết (VI)
Goroutine là lightweight thread do Go runtime quản lý. Khác OS thread: goroutine stack default ~8KB, tự grow/shrink; Go scheduler multiplex goroutines lên OS threads (M:N scheduling). Có thể chạy hàng triệu goroutines cùng lúc.\
```go\
func fetchData(url string) {\
    resp, err := http.Get(url)\
    if err != nil {\
        log.Println(err)\
        return\
    }\
    defer resp.Body.Close()\
    // xử lý response...\
}\
\
func main() {\
    urls := []string{\\"https://a.com\\

## Detailed Answer (EN)
A goroutine is a lightweight thread managed by the Go runtime. It starts with ~8KB stack that grows/shrinks dynamically (OS threads have fixed 1-8MB). The Go scheduler multiplexes goroutines onto OS threads (M:N scheduling). You can run millions concurrently.\
```go\
func fetchData(url string) {\
    resp, err := http.Get(url)\
    if err != nil {\
        log.Println(err)\
        return\
    }\
    defer resp.Body.Close()\
    // process response...\
}\
\
func main() {\
    urls := []string{\\"https://a.com\\
