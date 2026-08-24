---
id: time-wait-explosion
position: devops
technology: linux-networking-ops
level: senior
tags: [tcp, networking, performance, production-incident]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server ứng dụng bị lỗi "cannot assign requested address" khi gọi ra một service khác, và `ss -tan` cho thấy hàng chục nghìn kết nối ở trạng thái `TIME_WAIT`. Nguyên nhân là gì và bạn xử lý/thiết kế lại như thế nào?

## Question (EN)
An application server throws "cannot assign requested address" when calling out to another service, and `ss -tan` shows tens of thousands of connections in `TIME_WAIT`. What's the cause, and how would you fix or redesign the system?

## Đáp án chi tiết (VI)
Đây là hiện tượng **cạn kiệt ephemeral port** gây ra bởi bùng nổ `TIME_WAIT`.

**Cơ chế**: khi một kết nối TCP outbound đóng lại, bên **chủ động đóng kết nối** (thường là client) phải giữ socket ở trạng thái `TIME_WAIT` trong khoảng **2×MSL** (Maximum Segment Lifetime, mặc định thường 60s trên Linux → tổng cộng 2 phút) để đảm bảo các gói tin trễ trên mạng không bị hiểu nhầm là thuộc về một kết nối mới dùng lại cùng cặp (IP, port).

Vấn đề xảy ra khi:
- Ứng dụng mở **rất nhiều kết nối ngắn hạn** ra cùng một địa chỉ đích (ví dụ gọi HTTP API mà không dùng connection pool/keep-alive, mỗi request là 1 kết nối mới).
- Dải ephemeral port trên Linux mặc định chỉ có khoảng 28232 port (`net.ipv4.ip_local_port_range`, thường là `32768-60999`).
- Khi tốc độ tạo kết nối mới nhanh hơn tốc độ port thoát khỏi `TIME_WAIT`, toàn bộ dải port bị chiếm dụng bởi các kết nối đang chờ hết TIME_WAIT → không còn port trống để mở kết nối mới → lỗi `EADDRNOTAVAIL` ("cannot assign requested address").

**Chẩn đoán**:
```bash
ss -tan state time-wait | wc -l
cat /proc/sys/net/ipv4/ip_local_port_range
ss -tan state time-wait | awk '{print $4}' | cut -d: -f1 | sort | uniq -c | sort -rn  # xem đích nào bị nhiều nhất
```

**Các hướng xử lý, từ tạm thời đến triệt để**:

1. **Tăng dải ephemeral port** (giảm nhẹ áp lực, không giải quyết gốc rễ):
```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
```

2. **Bật `net.ipv4.tcp_tw_reuse=1`**: cho phép tái sử dụng socket đang ở TIME_WAIT cho kết nối **outbound** mới nếu timestamp TCP an toàn để phân biệt. Đây là fix phổ biến và an toàn cho traffic outbound (client). **Không** bật `tcp_tw_recycle` (đã bị **loại bỏ khỏi kernel từ 4.12** vì gây lỗi kết nối khi client ở sau NAT dùng chung IP — nhiều timestamp khác nhau bị hiểu nhầm).

3. **Giải pháp kiến trúc đúng đắn — connection pooling/keep-alive**: đây mới là fix triệt để. Thay vì mở kết nối mới cho mỗi request:
   - HTTP client dùng **keep-alive** và connection pool (ví dụ `http.Transport` trong Go với `MaxIdleConnsPerHost`, hoặc `requests.Session()` trong Python, hoặc connection pool của HttpClient trong Java).
   - Database dùng **connection pool** (HikariCP, pgbouncer...) thay vì tạo kết nối mới mỗi query.
   - Nếu gọi ra nhiều instance của cùng 1 service qua load balancer, cân nhắc **giảm số lượng đích** (ví dụ dùng ít địa chỉ đích cố định hơn) để không bị giới hạn theo cặp (source_ip, dest_ip, dest_port) — vì ephemeral port cạn kiệt là tính theo từng cặp 4-tuple, không phải toàn cục.

