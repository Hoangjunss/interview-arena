---
id: load-require-va-require-relative-trong-ruby-khac-nhau-the-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`load`, `require` và `require_relative` trong Ruby khác nhau thế nào?

## Question (EN)
What is the difference between `load`, `require`, and `require_relative` in Ruby?

## Đáp án chi tiết (VI)
| | `load` | `require` | `require_relative` |\
|---|---|---|---|\
| Đường dẫn | Phải có đuôi `.rb` | Không cần đuôi | Không cần đuôi |\
| Caching | Không — load lại mỗi lần | Có — chỉ load 1 lần | Có — chỉ load 1 lần |\
| Đường dẫn gốc | `$LOAD_PATH` | `$LOAD_PATH` | **Tương đối so với file hiện tại** |\
\
```ruby\
load 'utils.rb'          # load lại mỗi lần gọi\
require 'json'            # từ gem/stdlib, cache\
require_relative 'models/user'  # relative từ file này\
```\
\
**Khi nào dùng cái nào:**\
- `require` — gem, stdlib (JSON, Net::HTTP...)\
- `require_relative` — file trong cùng project\
- `load` — hiếm; khi muốn reload file đang thay đổi (như config hot-reload)

## Detailed Answer (EN)
| | `load` | `require` | `require_relative` |\
|---|---|---|---|\
| Extension | Must include `.rb` | Omit `.rb` | Omit `.rb` |\
| Caching | No — reloads every call | Yes — loads once | Yes — loads once |\
| Base path | `$LOAD_PATH` | `$LOAD_PATH` | **Relative to current file** |\
\
```ruby\
load 'utils.rb'          # reloads every call\
require 'json'            # gem/stdlib, cached\
require_relative 'models/user'  # relative to this file\
```\
\
**When to use each:**\
- `require` — gems, stdlib (JSON, Net::HTTP...)\
- `require_relative` — files within the same project\
- `load` — rare; when you want to reload a file mid-run (e.g. hot-reload config)
