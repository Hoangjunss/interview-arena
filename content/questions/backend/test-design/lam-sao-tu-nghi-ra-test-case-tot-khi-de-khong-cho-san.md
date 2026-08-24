---
id: lam-sao-tu-nghi-ra-test-case-tot-khi-de-khong-cho-san
position: backend
technology: test-design
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tự nghĩ ra test case tốt khi đề không cho sẵn?

## Question (EN)
How do you design good test cases when none are given?

## Đáp án chi tiết (VI)
Kỹ thuật hữu ích là \\"phân vùng tương đương\\" — chia input thành các nhóm mà code xử lý khác nhau, rồi lấy đại diện mỗi nhóm cộng với các điểm biên giữa chúng. Ví dụ bài tìm số trong mảng sorted: nhóm \\"có trong mảng\\" (đầu, giữa, cuối), nhóm \\"không có\\" (nhỏ hơn min, lớn hơn max, ở giữa hai phần tử), và biên (mảng rỗng, một phần tử, duplicate). Với số, luôn nghĩ tới 0, số âm, số lớn nhất gây overflow. Với chuỗi, nghĩ empty, một ký tự, toàn ký tự giống nhau, unicode. Mục tiêu không phải nhiều test mà là test phủ được các nhánh logic khác nhau.

## Detailed Answer (EN)
Use equivalence partitioning: split inputs into groups the code treats differently, then pick one representative per group plus the boundaries between them. For searching a sorted array: present (first, middle, last), absent (below min, above max, between elements), and boundaries (empty, single, duplicates). For numbers, always consider 0, negatives, and overflow-sized values; for strings, empty, single char, all-same, and unicode. Aim to cover logic branches, not to maximize test count.
