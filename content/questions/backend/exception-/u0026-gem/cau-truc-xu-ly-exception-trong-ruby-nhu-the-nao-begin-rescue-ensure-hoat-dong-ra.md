---
id: cau-truc-xu-ly-exception-trong-ruby-nhu-the-nao-begin-rescue-ensure-hoat-dong-ra
position: backend
technology: exception-\u0026-gem
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cấu trúc xử lý exception trong Ruby như thế nào? `begin/rescue/ensure` hoạt động ra sao?

## Question (EN)
What is the exception handling structure in Ruby? How do `begin/rescue/ensure` work?

## Đáp án chi tiết (VI)
```ruby\
begin\
  result = 10 / 0\
rescue ZeroDivisionError =\u003e e\
  puts \\"Caught: #{e.message}\\"  # Caught: divided by 0\
rescue ArgumentError, TypeError =\u003e e\
  puts \\"Bad input: #{e.message}\\"\
else\
  puts \\"No error, result = #{result}\\"  # chạy khi KHÔNG có exception\
ensure\
  puts \\"Always runs\\"  # dọn dẹp resource, luôn chạy dù exception hay không\
end\
```\
\
**Thứ tự thực thi:**\
1. `begin` — code có thể raise.\
2. `rescue` — bắt exception theo loại, khớp từ trên xuống.\
3. `else` — chạy nếu không có exception nào xảy ra.\
4. `ensure` — **luôn luôn** chạy (đóng file, release connection).\
\
**Lưu ý:** `rescue` mặc định chỉ bắt `StandardError` và subclass — không bắt `Exception` gốc (như `SystemExit`, `NoMemoryError`).

## Detailed Answer (EN)
```ruby\
begin\
  result = 10 / 0\
rescue ZeroDivisionError =\u003e e\
  puts \\"Caught: #{e.message}\\"\
rescue ArgumentError, TypeError =\u003e e\
  puts \\"Bad input: #{e.message}\\"\
else\
  puts \\"No error, result = #{result}\\"  # runs only if no exception\
ensure\
  puts \\"Always runs\\"  # cleanup, runs regardless\
end\
```\
\
**Execution order:**\
1. `begin` — potentially risky code.\
2. `rescue` — catches exceptions by type, matched top-to-bottom.\
3. `else` — runs only when no exception occurred.\
4. `ensure` — **always** runs (close files, release connections).\
\
**Key note:** bare `rescue` only catches `StandardError` and subclasses — it does NOT catch top-level `Exception` subclasses like `SystemExit` or `NoMemoryError`.
