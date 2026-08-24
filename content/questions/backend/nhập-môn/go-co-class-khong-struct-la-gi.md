---
id: go-co-class-khong-struct-la-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Go có class không? Struct là gì?

## Question (EN)
Does Go have classes? What is a struct?

## Đáp án chi tiết (VI)
Go KHÔNG có class. Struct là kiểu dữ liệu composite, methods gắn vào struct qua receiver. Composition thay vì inheritance: embed struct trong struct khác.\
```go\
// Định nghĩa struct\
type User struct {\
    Name string\
    Age  int\
}\
\
// Method gắn vào struct qua value receiver\
func (u User) Hello() string {\
    return \\"Hello, \\" + u.Name\
}\
\
// Pointer receiver để modify struct\
func (u *User) SetName(name string) {\
    u.Name = name\
}\
\
// Khởi tạo struct\
u := User{Name: \\"Alice\\

## Detailed Answer (EN)
Go has NO classes. A struct is a composite data type; methods are attached via receivers. Go favors composition over inheritance using struct embedding.\
```go\
// Define a struct\
type User struct {\
    Name string\
    Age  int\
}\
\
// Method attached via value receiver\
func (u User) Hello() string {\
    return \\"Hello, \\" + u.Name\
}\
\
// Pointer receiver to mutate the struct\
func (u *User) SetName(name string) {\
    u.Name = name\
}\
\
// Instantiate a struct\
u := User{Name: \\"Alice\\
