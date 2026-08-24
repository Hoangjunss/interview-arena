---
id: profiling-go-application-the-nao
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Profiling Go application thế nào?

## Question (EN)
How do you profile a Go application?

## Đáp án chi tiết (VI)
Go có hỗ trợ profiling tích hợp sẵn thông qua package `net/http/pprof`: chỉ cần import `_ \\"net/http/pprof\\"` là server tự expose các endpoint profiling tại `/debug/pprof/`. Để phân tích CPU, dùng `go test -cpuprofile=cpu.prof` rồi mở bằng `go tool pprof cpu.prof`; tương tự với memory profiling dùng flag `-memprofile=mem.prof` để tìm các hàm allocate nhiều bộ nhớ. Công cụ pprof hỗ trợ xem flame graph trực quan qua `pprof -http=:8080`, giúp nhanh chóng nhận diện hot functions, excessive allocations, và goroutine leaks. Ngoài ra `go tool trace` cho phép xem chi tiết execution trace theo timeline, hữu ích khi debug vấn đề concurrency và latency.

## Detailed Answer (EN)
Go has built-in profiling via `net/http/pprof`: just import `_ \\"net/http/pprof\\"` and the server exposes profiling endpoints at `/debug/pprof/`. For CPU analysis: `go test -cpuprofile=cpu.prof` then open with `go tool pprof cpu.prof`. For memory: `-memprofile=mem.prof` to find high-allocation functions. The pprof tool renders interactive flame graphs via `pprof -http=:8080`, helping identify hot functions, excessive allocations, and goroutine leaks. `go tool trace` provides a detailed timeline for debugging concurrency and latency issues.
