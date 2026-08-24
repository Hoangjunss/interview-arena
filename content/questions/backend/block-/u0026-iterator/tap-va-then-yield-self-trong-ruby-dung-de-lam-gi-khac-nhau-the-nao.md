---
id: tap-va-then-yield-self-trong-ruby-dung-de-lam-gi-khac-nhau-the-nao
position: backend
technology: block-\u0026-iterator
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`tap` và `then`/`yield_self` trong Ruby dùng để làm gì? Khác nhau thế nào?

## Question (EN)
What are `tap` and `then`/`yield_self` in Ruby? How do they differ?

## Đáp án chi tiết (VI)
Cả hai đều yield `self` vào block, nhưng return value khác:\
\
| Method | Return | Dùng khi |\
|---|---|---|\
| `tap` | `self` (object gốc) | debug, side-effect giữa chain |\
| `then` / `yield_self` | giá trị block trả về | transform, tích hợp non-chainable func vào pipeline |\
\
```ruby\
# tap — trả về self, không ảnh hưởng pipeline\
[1, 2, 3]\
  .map { |n| n * 2 }\
  .tap { |arr| puts \\"After map: #{arr}\\" }  # debug\
  .select(\u0026:odd?)\
# =\u003e []\
\
# then — trả về kết quả block, tiếp tục biến đổi\
user_id = 42\
user_id\
  .then { |id| User.find(id) }\
  .then { |user| user.profile }\
  .then { |profile| profile.avatar_url }\
```\
\
`yield_self` là tên gốc (Ruby 2.5), `then` là alias thêm ở Ruby 2.6 — hiện nay ưu tiên dùng `then` vì đọc tự nhiên hơn.

## Detailed Answer (EN)
Both yield `self` to a block, but they differ in return value:\
\
| Method | Returns | Use for |\
|---|---|---|\
| `tap` | `self` (original object) | debugging, side-effects mid-chain |\
| `then` / `yield_self` | block's return value | transforming, integrating non-chainable functions into a pipeline |\
\
```ruby\
# tap — returns self, doesn't change pipeline\
[1, 2, 3]\
  .map { |n| n * 2 }\
  .tap { |arr| puts \\"After map: #{arr}\\" }  # debug only\
  .select(\u0026:odd?)\
\
# then — returns block result, continues transforming\
user_id = 42\
user_id\
  .then { |id| User.find(id) }\
  .then { |user| user.profile }\
  .then { |profile| profile.avatar_url }\
```\
\
`yield_self` is the original name (Ruby 2.5); `then` was added as an alias in Ruby 2.6 — prefer `then` today as it reads more naturally.
