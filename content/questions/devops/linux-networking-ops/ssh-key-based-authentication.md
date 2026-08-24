---
id: ssh-key-based-authentication
position: devops
technology: linux-networking-ops
level: junior
tags: [ssh, security, linux]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Giải thích cách SSH key-based authentication hoạt động, và vì sao nó an toàn hơn password authentication. Làm sao để disable password login trên server?

## Question (EN)
Explain how SSH key-based authentication works, and why it's more secure than password authentication. How do you disable password login on a server?

## Đáp án chi tiết (VI)
**SSH key-based authentication** dùng cặp khóa **bất đối xứng (asymmetric)**: **public key** (đặt trên server, trong `~/.ssh/authorized_keys` của user cần đăng nhập) và **private key** (giữ bí mật trên máy client, không bao giờ gửi qua mạng).

**Cơ chế xác thực** (rút gọn, dựa trên challenge-response):
1. Client gửi yêu cầu kết nối, thông báo muốn xác thực bằng public key cụ thể.
2. Server kiểm tra public key đó có trong `authorized_keys` của user không. Nếu có, server tạo một **challenge** (dữ liệu ngẫu nhiên), mã hóa bằng public key đó, gửi cho client.
3. Client dùng **private key** tương ứng để giải mã/ký challenge, gửi lại kết quả cho server.
4. Server verify bằng public key — nếu đúng, xác nhận client thực sự sở hữu private key tương ứng mà **không cần truyền private key qua mạng**.

**Tạo cặp khóa**:
```bash
ssh-keygen -t ed25519 -C "user@example.com"
# Sinh ra: ~/.ssh/id_ed25519 (private, KHÔNG chia sẻ) và ~/.ssh/id_ed25519.pub (public)
```
`ed25519` được khuyến nghị hiện nay thay vì `rsa` cũ vì khóa ngắn hơn nhưng độ an toàn tương đương/cao hơn, tốc độ ký nhanh hơn.

Copy public key lên server:
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
# hoặc thủ công: cat id_ed25519.pub >> ~/.ssh/authorized_keys trên server
```

**Vì sao an toàn hơn password**:
- **Không thể brute-force thực tế**: private key thường dài 256-4096 bit, không thể đoán bằng brute-force trong thời gian hợp lý, trong khi password (kể cả password "mạnh") vẫn có nguy cơ bị brute-force hoặc credential stuffing (dùng lại password bị leak từ nơi khác).
- **Private key không bao giờ rời máy client** — kể cả nếu server bị nghe lén hoàn toàn traffic, kẻ tấn công cũng không lấy được thông tin để giả mạo xác thực lần sau, vì đó là challenge-response chứ không truyền secret trực tiếp.
- **Có thể bảo vệ private key bằng passphrase** thêm 1 lớp — nếu file private key bị đánh cắp (USB, laptop mất), kẻ tấn công vẫn cần passphrase để dùng được.
- **Dễ audit và revoke theo từng key** — xóa 1 dòng trong `authorized_keys` là vô hiệu hóa ngay 1 người dùng cụ thể, không cần đổi password chung ảnh hưởng tất cả người dùng khác.

**Disable password authentication trên server** — cấu hình trong `/etc/ssh/sshd_config`:
```
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password    # hoặc "no" để chặn hẳn root login qua SSH
```
Sau khi sửa, reload service:
```bash
sudo systemctl reload sshd
```

**Cảnh báo cực kỳ quan trọng trước khi disable password**: **luôn test đăng nhập bằng SSH key thành công trước** (mở 1 session SSH mới, KHÔNG đóng session hiện tại) trước khi apply `PasswordAuthentication no` và reload — nếu public key chưa được đặt đúng trên server (sai quyền file, sai user, sai đường dẫn `authorized_keys`), việc disable password ngay lập tức có thể **tự khóa mình ra khỏi server hoàn toàn**, đặc biệt nguy hiểm với server không có console/VNC ngoài band để cứu.

**Lưu ý về quyền file** — SSH rất khắt khe về permission, nếu sai sẽ từ chối dùng key dù nội dung đúng:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519       # private key phải kín hoàn toàn
```

## Detailed Answer (EN)
**SSH key-based authentication** uses an **asymmetric** key pair: a **public key** (placed on the server, in the target user's `~/.ssh/authorized_keys`) and a **private key** (kept secret on the client machine, never transmitted over the network).

**Authentication mechanism** (simplified, challenge-response based):
1. The client initiates a connection, indicating it wants to authenticate with a specific public key.
2. The server checks whether that public key is listed in the user's `authorized_keys`. If found, the server generates a **challenge** (random data), encrypts it with that public key, and sends it to the client.
3. The client uses the matching **private key** to decrypt/sign the challenge and sends the result back to the server.
4. The server verifies the response using the public key — success proves the client genuinely holds the matching private key **without ever transmitting the private key over the network**.

**Generating a key pair**:
```bash
ssh-keygen -t ed25519 -C "user@example.com"
# Produces: ~/.ssh/id_ed25519 (private, NEVER share) and ~/.ssh/id_ed25519.pub (public)
```
`ed25519` is the current recommendation over legacy `rsa` — shorter keys with equal or greater security and faster signing.

Copying the public key to the server:
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
# or manually: cat id_ed25519.pub >> ~/.ssh/authorized_keys on the server
```

**Why it's safer than a password**:
- **Practically immune to brute-force**: private keys are typically 256-4096 bits, infeasible to guess in any reasonable time — whereas passwords (even "strong" ones) remain vulnerable to brute-force or credential stuffing (reusing passwords leaked elsewhere).
- **The private key never leaves the client machine** — even if an attacker fully captures server-side traffic, they gain nothing usable for forging future authentication, since it's a challenge-response scheme, not a transmitted secret.
- **Can be further protected with a passphrase** — an extra layer: if the private key file is stolen (lost USB, stolen laptop), the attacker still needs the passphrase to use it.
- **Easy to audit and revoke per key** — deleting one line from `authorized_keys` instantly disables one specific person, without changing a shared password that affects every other user.

**Disabling password authentication on the server** — configure `/etc/ssh/sshd_config`:
```
PasswordAuthentication no
PubkeyAuthentication yes
PermitRootLogin prohibit-password    # or "no" to block root SSH login entirely
```
After editing, reload the service:
```bash
sudo systemctl reload sshd
```

**A critically important warning before disabling passwords**: **always test that key-based login works first** (open a new SSH session, and do NOT close your existing one) before applying `PasswordAuthentication no` and reloading — if the public key wasn't set up correctly on the server (wrong file permissions, wrong user, wrong `authorized_keys` path), disabling password login can **instantly lock you out completely**, especially dangerous on a server with no out-of-band console/VNC to rescue it.

**Note on file permissions** — SSH is strict about permissions and will silently refuse to use a key if they're wrong:
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_ed25519       # private key must be fully locked down
```
