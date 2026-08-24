---
id: connection-refused-vs-timeout
position: devops
technology: linux-networking-ops
level: mid
tags: [networking, debugging, tcp, firewall]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác nhau giữa lỗi "Connection refused" và "Connection timeout" khi gọi tới một service là gì? Từng nguyên nhân gợi ý hướng debug nào?

## Question (EN)
What's the difference between "Connection refused" and "Connection timeout" errors when calling a service? What debugging direction does each one suggest?

## Đáp án chi tiết (VI)
Đây là câu hỏi phân biệt hai lớp lỗi network hoàn toàn khác nhau về **nguyên nhân** lẫn **hướng debug**, dù cả hai đều khiến ứng dụng "không kết nối được".

**Connection refused (ECONNREFUSED)**:
- Xảy ra khi gói tin **TCP SYN đến được máy đích** nhưng **không có process nào đang listen** ở port đó, hoặc firewall trên chính máy đích chủ động trả về gói `RST` (reset). Về bản chất, đây là phản hồi **chủ động và nhanh** từ phía đích — client biết ngay lập tức là bị từ chối, không phải đợi.
- Nguyên nhân thường gặp:
  - Service chưa khởi động, hoặc đã crash.
  - Service listen sai địa chỉ (`127.0.0.1` thay vì `0.0.0.0`, nên chỉ nhận local, các kết nối từ bên ngoài bị refuse).
  - Sai port trong config (app thật sự chạy port 8080 nhưng client gọi 8000).
  - iptables/nftables trên đích có rule REJECT (khác với DROP — REJECT chủ động trả RST/ICMP, DROP thì im lặng).
- Hướng debug:
```bash
ss -tlnp | grep 8080          # xác nhận có process nào đang listen đúng port không
telnet <ip> <port>             # test nhanh, "Connection refused" xuất hiện gần như ngay lập tức
systemctl status myapp         # kiểm tra service có đang chạy không
```

**Connection timeout**:
- Xảy ra khi gói tin SYN **không nhận được phản hồi nào cả** (không SYN-ACK, không RST) trong khoảng thời gian chờ (thường 15-30s tùy client config) → client tự bỏ cuộc. Đây là dấu hiệu gói tin **bị rơi ở đâu đó trên đường đi**, không phải bị từ chối chủ động.
- Nguyên nhân thường gặp:
  - Firewall/security group ở giữa **DROP** gói tin (không phải REJECT) — không có phản hồi nào cả nên client chỉ có thể chờ hết timeout.
  - Sai routing — địa chỉ IP không route được tới đích (network ACL, VPC peering thiếu route, sai subnet).
  - Server quá tải, không kịp accept() kết nối mới dù đang listen đúng port (SYN backlog đầy).
  - Đích không tồn tại/network partition — gói tin gửi vào "hư không".
- Hướng debug:
```bash
traceroute <ip>               # xem gói tin dừng lại ở hop nào
mtr <ip>                       # kết hợp traceroute + ping liên tục, quan sát loss theo từng hop
tcpdump -i eth0 host <ip> and port <port>   # chạy ở CẢ client và server để xem gói tin có tới nơi không
```
Nếu `tcpdump` trên server **không thấy gói SYN nào đến** dù client đã gửi → vấn đề nằm ở **network path** (firewall giữa đường, routing, security group cloud) chứ không phải ở bản thân server/app.
Nếu `tcpdump` trên server **thấy SYN đến** nhưng server không trả lời gì → nghi ngờ **iptables DROP tại chính server đó**, hoặc kernel SYN backlog/accept queue đầy (`ss -lnt` xem cột `Recv-Q`/`Send-Q` so với backlog).

**Bảng tóm tắt để trả lời nhanh trong phỏng vấn**:

| | Connection refused | Connection timeout |
|---|---|---|
| Gói tin tới đích? | Có | Không rõ / Không |
| Phản hồi | RST — nhanh, chủ động | Không có phản hồi — chờ hết timeout |
| Thường do | App không chạy/không listen đúng port, REJECT rule | Firewall DROP giữa đường, routing sai, server quá tải |
| Tốc độ nhận lỗi | Gần như ngay lập tức | Chậm (10-30s+) |
| Công cụ debug chính | `ss -tlnp`, kiểm tra service | `traceroute`/`mtr`, `tcpdump` 2 đầu |

