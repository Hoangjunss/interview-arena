---
id: linux-capabilities-container-hardening
position: devops
technology: docker
level: senior
tags: [docker, security, linux]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Linux capabilities là gì trong ngữ cảnh Docker? Làm sao dùng `--cap-drop`/`--cap-add` để hardening container theo nguyên tắc least privilege?

## Question (EN)
What are Linux capabilities in the context of Docker? How do you use `--cap-drop`/`--cap-add` to harden containers following the least-privilege principle?

## Đáp án chi tiết (VI)
**Linux capabilities** chia nhỏ quyền hạn của root (UID 0) thành **~40 đơn vị quyền riêng biệt** (ví dụ `CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`, `CAP_CHOWN`...), cho phép cấp **một phần** quyền root thay vì tất cả-hoặc-không-gì. Đây là cơ chế kernel Linux dùng chung, không riêng của Docker, nhưng Docker khai thác nó để giới hạn quyền container mà không cần chạy non-root hoàn toàn.

**Mặc định, Docker container chạy với một tập capability đã bị giới hạn** (không phải full root capabilities như process thật trên host), gồm khoảng 14 capability như `CAP_CHOWN`, `CAP_NET_RAW`, `CAP_SETUID`, `CAP_SETGID`, `CAP_KILL`... Đây đã là một lớp bảo vệ mặc định, nhưng vẫn dư thừa cho phần lớn ứng dụng web thông thường.

**Một số capability nguy hiểm cần biết:**
| Capability | Cho phép làm gì | Rủi ro nếu bị khai thác |
|---|---|---|
| `CAP_SYS_ADMIN` | "God-mode" — mount filesystem, thao tác namespace, rất nhiều syscall đặc quyền | Gần như tương đương full root, thường là bước đầu container escape |
| `CAP_NET_RAW` | Tạo raw socket (ping, packet sniffing) | Bị lợi dụng để ARP spoofing, network scanning từ trong container |
| `CAP_SYS_PTRACE` | Trace/debug process khác (kể cả ngoài container nếu misconfig) | Đọc memory của process khác, trích xuất secret |
| `CAP_DAC_OVERRIDE` | Bỏ qua kiểm tra permission file (đọc/ghi bất kỳ file nào bất kể quyền) | Đọc file nhạy cảm dù permission chặn |

**Chiến lược hardening — drop tất cả, add lại đúng cái cần:**
```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp
```
Ví dụ: một web server Node.js cần bind port 80 (dưới 1024) nhưng chạy non-root — chỉ cần đúng `CAP_NET_BIND_SERVICE`, không cần bất kỳ capability nào khác:
```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE --user 1000:1000 myapp
```

Trong Docker Compose:
```yaml
services:
  app:
    image: myapp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
```

**Kết hợp với các lớp hardening khác (defense in depth):**
```bash
docker run \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt no-new-privileges:true \
  --security-opt seccomp=/path/to/seccomp-profile.json \
  --read-only \
  --tmpfs /tmp \
  --user 1000:1000 \
  myapp
```
- `no-new-privileges`: chặn process trong container leo thang quyền qua `setuid` binary dù bằng cách nào.
- `--read-only`: filesystem root chỉ đọc, buộc app phải khai báo rõ thư mục nào thực sự cần ghi (`--tmpfs /tmp`).
- `seccomp`: giới hạn tập syscall được phép gọi ở mức thấp hơn cả capability — chặn cả những syscall nguy hiểm không thuộc capability nào cụ thể.

**Cách xác định capability thực sự cần cho một ứng dụng (không đoán mò):**
```bash
docker run --cap-drop=ALL myapp   # chạy thử với drop hết
# theo dõi log lỗi "Operation not permitted" → xác định capability còn thiếu, add từng cái một
```
Hoặc dùng công cụ như `strace`/`capsh --print` trong môi trường dev để xác định chính xác syscall/capability app thực sự dùng, tránh add thừa "cho chắc".

**Trade-off cần nêu:** drop ALL rồi add lại từng capability đòi hỏi **hiểu rõ hành vi runtime của ứng dụng** — nếu thiếu 1 capability cần thiết mà không phát hiện lúc test, production sẽ lỗi silent hoặc crash lúc gặp code path hiếm khi chạy (ví dụ chỉ khi có exception cần ghi core dump). Cần test kỹ ở staging trước khi áp policy hardening nghiêm ngặt lên production.

## Detailed Answer (EN)
**Linux capabilities** split root's (UID 0) authority into **roughly 40 discrete permission units** (e.g., `CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`, `CAP_CHOWN`...), allowing you to grant **partial** root power instead of all-or-nothing. This is a general Linux kernel mechanism, not Docker-specific, but Docker leverages it to restrict container privilege without requiring full non-root operation.

**By default, Docker containers run with a restricted capability set** (not the full root capability set a real process on the host would have), including about 14 capabilities like `CAP_CHOWN`, `CAP_NET_RAW`, `CAP_SETUID`, `CAP_SETGID`, `CAP_KILL`... This is already a default protective layer, but still more than most ordinary web apps need.

**Some dangerous capabilities worth knowing:**
| Capability | What it allows | Risk if exploited |
|---|---|---|
| `CAP_SYS_ADMIN` | "God-mode" — mounting filesystems, namespace manipulation, many privileged syscalls | Nearly equivalent to full root; often the first step of a container escape |
| `CAP_NET_RAW` | Create raw sockets (ping, packet sniffing) | Exploitable for ARP spoofing, network scanning from inside the container |
| `CAP_SYS_PTRACE` | Trace/debug other processes (even outside the container, if misconfigured) | Read another process's memory, extract secrets |
| `CAP_DAC_OVERRIDE` | Bypass file permission checks (read/write any file regardless of permissions) | Read sensitive files despite blocking permissions |

**Hardening strategy — drop everything, add back only what's needed:**
```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp
```
Example: a Node.js web server needing to bind port 80 (below 1024) while running non-root — only `CAP_NET_BIND_SERVICE` is needed, nothing else:
```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE --user 1000:1000 myapp
```

In Docker Compose:
```yaml
services:
  app:
    image: myapp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
```

**Combined with other hardening layers (defense in depth):**
```bash
docker run \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt no-new-privileges:true \
  --security-opt seccomp=/path/to/seccomp-profile.json \
  --read-only \
  --tmpfs /tmp \
  --user 1000:1000 \
  myapp
```
- `no-new-privileges`: blocks a process from escalating privilege through a setuid binary by any means.
- `--read-only`: makes the root filesystem read-only, forcing the app to explicitly declare which directories genuinely need write access (`--tmpfs /tmp`).
- `seccomp`: restricts the allowed syscall set at a lower level than capabilities — blocking dangerous syscalls that don't map to any specific capability.

**Determining which capabilities an app actually needs (not guesswork):**
```bash
docker run --cap-drop=ALL myapp   # try running with everything dropped
# watch for "Operation not permitted" errors → identify the missing capability, add it one at a time
```
Or use tools like `strace`/`capsh --print` in a dev environment to precisely determine which syscalls/capabilities the app actually uses, avoiding "just in case" over-granting.

**Trade-off to mention:** dropping ALL and re-adding piecemeal requires **deeply understanding the app's runtime behavior** — if a needed capability is missed during testing, production can fail silently or crash on a rarely-hit code path (e.g., only when an exception tries to write a core dump). Thorough staging tests are needed before applying a strict hardening policy to production.
