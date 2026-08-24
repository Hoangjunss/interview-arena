---
id: dns-resolution-troubleshooting
position: devops
technology: linux-networking-ops
level: mid
tags: [dns, networking, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng báo lỗi không kết nối được tới một hostname, nghi ngờ do DNS. Bạn sẽ debug theo trình tự nào để xác định vấn đề nằm ở đâu?

## Question (EN)
An application fails to connect to a hostname and you suspect DNS. What debugging sequence would you follow to pinpoint the problem?

## Đáp án chi tiết (VI)
Debug DNS cần đi theo trình tự từ **kiểm tra resolve có hoạt động không**, đến **resolve đi qua đường nào**, rồi mới đến **so sánh với kỳ vọng**.

**Bước 1: Xác nhận có resolve được không, và bằng công cụ nào**
```bash
nslookup myservice.internal
dig myservice.internal +short
host myservice.internal
```
Lưu ý quan trọng: `nslookup`/`dig` mặc định **không dùng cùng cơ chế resolve** như ứng dụng thực tế (chúng gọi thẳng DNS server, không đi qua NSS/`/etc/nsswitch.conf`, không đọc `/etc/hosts`). Vì vậy dù `dig` trả kết quả đúng, ứng dụng vẫn có thể fail nếu vấn đề nằm ở tầng NSS. Công cụ phản ánh đúng behavior ứng dụng hơn:
```bash
getent hosts myservice.internal
```

**Bước 2: Kiểm tra thứ tự resolve** — `/etc/nsswitch.conf`:
```
hosts: files dns
```
Nghĩa là hệ thống tra `/etc/hosts` trước, DNS sau. Nếu có entry sai/cũ trong `/etc/hosts`, DNS đúng cũng vô nghĩa vì `files` được ưu tiên trước.

**Bước 3: Kiểm tra resolver đang trỏ về đâu**
```bash
cat /etc/resolv.conf
```
Chú ý: trên hệ thống dùng `systemd-resolved`, `/etc/resolv.conf` có thể chỉ trỏ về `127.0.0.53` (stub resolver) — cần dùng `resolvectl status` để xem DNS server thật đang được dùng.
```bash
resolvectl status
resolvectl query myservice.internal
```

**Bước 4: Test trực tiếp tới từng DNS server** để cô lập server nào đang lỗi/chậm:
```bash
dig @8.8.8.8 myservice.internal
dig @10.0.0.2 myservice.internal +time=2 +tries=1
```
Nếu 1 trong nhiều nameserver trong `/etc/resolv.conf` bị down/chậm, và Linux resolver không failover nhanh, timeout tích lũy có thể gây delay lớn (mỗi nameserver timeout mặc định 5s, thử `options` với `timeout:1 attempts:1` để giảm).

**Bước 5: Phân biệt lỗi resolve và lỗi kết nối** — nếu `dig`/`getent` trả IP đúng nhưng ứng dụng vẫn "connection refused"/timeout, vấn đề đã chuyển sang tầng network/firewall chứ không còn là DNS:
```bash
telnet <resolved_ip> <port>
nc -zv <resolved_ip> <port>
```

**Các nguyên nhân thường gặp trong thực tế**:
- **TTL cache cũ**: DNS record đã đổi IP nhưng client/app cache lâu hơn TTL công bố (đặc biệt JVM cache DNS forever theo mặc định trừ khi set `networkaddress.cache.ttl`).
- **Split-horizon DNS** sai: server dùng resolver public thay vì internal DNS nên không resolve được hostname nội bộ.
- **Search domain** trong `/etc/resolv.conf` (`search internal.example.com`) gây resolve nhầm khi hostname ngắn bị nối thêm domain sai.
- **Container/Docker DNS**: container dùng resolver riêng (thường là DNS của Docker daemon hoặc CoreDNS trong Kubernetes) khác hoàn toàn với host, cần debug từ bên trong container bằng `getent`/`nslookup` chạy trong chính container đó, không phải từ host.

## Detailed Answer (EN)
Debugging DNS should follow a sequence: first **confirm whether resolution works at all**, then **trace which path it takes**, and finally **compare against expectations**.

**Step 1: Confirm resolution and with which tool**
```bash
nslookup myservice.internal
dig myservice.internal +short
host myservice.internal
```
Important caveat: `nslookup`/`dig` by default **don't use the same resolution path** as a real application (they query the DNS server directly, bypassing NSS and `/etc/nsswitch.conf`, and don't read `/etc/hosts`). So even if `dig` returns the right answer, the application can still fail if the problem is at the NSS layer. A tool that reflects actual application behavior more closely:
```bash
getent hosts myservice.internal
```

**Step 2: Check resolution order** — `/etc/nsswitch.conf`:
```
hosts: files dns
```
This means the system checks `/etc/hosts` first, then DNS. A stale/wrong entry in `/etc/hosts` makes a correct DNS answer irrelevant, since `files` takes precedence.

**Step 3: Check where the resolver actually points**
```bash
cat /etc/resolv.conf
```
Note: on systems using `systemd-resolved`, `/etc/resolv.conf` may just point to `127.0.0.53` (the stub resolver) — use `resolvectl status` to see the actual upstream DNS server in use.
```bash
resolvectl status
resolvectl query myservice.internal
```

**Step 4: Query each DNS server directly** to isolate which one is failing or slow:
```bash
dig @8.8.8.8 myservice.internal
dig @10.0.0.2 myservice.internal +time=2 +tries=1
```
If one of several nameservers listed in `/etc/resolv.conf` is down or slow and the Linux resolver doesn't fail over quickly, accumulated timeouts can add significant delay (each nameserver defaults to a 5s timeout — consider `options timeout:1 attempts:1` to reduce it).

**Step 5: Distinguish a resolution failure from a connection failure** — if `dig`/`getent` return the correct IP but the app still gets "connection refused" or a timeout, the problem has shifted to the network/firewall layer, not DNS:
```bash
telnet <resolved_ip> <port>
nc -zv <resolved_ip> <port>
```

**Common real-world causes**:
- **Stale TTL caching**: a DNS record's IP changed but the client/app cached it longer than the published TTL (notably the JVM caches DNS forever by default unless `networkaddress.cache.ttl` is set).
- **Split-horizon DNS misconfiguration**: a server using the public resolver instead of internal DNS, so internal hostnames never resolve.
- **Search domain** in `/etc/resolv.conf` (`search internal.example.com`) silently appending the wrong domain to a short hostname.
- **Container/Docker DNS**: a container has its own resolver (usually the Docker daemon's embedded DNS, or CoreDNS in Kubernetes) that's completely different from the host's — debug from inside the container with `getent`/`nslookup` run in that container, not from the host.
