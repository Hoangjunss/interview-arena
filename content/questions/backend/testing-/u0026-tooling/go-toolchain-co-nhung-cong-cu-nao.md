---
id: go-toolchain-co-nhung-cong-cu-nao
position: backend
technology: testing-\u0026-tooling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Go toolchain có những công cụ nào?

## Question (EN)
What tools are included in the Go toolchain?

## Đáp án chi tiết (VI)
Go đi kèm bộ toolchain rất mạnh ngay từ khi cài đặt: `go build` để compile thành binary, `go run` để compile và chạy luôn, `go test` để chạy unit test và benchmark, và `go fmt` để format code theo chuẩn thống nhất (bắt buộc trong hầu hết project). Về chất lượng code, `go vet` phát hiện các lỗi tiềm ẩn mà compiler không bắt được, còn `golangci-lint` là công cụ linting tổng hợp chạy hàng chục linter cùng lúc. Ngoài ra còn có `go mod` cho quản lý dependency, `go generate` cho code generation, `go doc` để xem documentation, và `go tool pprof` để profiling hiệu năng ứng dụng.

## Detailed Answer (EN)
Go ships with a powerful built-in toolchain: `go build` compiles to a binary, `go run` compiles and runs immediately, `go test` runs unit tests and benchmarks, and `go fmt` formats code to the universal Go style (enforced in most projects). For code quality: `go vet` catches common mistakes the compiler misses, and `golangci-lint` runs dozens of linters simultaneously. Also included: `go mod` for dependency management, `go generate` for code generation, `go doc` for viewing documentation, and `go tool pprof` for performance profiling.
