---
id: hook-methods-trong-ruby-la-gi-neu-vi-du-inherited-included-extended
position: backend
technology: metaprogramming
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hook methods trong Ruby là gì? Nêu ví dụ `inherited`, `included`, `extended`.

## Question (EN)
What are hook methods in Ruby? Give examples of `inherited`, `included`, and `extended`.

## Đáp án chi tiết (VI)
Hook method là method Ruby **tự gọi khi xảy ra sự kiện** nhất định — subclass tạo, module được include, v.v. Dùng để tự động hóa setup hoặc theo dõi class hierarchy.\
\
```ruby\
# inherited: gọi khi tạo subclass\
class Base\
  def self.inherited(subclass)\
    puts \\"#{subclass} inherits from #{self}\\"\
  end\
end\
class Child \u003c Base  # =\u003e \\"Child inherits from Base\\"\
\
# included: gọi khi module được include\
module Trackable\
  def self.included(base)\
    puts \\"#{self} included in #{base}\\"\
    base.extend(ClassMethods)  # pattern thêm class method tự động\
  end\
\
  module ClassMethods\
    def track = puts \\"tracking #{self}\\"\
  end\
end\
\
class Order\
  include Trackable  # =\u003e \\"Trackable included in Order\\"\
end\
Order.track  # =\u003e \\"tracking Order\\"\
```\
\
**Ứng dụng:** tự đăng ký plugin/class vào registry, inject class method khi include, audit class loading.

## Detailed Answer (EN)
Hook methods are methods Ruby **calls automatically when specific events occur** — a subclass is created, a module is included, etc. Used to automate setup or track class hierarchies.\
\
```ruby\
# inherited: called when a subclass is created\
class Base\
  def self.inherited(subclass)\
    puts \\"#{subclass} inherits from #{self}\\"\
  end\
end\
class Child \u003c Base  # =\u003e \\"Child inherits from Base\\"\
\
# included: called when the module is included\
module Trackable\
  def self.included(base)\
    puts \\"#{self} included in #{base}\\"\
    base.extend(ClassMethods)\
  end\
\
  module ClassMethods\
    def track = puts \\"tracking #{self}\\"\
  end\
end\
\
class Order\
  include Trackable\
end\
Order.track  # =\u003e \\"tracking Order\\"\
```\
\
**Practical uses:** self-registering plugins, injecting class methods on include, auditing class loading.
