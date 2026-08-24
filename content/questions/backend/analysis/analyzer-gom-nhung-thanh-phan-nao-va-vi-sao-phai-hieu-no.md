---
id: analyzer-gom-nhung-thanh-phan-nao-va-vi-sao-phai-hieu-no
position: backend
technology: analysis
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Analyzer gồm những thành phần nào và vì sao phải hiểu nó?

## Question (EN)
What are the parts of an analyzer and why do you need to understand it?

## Đáp án chi tiết (VI)
Ba tầng chạy tuần tự: **character filter** (sửa chuỗi thô, ví dụ bỏ HTML tag), **tokenizer** (cắt thành token), **token filter** (lowercase, bỏ stopword, stemming, asciifolding).\
\
```json\
\\"analysis\\": {\
  \\"analyzer\\": {\
    \\"vi_search\\": {\
      \\"tokenizer\\": \\"standard\\

## Detailed Answer (EN)
Three stages in order: **character filters** (fix raw text, e.g. strip HTML), a **tokenizer** (split into tokens), and **token filters** (lowercase, stopwords, stemming, asciifolding).\
\
```json\
\\"analysis\\": {\
  \\"analyzer\\": {\
    \\"vi_search\\": {\
      \\"tokenizer\\": \\"standard\\
