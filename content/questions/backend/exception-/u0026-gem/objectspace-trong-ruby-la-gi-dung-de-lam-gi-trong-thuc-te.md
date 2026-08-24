---
id: objectspace-trong-ruby-la-gi-dung-de-lam-gi-trong-thuc-te
position: backend
technology: exception-\u0026-gem
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ObjectSpace trong Ruby là gì? Dùng để làm gì trong thực tế?

## Question (EN)
What is ObjectSpace in Ruby? When is it used in practice?

## Đáp án chi tiết (VI)
`ObjectSpace` là module cung cấp quyền truy cập vào **toàn bộ object đang sống trong heap** của Ruby process hiện tại.\
\
```ruby\
require \\"objspace\\"\
\
ObjectSpace.count_objects\
# =\u003e {TOTAL: 123456, FREE: 10000, T_STRING: 50000, ...}\
\
ObjectSpace.each_object(String) { |s| puts s if s.include?(\\"secret\\") }\
```\
\
**Ứng dụng thực tế:** tìm memory leak (class nào có nhiều instance bất thường), profile allocation (code nào tạo nhiều object ngắn — dùng `trace_object_allocations_start`), debug finalizer và weak reference.\
\
**Không dùng trong production code** — chậm, chỉ dùng trong profiling/debugging.

## Detailed Answer (EN)
`ObjectSpace` is a module that gives access to **all live objects in the Ruby heap** of the current process.\
\
```ruby\
require \\"objspace\\"\
\
ObjectSpace.count_objects\
# =\u003e {TOTAL: 123456, FREE: 10000, T_STRING: 50000, ...}\
\
ObjectSpace.each_object(String) { |s| puts s if s.include?(\\"secret\\") }\
```\
\
**Practical uses:** detect memory leaks (which class has abnormally many instances), profile allocations (code creating many short-lived objects — use `trace_object_allocations_start`), debug finalizers and weak references.\
\
**Not for regular production code** — expensive; use only during profiling/debugging.
