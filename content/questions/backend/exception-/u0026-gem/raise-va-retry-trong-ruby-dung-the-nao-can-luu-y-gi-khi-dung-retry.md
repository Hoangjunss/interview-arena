---
id: raise-va-retry-trong-ruby-dung-the-nao-can-luu-y-gi-khi-dung-retry
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`raise` và `retry` trong Ruby dùng thế nào? Cần lưu ý gì khi dùng `retry`?

## Question (EN)
How do `raise` and `retry` work in Ruby? What are the pitfalls of `retry`?

## Đáp án chi tiết (VI)
`raise` ném exception. Có 3 dạng:\
```ruby\
raise                              # re-raise exception hiện tại\
raise \\"something went wrong\\"       # RuntimeError với message\
raise ArgumentError, \\"bad value\\"   # explicit class + message\
```\
\
`retry` khởi động lại `begin` block từ đầu — chỉ dùng được trong `rescue`:\
```ruby\
MAX_RETRIES = 3\
attempts = 0\
\
begin\
  attempts += 1\
  connect_to_api\
rescue NetworkError =\u003e e\
  retry if attempts \u003c MAX_RETRIES\
  raise  # hết retry → re-raise\
end\
```\
\
Lưu ý: `retry` không có giới hạn → vòng lặp vô tận; không reset state → lặp lỗi mãi; retry blind → che giấu bug thực sự. **Rule:** luôn có counter/limit và chỉ retry với exception biết cách handle.

## Detailed Answer (EN)
`raise` throws an exception. Three forms:\
```ruby\
raise                              # re-raise current exception\
raise \\"something went wrong\\"       # RuntimeError with message\
raise ArgumentError, \\"bad value\\"   # explicit class + message\
```\
\
`retry` restarts the `begin` block from scratch — only valid inside `rescue`:\
```ruby\
MAX_RETRIES = 3\
attempts = 0\
\
begin\
  attempts += 1\
  connect_to_api\
rescue NetworkError =\u003e e\
  retry if attempts \u003c MAX_RETRIES\
  raise  # exhausted — re-raise\
end\
```\
\
Pitfalls: no limit → infinite loop; state not reset → same error repeats forever; blind retry → hides real bugs. **Rule:** always have a counter/limit, and only retry for exceptions you know how to recover from.
