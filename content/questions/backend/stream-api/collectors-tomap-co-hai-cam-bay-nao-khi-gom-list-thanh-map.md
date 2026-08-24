---
id: collectors-tomap-co-hai-cam-bay-nao-khi-gom-list-thanh-map
position: backend
technology: stream-api
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Collectors.toMap()` có hai cạm bẫy nào khi gom List thành Map?

## Question (EN)
What are the two traps of `Collectors.toMap()` when collecting a List into a Map?

## Đáp án chi tiết (VI)
**1. Trùng key ném `IllegalStateException`.** Bản 2 tham số không có cách xử lý va chạm nên nó ném luôn:\
\
```java\
Stream.of(\\"a\\

## Detailed Answer (EN)
**1. Duplicate keys throw `IllegalStateException`.** The two-arg overload has no collision policy, so it just throws:\
\
```java\
Stream.of(\\"a\\
