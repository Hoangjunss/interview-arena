---
id: singleton-method-trong-ruby-la-gi-self-va-eigenclass-lien-quan-the-nao
position: backend
technology: oop-\u0026-module
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Singleton method trong Ruby là gì? `self.` và eigenclass liên quan thế nào?

## Question (EN)
What is a singleton method in Ruby? How does `self.` relate to the eigenclass?

## Đáp án chi tiết (VI)
Singleton method là method định nghĩa **chỉ trên 1 object cụ thể**, không ảnh hưởng các instance khác của cùng class.\
\
```ruby\
str = \\"hello\\"\
\
def str.shout\
  upcase + \\"!!!\\"\
end\
\
str.shout           # =\u003e \\"HELLO!!!\\"\
\\"world\\".shout       # =\u003e NoMethodError\
```\
\
Mọi object trong Ruby có một **eigenclass** (còn gọi singleton class / metaclass) — class ẩn chứa singleton methods của object đó. Class methods (`def self.method`) thực ra là singleton methods trên object class.\
\
```ruby\
class Foo\
  def self.bar = \\"class method\\"  # singleton method trên object Foo\
end\
\
# Mở eigenclass trực tiếp\
class \u003c\u003c Foo\
  def baz = \\"also class method\\"\
end\
```

## Detailed Answer (EN)
A singleton method is defined **on a single specific object** and does not affect other instances of the same class.\
\
```ruby\
str = \\"hello\\"\
\
def str.shout\
  upcase + \\"!!!\\"\
end\
\
str.shout           # =\u003e \\"HELLO!!!\\"\
\\"world\\".shout       # =\u003e NoMethodError\
```\
\
Every Ruby object has a hidden **eigenclass** (also called singleton class / metaclass) that stores the object's singleton methods. Class methods (`def self.method`) are in fact singleton methods defined on the class object itself.\
\
```ruby\
class Foo\
  def self.bar = \\"class method\\"  # singleton method on the Foo object\
end\
\
# Open eigenclass directly\
class \u003c\u003c Foo\
  def baz = \\"also class method\\"\
end\
```
