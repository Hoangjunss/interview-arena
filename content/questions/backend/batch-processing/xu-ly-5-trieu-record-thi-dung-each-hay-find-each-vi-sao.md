---
id: xu-ly-5-trieu-record-thi-dung-each-hay-find-each-vi-sao
position: backend
technology: batch-processing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý 5 triệu record thì dùng `each` hay `find_each`? Vì sao?

## Question (EN)
To process 5 million records, do you use `each` or `find_each`? Why?

## Đáp án chi tiết (VI)
Dùng `find_each`. `User.all.each` nạp **toàn bộ 5 triệu dòng vào RAM** trước khi lặp — process rất dễ bị OOM kill.\
\
`find_each` chia thành từng lô (mặc định 1000 record), nạp lô nào xử lý lô đó rồi giải phóng:\
\
```ruby\
User.where(active: true).find_each(batch_size: 500) do |user|\
  ReportJob.perform_later(user.id)\
end\
\
# find_in_batches yields the whole batch as an array\
User.find_in_batches(batch_size: 1000) { |batch| Mailer.bulk(batch).deliver_later }\
\
# in_batches yields a Relation, so you can run a set-based UPDATE per batch\
User.in_batches(of: 1000) { |rel| rel.update_all(synced_at: Time.current) }\
```\
\
**Lưu ý:** `find_each` **ép sắp xếp theo primary key** và bỏ qua `order` bạn đặt (Rails sẽ cảnh báo). Nếu bắt buộc phải theo thứ tự khác thì phải tự phân trang bằng khoá (keyset pagination) chứ không dùng `find_each`.

## Detailed Answer (EN)
Use `find_each`. `User.all.each` loads **all 5 million rows into memory** before iterating — an easy way to get the process OOM-killed.\
\
`find_each` works in batches (1000 records by default), loading one batch, processing it, then releasing it:\
\
```ruby\
User.where(active: true).find_each(batch_size: 500) do |user|\
  ReportJob.perform_later(user.id)\
end\
\
# find_in_batches yields the whole batch as an array\
User.find_in_batches(batch_size: 1000) { |batch| Mailer.bulk(batch).deliver_later }\
\
# in_batches yields a Relation, so you can run a set-based UPDATE per batch\
User.in_batches(of: 1000) { |rel| rel.update_all(synced_at: Time.current) }\
```\
\
**Caveat:** `find_each` **forces ordering by primary key** and ignores any `order` you set (Rails warns about it). If a different order is mandatory, implement keyset pagination yourself instead of using `find_each`.
