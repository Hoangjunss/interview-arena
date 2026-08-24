---
id: bridge-pattern-la-gi-khac-gi-adapter
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bridge pattern là gì? Khác gì Adapter?

## Question (EN)
What is the Bridge pattern? How does it differ from Adapter?

## Đáp án chi tiết (VI)
Bridge tách abstraction khỏi implementation để cả hai có thể thay đổi độc lập — giải quyết 'Cartesian product' explosion khi có nhiều dimension. \
\
**Ví dụ:** `Shape` (Circle, Square) × `Renderer` (SVGRenderer, CanvasRenderer) = 4 class nếu dùng inheritance, nhưng với Bridge chỉ cần 2+2 class:\
```typescript\
class Circle {\
  constructor(private renderer: Renderer, private radius: number) {}\
  draw() {\
    this.renderer.renderCircle(this.radius)\
  }\
}\
class Square {\
  constructor(private renderer: Renderer, private side: number) {}\
  draw() {\
    this.renderer.renderSquare(this.side)\
  }\
}\
```\
Khác Adapter: Adapter giải quyết incompatibility giữa existing interfaces (fix sau); Bridge thiết kế từ đầu để tách abstraction-implementation (design upfront). Dùng Bridge khi: muốn tránh class explosion do kết hợp nhiều dimension; khi abstraction và implementation cần thay đổi độc lập; khi muốn share implementation giữa nhiều object. Không dùng khi: chỉ có một dimension biến đổi — over-engineering.

## Detailed Answer (EN)
$82
