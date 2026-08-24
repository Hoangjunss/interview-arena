---
id: vi-sao-sau-context-withtimeout-withcancel-luon-phai-goi-defer-cancel
position: backend
technology: context
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao sau `context.WithTimeout` / `WithCancel` luôn phải gọi `defer cancel()`?

## Question (EN)
Why must you always call `defer cancel()` after `context.WithTimeout` / `WithCancel`?

## Đáp án chi tiết (VI)
Vì `cancel` là thứ **giải phóng tài nguyên** gắn với context đó, kể cả khi công việc đã hoàn tất bình thường.\
\
Mỗi context con được **đăng ký vào danh sách con của context cha**. Với `WithTimeout` / `WithDeadline` còn có thêm một `time.Timer` đang chạy. Nếu không gọi `cancel`:\
- Context con nằm lại trong cha cho tới khi cha bị hủy — với cha là `context.Background()` thì nghĩa là **suốt vòng đời tiến trình**.\
- Timer sống tới lúc hết hạn mới được thu hồi.\
\
Gọi nhiều lần vô hại: `cancel` là **idempotent**. Nên `defer cancel()` ngay sau khi tạo là đúng trong mọi trường hợp.\
\
```go\
ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)\
defer cancel()\
\
rows, err := db.QueryContext(ctx, query, id)\
```\
\
`go vet` có analyzer **lostcancel** bắt lỗi này: *\\"the cancel function is not used on all paths (possible context leak)\\"*. Đây là một trong những cảnh báo `go vet` không nên bỏ qua — chạy `go vet ./...` trong CI.

## Detailed Answer (EN)
Because `cancel` is what **releases the resources** tied to that context, even when the work finished normally.\
\
Every child context is **registered in its parent's children list**, and `WithTimeout` / `WithDeadline` additionally arm a `time.Timer`. If you never call `cancel`:\
- The child stays attached to the parent until the parent is cancelled — with `context.Background()` as parent, that means **for the lifetime of the process**.\
- The timer stays alive until it fires.\
\
Calling it repeatedly is harmless: `cancel` is **idempotent**. So `defer cancel()` right after creation is always correct.\
\
```go\
ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)\
defer cancel()\
\
rows, err := db.QueryContext(ctx, query, id)\
```\
\
`go vet` ships the **lostcancel** analyzer for exactly this: *\\"the cancel function is not used on all paths (possible context leak)\\"*. It is one of the `go vet` warnings you should never ignore — run `go vet ./...` in CI.
