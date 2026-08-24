---
id: tcp-3-way-handshake-hoat-dong-the-nao-tai-sao-can-3-buoc
position: backend
technology: osi-\u0026-tcp-ip
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TCP 3-way handshake hoạt động thế nào? Tại sao cần 3 bước?

## Question (EN)
How does the TCP 3-way handshake work? Why are 3 steps necessary?

## Đáp án chi tiết (VI)
TCP 3-way handshake (SYN→SYN-ACK→ACK) thiết lập kết nối bằng cách đồng bộ sequence numbers của cả hai phía.\
\
Ba bước gồm: (1) Client gửi SYN với sequence number ngẫu nhiên X, (2) Server trả SYN-ACK với ACK=X+1 và sequence number Y của server, (3) Client gửi ACK=Y+1 xác nhận nhận được Y. Sau đó kết nối được thiết lập và dữ liệu có thể truyền.\
\
Cần đủ 3 bước vì cả hai phía cần đồng bộ sequence number của nhau: 2 bước chỉ đảm bảo server nghe được client, bước 3 đảm bảo client nghe được server. Khi đóng kết nối có 4-way handshake (FIN/ACK/FIN/ACK) vì hai hướng đóng độc lập. Trong thực tế, 3-way handshake là một nguồn latency đáng kể — đó là lý do HTTP/2 multiplexing và QUIC (HTTP/3) ra đời để giảm số lần handshake.

## Detailed Answer (EN)
TCP 3-way handshake (SYN→SYN-ACK→ACK) establishes a connection by synchronizing sequence numbers on both sides.\
\
The three steps are: (1) The client sends a SYN with a random sequence number X, (2) the server replies with SYN-ACK, acknowledging X+1 and providing its own sequence number Y, (3) the client sends ACK=Y+1 confirming receipt of Y. The connection is then established and data transfer can begin.\
\
Three steps are required because both sides must synchronize sequence numbers: two steps only confirm the server can hear the client, while the third step confirms the client can hear the server. Connection teardown uses a 4-way handshake (FIN/ACK/FIN/ACK) because each direction closes independently. In practice, the 3-way handshake is a significant source of latency — that is why HTTP/2 multiplexing and QUIC (HTTP/3) were introduced to reduce the number of handshakes.
