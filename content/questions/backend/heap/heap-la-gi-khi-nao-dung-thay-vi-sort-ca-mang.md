---
id: heap-la-gi-khi-nao-dung-thay-vi-sort-ca-mang
position: backend
technology: heap
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Heap là gì? Khi nào dùng thay vì sort cả mảng?

## Question (EN)
What is a Heap? When to use it instead of sorting the full array?

## Đáp án chi tiết (VI)
**Heap** = cây nhị phân với invariant: parent \u003c= (min-heap) hoặc \u003e= (max-heap) các child.\
\
**Thao tác:**\
- Push: O(log n)\
- Pop (top): O(log n)\
- Peek (top): O(1)\
- Heapify mảng: O(n)\
\
**Khi nào dùng Heap thay sort?**\
- Cần **top K** phần tử (K \u003c\u003c n): heap K phần tử cho O(n log k) tốt hơn O(n log n) sort\
- Cần **streaming** — phần tử đến liên tục, không có toàn bộ trước\
- Cần **k-way merge** — merge K sorted lists\
- Cần **scheduling** — pick highest-priority task next\
\
**Ví dụ:**\
```ts\
// Top 3 phần tử lớn nhất\
const heap = new MinHeap\u003cnumber\u003e()\
for (const x of nums) {\
  heap.push(x)\
  if (heap.size() \u003e 3) heap.pop()  // bỏ phần tử nhỏ nhất\
}\
return heap.toArray()  // 3 phần tử lớn nhất\
```\
\
JS không có Heap built-in — cần implement hoặc dùng lib. Python có `heapq`, C++ có `priority_queue`.

## Detailed Answer (EN)
Heap is a binary tree with parent ≤/≥ children invariant. Push/Pop O(log n), Peek O(1), Heapify O(n). Use when need top-K (O(n log k) beats O(n log n) when k \u003c\u003c n), streaming data, k-way merge, or priority-based scheduling.
