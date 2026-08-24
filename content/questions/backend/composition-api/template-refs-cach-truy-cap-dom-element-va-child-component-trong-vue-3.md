---
id: template-refs-cach-truy-cap-dom-element-va-child-component-trong-vue-3
position: backend
technology: composition-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template refs — cách truy cập DOM element và child component trong Vue 3?

## Question (EN)
Template refs — how to access DOM elements and child components in Vue 3?

## Đáp án chi tiết (VI)
Template ref cho phép truy cập DOM element hoặc component instance trực tiếp:\
```vue\
\u003cscript setup\u003e\
import { ref, onMounted } from 'vue'\
\
// Ref cho DOM element\
const inputEl = ref\u003cHTMLInputElement | null\u003e(null)\
\
// Ref cho component instance\
const modalRef = ref\u003cInstanceType\u003ctypeof Modal\u003e | null\u003e(null)\
\
onMounted(() =\u003e {\
  inputEl.value?.focus()  // Auto-focus khi mount\
})\
\
function openModal() {\
  modalRef.value?.open()  // Gọi method của child component\
}\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003cinput ref=\\"inputEl\\" type=\\"text\\" /\u003e\
  \u003cModal ref=\\"modalRef\\" /\u003e\
\u003c/template\u003e\
```\
Lưu ý: `ref.value` là `null` trước khi component mount — luôn kiểm tra trong `onMounted` hoặc dùng optional chaining `ref.value?.method()`.

## Detailed Answer (EN)
Template refs give direct access to DOM elements or component instances:\
```vue\
\u003cscript setup\u003e\
import { ref, onMounted } from 'vue'\
\
const inputEl = ref\u003cHTMLInputElement | null\u003e(null)\
const childRef = ref\u003cInstanceType\u003ctypeof ChildComp\u003e | null\u003e(null)\
\
onMounted(() =\u003e {\
  inputEl.value?.focus()\
})\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003cinput ref=\\"inputEl\\" /\u003e\
  \u003cChildComp ref=\\"childRef\\" /\u003e\
\u003c/template\u003e\
```\
Pitfall: `ref.value` is `null` before mount — always access inside `onMounted` or use optional chaining `ref.value?.method()`.
