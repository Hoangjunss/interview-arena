---
id: struct-trong-ruby-la-gi-khi-nao-nen-dung-struct-thay-vi-class
position: backend
technology: oop-\u0026-module
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Struct trong Ruby là gì? Khi nào nên dùng Struct thay vì class?

## Question (EN)
What is a Struct in Ruby? When should you use Struct instead of a class?

## Đáp án chi tiết (VI)
`Struct` là shorthand tạo class đơn giản với accessor cho từng field đã khai báo — tự động có `initialize`, getter/setter, `==`, `to_s`, `members`.\
\
```ruby\
Point = Struct.new(:x, :y)\
p = Point.new(3, 4)\
p.x                    # =\u003e 3\
p == Point.new(3, 4)   # =\u003e true  (value equality)\
p.to_s                 # =\u003e \\"#\u003cstruct Point x=3, y=4\u003e\\"\
```\
\
Struct còn nhận block để thêm custom method. **Khi dùng Struct:** value object đơn giản (toạ độ, khoảng thời gian, kết quả query), data transfer object không cần behavior phức tạp. **Khi dùng class:** kế thừa, logic phức tạp, cần kiểm soát visibility. Ruby 3.2+ có `Data.define` cho immutable value object.

## Detailed Answer (EN)
`Struct` is a shorthand for creating a simple class with accessors for declared fields — automatically provides `initialize`, getters/setters, `==`, `to_s`, and `members`.\
\
```ruby\
Point = Struct.new(:x, :y)\
p = Point.new(3, 4)\
p.x                   # =\u003e 3\
p == Point.new(3, 4)  # =\u003e true  (value equality)\
p.to_s                # =\u003e \\"#\u003cstruct Point x=3, y=4\u003e\\"\
```\
\
Struct also accepts a block to add custom methods. **Use Struct for:** simple value objects (coordinates, time ranges, query results), data-transfer objects without complex behaviour. **Use a class when:** inheritance is needed, logic is complex, or visibility control is required. Ruby 3.2+ adds `Data.define` for immutable value objects.
