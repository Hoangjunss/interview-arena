---
id: implement-eventemitter-class-don-gian
position: backend
technology: coding-challenge
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement EventEmitter class đơn giản?

## Question (EN)
Implement a simple EventEmitter class.

## Đáp án chi tiết (VI)
EventEmitter quản lý named event subscriptions — implements Observer pattern.\
\
```js\
class EventEmitter {\
  constructor() { this.events = {}; }\
  on(event, fn) { (this.events[event] ||= []).push(fn); }\
  off(event, fn) { this.events[event] = this.events[event]?.filter(f =\u003e f !== fn); }\
  emit(event, ...args) { this.events[event]?.forEach(fn =\u003e fn(...args)); }\
}\
```\
\
Dùng trong state management, pub/sub systems.

## Detailed Answer (EN)
`class EventEmitter { constructor() { this.events = {}; } on(event, fn) { (this.events[event] ||= []).push(fn); } off(event, fn) { this.events[event] = this.events[event]?.filter(f =\u003e f !== fn); } emit(event, ...args) { this.events[event]?.forEach(fn =\u003e fn(...args)); } }` Implements the Observer pattern, used in state management and pub/sub systems.
