---
id: binary-search-tren-dap-an-koko-eating-bananas-khi-nao-nhi-phan-khong-phai-tren-m
position: backend
technology: binary-search
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Binary search trên đáp án (Koko Eating Bananas) — khi nào nhị phân không phải trên mảng mà trên không gian giá trị?

## Question (EN)
Binary search on the answer (Koko Eating Bananas) — when do you binary-search a value space instead of an array?

## Đáp án chi tiết (VI)
**Ý tưởng:** Không tìm chỉ số trong mảng mà nhị phân trên **dải đáp án khả dĩ**. Với Koko, đáp án (tốc độ ăn `k`) nằm trong `[1, max(piles)]`. Tốc độ càng cao thì giờ ăn càng ít — đơn điệu — nên nhị phân được.\
\
**Dấu hiệu nhận dạng:** câu hỏi dạng \\"giá trị nhỏ nhất/lớn nhất sao cho `check(x)` đúng\\

## Detailed Answer (EN)
$86
