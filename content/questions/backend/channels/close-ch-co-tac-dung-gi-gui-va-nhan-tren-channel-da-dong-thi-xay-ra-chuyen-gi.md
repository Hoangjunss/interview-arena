---
id: close-ch-co-tac-dung-gi-gui-va-nhan-tren-channel-da-dong-thi-xay-ra-chuyen-gi
position: backend
technology: channels
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`close(ch)` có tác dụng gì? Gửi và nhận trên channel đã đóng thì xảy ra chuyện gì?

## Question (EN)
What does `close(ch)` do? What happens when you send to or receive from a closed channel?

## Đáp án chi tiết (VI)
`close` là tín hiệu \\"**không còn dữ liệu nào nữa**\\

## Detailed Answer (EN)
`close` signals \\"**no more values will be sent**\\". It is not a memory-release operation — channels are garbage collected.\
\
After closing:\
- **Receive**: returns immediately, never blocks. Buffered values are drained first, then it yields the **zero value** indefinitely.\
- **Comma-ok** tells the two cases apart: `v, ok := \u003c-ch` — `ok == false` means the channel is closed and drained.\
- **`for range ch`** terminates when the channel closes. If nobody closes it, the loop hangs forever.\
- **Sending** on a closed channel: `panic: send on closed channel`.\
- **Closing twice**, or closing a `nil` channel: also panics.\
\
```go\
ch := make(chan int, 2)\
ch \u003c- 1\
close(ch)\
\
v, ok := \u003c-ch   // 1, true\
v, ok = \u003c-ch    // 0, false  (drained + closed)\
```\
\
**Convention:** only the **sender** closes a channel, and with multiple senders no single sender may close it — use a `sync.WaitGroup` to wait for all of them, then close in exactly one place. Receivers never close, because they cannot know whether more sends are coming.
