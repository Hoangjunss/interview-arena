---
id: benchmark-testing-trong-go
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Benchmark testing trong Go?

## Question (EN)
How does benchmark testing work in Go?

## Đáp án chi tiết (VI)
`func BenchmarkXxx(b *testing.B)` — Go đo lường performance tự động điều chỉnh số lần chạy.\
```go\
func BenchmarkAdd(b *testing.B) {\
    for i := 0; i \u003c b.N; i++ {\
        Add(100, 200)\
    }\
}\
\
// Benchmark với setup\
func BenchmarkSort(b *testing.B) {\
    data := generateLargeSlice(10000)\
    b.ResetTimer() // bỏ qua thời gian setup\
    for i := 0; i \u003c b.N; i++ {\
        sort.Ints(data)\
    }\
}\
```\
```bash\
go test -bench=.                # chạy tất cả benchmarks\
go test -bench=BenchmarkAdd     # chạy benchmark cụ thể\
go test -bench=. -benchmem      # hiển thị thêm B/op, allocs/op\
benchstat old.txt new.txt       # so sánh 2 kết quả\
```

## Detailed Answer (EN)
`func BenchmarkXxx(b *testing.B)` — Go automatically adjusts the iteration count to get a stable measurement.\
```go\
func BenchmarkAdd(b *testing.B) {\
    for i := 0; i \u003c b.N; i++ {\
        Add(100, 200)\
    }\
}\
\
// Benchmark with setup\
func BenchmarkSort(b *testing.B) {\
    data := generateLargeSlice(10000)\
    b.ResetTimer() // exclude setup time\
    for i := 0; i \u003c b.N; i++ {\
        sort.Ints(data)\
    }\
}\
```\
```bash\
go test -bench=.                # run all benchmarks\
go test -bench=BenchmarkAdd     # run a specific benchmark\
go test -bench=. -benchmem      # also show B/op, allocs/op\
benchstat old.txt new.txt       # compare two results\
```
