---
id: diem-relevance-mac-dinh-bm25-dua-tren-nhung-yeu-to-nao
position: backend
technology: relevance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điểm relevance mặc định (BM25) dựa trên những yếu tố nào?

## Question (EN)
What does the default relevance score (BM25) depend on?

## Đáp án chi tiết (VI)
Ba yếu tố: **term frequency** (từ xuất hiện nhiều trong document thì điểm cao), **inverse document frequency** (từ hiếm trong toàn index thì có trọng số lớn), và **field length** (field ngắn mà chứa từ đó thì điểm cao hơn).\
\
So với TF-IDF cũ, BM25 có **saturation**: lặp từ 100 lần không cho điểm gấp 100 lần.\
\
Debug điểm bằng `explain`:\
\
```bash\
GET /products/_search\
{ \\"explain\\": true, \\"query\\": { \\"match\\": { \\"name\\": \\"laptop\\" } } }\
```\
\
Một hệ quả hay gây bất ngờ: điểm được tính **trên từng shard**, nên với index nhiều shard và dữ liệu ít, cùng một document có thể xếp hạng khác nhau tuỳ shard vì IDF khác nhau. Test trên index nhỏ thấy thứ tự lạ thường là do việc này (dùng `?search_type=dfs_query_then_fetch` để kiểm chứng).\
\
Điểm BM25 **không so sánh được giữa các query khác nhau** — không có thang tuyệt đối, nên đừng đặt ngưỡng kiểu \\"score \u003e 5 mới hiển thị\\".

## Detailed Answer (EN)
Three factors: **term frequency** (more occurrences in a document scores higher), **inverse document frequency** (rarer terms across the index weigh more), and **field length** (a short field containing the term scores higher).\
\
Compared with older TF-IDF, BM25 adds **saturation**: repeating a term 100 times does not score 100 times higher.\
\
Debug scores with `explain`:\
\
```bash\
GET /products/_search\
{ \\"explain\\": true, \\"query\\": { \\"match\\": { \\"name\\": \\"laptop\\" } } }\
```\
\
A surprising consequence: scores are computed **per shard**, so on a multi-shard index with little data the same document can rank differently because IDF differs per shard. Odd ordering on a small test index is usually this (verify with `?search_type=dfs_query_then_fetch`).\
\
BM25 scores **are not comparable across different queries** — there is no absolute scale, so never threshold on something like \\"only show score \u003e 5\\".
