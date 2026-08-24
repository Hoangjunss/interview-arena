---
id: channel-trong-go-la-gi-dung-the-nao
position: backend
technology: concurrency
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Channel trong Go là gì? Dùng thế nào?

## Question (EN)
What are channels in Go? How are they used?

## Đáp án chi tiết (VI)
Kênh giao tiếp giữa goroutines. Unbuffered channel: block đến khi cả sender và receiver sẵn sàng. Buffered: không block nếu buffer chưa đầy.\
```go\
// Tạo channel\
ch := make(chan int)        // unbuffered\
bch := make(chan int, 10)  // buffered capacity 10\
\
// Gửi và nhận\
go func() {\
    ch \u003c- 42 // send — block đến khi có receiver\
}()\
val := \u003c-ch // receive — block đến khi có data\
fmt.Println(val) // 42\
\
// Directional channels (best practice)\
func producer(out chan\u003c- int) { // chỉ gửi\
    out \u003c- 1\
}\
func consumer(in \u003c-chan int) { // chỉ nhận\
    fmt.Println(\u003c-in)\
}\
\
// Close và range\
close(ch)\
for v := range ch { // tự dừng khi channel đóng\
    fmt.Println(v)\
}\
```

## Detailed Answer (EN)
Channels are the communication mechanism between goroutines. An unbuffered channel blocks until both sides are ready; a buffered channel does not block while buffer is not full.\
```go\
// Create channels\
ch := make(chan int)        // unbuffered\
bch := make(chan int, 10)  // buffered, capacity 10\
\
// Send and receive\
go func() {\
    ch \u003c- 42 // send — blocks until a receiver is ready\
}()\
val := \u003c-ch // receive — blocks until data arrives\
fmt.Println(val) // 42\
\
// Directional channels (best practice)\
func producer(out chan\u003c- int) { // send-only\
    out \u003c- 1\
}\
func consumer(in \u003c-chan int) { // receive-only\
    fmt.Println(\u003c-in)\
}\
\
// Close and range\
close(ch)\
for v := range ch { // stops automatically when channel is closed\
    fmt.Println(v)\
}\
```
