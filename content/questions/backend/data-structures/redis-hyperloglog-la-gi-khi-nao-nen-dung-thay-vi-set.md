---
id: redis-hyperloglog-la-gi-khi-nao-nen-dung-thay-vi-set
position: backend
technology: data-structures
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis HyperLogLog là gì? Khi nào nên dùng thay vì Set?

## Question (EN)
What is Redis HyperLogLog? When should you use it instead of a Set?

## Đáp án chi tiết (VI)
HyperLogLog là probabilistic data structure để đếm unique elements (cardinality estimation) với sai số chuẩn ~0.81% nhưng dùng chỉ 12KB bộ nhớ cố định bất kể có 1 hay 1 tỷ unique element. Set chính xác 100% nhưng tốn memory tỷ lệ với số element. Lệnh: `PFADD pageviews user123 user456`, `PFCOUNT pageviews` (trả về ước lượng số unique users), `PFMERGE daily_total hour1 hour2` (merge nhiều HLL). **Khi dùng HyperLogLog:** đếm unique visitors/day, unique queries/hour, unique IPs — khi cần approximate count với memory cực nhỏ và không cần biết chính xác element nào đã add. **Khi dùng Set:** khi cần biết element cụ thể có trong tập không (`SISMEMBER`), khi cần list members, khi số element \u003c vài triệu và memory là vừa đủ.\
\
**Ví dụ:** Google Analytics đếm unique page views dùng HyperLogLog — 1 tỷ visitors chỉ tốn 12KB thay vì hàng GB.

## Detailed Answer (EN)
HyperLogLog is a probabilistic data structure for counting unique elements (cardinality estimation) with ~0.81% standard error, using a fixed 12KB of memory regardless of whether there are 1 or 1 billion unique elements. A Set is 100% accurate but uses memory proportional to the number of elements. Commands: `PFADD pageviews user123 user456`, `PFCOUNT pageviews` (returns estimated unique user count), `PFMERGE daily_total hour1 hour2` (merges multiple HLLs). **Use HyperLogLog when:** counting unique visitors/day, unique queries/hour, unique IPs — when you need an approximate count with minimal memory and don't need to know exactly which elements were added. **Use Set when:** you need to check if a specific element is present (`SISMEMBER`), need to list members, or when the number of elements is small enough (millions or fewer) and memory is sufficient.\
\
**Example:** Google Analytics counts unique page views using HyperLogLog — 1 billion visitors use 12KB instead of gigabytes.
