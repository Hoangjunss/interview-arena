---
id: mark-strong-em-khac-nhau-the-nao
position: backend
technology: semantic
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003cmark\u003e`, `\u003cstrong\u003e`, `\u003cem\u003e` khác nhau thế nào?

## Question (EN)
How do `\u003cmark\u003e`, `\u003cstrong\u003e`, and `\u003cem\u003e` differ?

## Đáp án chi tiết (VI)
Cả ba đều có **nghĩa ngữ nghĩa**, khác nhau ở loại nhấn:\
\
```html\
\u003cp\u003e\u003cstrong\u003eCảnh báo:\u003c/strong\u003e không tắt máy khi đang cập nhật.\u003c/p\u003e\
\u003cp\u003eTôi \u003cem\u003ekhông\u003c/em\u003e nói anh ấy lấy tiền.\u003c/p\u003e   \u003c!-- đổi trọng âm, đổi nghĩa câu --\u003e\
\u003cp\u003eKết quả cho \\"react\\": Học \u003cmark\u003eReact\u003c/mark\u003e từ đầu\u003c/p\u003e\
```\
\
| Thẻ | Nghĩa | Mặc định |\
|---|---|---|\
| `\u003cstrong\u003e` | **mức độ quan trọng** cao | đậm |\
| `\u003cem\u003e` | **nhấn trọng âm**, đổi sắc thái câu | nghiêng |\
| `\u003cmark\u003e` | **liên quan tới ngữ cảnh hiện tại** (từ khoá tìm kiếm) | nền vàng |\
\
Đối lập với chúng là `\u003cb\u003e` và `\u003ci\u003e` — chỉ đổi hình thức, **không mang nghĩa**. Dùng `\u003ci\u003e` cho tên khoa học, thuật ngữ ngoại lai; dùng `\u003cb\u003e` cho từ khoá cần nổi mà không quan trọng hơn.\
\
**Lưu ý:** dùng `\u003cstrong\u003e` chỉ để cho chữ đậm rồi lại `font-weight: normal` — screen reader vẫn đọc nhấn mạnh trong khi mắt thường không thấy gì. Để chữ đậm thuần tuý về mặt trình bày, đặt CSS trên `\u003cspan\u003e`.

## Detailed Answer (EN)
All three carry **semantics**; they differ in the kind of emphasis:\
\
```html\
\u003cp\u003e\u003cstrong\u003eWarning:\u003c/strong\u003e do not power off during the update.\u003c/p\u003e\
\u003cp\u003eI did \u003cem\u003enot\u003c/em\u003e say he took the money.\u003c/p\u003e   \u003c!-- shifts stress, shifts meaning --\u003e\
\u003cp\u003eResults for \\"react\\": Learn \u003cmark\u003eReact\u003c/mark\u003e from scratch\u003c/p\u003e\
```\
\
| Element | Meaning | Default look |\
|---|---|---|\
| `\u003cstrong\u003e` | high **importance** | bold |\
| `\u003cem\u003e` | **stress emphasis** that changes the sentence | italic |\
| `\u003cmark\u003e` | **relevant to the current context** (search term) | yellow highlight |\
\
Their counterparts `\u003cb\u003e` and `\u003ci\u003e` change appearance only, **with no meaning**. Use `\u003ci\u003e` for scientific names or foreign terms, `\u003cb\u003e` for keywords that should stand out without being more important.\
\
**Note:** reaching for `\u003cstrong\u003e` just to get bold text and then resetting `font-weight: normal` — screen readers still announce the emphasis that sighted users cannot see. For pure weight, style a `\u003cspan\u003e`.
