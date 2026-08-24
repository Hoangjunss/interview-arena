---
id: tcp-three-way-handshake
position: devops
technology: linux-networking-ops
level: junior
tags: [tcp, networking, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hãy giải thích quá trình TCP three-way handshake và các trạng thái kết nối chính của một socket TCP.

## Question (EN)
Explain the TCP three-way handshake and the main connection states of a TCP socket.

## Đáp án chi tiết (VI)
TCP là giao thức **hướng kết nối (connection-oriented)**, nghĩa là trước khi truyền dữ liệu, hai bên phải thiết lập kết nối thông qua bắt tay 3 bước (**three-way handshake**):

```
Client                          Server
  |------ SYN (seq=x) --------->|      1. Client gửi SYN, đề xuất số seq ban đầu
  |<--- SYN-ACK (seq=y,ack=x+1)-|      2. Server gửi lại SYN-ACK: SYN của mình + ACK cho SYN của client
  |------ ACK (ack=y+1) ------->|      3. Client ACK lại, kết nối ESTABLISHED
```

1. **SYN**: client gửi gói tin với flag SYN=1, đề xuất sequence number khởi đầu ngẫu nhiên.
2. **SYN-ACK**: server phản hồi với cả 2 flag SYN=1 và ACK=1 — vừa đồng ý kết nối vừa xác nhận đã nhận SYN của client.
3. **ACK**: client xác nhận lại, lúc này kết nối chuyển sang trạng thái `ESTABLISHED` và có thể truyền dữ liệu hai chiều.

Việc bắt tay 3 bước (thay vì 2) đảm bảo **đồng bộ sequence number cả hai chiều** — cần thiết vì TCP là kết nối song công (full-duplex), mỗi chiều có sequence number riêng.

**Các trạng thái TCP chính** (xem bằng `ss -tan` hoặc `netstat -tan`):

| Trạng thái | Ý nghĩa |
|---|---|
| `LISTEN` | Server đang chờ kết nối đến |
| `SYN_SENT` | Client đã gửi SYN, chờ SYN-ACK |
| `SYN_RECV` | Server nhận SYN, đã gửi SYN-ACK, chờ ACK cuối |
| `ESTABLISHED` | Kết nối đã thiết lập, đang truyền dữ liệu |
| `FIN_WAIT_1` / `FIN_WAIT_2` | Bên chủ động đóng đã gửi FIN, chờ ACK/FIN từ phía kia |
| `CLOSE_WAIT` | Đã nhận FIN từ phía kia nhưng ứng dụng local chưa gọi `close()` |
| `TIME_WAIT` | Bên chủ động đóng chờ 2×MSL để đảm bảo gói tin trễ không gây nhầm lẫn cho kết nối mới |
| `CLOSED` | Kết nối đã đóng hoàn toàn |

Quá trình đóng kết nối dùng 4 bước (**four-way handshake**) vì TCP full-duplex — mỗi bên phải đóng chiều gửi của mình riêng biệt bằng FIN/ACK.

Kiểm tra thực tế:
```bash
ss -tan state established
ss -tan state time-wait | wc -l
```

**Điểm hay bị hỏi thêm**: `CLOSE_WAIT` nhiều và không giảm là dấu hiệu **application bug** — code không gọi `close()` sau khi nhận FIN từ peer, gây leak file descriptor. Còn `TIME_WAIT` nhiều thường là do tần suất mở/đóng kết nối ngắn hạn quá cao (ví dụ HTTP không dùng keep-alive), không phải bug mà là đặc tính bình thường của giao thức trừ khi nó gây cạn ephemeral port.

## Detailed Answer (EN)
TCP is a **connection-oriented** protocol — before data can flow, both sides must establish a connection via a **three-way handshake**:

```
Client                          Server
  |------ SYN (seq=x) --------->|      1. Client sends SYN, proposing an initial seq number
  |<--- SYN-ACK (seq=y,ack=x+1)-|      2. Server replies SYN-ACK: its own SYN + ACK of client's SYN
  |------ ACK (ack=y+1) ------->|      3. Client ACKs back, connection becomes ESTABLISHED
```

1. **SYN**: the client sends a packet with SYN=1, proposing a random initial sequence number.
2. **SYN-ACK**: the server replies with both SYN=1 and ACK=1 — accepting the connection while acknowledging the client's SYN.
3. **ACK**: the client acknowledges back; the connection transitions to `ESTABLISHED` and bidirectional data transfer can begin.

The handshake needs three steps (not two) to **synchronize sequence numbers in both directions**, since TCP is full-duplex and each direction tracks its own sequence number independently.

**Main TCP states** (inspect with `ss -tan` or `netstat -tan`):

| State | Meaning |
|---|---|
| `LISTEN` | Server waiting for incoming connections |
| `SYN_SENT` | Client sent SYN, waiting for SYN-ACK |
| `SYN_RECV` | Server received SYN, sent SYN-ACK, waiting for final ACK |
| `ESTABLISHED` | Connection is up, data is flowing |
| `FIN_WAIT_1` / `FIN_WAIT_2` | The side that initiated close sent FIN, waiting for ACK/FIN from the peer |
| `CLOSE_WAIT` | FIN received from peer, but the local application hasn't called `close()` yet |
| `TIME_WAIT` | The closing side waits 2×MSL to ensure delayed packets don't confuse a future connection |
| `CLOSED` | Connection fully closed |

Closing a connection uses a **four-way handshake** because TCP is full-duplex — each side must close its own send direction independently with FIN/ACK.

In practice:
```bash
ss -tan state established
ss -tan state time-wait | wc -l
```

**Common follow-up**: a large, non-decreasing count of `CLOSE_WAIT` connections is an **application bug** signal — the code never calls `close()` after receiving the peer's FIN, leaking file descriptors. Large `TIME_WAIT` counts are usually just the normal result of high connection churn (e.g. HTTP without keep-alive), not a bug per se — unless it's exhausting ephemeral ports.
