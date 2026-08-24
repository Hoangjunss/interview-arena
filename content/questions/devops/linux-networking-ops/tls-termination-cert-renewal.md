---
id: tls-termination-cert-renewal
position: devops
technology: linux-networking-ops
level: mid
tags: [tls, security, nginx, certificates]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
TLS termination là gì và nên đặt ở đâu trong kiến trúc? Trình bày cách tự động gia hạn chứng chỉ Let's Encrypt mà không gây downtime.

## Question (EN)
What is TLS termination and where should it live in the architecture? Describe how to automatically renew a Let's Encrypt certificate without downtime.

## Đáp án chi tiết (VI)
**TLS termination** là việc giải mã (decrypt) traffic HTTPS tại một điểm trong hệ thống — thường là load balancer/reverse proxy — thay vì để traffic mã hóa đi thẳng tới tận backend application. Sau điểm termination, traffic có thể tiếp tục đi dưới dạng HTTP thuần (nội bộ, trong mạng riêng/VPC) hoặc tiếp tục mã hóa lại (TLS re-encryption / "TLS bridging").

**Vì sao nên termination tại edge (load balancer/reverse proxy) thay vì tại từng backend**:
- **Giảm tải CPU** cho backend — TLS handshake (đặc biệt RSA) tốn CPU, tập trung xử lý tại 1-2 điểm dễ scale/tối ưu hơn (offload bằng phần cứng nếu cần).
- **Quản lý chứng chỉ tập trung**: chỉ cần cài/renew cert ở LB, không phải rải qua hàng chục backend instance.
- **Cho phép LB xử lý logic dựa trên nội dung HTTP** (routing theo path/host) — nếu traffic vẫn mã hóa, LB layer 7 không đọc được header.

**Đánh đổi cần cân nhắc**: sau điểm termination, nếu traffic đi tiếp dưới dạng HTTP thuần trong nội bộ, cần đảm bảo mạng nội bộ đủ tin cậy (VPC riêng, security group chặt) — nếu không tuân thủ (PCI-DSS, HIPAA...) có thể yêu cầu **mã hóa end-to-end**, khi đó dùng mô hình **TLS passthrough** (LB chỉ forward L4, không giải mã, backend tự làm TLS) hoặc **TLS re-encryption** (LB giải mã rồi mã hóa lại bằng cert nội bộ/mTLS tới backend).

**Cấu hình Nginx làm điểm termination**:
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://backend_pool;   # HTTP thuần nội bộ
        proxy_set_header X-Forwarded-Proto https;  # backend cần biết request gốc là HTTPS
    }
}
```
Lưu ý header `X-Forwarded-Proto`/`X-Forwarded-For`: backend không còn thấy TLS trực tiếp nên phải dựa vào các header này để biết request gốc dùng scheme gì, tránh redirect loop hoặc cookie `Secure` bị set sai.

**Tự động gia hạn Let's Encrypt không downtime** dùng `certbot`:

```bash
# Cài đặt lần đầu (dùng webroot hoặc nginx plugin)
certbot --nginx -d example.com -d www.example.com

