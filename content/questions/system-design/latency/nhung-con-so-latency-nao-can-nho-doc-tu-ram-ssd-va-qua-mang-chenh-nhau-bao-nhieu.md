---
id: nhung-con-so-latency-nao-can-nho-doc-tu-ram-ssd-va-qua-mang-chenh-nhau-bao-nhieu
position: system-design
technology: latency
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những con số latency nào cần nhớ? Đọc từ RAM, SSD và qua mạng chênh nhau bao nhiêu?

## Question (EN)
Which latency numbers should you memorize? How far apart are RAM, SSD, and network reads?

## Đáp án chi tiết (VI)
Các bậc độ lớn cần nhớ (số xấp xỉ, dùng để so sánh chứ không phải để trích dẫn chính xác):\
\
| Thao tác | Thời gian |\
|---|---|\
| Truy cập L1 cache | ~1 ns |\
| Truy cập main memory (RAM) | ~100 ns |\
| Đọc 1 MB tuần tự từ RAM | ~250 us |\
| Round-trip trong cùng data center | ~500 us |\
| Đọc ngẫu nhiên từ SSD | ~150 us |\
| Đọc 1 MB tuần tự từ SSD | ~1 ms |\
| Seek đĩa quay (HDD) | ~10 ms |\
| Round-trip California - Hà Lan | ~150 ms |\
\
Cách nhớ gọn: **RAM nhanh hơn SSD khoảng 1000 lần, SSD nhanh hơn HDD khoảng 100 lần, và mạng liên lục địa chậm hơn mọi thứ trong máy**.\
\
Ý nghĩa khi thiết kế:\
- Một request phải gọi 5 service nội bộ tuần tự đã tốn vài ms chỉ riêng phần mạng — nên gọi song song khi có thể.\
- Cache trong RAM (Redis, memcached) đáng giá vì cắt được phần đọc đĩa và phần lớn thời gian truy vấn.\
- Người dùng ở xa cần CDN/edge: tốc độ ánh sáng là giới hạn cứng, không tối ưu code nào bù được 150 ms đường truyền.

## Detailed Answer (EN)
The orders of magnitude worth remembering (approximate, useful for comparison rather than exact quotation):\
\
| Operation | Time |\
|---|---|\
| L1 cache reference | ~1 ns |\
| Main memory (RAM) reference | ~100 ns |\
| Read 1 MB sequentially from RAM | ~250 us |\
| Round trip within the same datacenter | ~500 us |\
| SSD random read | ~150 us |\
| Read 1 MB sequentially from SSD | ~1 ms |\
| Spinning disk (HDD) seek | ~10 ms |\
| Round trip California - Netherlands | ~150 ms |\
\
Shorthand: **RAM is roughly 1000x faster than SSD, SSD roughly 100x faster than HDD, and an intercontinental round trip dwarfs everything inside the machine**.\
\
Design implications:\
- A request that calls 5 internal services sequentially already spends several ms on network alone — parallelize where possible.\
- An in-memory cache (Redis, memcached) pays off because it removes disk reads and most of the query time.\
- Distant users need a CDN/edge: the speed of light is a hard limit, no code optimization recovers 150 ms of transit.