**Mẹo phỏng vấn hay bị hỏi thêm**: một lỗi khác dễ nhầm là **"connection reset by peer"** — khác với cả hai lỗi trên, đây là kết nối **đã thiết lập thành công (ESTABLISHED)** rồi mới bị đóng đột ngột giữa chừng (RST) bởi phía kia, thường do backend crash giữa lúc xử lý, hoặc load balancer timeout kết nối idle quá lâu trong khi client vẫn đang giữ.

## Detailed Answer (EN)
This question distinguishes two network error classes that are entirely different in **cause** and **debugging direction**, even though both surface to the application as "can't connect."

**Connection refused (ECONNREFUSED)**:
- Happens when the TCP SYN packet **reaches the destination machine** but **no process is listening** on that port, or a firewall on the destination itself actively sends back an `RST` (reset). This is fundamentally an **active, fast** response from the destination — the client knows immediately it was rejected, no waiting involved.
- Common causes:
  - The service hasn't started, or has crashed.
  - The service is listening on the wrong address (`127.0.0.1` instead of `0.0.0.0`, so it only accepts local connections and refuses external ones).
  - Wrong port in config (app actually runs on 8080 but the client calls 8000).
  - An iptables/nftables REJECT rule on the destination (different from DROP — REJECT actively sends back RST/ICMP, DROP stays silent).
- Debugging direction:
```bash
ss -tlnp | grep 8080          # confirm whether a process is actually listening on that port
telnet <ip> <port>             # quick test — "Connection refused" shows up almost instantly
systemctl status myapp         # check whether the service is even running
```

**Connection timeout**:
- Happens when the SYN packet gets **no response at all** (no SYN-ACK, no RST) within the wait window (typically 15-30s depending on client config), so the client gives up. This signals the packet was **dropped somewhere along the path**, not actively rejected.
- Common causes:
  - A firewall/security group somewhere in between **DROPs** the packet (as opposed to REJECT) — no response is ever sent, so the client can only wait out the timeout.
  - Bad routing — the destination IP isn't reachable at all (a missing network ACL, missing VPC peering route, wrong subnet).
  - The server is overloaded and can't `accept()` new connections in time despite listening correctly (SYN backlog full).
  - The destination doesn't exist / a network partition — the packet is sent into the void.
- Debugging direction:
```bash
traceroute <ip>               # see which hop the packet stops at
mtr <ip>                       # combines traceroute + continuous ping, shows loss per hop
tcpdump -i eth0 host <ip> and port <port>   # run on BOTH client and server to see if the packet ever arrives
```
If `tcpdump` on the server **never sees the SYN arrive** even though the client sent it → the problem is in the **network path** (an in-between firewall, routing, cloud security group), not the server/app itself.
If `tcpdump` on the server **does see the SYN arrive** but the server never replies → suspect an **iptables DROP rule on that server**, or a full kernel SYN backlog/accept queue (check `ss -lnt`, comparing `Recv-Q`/`Send-Q` against the backlog).

**Quick-reference table for interviews**:

| | Connection refused | Connection timeout |
|---|---|---|
| Packet reaches destination? | Yes | Unclear / No |
| Response | RST — fast, active | No response — waits out the timeout |
| Usually caused by | App not running/wrong port, REJECT rule | In-path DROP firewall, bad routing, overloaded server |
| Time to surface the error | Nearly instant | Slow (10-30s+) |
| Main debugging tools | `ss -tlnp`, service checks | `traceroute`/`mtr`, `tcpdump` on both ends |

**A common follow-up**: a third, easily confused error is **"connection reset by peer"** — unlike the two above, this happens on a connection that **was already ESTABLISHED** and then got abruptly torn down mid-flight (RST) by the other side, typically due to the backend crashing mid-request, or a load balancer timing out an idle connection the client thought it still owned.
