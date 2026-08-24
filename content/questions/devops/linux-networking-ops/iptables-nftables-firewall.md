---
id: iptables-nftables-firewall
position: devops
technology: linux-networking-ops
level: mid
tags: [firewall, iptables, nftables, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh iptables và nftables. Viết một ví dụ rule cơ bản để chỉ cho phép SSH (22), HTTP (80), HTTPS (443) và drop mọi kết nối inbound khác.

## Question (EN)
Compare iptables and nftables. Write a basic rule set that only allows SSH (22), HTTP (80), HTTPS (443) inbound and drops everything else.

## Đáp án chi tiết (VI)
**iptables** là công cụ firewall truyền thống trên Linux, hoạt động dựa trên các **table** (`filter`, `nat`, `mangle`, `raw`) và **chain** (`INPUT`, `OUTPUT`, `FORWARD`, `PREROUTING`, `POSTROUTING`), mỗi rule được duyệt tuần tự. **nftables** là công cụ thế hệ mới thay thế iptables từ kernel 3.13+, được các distro lớn (RHEL 8+, Debian 10+) mặc định dùng thay iptables.

Khác biệt chính:

| Tiêu chí | iptables | nftables |
|---|---|---|
| Cú pháp | Câu lệnh riêng biệt cho từng protocol (`iptables`, `ip6tables`, `arptables`) | Cú pháp thống nhất cho IPv4/IPv6/ARP trong 1 công cụ |
| Hiệu năng | Duyệt rule tuần tự (linear), chậm với rule set lớn | Dùng cấu trúc set/map (giống hash table), tra cứu nhanh hơn với rule set lớn |
| Atomic update | Không atomic mặc định (dùng `iptables-restore` để atomic) | Atomic theo mặc định khi load ruleset |
| Cú pháp rule | `-A INPUT -p tcp --dport 22 -j ACCEPT` | `add rule inet filter input tcp dport 22 accept` |
| Tương thích | Rất phổ biến, nhiều tool/doc cũ dùng | Là tương lai, nhưng một số công cụ cũ (một số CNI, Docker cũ) vẫn dựa vào iptables (thực chất là lớp tương thích `iptables-nft`) |
| Debug | `iptables -L -n -v` | `nft list ruleset` |

**Ví dụ với iptables** (allow SSH/HTTP/HTTPS, drop còn lại):
```bash
# Cho phép loopback và các kết nối đã established/related (quan trọng, tránh chặn nhầm response)
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

iptables -A INPUT -p tcp --dport 22  -j ACCEPT
iptables -A INPUT -p tcp --dport 80  -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Drop mọi thứ inbound còn lại
iptables -A INPUT -j DROP

# Lưu rule (Debian/Ubuntu)
iptables-save > /etc/iptables/rules.v4
```

**Ví dụ tương đương với nftables**:
```bash
nft add table inet filter
nft add chain inet filter input { type filter hook input priority 0 \; policy drop \; }

nft add rule inet filter input iif lo accept
nft add rule inet filter input ct state established,related accept
nft add rule inet filter input tcp dport { 22, 80, 443 } accept

# Lưu và load lại
nft list ruleset > /etc/nftables.conf
```
Điểm hay của nftables: gộp nhiều port vào 1 rule bằng `{ 22, 80, 443 }` (set), thay vì viết 3 rule riêng như iptables — vừa gọn vừa tra cứu nhanh hơn khi list lớn.

**Pitfall nghiêm trọng thường gặp**: quên rule `ESTABLISHED,RELATED` hoặc đặt policy `DROP` cho `INPUT` **trước** khi thêm rule cho SSH (22) khi đang SSH vào chính server đó — tự khóa mình ra khỏi server ngay lập tức. Cách an toàn:
- Luôn thêm rule ACCEPT cho SSH **trước** khi set default policy DROP.
- Test qua **console/VNC ngoài band** (không qua chính kết nối SSH đang sửa) hoặc dùng `at`/cron để tự động rollback rule sau vài phút nếu không có xác nhận: `echo "iptables -F" | at now + 5 minutes`.
- Với nftables/iptables chạy qua cloud provider (AWS/GCP), luôn kiểm tra thêm **security group** ở tầng cloud — 2 lớp firewall (OS-level + cloud-level) có thể xung đột logic khi debug "tại sao vẫn bị block".

## Detailed Answer (EN)
**iptables** is the traditional Linux firewall tool, organized around **tables** (`filter`, `nat`, `mangle`, `raw`) and **chains** (`INPUT`, `OUTPUT`, `FORWARD`, `PREROUTING`, `POSTROUTING`), with rules evaluated sequentially. **nftables** is the next-generation replacement, available since kernel 3.13+ and now the default on major distros (RHEL 8+, Debian 10+).

Key differences:

| Criterion | iptables | nftables |
|---|---|---|
| Syntax | Separate commands per protocol (`iptables`, `ip6tables`, `arptables`) | Unified syntax for IPv4/IPv6/ARP in one tool |
| Performance | Linear rule evaluation, slow with large rule sets | Uses set/map structures (hash-table-like), faster lookups at scale |
| Atomic updates | Not atomic by default (use `iptables-restore` for atomicity) | Atomic by default when loading a ruleset |
| Rule syntax | `-A INPUT -p tcp --dport 22 -j ACCEPT` | `add rule inet filter input tcp dport 22 accept` |
| Compatibility | Very widespread, most legacy tooling/docs use it | The future, though some legacy tools (some CNIs, older Docker) still rely on iptables under the hood (via the `iptables-nft` compatibility layer) |
| Debug | `iptables -L -n -v` | `nft list ruleset` |

**iptables example** (allow SSH/HTTP/HTTPS, drop everything else):
```bash
# Allow loopback and established/related connections (crucial to avoid blocking legitimate responses)
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

iptables -A INPUT -p tcp --dport 22  -j ACCEPT
iptables -A INPUT -p tcp --dport 80  -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Drop everything else inbound
iptables -A INPUT -j DROP

# Persist rules (Debian/Ubuntu)
iptables-save > /etc/iptables/rules.v4
```

**Equivalent nftables example**:
```bash
nft add table inet filter
nft add chain inet filter input { type filter hook input priority 0 \; policy drop \; }

nft add rule inet filter input iif lo accept
nft add rule inet filter input ct state established,related accept
nft add rule inet filter input tcp dport { 22, 80, 443 } accept

# Save and reload
nft list ruleset > /etc/nftables.conf
```
A nice feature of nftables: multiple ports combined into a single rule via `{ 22, 80, 443 }` (a set), instead of three separate rules like iptables — more compact and faster to look up at scale.

**A serious, common pitfall**: forgetting the `ESTABLISHED,RELATED` rule, or setting the `INPUT` policy to `DROP` **before** adding the SSH (22) allow rule while connected to that same server over SSH — instantly locking yourself out. The safe approach:
- Always add the SSH ACCEPT rule **before** setting the default policy to DROP.
- Test via an **out-of-band console/VNC** (not the very SSH session you're modifying), or schedule an automatic rollback if there's no confirmation: `echo "iptables -F" | at now + 5 minutes`.
- When running iptables/nftables on a cloud VM (AWS/GCP), always also check the **cloud-level security group** — two firewall layers (OS-level + cloud-level) can create confusing "why is this still blocked" debugging sessions if you only check one.
