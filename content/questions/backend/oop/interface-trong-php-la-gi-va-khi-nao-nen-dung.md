---
id: interface-trong-php-la-gi-va-khi-nao-nen-dung
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interface trong PHP là gì và khi nào nên dùng?

## Question (EN)
What are interfaces and when should you use them?

## Đáp án chi tiết (VI)
Interface định nghĩa một hợp đồng (contract)—tập hợp các phương thức mà class implement bắt buộc phải có. Khai báo: `interface UserRepository { public function find($id); public function save($user); }`. Bất kỳ class nào implement interface này đều phải triển khai tất cả phương thức đó. \
\
**Lợi ích:** đảm bảo tính nhất quán giữa các implementations, cho phép polymorphism, dễ viết test với mock. Dùng interface khi cần đảm bảo các phương thức nhất định tồn tại bất kể cách implement cụ thể là gì.

## Detailed Answer (EN)
Interfaces define a contract—a set of methods that implementing classes must provide. Define with `interface UserRepository { public function find($id); public function save($user); }`. Any class implementing this interface must implement all these methods. \
\
**Benefits:** enforce consistency across implementations, enable polymorphism (treat different classes uniformly), make testing easier with mock implementations. Use interfaces when you need to guarantee certain methods exist regardless of implementation.
