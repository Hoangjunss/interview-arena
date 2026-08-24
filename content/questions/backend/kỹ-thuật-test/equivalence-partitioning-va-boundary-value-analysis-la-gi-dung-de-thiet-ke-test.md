---
id: equivalence-partitioning-va-boundary-value-analysis-la-gi-dung-de-thiet-ke-test
position: backend
technology: kỹ-thuật-test
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Equivalence Partitioning và Boundary Value Analysis là gì, dùng để thiết kế test case thế nào?

## Question (EN)
What are Equivalence Partitioning and Boundary Value Analysis, and how do they design test cases?

## Đáp án chi tiết (VI)
Hai kỹ thuật black-box để **giảm số test case mà vẫn phủ tốt**:\
\
- **Equivalence Partitioning (EP)** — chia miền đầu vào thành các **lớp tương đương**, nơi mọi giá trị được xử lý giống nhau. Chỉ cần test **một đại diện mỗi lớp** (cả lớp hợp lệ lẫn không hợp lệ) là đủ.\
- **Boundary Value Analysis (BVA)** — lỗi hay nằm ở **rìa** các lớp, nên test thêm các giá trị **ngay tại biên và sát biên**.\
\
Ví dụ ô nhập tuổi hợp lệ **1–100**:\
- EP: một giá trị \u003c 1 (vd 0), một giá trị trong 1–100 (vd 50), một giá trị \u003e 100 (vd 150).\
- BVA: **0, 1, 2** và **99, 100, 101**.\
\
Dùng chung hai kỹ thuật cho hiệu quả cao nhất.

## Detailed Answer (EN)
Two black-box techniques to **cut the number of test cases while keeping good coverage**:\
\
- **Equivalence Partitioning (EP)** — split the input domain into **equivalence classes** where every value is handled the same way. Test just **one representative per class** (both valid and invalid classes).\
- **Boundary Value Analysis (BVA)** — defects cluster at the **edges** of classes, so also test values **at and next to the boundaries**.\
\
Example: an age field valid for **1–100**:\
- EP: one value \u003c 1 (e.g. 0), one within 1–100 (e.g. 50), one \u003e 100 (e.g. 150).\
- BVA: **0, 1, 2** and **99, 100, 101**.\
\
Use the two together for the strongest coverage.
