---
id: method-missing-trong-ruby-hoat-dong-the-nao-can-luu-y-gi
position: backend
technology: metaprogramming
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`method_missing` trong Ruby hoạt động thế nào? Cần lưu ý gì?

## Question (EN)
How does `method_missing` work in Ruby? What are the important caveats?

## Đáp án chi tiết (VI)
Khi gọi method không tồn tại, Ruby leo lên method lookup chain, không tìm thấy thì gọi `method_missing` trên object đó.\
\
```ruby\
class DynamicFinder\
  def method_missing(name, *args)\
    if name.to_s.start_with?(\\"find_by_\\")\
      field = name.to_s.sub(\\"find_by_\\

## Detailed Answer (EN)
When a method is called on an object and not found anywhere in the lookup chain, Ruby calls `method_missing` on that object.\
\
```ruby\
class DynamicFinder\
  def method_missing(name, *args)\
    if name.to_s.start_with?(\\"find_by_\\")\
      field = name.to_s.sub(\\"find_by_\\
