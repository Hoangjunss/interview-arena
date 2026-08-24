---
id: pinia-plugins-cach-tao-custom-plugin-va-use-cases
position: backend
technology: pinia
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pinia plugins — cách tạo custom plugin và use cases?

## Question (EN)
Pinia plugins — how to create custom plugins and use cases?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
Pinia plugins extend all stores — add properties, wrap actions, subscribe to changes:\
\
```typescript\
function resetPlugin({ store }: PiniaPluginContext) {\
  const initial = JSON.parse(JSON.stringify(store.$state))\
  store.$reset = () =\u003e store.$patch(initial)\
}\
\
function logPlugin({ store }: PiniaPluginContext) {\
  store.$onAction(({ name, args, after, onError }) =\u003e {\
    console.log(`[${store.$id}] ${name}`, args)\
    after((r) =\u003e console.log('Result:', r))\
    onError((e) =\u003e console.error('Error:', e))\
  })\
}\
\
const pinia = createPinia()\
pinia.use(resetPlugin)\
pinia.use(logPlugin)\
\
// Usage\
const store = useCounterStore()\
store.$reset()  // Added by plugin\
```\
\
Use cases: logging, Sentry error tracking, undo/redo, localStorage sync.
