---
id: next-js-co-nhung-loai-cache-nao
position: backend
technology: rendering
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Next.js có những loại cache nào?

## Question (EN)
What types of caching does Next.js have?

## Đáp án chi tiết (VI)
Next.js có 4 loại cache:\
\
- (1) Request Memoization: dedup fetch calls trong cùng request tree.\
- (2) Data Cache: persist fetch results giữa requests và deployments.\
- (3) Full Route Cache: cache rendered HTML và RSC payload trên server.\
- (4) Router Cache: client-side cache của RSC payload, prefetch routes.

## Detailed Answer (EN)
Next.js has 4 caching layers:\
\
- (1) Request Memoization — deduplicates fetch calls within the same server request tree.\
- (2) Data Cache — persists fetch results across requests and deployments.\
- (3) Full Route Cache — caches rendered HTML and the RSC payload on the server.\
- (4) Router Cache — client-side cache of the RSC payload used for prefetching routes.
