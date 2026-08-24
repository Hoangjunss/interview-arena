---
id: dependency-injection-trong-go-the-nao
position: backend
technology: error-handling-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dependency injection trong Go thế nào?

## Question (EN)
How is dependency injection done in Go?

## Đáp án chi tiết (VI)
Dependency injection trong Go thực hiện chủ yếu qua constructor injection: function khởi tạo nhận interface làm tham số, ví dụ `func NewUserService(repo UserRepository) *UserService`, giúp UserService không phụ thuộc vào implementation cụ thể mà chỉ phụ thuộc vào contract (interface).\
\
Triết lý Go ưu tiên sự tường minh nên phần lớn project không cần DI framework, chỉ cần truyền dependency thủ công tại main function. Với ứng dụng lớn nhiều dependency lồng nhau, có thể dùng wire (Google, compile-time) hoặc fx (Uber, runtime).\
\
Interface nên giữ nhỏ (1-3 methods) theo nguyên tắc Interface Segregation, và khi viết test chỉ cần inject mock implementation vào constructor là xong.

## Detailed Answer (EN)
DI in Go is primarily done through constructor injection: the initializer accepts an interface as a parameter, e.g., `func NewUserService(repo UserRepository) *UserService` — UserService depends only on the contract, not a specific implementation.\
\
Go's explicitness philosophy means most projects don't need a DI framework; just wire dependencies manually in main. For large apps with deep dependency trees, use wire (Google, compile-time) or fx (Uber, runtime).\
\
Keep interfaces small (1-3 methods) per Interface Segregation, and in tests simply inject a mock implementation into the constructor.
