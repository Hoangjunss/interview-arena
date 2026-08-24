---
id: slots-la-gi-named-slots-va-scoped-slots
position: backend
technology: component-communication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Slots là gì? Named slots và scoped slots?

## Question (EN)
What are slots? Named slots and scoped slots?

## Đáp án chi tiết (VI)
Slots cho phép parent inject content vào template của child component. Default slot: `\u003cslot /\u003e`. Named slots: `\u003cslot name=\\"header\\" /\u003e` — parent dùng `\u003ctemplate #header\u003e`. Scoped slot: child truyền data lên parent qua slot:\
```vue\
\u003c!-- Child --\u003e\
\u003cslot :item=\\"item\\" :index=\\"i\\" /\u003e\
\
\u003c!-- Parent --\u003e\
\u003ctemplate #default=\\"{ item, index }\\"\u003e\
  \u003cspan\u003e{{ index }}: {{ item.name }}\u003c/span\u003e\
\u003c/template\u003e\
```\
Dùng scoped slots khi child biết cách lấy data nhưng parent quyết định cách render (render prop pattern). Lưu ý: không mix slot và v-if trên cùng `\u003ctemplate\u003e` — tách riêng.

## Detailed Answer (EN)
Slots let a parent inject content into a child component's template. Default slot: `\u003cslot /\u003e`. Named slots: `\u003cslot name=\\"header\\" /\u003e` — parent uses `\u003ctemplate #header\u003e`. Scoped slot: child passes data up to parent through slot:\
```vue\
\u003c!-- Child --\u003e\
\u003cslot :item=\\"item\\" :index=\\"i\\" /\u003e\
\
\u003c!-- Parent --\u003e\
\u003ctemplate #default=\\"{ item, index }\\"\u003e\
  \u003cspan\u003e{{ index }}: {{ item.name }}\u003c/span\u003e\
\u003c/template\u003e\
```\
Use scoped slots when child knows how to get data but parent decides how to render it (render prop pattern).
