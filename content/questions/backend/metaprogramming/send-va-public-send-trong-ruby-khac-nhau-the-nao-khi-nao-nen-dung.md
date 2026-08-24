---
id: send-va-public-send-trong-ruby-khac-nhau-the-nao-khi-nao-nen-dung
position: backend
technology: metaprogramming
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`send` và `public_send` trong Ruby khác nhau thế nào? Khi nào nên dùng?

## Question (EN)
What is the difference between `send` and `public_send` in Ruby? When should you use each?

## Đáp án chi tiết (VI)
Cả hai đều gọi method theo tên động (string/symbol), nhưng:\
- **`send`** gọi được cả `private` và `protected` method.\
- **`public_send`** chỉ gọi `public` method — raise `NoMethodError` nếu method là private.\
\
```ruby\
class Vault\
  def open = \\"opened\\"\
  private\
  def secret = \\"top secret\\"\
end\
\
v = Vault.new\
v.send(:open)          # =\u003e \\"opened\\"\
v.send(:secret)        # =\u003e \\"top secret\\"  — bypass private!\
v.public_send(:secret) # =\u003e NoMethodError: private method called\
```\
\
Dùng `public_send` trong production — tôn trọng visibility, an toàn khi input đến từ ngoài. Dùng `send` trong test (spy on private) hoặc khi thực sự cần bypass (hiếm). Cảnh báo: luôn whitelist method name khi tên đến từ user để tránh code injection.

## Detailed Answer (EN)
Both call a method by dynamic name (string/symbol), but:\
- **`send`** invokes `private` and `protected` methods too.\
- **`public_send`** only calls `public` methods — raises `NoMethodError` for private ones.\
\
```ruby\
class Vault\
  def open = \\"opened\\"\
  private\
  def secret = \\"top secret\\"\
end\
\
v = Vault.new\
v.send(:open)          # =\u003e \\"opened\\"\
v.send(:secret)        # =\u003e \\"top secret\\"  — bypasses private!\
v.public_send(:secret) # =\u003e NoMethodError: private method called\
```\
\
Use `public_send` in production — respects visibility, safe when method names come from external input. Use `send` in tests (spy on private) or when bypassing visibility is truly required (rare). Always whitelist method names from user input to avoid code injection.
