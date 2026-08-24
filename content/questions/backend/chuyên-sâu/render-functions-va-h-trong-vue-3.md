---
id: render-functions-va-h-trong-vue-3
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Render functions và h() trong Vue 3?

## Question (EN)
Render functions and h() in Vue 3?

## Đáp án chi tiết (VI)
Render function thay template bằng JavaScript thuần — linh hoạt hơn cho dynamic rendering:\
```javascript\
import { h, defineComponent } from 'vue'\
\
export default defineComponent({\
  props: ['tag', 'content'],\
  render() {\
    return h(this.tag || 'div', { class: 'dynamic' }, this.content)\
  }\
})\
\
// Trong \u003cscript setup\u003e với useSlots()\
import { h, useSlots } from 'vue'\
const slots = useSlots()\
// return () =\u003e h('div', slots.default?.())\
```\
Dùng khi: (1) Component cần tag động không thể express qua template (2) Library code cần flexibility (3) Tái sử dụng render logic phức tạp. Template vẫn được khuyến nghị cho business logic thông thường.

## Detailed Answer (EN)
Render functions replace templates with pure JavaScript — more flexible for dynamic rendering:\
```javascript\
import { h, defineComponent } from 'vue'\
\
export default defineComponent({\
  props: ['tag', 'content'],\
  render() {\
    return h(this.tag || 'div', { class: 'dynamic' }, this.content)\
  }\
})\
\
// In \u003cscript setup\u003e with useSlots()\
import { h, useSlots } from 'vue'\
const slots = useSlots()\
// return () =\u003e h('div', slots.default?.())\
```\
Use when: (1) Component needs dynamic tags impossible to express in templates (2) Library code needing flexibility (3) Reusing complex render logic. Templates are still recommended for typical business logic.
