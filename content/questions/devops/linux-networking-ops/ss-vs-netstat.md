---
id: ss-vs-netstat
position: devops
technology: linux-networking-ops
level: junior
tags: [networking, linux, tools]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ss` và `netstat` khác nhau như thế nào? Viết lệnh `ss` để liệt kê tất cả các port đang LISTEN kèm tên process.

## Question (EN)
How do `ss` and `netstat` differ? Write an `ss` command to list all LISTENing ports along with the owning process name.

## Đáp án chi tiết (VI)
**`netstat`** là công cụ truyền thống để xem thông tin socket/kết nối mạng, thuộc bộ `net-tools` — bộ công cụ này đã **deprecated** trên nhiều distro hiện đại (không còn cài mặc định trên nhiều bản Debian/Ubuntu/RHEL mới, phải cài thêm gói `net-tools`).

**`ss`** ("socket statistics") là công cụ thay thế thuộc bộ `iproute2`, được cài mặc định trên hầu hết distro hiện đại. Ưu điểm chính của `ss` so với `netstat`:
- **Nhanh hơn đáng kể**: `netstat` đọc dữ liệu qua `/proc/net/tcp` và phải parse tuần tự từng dòng cộng thêm resolve thông tin bổ sung; `ss` lấy dữ liệu trực tiếp từ kernel qua **netlink socket**, hiệu quả hơn nhiều khi hệ thống có hàng chục nghìn kết nối.
- Filter mạnh hơn (`ss -tan state established`, hỗ trợ biểu thức lọc theo state, address).
- Là công cụ được khuyến nghị chính thức thay thế `netstat` từ nhiều năm nay.

Bảng ánh xạ lệnh tương đương:

| Mục đích | netstat | ss |
|---|---|---|
| Tất cả TCP connection | `netstat -tan` | `ss -tan` |
| Chỉ port đang listen | `netstat -tlnp` | `ss -tlnp` |
| Tất cả UDP | `netstat -uan` | `ss -uan` |
| Thống kê theo protocol | `netstat -s` | `ss -s` |
| Lọc theo state | (khó, phải `grep`) | `ss -tan state time-wait` (filter built-in) |

**Lệnh liệt kê port LISTEN kèm process**:
```bash
ss -tlnp
```
Giải thích flag:
- `-t`: chỉ TCP.
- `-l`: chỉ socket đang LISTEN.
- `-n`: hiển thị số (port/IP), không resolve tên (nhanh hơn, tránh treo do DNS reverse lookup).
- `-p`: hiển thị PID và tên process sở hữu socket (**cần chạy với quyền root/sudo** để thấy đầy đủ, nếu không sẽ chỉ thấy socket mà không thấy process).

Output mẫu:
```
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
LISTEN  0       128     0.0.0.0:22           0.0.0.0:*          users:(("sshd",pid=891,fd=3))
LISTEN  0       511     0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=1203,fd=6))
LISTEN  0       128     127.0.0.1:5432       0.0.0.0:*          users:(("postgres",pid=1450,fd=5))
```

**Chi tiết dễ bị hỏi thêm**: cột `Recv-Q`/`Send-Q` khi ở trạng thái `LISTEN` có ý nghĩa khác khi ở `ESTABLISHED`:
- Ở `LISTEN`: `Recv-Q` = số kết nối đang chờ trong **accept queue** (đã hoàn thành handshake nhưng app chưa gọi `accept()`), `Send-Q` = kích thước tối đa backlog cấu hình (`listen()` backlog).
- Ở `ESTABLISHED`: `Recv-Q` = bytes đã nhận nhưng app chưa đọc, `Send-Q` = bytes đã gửi nhưng chưa được peer ACK.

Nếu `Recv-Q` ở trạng thái LISTEN liên tục cao gần bằng backlog → dấu hiệu ứng dụng **accept() không kịp**, cần tăng backlog hoặc tối ưu code xử lý connection.

Ví dụ `127.0.0.1:5432` (chỉ bind localhost) — một chi tiết quan trọng khi debug "tại sao không connect được từ máy khác": nếu địa chỉ bind là `127.0.0.1` thay vì `0.0.0.0`, kết nối từ bên ngoài sẽ luôn bị refuse dù port đúng và firewall mở.

## Detailed Answer (EN)
**`netstat`** is the traditional tool for inspecting sockets/network connections, part of the `net-tools` package — which is **deprecated** on many modern distros and no longer installed by default (recent Debian/Ubuntu/RHEL require installing `net-tools` explicitly).

**`ss`** ("socket statistics") is the replacement tool from the `iproute2` package, installed by default on most modern distros. Its main advantages over `netstat`:
- **Significantly faster**: `netstat` reads data via `/proc/net/tcp` and parses it line by line plus resolves supplementary info; `ss` pulls data directly from the kernel via a **netlink socket**, which scales much better when a system has tens of thousands of connections.
- Stronger filtering (`ss -tan state established`, built-in expressions for state and address filters).
- The officially recommended replacement for `netstat` for years now.

Command equivalence table:

| Purpose | netstat | ss |
|---|---|---|
| All TCP connections | `netstat -tan` | `ss -tan` |
| Listening ports only | `netstat -tlnp` | `ss -tlnp` |
| All UDP | `netstat -uan` | `ss -uan` |
| Per-protocol stats | `netstat -s` | `ss -s` |
| Filter by state | (awkward, needs `grep`) | `ss -tan state time-wait` (built-in filter) |

**Command to list LISTENing ports with the owning process**:
```bash
ss -tlnp
```
Flag breakdown:
- `-t`: TCP only.
- `-l`: LISTENing sockets only.
- `-n`: show numeric port/IP, skip name resolution (faster, avoids hangs from reverse DNS lookups).
- `-p`: show the PID and process name owning the socket (**requires root/sudo** to see it fully — otherwise you'll see the socket but not the owning process).

Sample output:
```
State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port  Process
LISTEN  0       128     0.0.0.0:22           0.0.0.0:*          users:(("sshd",pid=891,fd=3))
LISTEN  0       511     0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=1203,fd=6))
LISTEN  0       128     127.0.0.1:5432       0.0.0.0:*          users:(("postgres",pid=1450,fd=5))
```

**A common follow-up detail**: the `Recv-Q`/`Send-Q` columns mean different things depending on state:
- In `LISTEN`: `Recv-Q` = number of connections queued in the **accept queue** (handshake completed but the app hasn't called `accept()` yet), `Send-Q` = the configured max backlog (the `listen()` backlog).
- In `ESTABLISHED`: `Recv-Q` = bytes received but not yet read by the app, `Send-Q` = bytes sent but not yet ACKed by the peer.

If `Recv-Q` in the LISTEN state stays consistently close to the backlog value, that's a sign the application **can't `accept()` fast enough** — you need to raise the backlog or optimize connection-handling code.

Notice `127.0.0.1:5432` (bound to localhost only) — an important detail when debugging "why can't another machine connect": if the bind address is `127.0.0.1` instead of `0.0.0.0`, connections from outside will always be refused even with the right port and an open firewall.
