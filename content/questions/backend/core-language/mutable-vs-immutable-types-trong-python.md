---
id: mutable-vs-immutable-types-trong-python
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutable vs Immutable types trong Python?

## Question (EN)
What are mutable vs immutable types in Python?

## Đáp án chi tiết (VI)
Immutable (không thể thay đổi sau khi tạo): `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`. Mutable (có thể thay đổi tại chỗ): `list`, `dict`, `set`, `bytearray`. Lưu ý: Không dùng mutable làm default argument — `def func(lst=[])` sẽ share cùng list giữa các lần gọi.

## Detailed Answer (EN)
Immutable (cannot change after creation): `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`. Mutable (can modify in place): `list`, `dict`, `set`, `bytearray`. Pitfall: Never use mutable as a default argument — `def func(lst=[])` shares the same list across all calls.
