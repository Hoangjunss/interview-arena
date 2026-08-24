---
id: index-xong-mot-document-nhung-search-ngay-khong-thay-vi-sao
position: backend
technology: indexing
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Index xong một document nhưng search ngay không thấy. Vì sao?

## Question (EN)
A document was just indexed but a search does not find it. Why?

## Đáp án chi tiết (VI)
Elasticsearch là **near real-time**, không phải real-time. Document chỉ search được sau khi **refresh**, mặc định **1 giây một lần**.\
\
Cơ chế: document ghi vào in-memory buffer + translog trước, refresh mới đẩy buffer thành một Lucene segment và segment đó mới search được.\
\
Ba cách xử lý, theo mức độ nên dùng:\
\
```bash\
# 1. Doi refresh cua doc vua ghi (tot nhat cho luong \\"ghi xong xem ngay\\")\
PUT /products/_doc/1?refresh=wait_for\
\
# 2. Ep refresh ngay - CHI dung trong test\
POST /products/_refresh\
\
# 3. Doc bang GET theo _id - luon thay ngay, khong can refresh\
GET /products/_doc/1\
```\
\
`refresh=true` sau mỗi lần ghi là sai lầm thường gặp: nó tạo ra vô số segment nhỏ, ép merge liên tục và giết throughput.\
\
Ngược lại, khi bulk load hàng triệu record thì nên **tăng `refresh_interval` lên `30s` hoặc `-1`** rồi trả về sau khi nạp xong.

## Detailed Answer (EN)
Elasticsearch is **near real-time**, not real-time. A document becomes searchable only after a **refresh**, which happens every **1 second** by default.\
\
The mechanism: writes go into an in-memory buffer plus the translog first; a refresh turns the buffer into a Lucene segment, and only then is it searchable.\
\
Three options, in order of preference:\
\
```bash\
# 1. Wait for the refresh covering this write (best for write-then-read flows)\
PUT /products/_doc/1?refresh=wait_for\
\
# 2. Force an immediate refresh - tests ONLY\
POST /products/_refresh\
\
# 3. GET by _id - always current, no refresh needed\
GET /products/_doc/1\
```\
\
`refresh=true` on every write is the classic mistake: it creates countless tiny segments, forces constant merging and destroys throughput.\
\
Conversely, when bulk loading millions of records, **raise `refresh_interval` to `30s` or `-1`** and restore it after the load.
