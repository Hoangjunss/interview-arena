---
id: grid-co-cot-1fr-nhung-noi-dung-dai-bang-url-khong-ngat-lam-ca-grid-tran-ngang-su
position: backend
technology: track-sizing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Grid có cột `1fr` nhưng nội dung dài (bảng, URL không ngắt) làm cả grid tràn ngang. Sửa thế nào?

## Question (EN)
A grid column sized `1fr` overflows horizontally when it holds long content (a table, an unbreakable URL). How do you fix it?

## Đáp án chi tiết (VI)
Đổi `1fr` thành **`minmax(0, 1fr)`**.\
\
`1fr` thực chất là viết tắt của `minmax(auto, 1fr)`. Phần `auto` đặt sàn tối thiểu bằng **min-content** của ô, nên khi bên trong có nội dung không ngắt được, track buộc phải rộng ra và cả grid tràn ngang khỏi container.\
\
```css\
/* tràn khi cột phải chứa nội dung dài */\
.layout { display: grid; grid-template-columns: 240px 1fr; }\
\
/* an toàn */\
.layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); }\
```\
\
`minmax(min, max)` định nghĩa track co giãn giữa hai mốc. Đặt min = 0 nghĩa là cho phép track nhỏ hơn nội dung, khi đó `overflow: auto` hay `text-overflow: ellipsis` bên trong mới có tác dụng.\
\
Các dạng hay dùng: `minmax(200px, 1fr)` (cột không hẹp hơn 200px), `minmax(min-content, 320px)`, `minmax(auto, 60ch)` cho cột văn bản. Đây là cùng một lớp lỗi với `min-width: auto` của flex item.

## Detailed Answer (EN)
Change `1fr` to **`minmax(0, 1fr)`**.\
\
`1fr` is really shorthand for `minmax(auto, 1fr)`. That `auto` floor is the cell's **min-content size**, so unbreakable content forces the track wider and the whole grid overflows its container.\
\
```css\
/* overflows when the column holds long content */\
.layout { display: grid; grid-template-columns: 240px 1fr; }\
\
/* safe */\
.layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); }\
```\
\
`minmax(min, max)` defines a track that flexes between two bounds. A min of 0 permits the track to be narrower than its content, which is what makes an inner `overflow: auto` or `text-overflow: ellipsis` work at all.\
\
Common forms: `minmax(200px, 1fr)` (never narrower than 200px), `minmax(min-content, 320px)`, `minmax(auto, 60ch)` for a text column. This is the same class of bug as `min-width: auto` on flex items.
