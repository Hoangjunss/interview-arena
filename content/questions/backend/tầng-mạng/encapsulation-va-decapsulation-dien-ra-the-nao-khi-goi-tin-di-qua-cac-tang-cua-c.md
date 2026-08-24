---
id: encapsulation-va-decapsulation-dien-ra-the-nao-khi-goi-tin-di-qua-cac-tang-cua-c
position: backend
technology: tầng-mạng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Encapsulation và decapsulation diễn ra thế nào khi gói tin đi qua các tầng của chồng giao thức (mô hình TCP/IP)?

## Question (EN)
How do encapsulation and decapsulation happen as a packet travels through the network stack (TCP/IP model)?

## Đáp án chi tiết (VI)
Encapsulation là quá trình mỗi tầng (từ trên xuống, ở phía gửi) bọc dữ liệu của tầng trên bằng header (và đôi khi trailer) của mình. Theo mô hình TCP/IP 5 tầng:\
- Application: data\
- Transport: thêm TCP header → **segment**, hoặc UDP header → **datagram** (có port nguồn/đích)\
- Network: thêm IP header → **packet** (IP nguồn/đích)\
- Data Link: thêm frame header + trailer (MAC, FCS) → **frame**\
- Physical: truyền thành bit trên đường truyền.\
Decapsulation là quá trình ngược ở phía nhận: mỗi tầng bóc header của mình, đọc thông tin điều khiển, rồi chuyển payload lên tầng trên. Mỗi tầng chỉ \\"đọc\\" đúng header của tầng tương ứng nên các tầng độc lập nhau.\
\
Lưu ý: mô hình **OSI có 7 tầng** — tách thêm Presentation và Session phía trên Application; mạng thực tế thường dùng mô hình TCP/IP gộp chúng vào Application. Hình dung như những phong bì lồng nhau: mỗi trạm chỉ mở đúng lớp của mình.

## Detailed Answer (EN)
Encapsulation is the process where each layer (top-down, on the sender) wraps the upper layer's data with its own header (and sometimes a trailer). In the 5-layer TCP/IP model:\
- Application: data\
- Transport: adds a TCP header → **segment**, or a UDP header → **datagram** (with source/destination ports)\
- Network: adds an IP header → **packet** (source/destination IP)\
- Data Link: adds a frame header + trailer (MAC, FCS) → **frame**\
- Physical: transmits it as bits on the medium.\
Decapsulation is the reverse on the receiver: each layer strips its own header, reads the control information, and passes the payload up. Each layer only reads its corresponding header, keeping the layers independent.\
\
Note: the **OSI model has 7 layers** — it splits out Presentation and Session above Application; real-world networking typically uses the TCP/IP model that folds those into Application. Picture nested envelopes: each station opens only its own layer.
