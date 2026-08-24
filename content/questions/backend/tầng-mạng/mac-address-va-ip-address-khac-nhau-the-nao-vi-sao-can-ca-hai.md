---
id: mac-address-va-ip-address-khac-nhau-the-nao-vi-sao-can-ca-hai
position: backend
technology: tầng-mạng
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MAC address và IP address khác nhau thế nào? Vì sao cần cả hai?

## Question (EN)
How do MAC and IP addresses differ? Why are both needed?

## Đáp án chi tiết (VI)
MAC address là định danh vật lý 48-bit gắn cứng vào card mạng (NIC), hoạt động ở tầng 2 (Data Link) và chỉ có ý nghĩa trong phạm vi một LAN. IP address là định danh logic ở tầng 3 (Network), có thể thay đổi theo mạng và định tuyến được xuyên nhiều mạng.\
\
Cần cả hai vì chúng làm việc ở hai tầng khác nhau: IP xác định \\"đích cuối cùng ở đâu\\" trên toàn Internet (không đổi suốt hành trình), còn MAC xác định \\"chặng kế tiếp là ai\\" trong từng LAN (MAC nguồn/đích được viết lại ở mỗi hop router). Hình dung: IP như địa chỉ nhà nhận thư (cố định), MAC như tên người giao ở từng trạm trung chuyển. ARP là cầu nối ánh xạ IP→MAC.

## Detailed Answer (EN)
A MAC address is a 48-bit physical identifier burned into the network card (NIC), operating at layer 2 (Data Link) and meaningful only within a single LAN. An IP address is a logical identifier at layer 3 (Network) that can change per network and is routable across many networks.\
\
Both are needed because they work at different layers: IP identifies \\"where the final destination is\\" across the whole Internet (unchanged along the journey), while MAC identifies \\"who the next hop is\\" within each LAN (source/destination MAC are rewritten at every router hop). Picture it this way: the IP is the delivery address on an envelope (fixed), while the MAC is the courier at each transit station. ARP bridges the two by resolving IP→MAC.
