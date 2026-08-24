---
id: cac-gia-tri-position-static-relative-absolute-fixed-sticky-khac-nhau-the-nao
position: backend
technology: css-\u0026-layout
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các giá trị `position` (static/relative/absolute/fixed/sticky) khác nhau thế nào?

## Question (EN)
How do the `position` values (static/relative/absolute/fixed/sticky) differ?

## Đáp án chi tiết (VI)
- **`static`** (mặc định): theo luồng bình thường; `top/left/z-index` không có tác dụng.\
- **`relative`**: vẫn giữ chỗ trong luồng nhưng dịch chuyển theo `top/left…` so với **vị trí gốc của chính nó**. Thường dùng để làm **mốc cho con `absolute`**.\
- **`absolute`**: **thoát khỏi luồng** (không chiếm chỗ); định vị theo **tổ tiên gần nhất có `position` khác `static`** (nếu không có thì theo viewport).\
- **`fixed`**: thoát luồng, định vị theo **viewport**; **không cuộn theo trang** (hợp header cố định, nút back-to-top).\
- **`sticky`**: lai giữa relative và fixed — cuộn bình thường tới ngưỡng `top` rồi **\\"dính\\"** lại. Cần chỉ định ngưỡng (`top: 0`) và bị giới hạn trong phần tử cha.\
\
Ghi chú: `z-index` có hiệu lực trên phần tử **đã positioned** (khác `static`) và cả **flex/grid item**, và phụ thuộc **stacking context**.

## Detailed Answer (EN)
- **`static`** (default): normal flow; `top/left/z-index` have no effect.\
- **`relative`**: still occupies its slot in flow but shifts via `top/left…` relative to **its own original position**. Often used as an **anchor for `absolute` children**.\
- **`absolute`**: **removed from flow** (takes no space); positioned against the **nearest ancestor with a non-`static` position** (or the viewport if none).\
- **`fixed`**: removed from flow, positioned against the **viewport**; **does not scroll** with the page (good for fixed headers, back-to-top buttons).\
- **`sticky`**: a hybrid of relative and fixed — scrolls normally until a `top` threshold, then **\\"sticks\\"**. Requires a threshold (`top: 0`) and is bounded by its parent.\
\
Note: `z-index` applies to **positioned** elements (non-`static`) and also to **flex/grid items**, and depends on the **stacking context**.
