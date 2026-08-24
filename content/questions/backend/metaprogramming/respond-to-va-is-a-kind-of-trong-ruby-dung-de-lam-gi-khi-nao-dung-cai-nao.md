---
id: respond-to-va-is-a-kind-of-trong-ruby-dung-de-lam-gi-khi-nao-dung-cai-nao
position: backend
technology: metaprogramming
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`respond_to?` và `is_a?` / `kind_of?` trong Ruby dùng để làm gì? Khi nào dùng cái nào?

## Question (EN)
What are `respond_to?` and `is_a?`/`kind_of?` used for in Ruby? When should you use each?

## Đáp án chi tiết (VI)
**`respond_to?(method_name)`** — kiểm tra object có thể respond với method đó không (duck typing). Trả `false` với private method mặc định, trừ khi truyền `true` làm arg thứ 2.\
\
**`is_a?(klass)`** / **`kind_of?(klass)`** — kiểm tra object thuộc class/module đó không (type checking). Cả hai là alias nhau.\
\
```ruby\
str = \\"hello\\"\
\
str.respond_to?(:upcase)   # =\u003e true\
str.respond_to?(:nonexist) # =\u003e false\
str.is_a?(String)           # =\u003e true\
str.is_a?(Comparable)      # =\u003e true — cả module\
\
# Ưu tiên respond_to? cho duck typing:\
def process(obj)\
  if obj.respond_to?(:read)\
    obj.read\
  else\
    raise ArgumentError, \\"Expected a readable object\\"\
  end\
end\
```\
\
Dùng `respond_to?` khi viết generic code (không quan tâm class, chỉ quan tâm hành vi — đúng tinh thần Ruby). Dùng `is_a?` khi cần xác nhận type thật sự (bất thường trong Ruby thuần, phổ biến hơn khi tương tác với C extension/API bên ngoài).

## Detailed Answer (EN)
**`respond_to?(method_name)`** — checks whether an object can respond to a method (duck typing). Returns `false` for private methods by default; pass `true` as a second arg to include them.\
\
**`is_a?(klass)`** / **`kind_of?(klass)`** — checks whether an object belongs to a class/module. Both are aliases.\
\
```ruby\
str = \\"hello\\"\
\
str.respond_to?(:upcase)   # =\u003e true\
str.respond_to?(:nonexist) # =\u003e false\
str.is_a?(String)           # =\u003e true\
str.is_a?(Comparable)      # =\u003e true — modules too\
\
def process(obj)\
  raise ArgumentError unless obj.respond_to?(:read)\
  obj.read\
end\
```\
\
Prefer `respond_to?` for generic/duck-typed code. Use `is_a?` when type identity truly matters (e.g. interacting with C extensions or external APIs).
