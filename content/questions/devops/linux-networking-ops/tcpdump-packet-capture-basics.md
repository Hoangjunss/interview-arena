---
id: tcpdump-packet-capture-basics
position: devops
technology: linux-networking-ops
level: junior
tags: [tcpdump, networking, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trình bày cách dùng `tcpdump` cơ bản để bắt gói tin giữa server và một client cụ thể trên port 443, và cách đọc output.

## Question (EN)
Explain the basics of using `tcpdump` to capture packets between a server and a specific client on port 443, and how to read the output.

## Đáp án chi tiết (VI)
`tcpdump` là công cụ bắt gói tin (packet capture) chạy dòng lệnh, dựa trên thư viện `libpcap`, thường có sẵn trên hầu hết server Linux mà không cần cài GUI như Wireshark.

**Cú pháp cơ bản**:
```bash
tcpdump -i eth0 host 203.0.113.5 and port 443
```
- `-i eth0`: chỉ định interface mạng cần bắt (dùng `-i any` để bắt tất cả interface, hoặc `ip a` để xem tên interface).
- `host 203.0.113.5`: lọc theo IP nguồn hoặc đích.
- `port 443`: lọc theo port nguồn hoặc đích.
- `and`: kết hợp điều kiện (còn có `or`, `not`).

**Các option hay dùng trong thực tế**:
```bash
tcpdump -i eth0 -nn host 203.0.113.5 and port 443    # -nn: không resolve DNS/port name, tránh nhiễu và tránh tạo thêm DNS query
tcpdump -i eth0 -w capture.pcap host 203.0.113.5      # ghi ra file để phân tích sau bằng Wireshark
tcpdump -r capture.pcap                                # đọc lại file đã ghi
tcpdump -i eth0 -A port 80                             # hiện payload dạng ASCII (hữu ích debug HTTP plaintext)
tcpdump -i eth0 -v -c 20 port 443                      # -v verbose, -c 20: chỉ bắt 20 gói rồi dừng
tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0'        # chỉ bắt gói có flag SYN (để đếm connection attempt)
```

**Đọc output mẫu**:
```
14:32:01.123456 IP 10.0.1.5.54321 > 203.0.113.5.443: Flags [S], seq 123456789, win 64240, length 0
14:32:01.145678 IP 203.0.113.5.443 > 10.0.1.5.54321: Flags [S.], seq 987654321, ack 123456790, win 65535, length 0
14:32:01.145900 IP 10.0.1.5.54321 > 203.0.113.5.443: Flags [.], ack 987654322, win 64240, length 0
```
Giải thích:
- `10.0.1.5.54321 > 203.0.113.5.443`: nguồn `IP.port` → đích `IP.port`.
- `Flags [S]`: SYN — bước 1 handshake. `[S.]` = SYN+ACK — bước 2. `[.]` = ACK thuần (không có payload) — bước 3.
- `seq`/`ack`: sequence number và acknowledgment number, dùng để theo dõi thứ tự byte truyền.
- `length 0`: gói control (handshake) thường không mang payload.

Nếu thấy client gửi SYN nhưng **không có phản hồi SYN-ACK từ server** trong capture chạy trên server đó → gói tin không đến được tầng ứng dụng, nghi ngờ **firewall/security group chặn** trước khi tới kernel network stack, hoặc server không listen đúng port (`ss -tlnp` để xác nhận).

Nếu thấy SYN → SYN-ACK → ACK bình thường (handshake xong) nhưng sau đó là `RST` ngay lập tức → có thể do ứng dụng backend từ chối kết nối ở tầng application (ví dụ TLS handshake fail, hoặc backend đang quá tải và OS tự gửi RST vì backlog queue đầy).

**Lưu ý bảo mật/hiệu năng**: chạy `tcpdump` trên production cần cẩn trọng:
- Bắt gói tin trên interface có traffic lớn (nhiều Gbps) có thể tốn CPU đáng kể, nên giới hạn bằng filter chặt (theo host/port cụ thể) thay vì bắt toàn bộ.
- Traffic HTTP plaintext hiện payload rõ ràng qua `-A`, cẩn thận với dữ liệu nhạy cảm (token, password) khi share file `.pcap`.
- Cần quyền root (hoặc capability `CAP_NET_RAW`) để chạy.

## Detailed Answer (EN)
`tcpdump` is a command-line packet capture tool built on `libpcap`, typically available on almost every Linux server without needing a GUI tool like Wireshark.

**Basic syntax**:
```bash
tcpdump -i eth0 host 203.0.113.5 and port 443
```
- `-i eth0`: which network interface to capture on (use `-i any` for all interfaces, or `ip a` to list interface names).
- `host 203.0.113.5`: filter by source or destination IP.
- `port 443`: filter by source or destination port.
- `and`: combine conditions (`or` and `not` are also available).

**Commonly used options in practice**:
```bash
tcpdump -i eth0 -nn host 203.0.113.5 and port 443    # -nn: skip DNS/port-name resolution, avoids noise and extra DNS queries
tcpdump -i eth0 -w capture.pcap host 203.0.113.5      # write to a file for later analysis in Wireshark
tcpdump -r capture.pcap                                # read a previously saved capture
tcpdump -i eth0 -A port 80                             # show payload as ASCII (useful for debugging plaintext HTTP)
tcpdump -i eth0 -v -c 20 port 443                      # -v verbose, -c 20 capture only 20 packets then stop
tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn) != 0'        # capture only packets with the SYN flag (to count connection attempts)
```

**Reading sample output**:
```
14:32:01.123456 IP 10.0.1.5.54321 > 203.0.113.5.443: Flags [S], seq 123456789, win 64240, length 0
14:32:01.145678 IP 203.0.113.5.443 > 10.0.1.5.54321: Flags [S.], seq 987654321, ack 123456790, win 65535, length 0
14:32:01.145900 IP 10.0.1.5.54321 > 203.0.113.5.443: Flags [.], ack 987654322, win 64240, length 0
```
Breakdown:
- `10.0.1.5.54321 > 203.0.113.5.443`: source `IP.port` → destination `IP.port`.
- `Flags [S]`: SYN — handshake step 1. `[S.]` = SYN+ACK — step 2. `[.]` = pure ACK (no payload) — step 3.
- `seq`/`ack`: sequence and acknowledgment numbers tracking byte-stream order.
- `length 0`: control (handshake) packets usually carry no payload.

If you see the client sending a SYN but **no SYN-ACK response ever appears** in a capture taken on the server itself, the packet never reached the application layer — suspect a **firewall/security group blocking it** before it hits the kernel network stack, or the server isn't listening on that port at all (confirm with `ss -tlnp`).

If you see a normal SYN → SYN-ACK → ACK handshake complete, but immediately followed by an `RST` → the backend application may be rejecting the connection at the application layer (e.g. a failed TLS handshake, or the backend is overloaded and the OS sends an RST because its accept backlog is full).

**Security/performance caveats**: running `tcpdump` in production requires care:
- Capturing on a high-throughput interface (multi-Gbps) can consume significant CPU — scope the filter tightly (specific host/port) instead of capturing everything.
- Plaintext HTTP payloads shown via `-A` may expose sensitive data (tokens, passwords) — be careful when sharing a `.pcap` file.
- Requires root (or the `CAP_NET_RAW` capability) to run.
