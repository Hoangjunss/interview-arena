---
id: trong-aggregation-pipeline-vi-sao-match-nen-dat-cang-som-cang-tot
position: backend
technology: aggregation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong aggregation pipeline, vì sao `$match` nên đặt càng sớm càng tốt?

## Question (EN)
In an aggregation pipeline, why should `$match` come as early as possible?

## Đáp án chi tiết (VI)
Vì `$match` đứng đầu pipeline là stage **duy nhất còn dùng được index**. Sau khi dữ liệu đã đi qua `$group`, `$project` hay `$unwind`, nó chỉ còn nằm trong bộ nhớ — mọi `$match` sau đó phải quét tuần tự.\
\
```js\
// tốt: lọc trước, giảm dữ liệu đi vào các stage sau\
db.orders.aggregate([\
  { $match: { createdAt: { $gte: startOfMonth } } },\
  { $unwind: '$items' },\
  { $group: { _id: '$items.sku', total: { $sum: '$items.qty' } } }\
])\
```\
\
Hai điểm liên quan hay bị hỏi kèm:\
- **`$unwind` nhân dòng**: một order có 10 item sẽ thành 10 document trong pipeline. Đặt `$unwind` sau `$match` để không nhân dữ liệu thừa.\
- **`$facet`** chạy nhiều nhánh trên **cùng một tập input**, tiện cho việc vừa lấy trang dữ liệu vừa đếm tổng trong một lần gọi — nhưng các stage bên trong `$facet` không dùng được index.\
\
Optimizer của MongoDB có tự đẩy `$match` lên trước trong một số trường hợp, nhưng không phải lúc nào cũng làm được — viết đúng thứ tự ngay từ đầu là chắc chắn hơn.

## Detailed Answer (EN)
Because a `$match` at the front of the pipeline is the **only stage that can still use an index**. Once data has passed through `$group`, `$project`, or `$unwind`, it lives in memory — any later `$match` scans it sequentially.\
\
```js\
// good: filter first so later stages see less data\
db.orders.aggregate([\
  { $match: { createdAt: { $gte: startOfMonth } } },\
  { $unwind: '$items' },\
  { $group: { _id: '$items.sku', total: { $sum: '$items.qty' } } }\
])\
```\
\
Two related points that often come up:\
- **`$unwind` multiplies rows**: an order with 10 items becomes 10 documents in the pipeline. Put `$unwind` after `$match` so you never multiply data you are about to discard.\
- **`$facet`** runs several branches over the **same input set**, handy for fetching a page and its total count in one round trip — but stages inside `$facet` cannot use indexes.\
\
MongoDB's optimizer does move `$match` earlier in some cases, but not always — writing the right order yourself is more reliable.
