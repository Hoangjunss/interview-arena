---
id: data-define-trong-ruby-3-2-la-gi-khac-struct-o-diem-nao
position: backend
technology: exception-\u0026-gem
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Data.define` trong Ruby 3.2 là gì? Khác Struct ở điểm nào?

## Question (EN)
What is `Data.define` in Ruby 3.2? How does it differ from Struct?

## Đáp án chi tiết (VI)
`Data.define` (Ruby 3.2+) tạo **immutable value object** — khác `Struct` ở chỗ mọi attribute đều read-only và object được freeze sau `initialize`.\
\
```ruby\
# Struct — mutable\
Point = Struct.new(:x, :y)\
p = Point.new(1, 2)\
p.x = 99   # OK — Struct cho phép gán\
\
# Data.define — immutable\
Coord = Data.define(:lat, :lng)\
c = Coord.new(lat: 10.0, lng: 106.0)\
c.lat           # =\u003e 10.0\
c.lat = 99      # =\u003e NoMethodError — no setter\
c.frozen?       # =\u003e true\
\
# Tạo bản mới với 1 trường thay đổi\
c2 = c.with(lat: 21.0)\
c2.lng          # =\u003e 106.0  — lng giữ nguyên\
```\
\
| | `Struct` | `Data.define` |\
|---|---|---|\
| Mutability | Mutable (có setter) | **Immutable** (frozen) |\
| `with` method | Không | Có |\
| Dùng cho | Value object + behavior đơn giản | Pure value object (DTO, event) |\
\
`Data.define` là lựa chọn tốt hơn Struct cho domain object thuần dữ liệu (Money, Coordinate, DateRange, API response).

## Detailed Answer (EN)
`Data.define` (Ruby 3.2+) creates an **immutable value object** — unlike `Struct`, all attributes are read-only and the object is frozen after initialization.\
\
```ruby\
# Struct — mutable\
Point = Struct.new(:x, :y)\
p = Point.new(1, 2)\
p.x = 99   # OK\
\
# Data.define — immutable\
Coord = Data.define(:lat, :lng)\
c = Coord.new(lat: 10.0, lng: 106.0)\
c.lat           # =\u003e 10.0\
c.lat = 99      # =\u003e NoMethodError\
c.frozen?       # =\u003e true\
\
# Create a new instance with one field changed\
c2 = c.with(lat: 21.0)\
c2.lng          # =\u003e 106.0  — unchanged\
```\
\
| | `Struct` | `Data.define` |\
|---|---|---|\
| Mutability | Mutable (has setters) | **Immutable** (frozen) |\
| `with` method | No | Yes |\
| Best for | Value objects + simple behaviour | Pure value objects (DTO, event) |\
\
`Data.define` is the better choice for domain objects that carry only data (Money, Coordinate, DateRange, API response).
