---
id: list-tuple-set-dict-khi-nao-dung-cai-nao
position: backend
technology: core-language
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`list`, `tuple`, `set`, `dict` — khi nào dùng cái nào?

## Question (EN)
When to use list, tuple, set, dict?

## Đáp án chi tiết (VI)
Dùng `list` khi cần ordered collection có thể thay đổi. Dùng `tuple` cho dữ liệu bất biến, làm dict key, trả về nhiều giá trị từ function. Dùng `set` để loại bỏ duplicate và kiểm tra membership O(1). Dùng `dict` cho key-value lookup O(1). Lưu ý: `set` và `dict` không ordered trước Python 3.7; `dict` từ Python 3.7+ giữ insertion order.

## Detailed Answer (EN)
Use `list` for ordered mutable collections. Use `tuple` for immutable data, dict keys, or returning multiple values. Use `set` to remove duplicates and O(1) membership checks. Use `dict` for O(1) key-value lookups. Pitfall: `set` and `dict` were unordered before Python 3.7; `dict` maintains insertion order from 3.7+.
