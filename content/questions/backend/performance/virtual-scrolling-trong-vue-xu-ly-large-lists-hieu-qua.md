---
id: virtual-scrolling-trong-vue-xu-ly-large-lists-hieu-qua
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Virtual scrolling trong Vue — xử lý large lists hiệu quả?

## Question (EN)
Virtual scrolling in Vue — efficiently handling large lists?

## Đáp án chi tiết (VI)
$80

## Detailed Answer (EN)
Virtual scrolling renders only visible items, not the entire list.\
\
**Using `@vueuse/core`'s `useVirtualList`**:\
```vue\
\u003cscript setup\u003e\
const items = ref(/* 10000 items */)\
const { list, containerProps, wrapperProps } = useVirtualList(items, { itemHeight: 40 })\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003cdiv v-bind=\\"containerProps\\" style=\\"height: 600px; overflow-y: auto\\"\u003e\
    \u003cdiv v-bind=\\"wrapperProps\\"\u003e\
      \u003cdiv v-for=\\"{ data: item } in list\\" :key=\\"item.id\\" style=\\"height: 40px\\"\u003e\
        {{ item.name }}\
      \u003c/div\u003e\
    \u003c/div\u003e\
  \u003c/div\u003e\
\u003c/template\u003e\
```\
\
For variable-height items use `vue-virtual-scroller`'s `DynamicScroller`. Combine with `v-memo` for items with many reactive dependencies.
