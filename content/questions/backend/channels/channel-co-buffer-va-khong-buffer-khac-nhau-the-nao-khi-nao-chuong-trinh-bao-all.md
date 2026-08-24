---
id: channel-co-buffer-va-khong-buffer-khac-nhau-the-nao-khi-nao-chuong-trinh-bao-all
position: backend
technology: channels
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Channel có buffer và không buffer khác nhau thế nào? Khi nào chương trình báo `all goroutines are asleep - deadlock`?

## Question (EN)
How do buffered and unbuffered channels differ? When does Go report `all goroutines are asleep - deadlock`?

## Đáp án chi tiết (VI)
**Unbuffered** (`make(chan int)`): mỗi lần gửi phải có một bên nhận **sẵn sàng ngay tại thời điểm đó** — gửi và nhận là một điểm đồng bộ. **Buffered** (`make(chan int, 3)`): gửi chỉ chặn khi buffer đầy, nhận chỉ chặn khi buffer rỗng.\
\
```go\
func main() {\
    ch := make(chan int)\
    ch \u003c- 1 // blocks forever: no receiver is ready\
    fmt.Println(\u003c-ch)\
}\
// fatal error: all goroutines are asleep - deadlock!\
```\
\
Runtime phát hiện **mọi goroutine đều đang chặn** và không ai còn khả năng đánh thức ai, nên dừng chương trình với `fatal error: all goroutines are asleep - deadlock!`. Đây là lỗi runtime, `recover` không bắt được.\
\
Cách sửa: đưa phần nhận sang goroutine khác, hoặc cấp buffer đủ chỗ.\
\
```go\
ch := make(chan int, 1)\
ch \u003c- 1            // fits in the buffer, does not block\
fmt.Println(\u003c-ch)\
```\
\
Điểm cần nhớ: runtime chỉ báo được khi **toàn bộ** goroutine ngủ. Nếu còn một goroutine đang chạy vòng lặp hoặc chờ I/O mạng, chương trình sẽ treo im lặng mà không có thông báo nào.

## Detailed Answer (EN)
$87
