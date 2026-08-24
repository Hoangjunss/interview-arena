---
id: flow-control-va-congestion-control-trong-tcp-khac-nhau-the-nao-sliding-window-ho
position: backend
technology: giao-thức
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flow control và congestion control trong TCP khác nhau thế nào? Sliding window hoạt động ra sao?

## Question (EN)
How do TCP flow control and congestion control differ? How does the sliding window work?

## Đáp án chi tiết (VI)
Cả hai đều giới hạn tốc độ gửi, nhưng vì lý do khác nhau:\
- Flow control bảo vệ receiver khỏi tràn buffer. Receiver quảng bá receive window (rwnd) trong mỗi ACK; sender không để lượng dữ liệu chưa được ACK vượt quá mức cho phép. Đây chính là cơ chế sliding window: cửa sổ trượt tới khi ACK về, cho phép gửi thêm.\
- Congestion control bảo vệ mạng (các router ở giữa) khỏi nghẽn. Sender duy trì congestion window (cwnd): slow start tăng theo cấp số nhân tới ngưỡng ssthresh, rồi congestion avoidance tăng tuyến tính; khi mất gói (dấu hiệu nghẽn) thì giảm mạnh cwnd (multiplicative decrease).\
Lượng dữ liệu gửi thực tế = min(rwnd, cwnd). Flow control do receiver quyết định, còn congestion control do sender tự suy đoán tình trạng mạng.

## Detailed Answer (EN)
Both limit the sending rate, but for different reasons:\
- Flow control protects the receiver from buffer overflow. The receiver advertises a receive window (rwnd) in each ACK; the sender never keeps more unacknowledged data outstanding than allowed. This is the sliding window mechanism: the window slides forward as ACKs arrive, permitting more data to be sent.\
- Congestion control protects the network (the routers in between) from overload. The sender maintains a congestion window (cwnd): slow start grows it exponentially up to a threshold (ssthresh), then congestion avoidance grows it linearly; on packet loss (a congestion signal) cwnd is cut sharply (multiplicative decrease).\
The actual amount in flight = min(rwnd, cwnd). Flow control is dictated by the receiver, while congestion control is the sender inferring the network state.
