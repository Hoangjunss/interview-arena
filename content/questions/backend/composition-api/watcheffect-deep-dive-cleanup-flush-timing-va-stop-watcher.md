---
id: watcheffect-deep-dive-cleanup-flush-timing-va-stop-watcher
position: backend
technology: composition-api
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`watchEffect` deep dive — cleanup, flush timing và stop watcher?

## Question (EN)
`watchEffect` deep dive — cleanup, flush timing and stopping watchers?

## Đáp án chi tiết (VI)
$79

## Detailed Answer (EN)
`watchEffect` auto-tracks deps and re-runs. Advanced options:\
\
```typescript\
// Cleanup — cancel previous async operations\
const stop = watchEffect(async (onCleanup) =\u003e {\
  let cancelled = false\
  onCleanup(() =\u003e { cancelled = true })\
\
  const data = await fetch(`/api/users/${userId.value}`).then(r =\u003e r.json())\
  if (!cancelled) userData.value = data\
})\
\
// Stop watcher manually\
stop()\
\
// Flush timing\
watchEffect(() =\u003e { ... }, { flush: 'post' })  // After DOM update\
\
// Convenience aliases\
watchPostEffect(() =\u003e { /* after DOM */ })\
```\
\
Use cleanup for: cancelling fetch requests, clearing timers, cancelling WebSocket subs when dep changes.