4. Nếu bên bị cạn port là **server nhận connection** (ít gặp hơn vì server thường không phải bên chủ động đóng), có thể set `SO_LINGER` hợp lý hoặc cấu hình để client chủ động đóng trước.

**Bài học sản xuất thực tế**: một service gọi ra API bên thứ 3 qua HTTP không dùng keep-alive, throughput ~500 req/s, mỗi kết nối tồn tại TIME_WAIT 60s → tại một thời điểm có tới 30.000 kết nối treo, vượt gần hết dải ephemeral port mặc định. Sau khi chuyển sang dùng shared `http.Client` với keep-alive, số kết nối TIME_WAIT giảm xuống gần 0 vì kết nối được tái sử dụng thay vì đóng liên tục.

## Detailed Answer (EN)
This is **ephemeral port exhaustion** caused by a `TIME_WAIT` explosion.

**Mechanism**: when a TCP connection closes, the side that **actively initiates the close** (usually the client) must hold the socket in `TIME_WAIT` for **2×MSL** (Maximum Segment Lifetime, typically 60s on Linux → 2 minutes total) to guarantee that stray delayed packets on the network aren't mistaken for belonging to a new connection reusing the same (IP, port) pair.

The problem hits when:
- The application opens **many short-lived connections** to the same destination (e.g. calling an HTTP API without connection pooling/keep-alive, so every request is a brand-new connection).
- Linux's default ephemeral port range only has around 28,000 ports (`net.ipv4.ip_local_port_range`, typically `32768-60999`).
- When new connections are created faster than ports drain out of `TIME_WAIT`, the entire port range fills up with connections stuck waiting → no free port left to open a new connection → `EADDRNOTAVAIL` ("cannot assign requested address").

**Diagnosis**:
```bash
ss -tan state time-wait | wc -l
cat /proc/sys/net/ipv4/ip_local_port_range
ss -tan state time-wait | awk '{print $4}' | cut -d: -f1 | sort | uniq -c | sort -rn  # which destination is most affected
```

**Fixes, from temporary to structural**:

1. **Widen the ephemeral port range** (relieves pressure, doesn't fix the root cause):
```bash
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
```

2. **Enable `net.ipv4.tcp_tw_reuse=1`**: allows reusing a socket sitting in TIME_WAIT for a new **outbound** connection when TCP timestamps make it safe to distinguish. This is a common, safe fix for outbound (client) traffic. **Do not** enable `tcp_tw_recycle` — it was **removed from the kernel since 4.12** because it broke connections from clients behind NAT sharing an IP (differing timestamps got misinterpreted).

3. **The real architectural fix — connection pooling/keep-alive**: this is the actual solution. Instead of opening a new connection per request:
   - Use HTTP **keep-alive** and a connection pool (e.g. Go's `http.Transport` with `MaxIdleConnsPerHost`, Python's `requests.Session()`, or a Java HttpClient connection pool).
   - Use a **database connection pool** (HikariCP, pgbouncer, etc.) instead of opening a fresh connection per query.
   - If calling many instances of the same downstream service through a load balancer, consider **reducing the number of distinct destinations**, since exhaustion is scoped per (source_ip, dest_ip, dest_port) 4-tuple, not globally.

4. If the side running out of ports is the **server accepting connections** (rarer, since servers usually don't initiate the close), consider a sane `SO_LINGER` setting or have the client close first.

**Real production lesson**: a service calling a third-party API over HTTP without keep-alive, at ~500 req/s, with each connection sitting in TIME_WAIT for 60s, ended up with ~30,000 lingering connections at any given moment — nearly exhausting the default ephemeral port range. After switching to a shared `http.Client` with keep-alive, TIME_WAIT connections dropped to near zero because connections were reused instead of being torn down constantly.
