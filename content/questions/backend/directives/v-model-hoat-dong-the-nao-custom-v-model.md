---
id: v-model-hoat-dong-the-nao-custom-v-model
position: backend
technology: directives
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
v-model hoạt động thế nào? Custom v-model?

## Question (EN)
How does v-model work? Custom v-model?

## Đáp án chi tiết (VI)
`v-model` là shorthand: `:modelValue` + `@update:modelValue`. Mặc định cho input:\
```vue\
\u003c!-- Tương đương --\u003e\
\u003cinput v-model=\\"name\\" /\u003e\
\u003cinput :value=\\"name\\" @input=\\"name = $event.target.value\\" /\u003e\
```\
Custom component v-model:\
```vue\
\u003cscript setup\u003e\
// Child component\
const props = defineProps(['modelValue'])\
const emit = defineEmits(['update:modelValue'])\
// Template: :value=\\"modelValue\\" @input=\\"emit('update:modelValue', $event)\\"\
\u003c/script\u003e\
```\
Vue 3 hỗ trợ multiple v-model: `v-model:title`, `v-model:content` với props tương ứng.

## Detailed Answer (EN)
`v-model` is shorthand: `:modelValue` + `@update:modelValue`. Default for input:\
```vue\
\u003c!-- Equivalent --\u003e\
\u003cinput v-model=\\"name\\" /\u003e\
\u003cinput :value=\\"name\\" @input=\\"name = $event.target.value\\" /\u003e\
```\
Custom component v-model:\
```vue\
\u003cscript setup\u003e\
const props = defineProps(['modelValue'])\
const emit = defineEmits(['update:modelValue'])\
// Template: :value=\\"modelValue\\" @input=\\"emit('update:modelValue', $event)\\"\
\u003c/script\u003e\
```\
Vue 3 supports multiple v-models: `v-model:title`, `v-model:content` with matching props.
