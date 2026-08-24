---
id: query-context-va-filter-context-khac-nhau-the-nao
position: backend
technology: query-dsl
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Query context và filter context khác nhau thế nào?

## Question (EN)
How do query context and filter context differ?

## Đáp án chi tiết (VI)
Query context **tính điểm liên quan**, filter context chỉ trả lời **có/không** và **được cache**. Điều kiện không cần tính điểm mà để trong `must` là lãng phí rõ rệt.\
\
```json\
{\
  \\"query\\": {\
    \\"bool\\": {\
      \\"must\\":   [{ \\"match\\": { \\"title\\": \\"laptop gaming\\" } }],   // tinh diem\
      \\"filter\\": [                                              // khong tinh diem, cached\
        { \\"term\\":  { \\"status\\": \\"active\\" } },\
        { \\"range\\": { \\"price\\": { \\"lte\\": 30000000 } } }\
      ]\
    }\
  }\
}\
```\
\
Quy tắc: **mọi điều kiện lọc cứng đều để trong `filter`** — status, khoảng giá, khoảng ngày, category ID. Chỉ phần user gõ mới cần tính điểm.\
\
`must_not` cũng chạy trong filter context nên cũng được cache; `should` thì tính điểm trừ khi nằm trong filter context.\
\
Filter cache (node query cache) chỉ dùng lại được khi filter **giống hệt nhau**. Vì thế `range` theo `now` bị viết là `now` chính xác tới mili giây sẽ không bao giờ hit cache — dùng `now/d` để làm tròn xuống ngày.

## Detailed Answer (EN)
Query context **computes relevance scores**; filter context answers **yes or no** and **is cached**. Putting non-scoring conditions in `must` is a clear waste.\
\
```json\
{\
  \\"query\\": {\
    \\"bool\\": {\
      \\"must\\":   [{ \\"match\\": { \\"title\\": \\"laptop gaming\\" } }],   // scored\
      \\"filter\\": [                                              // unscored, cached\
        { \\"term\\":  { \\"status\\": \\"active\\" } },\
        { \\"range\\": { \\"price\\": { \\"lte\\": 30000000 } } }\
      ]\
    }\
  }\
}\
```\
\
The rule: **every hard filter belongs in `filter`** — status, price ranges, date ranges, category IDs. Only user-typed text needs scoring.\
\
`must_not` also runs in filter context and is cached; `should` scores unless it sits in filter context.\
\
The node query cache is only reused when filters are **byte-identical**. So a `range` written against `now` down to the millisecond never hits cache — use `now/d` to round down to the day.
