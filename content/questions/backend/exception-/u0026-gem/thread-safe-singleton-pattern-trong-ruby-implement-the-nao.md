---
id: thread-safe-singleton-pattern-trong-ruby-implement-the-nao
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thread-safe Singleton pattern trong Ruby implement thế nào?

## Question (EN)
How do you implement a thread-safe Singleton pattern in Ruby?

## Đáp án chi tiết (VI)
Ruby có module `Singleton` trong stdlib — include nó để tạo class chỉ có đúng 1 instance, thread-safe:\
\
```ruby\
require 'singleton'\
\
class AppConfig\
  include Singleton\
\
  attr_accessor :debug, :log_level\
\
  def initialize\
    @debug     = false\
    @log_level = :info\
  end\
end\
\
config = AppConfig.instance\
config.debug = true\
\
AppConfig.instance.equal?(config)  # =\u003e true — cùng object\
AppConfig.new                       # =\u003e NoMethodError — private\
```\
\
`Singleton` module dùng `Mutex` nội bộ để đảm bảo `instance` chỉ được tạo 1 lần dù nhiều thread cùng gọi lần đầu.\
\
**Ứng dụng:** config object, connection pool (1 instance), logger dùng chung, registry global. Lưu ý: Singleton là global state — khó test; cân nhắc dependency injection thay thế trong code production.

## Detailed Answer (EN)
Ruby ships the `Singleton` module in its standard library — include it to create a class with exactly one instance, thread-safe out of the box:\
\
```ruby\
require 'singleton'\
\
class AppConfig\
  include Singleton\
\
  attr_accessor :debug, :log_level\
\
  def initialize\
    @debug     = false\
    @log_level = :info\
  end\
end\
\
config = AppConfig.instance\
config.debug = true\
\
AppConfig.instance.equal?(config)  # =\u003e true — same object\
AppConfig.new                       # =\u003e NoMethodError — private\
```\
\
`Singleton` uses an internal `Mutex` to ensure `instance` is created only once even when multiple threads call it simultaneously.\
\
**Use cases:** config objects, shared connection pools, global loggers, registries. Note: Singleton is global state — hard to test; consider dependency injection in production code.
