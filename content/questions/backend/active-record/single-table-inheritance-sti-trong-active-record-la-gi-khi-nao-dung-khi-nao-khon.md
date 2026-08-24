---
id: single-table-inheritance-sti-trong-active-record-la-gi-khi-nao-dung-khi-nao-khon
position: backend
technology: active-record
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Single Table Inheritance (STI) trong Active Record là gì? Khi nào dùng, khi nào không?

## Question (EN)
What is Single Table Inheritance (STI) in Active Record? When to use it, when not to?

## Đáp án chi tiết (VI)
STI lưu nhiều subclass khác nhau vào **một bảng DB** dùng cột `type` để phân biệt.\
\
```ruby\
# Migration\
create_table :vehicles do |t|\
  t.string :type   # STI column\
  t.string :name\
  t.integer :seats\
  t.integer :cargo_capacity  # chỉ dùng cho Truck\
end\
\
# Models\
class Vehicle \u003c ApplicationRecord; end\
class Car \u003c Vehicle; end\
class Truck \u003c Vehicle; end\
class Motorcycle \u003c Vehicle; end\
\
Car.create!(name: \\"Toyota\\")  # type=\\"Car\\"\
Vehicle.all  # trả về Car, Truck, Motorcycle cùng lúc\
```\
\
**Dùng khi:** các subclass có **phần lớn attribute giống nhau**, chỉ khác behavior.\
\
**Không dùng khi:** subclass có nhiều attribute riêng → bảng sẽ rỗng (sparse columns), khó maintain. Thay bằng polymorphic association hoặc separate tables.

## Detailed Answer (EN)
STI stores multiple subclasses in **one DB table** using a `type` column to distinguish them.\
\
```ruby\
# Migration\
create_table :vehicles do |t|\
  t.string :type   # STI discriminator column\
  t.string :name\
  t.integer :seats\
  t.integer :cargo_capacity  # only used by Truck\
end\
\
# Models\
class Vehicle \u003c ApplicationRecord; end\
class Car \u003c Vehicle; end\
class Truck \u003c Vehicle; end\
class Motorcycle \u003c Vehicle; end\
\
Car.create!(name: \\"Toyota\\")  # type=\\"Car\\"\
Vehicle.all  # returns Cars, Trucks, Motorcycles together\
```\
\
**Use when:** subclasses share **most attributes** and differ mainly in behavior.\
\
**Avoid when:** subclasses have many unique attributes → table becomes sparse (many null columns), hard to maintain. Prefer polymorphic associations or separate tables instead.
