---
id: nexttick-la-gi-khi-nao-dung
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`nextTick` là gì? Khi nào dùng?

## Question (EN)
What is `nextTick`? When to use it?

## Đáp án chi tiết (VI)
Vue batch DOM updates — không update ngay khi state thay đổi, mà queue updates và flush async. `nextTick` cho phép chờ DOM được update xong:\
```javascript\
import { nextTick, ref } from 'vue'\
\
const count = ref(0)\
\
async function handleClick() {\
  count.value++\
  // DOM chưa update ở đây\
  await nextTick()\
  // DOM đã update — giờ có thể đọc DOM hoặc scroll\
  console.log(document.querySelector('.count')?.textContent)\
}\
```\
Dùng khi: (1) Cần đọc DOM sau khi state update (2) Focus element sau khi v-if toggle (3) Scroll sau khi append item vào list.

## Detailed Answer (EN)
Vue batches DOM updates — doesn't update immediately when state changes, queues updates and flushes async. `nextTick` waits for DOM to finish updating:\
```javascript\
import { nextTick, ref } from 'vue'\
\
const count = ref(0)\
\
async function handleClick() {\
  count.value++\
  // DOM not yet updated here\
  await nextTick()\
  // DOM is now updated — safe to read DOM or scroll\
  console.log(document.querySelector('.count')?.textContent)\
}\
```\
Use when: (1) Need to read DOM after state update (2) Focus an element after v-if toggle (3) Scroll after appending items to a list.
