---
id: phan-biet-display-block-inline-va-inline-block
position: backend
technology: css-\u0026-layout
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt `display: block`, `inline` và `inline-block`?

## Question (EN)
What is the difference between `display: block`, `inline`, and `inline-block`?

## Đáp án chi tiết (VI)
Ba giá trị `display` này quyết định phần tử tham gia luồng layout thế nào:\
\
| | `block` | `inline` | `inline-block` |\
|---|---|---|---|\
| Xuống dòng mới | Có (chiếm cả hàng) | Không (nằm cùng dòng) | Không (cùng dòng) |\
| `width`/`height` | Có tác dụng | **Bị bỏ qua** | Có tác dụng |\
| `margin`/`padding` dọc | Đủ tác dụng (đẩy layout) | Ngang có; **dọc không đẩy** layout | Đủ tác dụng |\
\
- **`block`**: `\u003cdiv\u003e`, `\u003cp\u003e`, `\u003ch1\u003e`, `\u003csection\u003e` — chiếm hết bề ngang có sẵn, nằm chồng theo cột.\
- **`inline`**: `\u003cspan\u003e`, `\u003ca\u003e`, `\u003cstrong\u003e` — chỉ rộng bằng nội dung, chảy trong dòng văn bản; đặt `width`/`height` vô nghĩa.\
- **`inline-block`**: lai — nằm cùng dòng như `inline` nhưng **nhận `width`/`height` và margin/padding dọc** như `block`. Hợp cho nút, item menu ngang cần kích thước cố định.\
\
Lưu ý: layout hiện đại thường dùng `flex`/`grid` cho việc sắp xếp, nhưng ba giá trị nền tảng này vẫn quyết định hành vi mặc định của từng thẻ.

## Detailed Answer (EN)
These three `display` values decide how an element takes part in layout flow:\
\
| | `block` | `inline` | `inline-block` |\
|---|---|---|---|\
| Starts a new line | Yes (takes the whole row) | No (sits on the same line) | No (same line) |\
| `width`/`height` | Respected | **Ignored** | Respected |\
| Vertical `margin`/`padding` | Fully applied (pushes layout) | Horizontal only; **vertical does not push** layout | Fully applied |\
\
- **`block`**: `\u003cdiv\u003e`, `\u003cp\u003e`, `\u003ch1\u003e`, `\u003csection\u003e` — takes all available width, stacked as a column.\
- **`inline`**: `\u003cspan\u003e`, `\u003ca\u003e`, `\u003cstrong\u003e` — only as wide as its content, flowing within a text line; `width`/`height` have no effect.\
- **`inline-block`**: a hybrid — sits on the same line like `inline` but **respects `width`/`height` and vertical margin/padding** like `block`. Good for buttons or horizontal menu items needing a fixed size.\
\
Note: modern layout usually uses `flex`/`grid` for arrangement, but these three foundational values still define each tag’s default behavior.
