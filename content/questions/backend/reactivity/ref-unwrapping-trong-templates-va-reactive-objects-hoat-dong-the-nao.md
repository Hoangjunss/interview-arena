---
id: ref-unwrapping-trong-templates-va-reactive-objects-hoat-dong-the-nao
position: backend
technology: reactivity
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ref unwrapping trong templates và reactive objects hoạt động thế nào?

## Question (EN)
How does ref unwrapping work in templates and reactive objects?

## Đáp án chi tiết (VI)
Vue tự động unwrap refs trong một số contexts — hiểu rõ để tránh bugs:\
\
**Template auto-unwrap**: refs được auto-unwrap trong template, không cần `.value`:\
```vue\
\u003cscript setup\u003e\
const count = ref(0)\
const state = reactive({ count: ref(0) })\
\u003c/script\u003e\
\
\u003ctemplate\u003e\
  \u003c!-- Tự động unwrap — không cần .value --\u003e\
  \u003cp\u003e{{ count }}\u003c/p\u003e\
  \u003cp\u003e{{ state.count }}\u003c/p\u003e\
\u003c/template\u003e\
```\
\
**Reactive object unwrap**: ref là property của reactive object được tự động unwrap khi access:\
```typescript\
const count = ref(0)\
const state = reactive({ count })  // Wrap ref trong reactive\
\
console.log(state.count)  // 0, không phải Ref\u003c0\u003e — auto-unwrap!\
state.count++             // Tương đương count.value++\
console.log(count.value)  // 1 — linked!\
```\
\
**Không unwrap**: ref trong array hoặc Map KHÔNG tự động unwrap:\
```typescript\
const list = reactive([ref(0)])\
console.log(list[0].value)  // Phải dùng .value!\
\
const map = reactive(new Map([['key', ref(0)]]))\
console.log(map.get('key').value)  // Phải dùng .value!\
```

## Detailed Answer (EN)
Vue auto-unwraps refs in certain contexts:\
\
**Template auto-unwrap**: no `.value` needed in templates:\
```vue\
\u003cscript setup\u003e\
const count = ref(0)\
\u003c/script\u003e\
\u003ctemplate\u003e\
  \u003cp\u003e{{ count }}\u003c/p\u003e  \u003c!-- Auto-unwrapped --\u003e\
\u003c/template\u003e\
```\
\
**Reactive object unwrap**: ref as reactive property is auto-unwrapped:\
```typescript\
const count = ref(0)\
const state = reactive({ count })  // Wrap\
console.log(state.count)  // 0, not Ref\u003c0\u003e\
state.count++; console.log(count.value)  // 1 — linked!\
```\
\
**No auto-unwrap**: refs in arrays or Maps are NOT unwrapped:\
```typescript\
const list = reactive([ref(0)])\
console.log(list[0].value)  // Must use .value\
```
