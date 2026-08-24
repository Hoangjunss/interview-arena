---
id: each-va-map-khac-nhau-the-nao-trong-ruby-khi-nao-dung-cai-nao
position: backend
technology: block-\u0026-iterator
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`each` và `map` khác nhau thế nào trong Ruby? Khi nào dùng cái nào?

## Question (EN)
What is the difference between `each` and `map` in Ruby? When should you use each?

## Đáp án chi tiết (VI)
| | `each` | `map` / `collect` |\
|---|---|---|\
| Return | object gốc (self) | array **mới** chứa kết quả |\
| Mục đích | side-effect (in, ghi file...) | biến đổi, tạo dữ liệu mới |\
\
**Quy tắc:** Nếu không dùng giá trị trả về → `each`. Nếu cần array mới → `map`. `map!` biến đổi in-place (thay đổi array gốc).

## Detailed Answer (EN)
| | `each` | `map` / `collect` |\
|---|---|---|\
| Returns | original object (self) | **new array** of results |\
| Purpose | side-effects (printing, writing...) | transforming, producing new data |\
\
**Rule:** if you discard the return value → `each`. If you need the new array → `map`. `map!` mutates in-place.
