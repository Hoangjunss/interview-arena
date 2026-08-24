---
id: v-model-modifiers-built-in-va-custom-modifiers
position: backend
technology: component-communication
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
v-model modifiers — built-in và custom modifiers?

## Question (EN)
v-model modifiers — built-in and custom modifiers?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
**Built-in modifiers**:\
- `.lazy`: sync on `change` not `input`\
- `.number`: auto-convert to number\
- `.trim`: auto-trim whitespace\
\
```vue\
\u003cinput v-model.lazy=\\"search\\" /\u003e\
\u003cinput v-model.number=\\"age\\" /\u003e\
\u003cinput v-model.trim=\\"name\\" /\u003e\
```\
\
**Custom modifiers** in component v-model:\
```typescript\
const props = defineProps\u003c{\
  modelValue: string\
  modelModifiers?: { uppercase?: boolean }\
}\u003e()\
\
function handleInput(e: Event) {\
  let val = (e.target as HTMLInputElement).value\
  if (props.modelModifiers?.uppercase) val = val.toUpperCase()\
  emit('update:modelValue', val)\
}\
```\
\
```vue\
\u003cMyInput v-model.uppercase=\\"text\\" /\u003e\
```
