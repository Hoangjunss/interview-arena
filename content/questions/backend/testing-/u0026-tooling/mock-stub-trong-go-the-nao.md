---
id: mock-stub-trong-go-the-nao
position: backend
technology: testing-\u0026-tooling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mock/stub trong Go thế nào?

## Question (EN)
How do you mock/stub in Go?

## Đáp án chi tiết (VI)
Go khuyến khích mocking dựa trên interface: define một interface nhỏ cho dependency cần mock, sau đó tạo mock struct implement interface đó với behavior tùy chỉnh, ví dụ `type MockDB struct { GetFunc func(id int) (*User, error) }` rồi gọi `m.GetFunc(id)` trong method Get.\
\
Cách này tận dụng implicit interface của Go nên không cần sửa code production, chỉ cần đảm bảo mock struct có đủ methods. Các thư viện phổ biến như testify/mock, gomock, hay mockery (tự động generate mock từ interface) giúp giảm boilerplate khi có nhiều methods cần mock.\
\
Nguyên tắc quan trọng: chỉ mock ở boundary (database, external API) và tránh mock quá nhiều layer vì sẽ làm test mất ý nghĩa.

## Detailed Answer (EN)
Go encourages interface-based mocking: define a small interface for the dependency you want to mock, then create a mock struct implementing it with custom behavior, e.g., `type MockDB struct { GetFunc func(id int) (*User, error) }` calling `m.GetFunc(id)` in the Get method.\
\
Go's implicit interfaces mean no production code changes are needed — just ensure the mock has the required methods. Libraries like testify/mock, gomock, and mockery (auto-generate mocks from interfaces) reduce boilerplate for large interfaces.\
\
Key principle: only mock at boundaries (DB, external APIs); over-mocking internal layers makes tests meaningless.
