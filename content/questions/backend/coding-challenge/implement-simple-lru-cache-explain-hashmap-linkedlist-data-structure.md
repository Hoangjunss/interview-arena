---
id: implement-simple-lru-cache-explain-hashmap-linkedlist-data-structure
position: backend
technology: coding-challenge
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement simple LRU cache. Explain HashMap + LinkedList data structure.

## Question (EN)
Implement a simple LRU cache. Explain the HashMap + LinkedList data structure.

## Đáp án chi tiết (VI)
LRU (Least Recently Used) Cache là cấu trúc dữ liệu loại bỏ phần tử ít được dùng gần đây nhất khi cache đầy. Trong JavaScript, Map tự nhiên duy trì thứ tự chèn, nên có thể dùng Map thay cho Doubly Linked List để triển khai đơn giản hơn.\
\
```js\
class LRUCache {\
  constructor(capacity) {\
    this.capacity = capacity;\
    this.map = new Map(); // duy trì thứ tự insertion\
  }\
\
  get(key) {\
    if (!this.map.has(key)) return -1;\
    const val = this.map.get(key);\
    // di chuyển về cuối (mới dùng nhất)\
    this.map.delete(key);\
    this.map.set(key, val);\
    return val;\
  }\
\
  put(key, value) {\
    if (this.map.has(key)) this.map.delete(key);\
    this.map.set(key, value);\
    // xóa phần tử đầu (ít dùng nhất) nếu vượt capacity\
    if (this.map.size \u003e this.capacity) {\
      this.map.delete(this.map.keys().next().value);\
    }\
  }\
}\
```\
\
LRU cache được ứng dụng rộng rãi: cache API response, memoization kết quả tính toán, và database query cache.

## Detailed Answer (EN)
An LRU (Least Recently Used) cache evicts the least recently accessed item when it reaches capacity. In JavaScript, Map preserves insertion order so it can stand in for a Doubly Linked List for a simpler implementation.\
\
```js\
class LRUCache {\
  constructor(capacity) {\
    this.capacity = capacity;\
    this.map = new Map(); // preserves insertion order\
  }\
\
  get(key) {\
    if (!this.map.has(key)) return -1;\
    const val = this.map.get(key);\
    // move to end (most recently used)\
    this.map.delete(key);\
    this.map.set(key, val);\
    return val;\
  }\
\
  put(key, value) {\
    if (this.map.has(key)) this.map.delete(key);\
    this.map.set(key, value);\
    // evict head (least recently used) when over capacity\
    if (this.map.size \u003e this.capacity) {\
      this.map.delete(this.map.keys().next().value);\
    }\
  }\
}\
```\
\
LRU caches are widely used in practice: API response caching, memoizing computation results, and database query caches.
