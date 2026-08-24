---
id: unidirectional-data-flow-trong-react-nghia-la-gi
position: backend
technology: props-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Unidirectional data flow trong React nghĩa là gì?

## Question (EN)
What does unidirectional data flow mean in React?

## Đáp án chi tiết (VI)
$82

## Detailed Answer (EN)
**Unidirectional Data Flow** in React means:\
\
- Data always flows in a **single direction**: From Parent component down to Child component (via `props`).\
- A child component is **never** allowed to mutate the `props` it receives directly.\
\
**How a child updates parent data:**\
If a child needs to update the data, it must call a **callback function** passed down by the parent. \
*Example:* `\u003cInput onChange={handleChange} /\u003e` - the `Input` component calls `onChange`, but the actual logic that changes the state lives inside the parent's `handleChange` function.\
\
**Benefits:**\
- **Predictable \u0026 Easy to Debug:** Having a \\"Single Source of Truth\\" and a clear flow makes it much easier to trace where data bugs originate.\
- Unlike the *Two-way data binding* of Angular 1 (where UI updates data and data updates UI automatically), the unidirectional flow prevents infinite update loops (circular dependencies).
