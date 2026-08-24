---
id: public-private-protected-trong-ruby-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Public, private, protected trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between public, private, and protected methods in Ruby?

## Đáp án chi tiết (VI)
| Visibility | Gọi từ bên ngoài | Gọi trong subclass | Gọi trong cùng class |\
|---|---|---|---|\
| `public` | Có | Có | Có |\
| `protected` | Không | Có (instance cùng class/subclass) | Có |\
| `private` | Không | Có (implicit receiver) | Có (implicit receiver) |\
\
`protected` thường dùng để so sánh giữa 2 instance cùng class (ví dụ `def \u003e(other); balance \u003e other.balance; end`). `private` được kế thừa và có thể gọi trong subclass nhưng không dùng explicit receiver. Ruby ≥ 2.7: cho phép `self.private_method` trong cùng object.

## Detailed Answer (EN)
| Visibility | External call | Subclass call | Same-class call |\
|---|---|---|---|\
| `public` | Yes | Yes | Yes |\
| `protected` | No | Yes (instance of same class/subclass) | Yes |\
| `private` | No | Yes (implicit receiver) | Yes (implicit receiver) |\
\
`protected` is typically used for comparisons between two instances of the same class (e.g. `def \u003e(other); balance \u003e other.balance; end`). `private` methods are inherited and callable within subclasses — but without an explicit receiver. Ruby ≥ 2.7: `self.private_method` is allowed within the same object.
