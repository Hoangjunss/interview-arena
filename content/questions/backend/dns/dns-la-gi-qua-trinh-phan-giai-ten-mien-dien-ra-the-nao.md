---
id: dns-la-gi-qua-trinh-phan-giai-ten-mien-dien-ra-the-nao
position: backend
technology: dns
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DNS là gì? Quá trình phân giải tên miền diễn ra thế nào?

## Question (EN)
What is DNS and how does name resolution work?

## Đáp án chi tiết (VI)
DNS (Domain Name System) là \\"danh bạ\\" của internet — dịch **tên miền dễ nhớ** (`example.com`) sang **địa chỉ IP** mà máy dùng để kết nối.\
\
Quá trình phân giải (đệ quy) khi truy cập một tên chưa cache:\
1. **Resolver** (thường của ISP) nhận truy vấn.\
2. Hỏi **root server** → chỉ tới TLD server của `.com`.\
3. Hỏi **TLD server** → chỉ tới **authoritative server** của `example.com`.\
4. **Authoritative server** trả về IP.\
5. Resolver **cache** theo **TTL** và trả cho client.\
\
Các record hay gặp: **A** (IPv4), **AAAA** (IPv6), **CNAME** (bí danh), **MX** (mail), **TXT** (xác minh/SPF), **NS** (name server). Cache ở nhiều tầng (trình duyệt, OS, resolver) giúp phân giải sau đó gần như tức thì.

## Detailed Answer (EN)
DNS (Domain Name System) is the internet's \\"phone book\\" — it translates **memorable domain names** (`example.com`) into **IP addresses** machines use to connect.\
\
Recursive resolution for an uncached name:\
1. The **resolver** (often your ISP) receives the query.\
2. It asks a **root server** → pointed to the `.com` TLD server.\
3. It asks the **TLD server** → pointed to `example.com`'s **authoritative server**.\
4. The **authoritative server** returns the IP.\
5. The resolver **caches** it per **TTL** and returns it to the client.\
\
Common records: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail), **TXT** (verification/SPF), **NS** (name server). Caching at several layers (browser, OS, resolver) makes later lookups nearly instant.
