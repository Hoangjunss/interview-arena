---
id: va-khac-nhau-the-nao
position: backend
technology: toán-tử-bit
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003e\u003e` và `\u003e\u003e\u003e` khác nhau thế nào?

## Question (EN)
What is the difference between `\u003e\u003e` and `\u003e\u003e\u003e`?

## Đáp án chi tiết (VI)
Cả hai dịch bit sang phải; khác ở **bit điền vào bên trái**:\
- **`\u003e\u003e` (signed / arithmetic):** điền bằng **bit dấu** → số âm vẫn âm.\
- **`\u003e\u003e\u003e` (unsigned / logical):** luôn điền **0** → kết quả không bao giờ âm.\
\
```java\
-8 \u003e\u003e 1;    // -4\
-8 \u003e\u003e\u003e 1;   // 2147483644  (điền 0 vào bit trái cùng)\
8 \u003e\u003e 1;     // 4\
8 \u003e\u003e\u003e 1;    // 4   (số dương: hai toán tử như nhau)\
```\
\
Với số **dương**, hai toán tử cho kết quả giống hệt. `\u003e\u003e\u003e` chỉ có ý nghĩa khi bạn coi bit là **dữ liệu thô** (hash, mask, cờ) trên `int`/`long`, không phải số có dấu.\
\
Lưu ý: **không có `\u003c\u003c\u003c`** — dịch trái luôn điền 0 nên chỉ cần `\u003c\u003c`.

## Detailed Answer (EN)
Both shift bits right; they differ in **what fills in on the left**:\
- **`\u003e\u003e` (signed / arithmetic):** fills with the **sign bit** → negatives stay negative.\
- **`\u003e\u003e\u003e` (unsigned / logical):** always fills **0** → the result is never negative.\
\
```java\
-8 \u003e\u003e 1;    // -4\
-8 \u003e\u003e\u003e 1;   // 2147483644  (0 fills the leftmost bit)\
8 \u003e\u003e 1;     // 4\
8 \u003e\u003e\u003e 1;    // 4   (positive: the two operators agree)\
```\
\
For **positive** numbers the two operators produce identical results. `\u003e\u003e\u003e` only matters when you treat bits as **raw data** (hashes, masks, flags) on `int`/`long`, not as a signed number.\
\
Note: there is **no `\u003c\u003c\u003c`** — left shift always fills 0, so `\u003c\u003c` is enough.
