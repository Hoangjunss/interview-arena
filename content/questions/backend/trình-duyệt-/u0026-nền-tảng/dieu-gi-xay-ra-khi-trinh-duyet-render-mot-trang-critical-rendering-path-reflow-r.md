---
id: dieu-gi-xay-ra-khi-trinh-duyet-render-mot-trang-critical-rendering-path-reflow-r
position: backend
technology: trình-duyệt-\u0026-nền-tảng
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra khi trình duyệt render một trang? (critical rendering path, reflow/repaint)

## Question (EN)
What happens when the browser renders a page? (critical rendering path, reflow/repaint)

## Đáp án chi tiết (VI)
**Critical rendering path** — chuỗi bước biến HTML/CSS/JS thành pixel:\
\
1. Parse HTML → **DOM tree**.\
2. Parse CSS → **CSSOM tree** (CSS chặn render).\
3. DOM + CSSOM → **render tree** (chỉ node hiển thị).\
4. **Layout / reflow**: tính vị trí + kích thước từng node.\
5. **Paint**: tô màu, chữ, ảnh, viền thành các layer.\
6. **Composite**: ghép layer ra màn hình.\
\
Sau đó, thay đổi động gây:\
- **Reflow (layout)**: đổi thứ ảnh hưởng hình học (width, position, thêm/xóa DOM, đọc `offsetHeight`). **Tốn nhất**.\
- **Repaint**: đổi thứ chỉ ảnh hưởng hình thức (color, background) — không tính lại layout.\
- **Composite-only**: `transform`, `opacity` — rẻ nhất, ưu tiên khi làm animation.\
\
Tối ưu: gộp thao tác DOM, tránh xen kẽ đọc-ghi layout (layout thrashing), ưu tiên `transform/opacity`, đặt CSS trên đầu và script `defer`.

## Detailed Answer (EN)
**Critical rendering path** — the steps turning HTML/CSS/JS into pixels:\
\
1. Parse HTML → **DOM tree**.\
2. Parse CSS → **CSSOM tree** (CSS is render-blocking).\
3. DOM + CSSOM → **render tree** (visible nodes only).\
4. **Layout / reflow**: compute each node’s position + size.\
5. **Paint**: fill in colors, text, images, borders as layers.\
6. **Composite**: combine layers onto the screen.\
\
Afterwards, dynamic changes trigger:\
- **Reflow (layout)**: anything affecting geometry (width, position, adding/removing DOM, reading `offsetHeight`). **The most expensive.**\
- **Repaint**: anything affecting only appearance (color, background) — no re-layout.\
- **Composite-only**: `transform`, `opacity` — the cheapest, prefer these for animation.\
\
Optimize: batch DOM work, avoid interleaving layout reads/writes (layout thrashing), prefer `transform/opacity`, put CSS in the head, and `defer` scripts.
