---
id: implement-simple-pub-sub-system-cho-micro-frontends
position: backend
technology: coding-challenge
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Implement simple pub/sub system cho micro-frontends?

## Question (EN)
Implement a simple pub/sub system for micro-frontends.

## Đáp án chi tiết (VI)
Pub/sub bus cho phép micro-frontends communicate mà không cần direct coupling.\
\
```js\
const bus = {\
  subs: {},\
  subscribe(event, fn) {\
    (this.subs[event] ||= []).push(fn);\
    return () =\u003e { this.subs[event] = this.subs[event].filter(f =\u003e f !== fn); };\
  },\
  publish(event, data) { this.subs[event]?.forEach(fn =\u003e fn(data)); }\
};\
```\
\
Dùng cho cross-app communication. Thêm: typed events, wildcard, once listener.

## Detailed Answer (EN)
`const bus = { subs: {}, subscribe(event, fn) { (this.subs[event] ||= []).push(fn); return () =\u003e { this.subs[event] = this.subs[event].filter(f =\u003e f !== fn); }; }, publish(event, data) { this.subs[event]?.forEach(fn =\u003e fn(data)); } };` Used for cross-application communication. Enhancements: typed events, wildcard subscriptions, one-time listeners.
