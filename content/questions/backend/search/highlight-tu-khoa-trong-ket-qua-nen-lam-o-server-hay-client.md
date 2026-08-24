---
id: highlight-tu-khoa-trong-ket-qua-nen-lam-o-server-hay-client
position: backend
technology: search
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Highlight từ khoá trong kết quả nên làm ở server hay client?

## Question (EN)
Should search-term highlighting be done server-side or client-side?

## Đáp án chi tiết (VI)
Ở server, bằng `highlight` của Elasticsearch. Client tự tô bằng cách so chuỗi sẽ **sai với mọi thứ đã qua analyzer**: stemming, synonym, bỏ dấu, phrase — nó chỉ khớp đúng chuỗi user gõ.\
\
```json\
{\
  \\"query\\": { \\"match\\": { \\"content\\": \\"laptop gaming\\" } },\
  \\"highlight\\": {\
    \\"fields\\": { \\"content\\": { \\"fragment_size\\": 150, \\"number_of_fragments\\": 3 } },\
    \\"pre_tags\\": [\\"\u003cmark\u003e\\"], \\"post_tags\\": [\\"\u003c/mark\u003e\\"]\
  }\
}\
```\
\
Elasticsearch biết chính xác token nào khớp nên tô đúng cả trường hợp user gõ \\"chạy\\" mà document viết \\"chạy bộ\\

## Detailed Answer (EN)
Server-side, with Elasticsearch `highlight`. Client-side string matching **disagrees with everything the analyzer did**: stemming, synonyms, accent folding, phrases — it only matches the literal typed string.\
\
```json\
{\
  \\"query\\": { \\"match\\": { \\"content\\": \\"laptop gaming\\" } },\
  \\"highlight\\": {\
    \\"fields\\": { \\"content\\": { \\"fragment_size\\": 150, \\"number_of_fragments\\": 3 } },\
    \\"pre_tags\\": [\\"\u003cmark\u003e\\"], \\"post_tags\\": [\\"\u003c/mark\u003e\\"]\
  }\
}\
```\
\
Elasticsearch knows exactly which tokens matched, so it highlights correctly even when the user types \\"run\\" and the document says \\"running\\
