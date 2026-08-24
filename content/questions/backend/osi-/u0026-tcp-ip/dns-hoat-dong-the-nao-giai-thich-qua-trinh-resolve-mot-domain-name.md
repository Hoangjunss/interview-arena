---
id: dns-hoat-dong-the-nao-giai-thich-qua-trinh-resolve-mot-domain-name
position: backend
technology: osi-\u0026-tcp-ip
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DNS hoạt động thế nào? Giải thích quá trình resolve một domain name.

## Question (EN)
How does DNS work? Explain the process of resolving a domain name.

## Đáp án chi tiết (VI)
DNS (Domain Name System) dịch domain name (google.com) thành IP address. Quá trình resolve: (1) Browser kiểm tra local cache, (2) Hỏi OS resolver (kiểm tra /etc/hosts), (3) Hỏi Recursive Resolver của ISP, (4) Resolver hỏi Root Name Server (biết địa chỉ TLD servers), (5) Hỏi TLD Name Server (.com, .vn), (6) Hỏi Authoritative Name Server của domain (trả về IP cuối cùng). Kết quả được cache theo TTL (Time To Live).\
\
Có nhiều record type: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (SPF/DKIM), NS (name server). Thực tế lập trình: DNS propagation khi thay đổi record có thể mất vài giờ đến 48h tùy TTL. Dùng `dig`, `nslookup` để debug; DNS-over-HTTPS (DoH) và DNS-over-TLS (DoT) mã hóa DNS queries để tăng privacy.

## Detailed Answer (EN)
DNS (Domain Name System) translates domain names (e.g., google.com) into IP addresses. The resolution process: (1) the browser checks its local cache, (2) queries the OS resolver (checks /etc/hosts), (3) queries the ISP's recursive resolver, (4) the resolver queries a root name server (which knows TLD server addresses), (5) queries the TLD name server (.com, .vn), (6) queries the authoritative name server for the domain, which returns the final IP. Results are cached according to their TTL (Time To Live).\
\
Common record types include: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (SPF/DKIM), NS (name server). In practice: DNS propagation after a record change can take minutes to 48 hours depending on TTL. Use `dig` or `nslookup` for debugging; DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) encrypt DNS queries for improved privacy.
