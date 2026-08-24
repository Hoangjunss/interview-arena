---
id: bien-instance-va-bien-class-trong-ruby-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Biến instance (`@`) và biến class (`@@`) trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between an instance variable (`@`) and a class variable (`@@`) in Ruby?

## Đáp án chi tiết (VI)
**Biến instance (`@`):** thuộc về từng object riêng, mỗi instance có bản sao riêng.\
**Biến class (`@@`):** chia sẻ giữa mọi instance của class và các subclass.\
\
```ruby\
class Counter\
  @@total = 0          # class variable — dùng chung\
\
  def initialize(name)\
    @name = name       # instance variable — riêng mỗi object\
    @@total += 1\
  end\
\
  def self.total = @@total\
end\
\
a = Counter.new(\\"A\\")\
b = Counter.new(\\"B\\")\
Counter.total  # =\u003e 2\
```\
\
Lưu ý: `@@` được kế thừa xuống subclass — sửa ở subclass làm thay đổi class cha. Nhiều Rubyist khuyên dùng class-level instance variable (`@var` trong context class) thay `@@` để tránh rò rỉ.

## Detailed Answer (EN)
**Instance variable (`@`):** belongs to each individual object; every instance has its own copy.\
**Class variable (`@@`):** shared across all instances of the class and its subclasses.\
\
```ruby\
class Counter\
  @@total = 0\
\
  def initialize(name)\
    @name = name\
    @@total += 1\
  end\
\
  def self.total = @@total\
end\
\
a = Counter.new(\\"A\\")\
b = Counter.new(\\"B\\")\
Counter.total  # =\u003e 2\
```\
\
Gotcha: `@@` is inherited by subclasses — modifying it in a subclass affects the parent class too. Many Rubyists prefer class-level instance variables (`@var` in a class context) over `@@` to avoid leakage.
