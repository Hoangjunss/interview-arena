---
id: cac-dunder-methods-quan-trong-nhat-can-biet
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các dunder methods quan trọng nhất cần biết?

## Question (EN)
What are the most important dunder (magic) methods to know?

## Đáp án chi tiết (VI)
(1) `__repr__` — developer repr (eval-safe), `__str__` — user-friendly string (2) `__len__`, `__getitem__`, `__setitem__` — sequence protocol (3) `__enter__`/`__exit__` — context manager (4) `__eq__`, `__lt__`, `__hash__` — comparison và hashability (5) `__call__` — cho phép gọi instance như function (6) `__iter__`/`__next__` — iterator protocol. Lưu ý: Khi override `__eq__`, Python tự động set `__hash__ = None` — phải define `__hash__` thủ công nếu muốn dùng object trong set/dict.

## Detailed Answer (EN)
(1) `__repr__` — developer repr, `__str__` — user string (2) `__len__`, `__getitem__` — sequence protocol (3) `__enter__`/`__exit__` — context manager (4) `__eq__`, `__hash__` — comparison (5) `__call__` — callable instances (6) `__iter__`/`__next__` — iterator. Pitfall: Overriding `__eq__` sets `__hash__ = None` — must define `__hash__` manually if needed in sets/dicts.
