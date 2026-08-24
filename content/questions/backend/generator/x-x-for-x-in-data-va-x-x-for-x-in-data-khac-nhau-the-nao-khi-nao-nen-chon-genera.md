---
id: x-x-for-x-in-data-va-x-x-for-x-in-data-khac-nhau-the-nao-khi-nao-nen-chon-genera
position: backend
technology: generator
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`[x * x for x in data]` và `(x * x for x in data)` khác nhau thế nào? Khi nào nên chọn generator expression?

## Question (EN)
How do `[x * x for x in data]` and `(x * x for x in data)` differ? When should a generator expression be preferred?

## Đáp án chi tiết (VI)
List comprehension **dựng sẵn toàn bộ list trong RAM**; generator expression trả về một **iterator lười (lazy)**, chỉ tính từng phần tử khi được duyệt.\
\
```python\
squares = [x * x for x in range(10_000_000)]   # allocates ~400MB\
total = sum(x * x for x in range(10_000_000))  # constant memory\
```\
\
Khác biệt thực tế:\
- **Bộ nhớ**: genexp giữ một phần tử tại một thời điểm, hợp với file lớn, cursor DB, response stream.\
- **Một lần dùng**: genexp cạn sau khi duyệt xong; duyệt lần hai ra rỗng. List thì duyệt lại bao nhiêu lần cũng được.\
- **API**: genexp không có `len()`, không index, không slice.\
- **Lazy nghĩa là lỗi xảy ra muộn** — exception chỉ nổ khi thực sự duyệt tới phần tử đó.\
\
Chọn genexp khi dữ liệu lớn hoặc kết quả chỉ đi thẳng vào `sum()`, `min()`, `any()`, vòng `for`. Chọn list khi cần dùng lại, cần độ dài, hoặc cần truy cập ngẫu nhiên.

## Detailed Answer (EN)
A list comprehension **materialises the whole list in RAM**; a generator expression returns a **lazy iterator** that computes each item only as it is consumed.\
\
```python\
squares = [x * x for x in range(10_000_000)]   # allocates ~400MB\
total = sum(x * x for x in range(10_000_000))  # constant memory\
```\
\
Practical differences:\
- **Memory**: a genexp holds one item at a time — ideal for large files, DB cursors, streamed responses.\
- **Single use**: a genexp is exhausted after one pass; a second pass yields nothing. A list can be iterated repeatedly.\
- **API**: a genexp has no `len()`, no indexing, no slicing.\
- **Lazy means late failure** — an exception only fires when that element is actually reached.\
\
Pick the genexp when the data is large or the result feeds straight into `sum()`, `min()`, `any()`, or a `for` loop. Pick the list when you need reuse, length, or random access.
