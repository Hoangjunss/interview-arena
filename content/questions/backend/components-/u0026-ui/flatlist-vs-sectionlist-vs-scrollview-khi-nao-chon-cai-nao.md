---
id: flatlist-vs-sectionlist-vs-scrollview-khi-nao-chon-cai-nao
position: backend
technology: components-\u0026-ui
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`FlatList` vs `SectionList` vs `ScrollView` — khi nào chọn cái nào?

## Question (EN)
`FlatList` vs `SectionList` vs `ScrollView` — when to use each?

## Đáp án chi tiết (VI)
**`ScrollView`**: render toàn bộ children **ngay lập tức**. Dùng cho UI ngắn (form, profile screen), không có pattern data-driven. Chậm và tốn memory với list \u003e20 items.\
\
**`FlatList`**: virtualized list — chỉ render items đang visible + windowSize buffer. Lazy mount và unmount khi scroll qua. API: `data`, `renderItem`, `keyExtractor`. Dùng cho list đồng nhất một loại item (chat, feed).\
\
**`SectionList`**: như FlatList nhưng có header/footer cho từng section. Data shape `[{ title, data: [...] }]`. Dùng cho contact list, settings có grouping.\
\
**Hậu quả nếu chọn sai:**\
- ScrollView 1000 items: app freeze 5–10s lúc mount, RAM spike, scroll lag.\
- FlatList với `initialNumToRender={1000}`: tương đương ScrollView, mất ý nghĩa virtualize.\
- Lồng FlatList trong ScrollView: VirtualizedList warning, virtualization không hoạt động (parent extend chiều cao vô hạn). Nếu cần list trong scroll, dùng `\u003cFlatList ListHeaderComponent={...} ListFooterComponent={...}\u003e`.

## Detailed Answer (EN)
**`ScrollView`** renders all children **immediately**. Use for short UI (forms, profile screens) without a data-driven pattern. It is slow and memory-heavy past ~20 items.\
\
**`FlatList`** is a virtualized list — it only renders visible items plus a windowSize buffer, mounting and unmounting as you scroll. API: `data`, `renderItem`, `keyExtractor`. Use for homogeneous lists (chat, feed).\
\
**`SectionList`** is like FlatList with per-section headers/footers. Data shape `[{ title, data: [...] }]`. Use for contact lists, grouped settings.\
\
**Consequences of the wrong choice:**\
- ScrollView with 1,000 items: 5–10 s freeze on mount, RAM spike, scroll jank.\
- FlatList with `initialNumToRender={1000}`: equivalent to ScrollView, defeats virtualization.\
- FlatList inside ScrollView: VirtualizedList warning and broken virtualization (parent stretches infinitely). If you need a list inside scrolling content, use `\u003cFlatList ListHeaderComponent={...} ListFooterComponent={...}\u003e`.
