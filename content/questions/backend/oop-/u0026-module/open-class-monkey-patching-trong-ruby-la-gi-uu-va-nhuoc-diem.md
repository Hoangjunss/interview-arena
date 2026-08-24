---
id: open-class-monkey-patching-trong-ruby-la-gi-uu-va-nhuoc-diem
position: backend
technology: oop-\u0026-module
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Open class (Monkey Patching) trong Ruby là gì? Ưu và nhược điểm?

## Question (EN)
What are open classes (monkey patching) in Ruby? What are the pros and cons?

## Đáp án chi tiết (VI)
Ruby cho phép **mở lại bất kỳ class nào** — kể cả built-in như `String`, `Integer` — để thêm hoặc ghi đè method. Gọi là open class hay monkey patching.\
\
```ruby\
class Integer\
  def factorial\
    return 1 if self \u003c= 1\
    self * (self - 1).factorial\
  end\
end\
\
5.factorial  # =\u003e 120\
```\
\
Ưu điểm: DSL ngắn gọn, tự nhiên (Rails dùng rộng rãi: `2.days.ago`). Nhược điểm: ghi đè ngầm method của gem khác → bug khó trace; upgrade Ruby/gem có thể conflict; khó biết method đến từ đâu.\
\
Thay thế an toàn hơn: **Refinement** (`refine ... using`) — monkey patch chỉ có hiệu lực trong scope khai báo `using`.

## Detailed Answer (EN)
Ruby allows **reopening any class** — including built-ins like `String` and `Integer` — to add or override methods. This is known as open classes or monkey patching.\
\
```ruby\
class Integer\
  def factorial\
    return 1 if self \u003c= 1\
    self * (self - 1).factorial\
  end\
end\
\
5.factorial  # =\u003e 120\
```\
\
Pros: concise DSLs (Rails uses this heavily: `2.days.ago`). Cons: silently overrides gem methods → hard-to-trace bugs; Ruby/gem upgrades may conflict; hard to tell where a method originates.\
\
Safer alternative: **Refinements** (`refine ... using`) — monkey patches scoped to only where `using` is declared.
