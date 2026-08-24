---
id: std-map-va-std-unordered-map-khac-nhau-the-nao-khi-nao-chon-cai-nao
position: backend
technology: stl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`std::map` và `std::unordered_map` khác nhau thế nào? Khi nào chọn cái nào?

## Question (EN)
What is the difference between `std::map` and `std::unordered_map`? When should you use each?

## Đáp án chi tiết (VI)
| | `std::map` | `std::unordered_map` |\
|---|---|---|\
| Cấu trúc nội bộ | Red-Black Tree | Hash Table |\
| Thứ tự key | Có thứ tự | Không có thứ tự |\
| find / insert / erase | O(log n) | O(1) trung bình, O(n) worst |\
| Iterator hợp lệ | giữ nguyên sau insert | có thể invalid sau rehash |\
| Key yêu cầu | `operator\u003c` | `std::hash\u003cK\u003e` + `operator==` |\
\
**Chọn `map` khi:** cần duyệt theo thứ tự key, range query (`lower_bound`), key là kiểu không hash được.\
**Chọn `unordered_map` khi:** ưu tiên tốc độ lookup, không cần thứ tự, key là string/int thông thường.

## Detailed Answer (EN)
| | `std::map` | `std::unordered_map` |\
|---|---|---|\
| Internal structure | Red-Black Tree | Hash Table |\
| Key order | Sorted | Unordered |\
| find / insert / erase | O(log n) | O(1) average, O(n) worst |\
| Iterator validity | preserved after insert | may invalidate after rehash |\
| Key requirement | `operator\u003c` | `std::hash\u003cK\u003e` + `operator==` |\
\
**Choose `map` when:** you need sorted iteration, range queries (`lower_bound`), or a non-hashable key type.\
**Choose `unordered_map` when:** lookup speed is the priority, order doesn't matter, key is a common type (string/int).
