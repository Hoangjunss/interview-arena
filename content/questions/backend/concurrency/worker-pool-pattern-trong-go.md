---
id: worker-pool-pattern-trong-go
position: backend
technology: concurrency
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Worker pool pattern trong Go?

## Question (EN)
What is the worker pool pattern in Go?

## Đáp án chi tiết (VI)
Tạo fixed number goroutines (workers) đọc jobs từ channel, giới hạn concurrency và tránh tạo quá nhiều goroutines.\
\
```go\
func worker(id int, jobs \u003c-chan Job, results chan\u003c- Result, wg *sync.WaitGroup) {\
    defer wg.Done()\
    for j := range jobs {\
        results \u003c- process(j)\
    }\
}\
\
func main() {\
    jobs := make(chan Job, 100)\
    results := make(chan Result, 100)\
    var wg sync.WaitGroup\
    for i := 0; i \u003c 5; i++ { // 5 workers\
        wg.Add(1)\
        go worker(i, jobs, results, \u0026wg)\
    }\
    for _, j := range allJobs { jobs \u003c- j }\
    close(jobs)\
    wg.Wait()\
    close(results)\
}\
```

## Detailed Answer (EN)
Create a fixed number of goroutines (workers) reading jobs from a shared channel. This bounds concurrency and prevents spawning an unbounded number of goroutines.\
\
```go\
func worker(id int, jobs \u003c-chan Job, results chan\u003c- Result, wg *sync.WaitGroup) {\
    defer wg.Done()\
    for j := range jobs {\
        results \u003c- process(j)\
    }\
}\
\
func main() {\
    jobs := make(chan Job, 100)\
    results := make(chan Result, 100)\
    var wg sync.WaitGroup\
    for i := 0; i \u003c 5; i++ { // 5 workers\
        wg.Add(1)\
        go worker(i, jobs, results, \u0026wg)\
    }\
    for _, j := range allJobs { jobs \u003c- j }\
    close(jobs)\
    wg.Wait()\
    close(results)\
}\
```
