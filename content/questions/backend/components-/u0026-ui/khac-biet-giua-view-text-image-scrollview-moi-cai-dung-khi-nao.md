---
id: khac-biet-giua-view-text-image-scrollview-moi-cai-dung-khi-nao
position: backend
technology: components-\u0026-ui
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa `View`, `Text`, `Image`, `ScrollView` — mỗi cái dùng khi nào?

## Question (EN)
Differences between `View`, `Text`, `Image`, `ScrollView` — when to use each?

## Đáp án chi tiết (VI)
`\u003cView\u003e` là container cơ bản — tương đương `\u003cdiv\u003e` web, không có default text rendering. Dùng cho mọi layout block (row/column).\
\
`\u003cText\u003e` là **bắt buộc** cho mọi chuỗi ký tự. Hỗ trợ `numberOfLines`, `ellipsizeMode`, font style, lồng `\u003cText\u003e` con để inline format.\
\
`\u003cImage source={{ uri }} /\u003e` (remote) hoặc `\u003cImage source={require('./logo.png')} /\u003e` (local). Phải set `width`/`height` rõ ràng cho remote — không có intrinsic size như HTML.\
\
`\u003cScrollView\u003e` cho nội dung **ngắn**, render toàn bộ children ngay lập tức. **Không** dùng cho list dài (\u003e20 items) vì không virtualize → memory leak, scroll lag. Dùng `\u003cFlatList\u003e` thay.\
\
Quy tắc nhanh: container không text → `View`; text → `Text`; ảnh → `Image`; nội dung scroll cố định → `ScrollView`; list dữ liệu động → `FlatList`.

## Detailed Answer (EN)
`\u003cView\u003e` is the base container — equivalent to `\u003cdiv\u003e` on the web, with no default text rendering. Use it for any layout block (row/column).\
\
`\u003cText\u003e` is **required** for any string. Supports `numberOfLines`, `ellipsizeMode`, font style, and nested `\u003cText\u003e` for inline formatting.\
\
`\u003cImage source={{ uri }} /\u003e` (remote) or `\u003cImage source={require('./logo.png')} /\u003e` (local). You **must** set `width`/`height` explicitly for remote images — there is no intrinsic size like HTML.\
\
`\u003cScrollView\u003e` is for **short** content; it renders all children immediately. **Do not** use it for long lists (\u003e20 items) — there is no virtualization, so memory leaks and scroll jank. Use `\u003cFlatList\u003e` instead.\
\
Quick rule: text-less container → `View`; text → `Text`; image → `Image`; static scrollable content → `ScrollView`; dynamic list → `FlatList`.
