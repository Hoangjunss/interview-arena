---
id: icmp-la-gi-ping-va-traceroute-hoat-dong-the-nao
position: backend
technology: giao-thức
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ICMP là gì? ping và traceroute hoạt động thế nào?

## Question (EN)
What is ICMP? How do ping and traceroute work?

## Đáp án chi tiết (VI)
ICMP (Internet Control Message Protocol) là giao thức tầng 3 dùng để báo lỗi và chẩn đoán mạng (không mang dữ liệu ứng dụng), ví dụ \\"Destination Unreachable\\" hay \\"Time Exceeded\\".\
- ping gửi ICMP Echo Request tới đích và chờ Echo Reply, đo round-trip time và tỉ lệ mất gói — kiểm tra host có sống và độ trễ bao nhiêu.\
- traceroute lợi dụng trường TTL: gửi loạt gói với TTL=1, 2, 3... Mỗi router giảm TTL đi 1; khi TTL về 0, router trả về ICMP Time Exceeded, để lộ IP của mình. Nhờ đó vẽ ra đường đi từng hop tới đích. (Trên Windows traceroute dùng ICMP; trên Linux mặc định dùng UDP nhưng cùng nguyên lý TTL.)\
Nhiều firewall chặn ICMP, nên ping timeout không chắc chắn nghĩa là host đã chết.

## Detailed Answer (EN)
ICMP (Internet Control Message Protocol) is a layer 3 protocol used for error reporting and network diagnostics (it carries no application data), e.g. \\"Destination Unreachable\\" or \\"Time Exceeded\\".\
- ping sends an ICMP Echo Request to a target and waits for an Echo Reply, measuring round-trip time and packet loss — checking whether a host is alive and how fast.\
- traceroute exploits the TTL field: it sends successive packets with TTL=1, 2, 3... Each router decrements TTL by one; when TTL reaches 0 the router returns an ICMP Time Exceeded, revealing its IP. This maps out the path hop by hop to the destination. (On Windows traceroute uses ICMP; on Linux it defaults to UDP but relies on the same TTL principle.)\
Many firewalls block ICMP, so a ping timeout does not necessarily mean the host is down.
