---
id: chinh-sach-eviction-cua-cache-khac-nhau-ra-sao-lru-lfu-ttl-khi-nao-chon-cai-nao
position: system-design
technology: interview-scenarios
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chính sách eviction của cache khác nhau ra sao — LRU, LFU, TTL? Khi nào chọn cái nào?

## Question (EN)
How do cache eviction policies differ — LRU, LFU, TTL? When would you pick each?

## Đáp án chi tiết (VI)
Khi cache đầy bộ nhớ, cần bỏ bớt entry để nhận cái mới — chính sách eviction quyết định bỏ cái nào.\
\
- **LRU (Least Recently Used)**: bỏ entry lâu nhất chưa được truy cập. Giả định \\"vừa dùng gần đây thì còn dùng\\" (temporal locality). Mặc định phổ biến, hợp với đa số workload.\
- **LFU (Least Frequently Used)**: bỏ entry có tần suất truy cập thấp nhất. Giữ tốt các key \\"nóng dài hạn\\

## Detailed Answer (EN)
$7c
