---
id: go-test-race-la-gi-khi-nao-nen-chay
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
go test -race là gì? Khi nào nên chạy?

## Question (EN)
What is go test -race? When should you run it?

## Đáp án chi tiết (VI)
**Race detector** (`-race` flag) là công cụ tích hợp trong Go runtime, phát hiện **data race** — khi hai goroutines truy cập cùng vùng nhớ đồng thời mà không sync, ít nhất một thao tác là write. Race detector hoạt động bằng cách instrument binary tại compile time, theo dõi mọi memory access.\
\
```bash\
# Chạy tests với race detector\
go test -race ./...\
\
# Chạy binary với race detector\
go run -race main.go\
go build -race -o app \u0026\u0026 ./app\
\
# Output khi phát hiện race\
WARNING: DATA RACE\
Write at 0x00c0000b4010 by goroutine 7:\
  main.increment()\
      /app/main.go:12\
Read at 0x00c0000b4010 by goroutine 8:\
  main.readValue()\
      /app/main.go:18\
```\
\
**Overhead:** ~5-10x chậm hơn và dùng nhiều memory hơn — không dùng trong production binary.\
\
**Best practice:** luôn chạy `-race` trong CI pipeline. Với service high-load, có thể enable race detector trên 1 instance staging riêng để phát hiện race conditions khó reproduce.

## Detailed Answer (EN)
The **race detector** (`-race` flag) is built into the Go runtime and detects **data races** — when two goroutines access the same memory concurrently with at least one write, without synchronization. It instruments the binary at compile time to track every memory access.\
\
```bash\
go test -race ./...   # run tests with race detection\
go run -race main.go  # run app with race detection\
```\
\
**Overhead:** ~5-10x slower with higher memory usage — never use in production binaries.\
\
**Best practice:** always run `-race` in CI. For high-throughput services, enable it on a dedicated staging instance to catch races that are hard to reproduce locally.
