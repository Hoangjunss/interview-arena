---
id: functional-options-pattern-trong-go
position: backend
technology: error-handling-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Functional options pattern trong Go?

## Question (EN)
What is the functional options pattern in Go?

## Đáp án chi tiết (VI)
Functional options tạo API khởi tạo object linh hoạt, dễ mở rộng mà không break code cũ.\
```go\
type Server struct {\
    port    int\
    timeout time.Duration\
    maxConn int\
}\
\
// Option là function type\
type Option func(*Server)\
\
// Helper functions trả về Option\
func WithPort(p int) Option {\
    return func(s *Server) { s.port = p }\
}\
\
func WithTimeout(d time.Duration) Option {\
    return func(s *Server) { s.timeout = d }\
}\
\
func WithMaxConn(n int) Option {\
    return func(s *Server) { s.maxConn = n }\
}\
\
// Constructor apply options\
func NewServer(opts ...Option) *Server {\
    s := \u0026Server{port: 8080, timeout: 30 * time.Second, maxConn: 100} // defaults\
    for _, opt := range opts {\
        opt(s)\
    }\
    return s\
}\
\
// Sử dụng — chỉ cần truyền options quan tâm\
srv := NewServer(\
    WithPort(9090),\
    WithTimeout(60 * time.Second),\
)\
```

## Detailed Answer (EN)
Functional options create a flexible initialization API that is easy to extend without breaking existing callers.\
```go\
type Server struct {\
    port    int\
    timeout time.Duration\
    maxConn int\
}\
\
// Option is a function type\
type Option func(*Server)\
\
// Helper functions return an Option\
func WithPort(p int) Option {\
    return func(s *Server) { s.port = p }\
}\
\
func WithTimeout(d time.Duration) Option {\
    return func(s *Server) { s.timeout = d }\
}\
\
func WithMaxConn(n int) Option {\
    return func(s *Server) { s.maxConn = n }\
}\
\
// Constructor applies options\
func NewServer(opts ...Option) *Server {\
    s := \u0026Server{port: 8080, timeout: 30 * time.Second, maxConn: 100} // defaults\
    for _, opt := range opts {\
        opt(s)\
    }\
    return s\
}\
\
// Usage — only pass the options you care about\
srv := NewServer(\
    WithPort(9090),\
    WithTimeout(60 * time.Second),\
)\
```
