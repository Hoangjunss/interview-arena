---
id: generational-garbage-collection-la-gi
position: backend
technology: jvm-\u0026-memory
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Generational Garbage Collection là gì?

## Question (EN)
What are Generational Garbage Collection concepts?

## Đáp án chi tiết (VI)
Heap chia thành 2 region dựa trên tuổi object:\
\
```\
Heap\
├── Young Generation\
│   ├── Eden — object mới tạo\
│   └── Survivor S0, S1\
└── Old Generation — object sống lâu\
```\
\
**Lý do (weak generational hypothesis):** hầu hết object **chết trẻ** — tạo rồi mất ngay (vd biến local trong method).\
\
**Quá trình:**\
1. Object tạo mới vào **Eden**.\
2. **Minor GC** chạy thường xuyên ở Young Gen → object còn sống chuyển sang Survivor.\
3. Object sống qua nhiều Minor GC (~15 cycle) → **promote** lên Old Gen.\
4. **Major GC** chạy ít hơn ở Old Gen, chậm hơn.\
\
→ Minor GC xử lý ~95% rác nhanh chóng, ít ảnh hưởng latency. Major GC tốn nhiều nhưng hiếm.\
\
**Tuning:** kích thước Young/Old (`-Xmn`, ratio) ảnh hưởng tần suất GC + pause time. App tạo nhiều object short-lived → Young Gen lớn hơn.\
\
**Lưu ý:** ZGC (Java 21) không generational mặc định (Java 21 thêm `+ZGenerational` cho generational mode).

## Detailed Answer (EN)
The heap is split into two regions based on object age:\
\
```\
Heap\
├── Young Generation\
│   ├── Eden — new objects\
│   └── Survivor S0, S1\
└── Old Generation — long-lived objects\
```\
\
**Rationale (weak generational hypothesis):** most objects **die young** — created and discarded quickly (e.g. local variables in a method).\
\
**Process:**\
1. New objects go to **Eden**.\
2. **Minor GC** runs frequently in Young Gen → surviving objects move to Survivor.\
3. Objects surviving many Minor GCs (~15 cycles) → **promoted** to Old Gen.\
4. **Major GC** runs less often in Old Gen, slower.\
\
→ Minor GC handles ~95% of garbage quickly, barely touching latency. Major GC is expensive but rare.\
\
**Tuning:** Young/Old sizes (`-Xmn`, ratio) affect GC frequency + pause time. Apps producing many short-lived objects benefit from a larger Young Gen.\
\
**Note:** ZGC (Java 21) is non-generational by default (Java 21 added `+ZGenerational` for generational mode).
