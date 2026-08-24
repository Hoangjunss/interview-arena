---
id: internationalization-i18n-seo-hreflang-la-gi-cach-implement
position: backend
technology: technical
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Internationalization (i18n) SEO: hreflang là gì? Cách implement?

## Question (EN)
What is hreflang in i18n SEO? How do you implement it?

## Đáp án chi tiết (VI)
`hreflang` attribute cho Google biết trang nào dành cho ngôn ngữ/quốc gia nào — để Google phục vụ đúng phiên bản ngôn ngữ/khu vực cho từng user (lưu ý: Google khẳng định không có duplicate content penalty — hreflang không phải để 'tránh phạt'). Format: `\u003clink rel='alternate' hreflang='vi' href='https://example.com/vi/page'\u003e`.\
\
Quy tắc:\
- Mỗi trang phải có hreflang trỏ đến TẤT CẢ phiên bản ngôn ngữ (kể cả chính nó — self-referencing).\
- hreflang phải reciprocal (trang A trỏ B, trang B phải trỏ lại A).\
- Dùng `x-default` cho fallback language.\
\
Format language code: 'vi' (ngôn ngữ), 'en-US' (ngôn ngữ-quốc gia). Trong Next.js: `generateMetadata()` với `alternates.languages` (App Router); còn cấu hình `i18n` trong next.config chỉ áp dụng cho Pages Router — App Router không có i18n routing built-in.\
\
Sai lầm: hreflang không reciprocal (Google bỏ qua)"])</script><script>self.__next_f.push([1,

## Detailed Answer (EN)
$86
