---
id: method-chaining-trong-ruby-la-gi-cach-implement-mot-chainable-api
position: backend
technology: metaprogramming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Method chaining trong Ruby là gì? Cách implement một chainable API?

## Question (EN)
What is method chaining in Ruby? How do you implement a chainable API?

## Đáp án chi tiết (VI)
Method chaining là kỹ thuật gọi nhiều method liên tiếp trên cùng một object bằng cách mỗi method **trả về `self`**.\
\
```ruby\
class QueryBuilder\
  def initialize\
    @conditions = []\
    @order = nil\
    @limit = nil\
  end\
\
  def where(condition)\
    @conditions \u003c\u003c condition\
    self  # trả về self để chain tiếp\
  end\
\
  def order(column)\
    @order = column\
    self\
  end\
\
  def limit(n)\
    @limit = n\
    self\
  end\
\
  def to_sql\
    sql = \\"SELECT * FROM users\\"\
    sql += \\" WHERE #{@conditions.join(' AND ')}\\" unless @conditions.empty?\
    sql += \\" ORDER BY #{@order}\\" if @order\
    sql += \\" LIMIT #{@limit}\\" if @limit\
    sql\
  end\
end\
\
QueryBuilder.new\
  .where(\\"age \u003e 18\\")\
  .where(\\"active = true\\")\
  .order(\\"name\\")\
  .limit(10)\
  .to_sql\
# =\u003e \\"SELECT * FROM users WHERE age \u003e 18 AND active = true ORDER BY name LIMIT 10\\"\
```\
\
ActiveRecord, Arel và hầu hết Ruby DSL đều dùng pattern này.

## Detailed Answer (EN)
Method chaining is a technique where multiple methods are called in sequence on the same object by having each method **return `self`**.\
\
```ruby\
class QueryBuilder\
  def initialize\
    @conditions = []\
    @order = nil\
    @limit = nil\
  end\
\
  def where(condition)\
    @conditions \u003c\u003c condition\
    self\
  end\
\
  def order(column)\
    @order = column\
    self\
  end\
\
  def limit(n)\
    @limit = n\
    self\
  end\
\
  def to_sql\
    sql = \\"SELECT * FROM users\\"\
    sql += \\" WHERE #{@conditions.join(' AND ')}\\" unless @conditions.empty?\
    sql += \\" ORDER BY #{@order}\\" if @order\
    sql += \\" LIMIT #{@limit}\\" if @limit\
    sql\
  end\
end\
\
QueryBuilder.new\
  .where(\\"age \u003e 18\\")\
  .order(\\"name\\")\
  .limit(10)\
  .to_sql\
```\
\
ActiveRecord, Arel, and most Ruby DSLs use this pattern.
