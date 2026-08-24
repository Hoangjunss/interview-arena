---
id: cach-tao-custom-exception-trong-ruby-best-practice-la-gi
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo custom exception trong Ruby? Best practice là gì?

## Question (EN)
How do you create a custom exception in Ruby? What are the best practices?

## Đáp án chi tiết (VI)
Kế thừa từ `StandardError` (hoặc subclass của nó) — **không phải từ `Exception`** gốc.\
\
```ruby\
# Pattern chuẩn: tạo base error cho library, sau đó specialise\
module PaymentGateway\
  class Error \u003c StandardError; end\
  class ConnectionError \u003c Error; end\
  class InsufficientFundsError \u003c Error\
    def initialize(amount, balance)\
      super(\\"Need #{amount} but only have #{balance}\\")\
      @amount  = amount\
      @balance = balance\
    end\
    attr_reader :amount, :balance\
  end\
end\
\
# Caller có thể rescue broad hoặc narrow:\
rescue PaymentGateway::Error =\u003e e        # bắt mọi lỗi payment\
rescue PaymentGateway::InsufficientFundsError =\u003e e  # chỉ bắt thiếu tiền\
```\
\
**Best practice:**\
- Tên kết thúc bằng `Error`.\
- Kế thừa `StandardError`, không phải `Exception`.\
- Tạo 1 base error class cho mỗi library/module.\
- Thêm context data qua `attr_reader` để caller biết chi tiết.

## Detailed Answer (EN)
Inherit from `StandardError` (or a subclass) — **not from `Exception`** directly.\
\
```ruby\
module PaymentGateway\
  class Error \u003c StandardError; end\
  class ConnectionError \u003c Error; end\
  class InsufficientFundsError \u003c Error\
    def initialize(amount, balance)\
      super(\\"Need #{amount} but only have #{balance}\\")\
      @amount  = amount\
      @balance = balance\
    end\
    attr_reader :amount, :balance\
  end\
end\
\
# Caller can rescue broadly or narrowly:\
rescue PaymentGateway::Error =\u003e e\
rescue PaymentGateway::InsufficientFundsError =\u003e e\
```\
\
**Best practices:**\
- Name exceptions ending in `Error`.\
- Inherit from `StandardError`, not `Exception`.\
- Create one base error class per library/module.\
- Attach context data via `attr_reader` so callers have detail.
