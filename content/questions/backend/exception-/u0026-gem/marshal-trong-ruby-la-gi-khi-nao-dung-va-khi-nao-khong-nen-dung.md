---
id: marshal-trong-ruby-la-gi-khi-nao-dung-va-khi-nao-khong-nen-dung
position: backend
technology: exception-\u0026-gem
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Marshal trong Ruby là gì? Khi nào dùng và khi nào không nên dùng?

## Question (EN)
What is Marshal in Ruby? When should and shouldn't you use it?

## Đáp án chi tiết (VI)
`Marshal` là module serialization built-in của Ruby — chuyển đổi object thành binary string (`dump`) và khôi phục lại (`load`). Hoàn toàn Ruby-specific, không portable qua ngôn ngữ khác.\
\
```ruby\
class Point\
  attr_reader :x, :y\
  def initialize(x, y)\
    @x, @y = x, y\
  end\
end\
\
point = Point.new(3, 4)\
\
# Serialize → binary\
binary = Marshal.dump(point)\
\
# Deserialize ← binary\
restored = Marshal.load(binary)\
puts restored.x  # =\u003e 3\
```\
\
**Khi dùng:** cache phức tạp (Rails session store mặc định là Marshal), queue serialization (Sidekiq với một số cấu hình), gRPC/IPC nội bộ Ruby process.\
\
**Khi KHÔNG dùng:**\
- Input từ user/network — `Marshal.load` trên data không tin cậy cho phép **remote code execution** (lỗ hổng bảo mật nghiêm trọng).\
- Lưu trữ lâu dài hoặc chia sẻ với ngôn ngữ khác — dùng JSON/MessagePack.

## Detailed Answer (EN)
`Marshal` is Ruby's built-in serialization module — converts objects to binary (`dump`) and back (`load`). Ruby-specific; not portable across languages.\
\
```ruby\
class Point\
  attr_reader :x, :y\
  def initialize(x, y)\
    @x, @y = x, y\
  end\
end\
\
point = Point.new(3, 4)\
binary  = Marshal.dump(point)\
restored = Marshal.load(binary)\
puts restored.x  # =\u003e 3\
```\
\
**When to use:** complex caching, Rails session stores (default), internal Ruby IPC.\
\
**When NOT to use:**\
- User/network input — `Marshal.load` on untrusted data enables **remote code execution** (critical security vulnerability).\
- Long-term storage or cross-language sharing — use JSON/MessagePack instead.