# Certbot tự cài cron/systemd timer để renew
systemctl list-timers | grep certbot
```

Chứng chỉ Let's Encrypt có hiệu lực **90 ngày**, certbot mặc định thử renew khi còn **dưới 30 ngày**, chạy 2 lần/ngày qua systemd timer (`certbot.timer`) — không cần cron thủ công.

Điểm quan trọng để **không downtime**:
1. Certbot renew chỉ ghi file cert mới, **không tự làm Nginx đọc lại** — cần hook để reload:
```bash
certbot renew --deploy-hook "systemctl reload nginx"
```
`reload` (không phải `restart`) để Nginx nạp cert mới mà **không đóng kết nối đang xử lý** — master process load config mới, worker cũ tiếp tục phục vụ request dở dang rồi thoát êm.

2. Với hạ tầng nhiều node (nhiều Nginx instance sau LB), cần đảm bảo cert được **sync đồng bộ tới tất cả node** trước khi reload — nếu không, cert mismatch giữa các node gây lỗi ngắt quãng ngẫu nhiên cho client.

3. **Giám sát ngày hết hạn độc lập** với việc renew tự động — vì renew có thể fail âm thầm (DNS challenge lỗi, rate limit của Let's Encrypt, quyền file...). Nên có alert riêng kiểm tra `openssl x509 -enddate` hoặc dùng công cụ như blackbox_exporter theo dõi TLS cert expiry qua Prometheus, không nên tin tưởng tuyệt đối cron renew chạy đúng.

```bash
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -enddate
```

**Pitfall thực tế đã gặp**: certbot renew thành công nhưng quên `--deploy-hook`, cert file trên disk đã mới nhưng Nginx worker cũ vẫn giữ cert cũ trong memory cho tới lần restart tiếp theo — vài tuần sau cert cũ hết hạn thật (vì Let's Encrypt không xoay vòng chain), gây downtime bất ngờ dù "đã renew".

## Detailed Answer (EN)
**TLS termination** is decrypting HTTPS traffic at a single point in the system — usually a load balancer/reverse proxy — instead of letting encrypted traffic flow all the way to the backend application. After the termination point, traffic can continue as plain HTTP (internally, within a private network/VPC) or get re-encrypted ("TLS bridging").

**Why terminate at the edge (load balancer/reverse proxy) rather than at each backend**:
- **Offloads CPU** from backends — TLS handshakes (especially RSA) are CPU-intensive; concentrating this at one or two points is easier to scale/optimize (hardware offload if needed).
- **Centralized certificate management**: install/renew certs only at the LB, not across dozens of backend instances.
- **Enables content-based routing at L7** (path/host-based) — if traffic stayed encrypted, an L7 LB couldn't read HTTP headers.

**Trade-off to consider**: if traffic after termination flows as plain HTTP internally, the internal network must be trustworthy (private VPC, tight security groups). Compliance requirements (PCI-DSS, HIPAA, etc.) may mandate **end-to-end encryption**, requiring either **TLS passthrough** (LB just forwards at L4, no decryption, backend handles TLS itself) or **TLS re-encryption** (LB decrypts then re-encrypts with an internal cert/mTLS to the backend).

**Nginx configured as the termination point**:
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://backend_pool;   # plain HTTP internally
        proxy_set_header X-Forwarded-Proto https;  # backend needs to know the original request was HTTPS
    }
}
```
Note the `X-Forwarded-Proto`/`X-Forwarded-For` headers: the backend no longer sees TLS directly, so it must rely on these headers to know the original scheme — otherwise you risk redirect loops or `Secure` cookies being set incorrectly.

**Automating Let's Encrypt renewal without downtime** using `certbot`:

```bash
# Initial setup (webroot or nginx plugin)
certbot --nginx -d example.com -d www.example.com

# Certbot installs a cron job / systemd timer to renew automatically
systemctl list-timers | grep certbot
```

Let's Encrypt certs are valid for **90 days**; certbot attempts renewal once **fewer than 30 days remain**, checking twice a day via the `certbot.timer` systemd timer — no manual cron needed.

Key points for **zero-downtime**:
1. `certbot renew` only writes the new cert file — it does **not** automatically make Nginx reread it. You need a deploy hook:
```bash
certbot renew --deploy-hook "systemctl reload nginx"
```
Use `reload` (not `restart`) so Nginx loads the new cert **without dropping in-flight connections** — the master process loads the new config, old workers finish serving their current requests and exit gracefully.

2. With a multi-node setup (several Nginx instances behind an LB), the renewed cert must be **synced to all nodes** before reload — otherwise mismatched certs across nodes cause intermittent, seemingly random errors for clients.

3. **Monitor expiry independently** of the auto-renewal job, since renewal can fail silently (a failed DNS challenge, Let's Encrypt rate limits, file permission issues, etc.). Keep a separate alert checking `openssl x509 -enddate`, or use a tool like blackbox_exporter to track TLS cert expiry via Prometheus — never fully trust that the renewal cron ran successfully.

```bash
echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -enddate
```

**A real pitfall**: `certbot renew` succeeded but the `--deploy-hook` was missing — the cert file on disk was updated, but the running Nginx worker kept the old cert in memory until its next restart. Weeks later the old cert actually expired (Let's Encrypt doesn't rotate the running process's memory), causing an unexpected outage despite logs showing "renewed successfully".
