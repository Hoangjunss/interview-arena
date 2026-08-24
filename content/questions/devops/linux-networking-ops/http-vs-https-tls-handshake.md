---
id: http-vs-https-tls-handshake
position: devops
technology: linux-networking-ops
level: junior
tags: [tls, https, networking, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTPS khác HTTP như thế nào ở tầng network? Trình bày ngắn gọn các bước của TLS handshake.

## Question (EN)
How does HTTPS differ from HTTP at the network layer? Briefly describe the steps of a TLS handshake.

## Đáp án chi tiết (VI)
**HTTP** truyền dữ liệu dạng plaintext qua TCP (thường port 80) — bất kỳ ai chặn được traffic trên đường truyền (man-in-the-middle, sniffing trên mạng chung) đều có thể đọc/sửa nội dung. **HTTPS** = HTTP chạy bên trong một tầng **TLS (Transport Layer Security)** đã mã hóa, thường qua port 443. Về bản chất, HTTPS không phải một giao thức khác — nó là HTTP thông thường được "bọc" thêm một lớp TLS bên dưới để cung cấp 3 thuộc tính bảo mật: **mã hóa** (confidentiality), **toàn vẹn dữ liệu** (integrity, chống bị sửa đổi trên đường truyền), và **xác thực danh tính server** (authentication, qua certificate).

**Thứ tự thiết lập kết nối HTTPS**:
1. **TCP three-way handshake** trước tiên (SYN, SYN-ACK, ACK) — thiết lập kết nối TCP như bình thường.
2. **TLS handshake** diễn ra ngay sau đó, trên nền kết nối TCP đã có, trước khi bất kỳ dữ liệu HTTP nào được gửi.

**Các bước chính của TLS handshake (TLS 1.2, để dễ hình dung; TLS 1.3 rút gọn còn 1-RTT)**:

```
Client                                          Server
  |---- ClientHello (TLS version, cipher suites hỗ trợ, random) --->|
  |<--- ServerHello (chọn cipher suite, random) ---------------------|
  |<--- Certificate (chứng chỉ + public key của server) -------------|
  |<--- ServerHelloDone ------------------------------------------- |
  |---- ClientKeyExchange (premaster secret, mã hóa bằng public key)->|
  |---- ChangeCipherSpec + Finished --------------------------------->|
  |<--- ChangeCipherSpec + Finished -----------------------------------|
  ===== Bắt đầu truyền dữ liệu HTTP đã mã hóa bằng session key =====
```

1. **ClientHello**: client gửi danh sách TLS version và cipher suite hỗ trợ, kèm 1 số random.
2. **ServerHello**: server chọn 1 TLS version + cipher suite từ danh sách, gửi kèm số random riêng.
3. **Certificate**: server gửi chứng chỉ X.509 (chứa public key, được ký bởi CA). Client verify chứng chỉ bằng cách kiểm tra chain-of-trust tới CA gốc đã tin cậy sẵn (root CA có trong trust store của OS/browser), kiểm tra hostname khớp, và chưa hết hạn/bị revoke.
4. **Key exchange**: client (TLS 1.2, RSA key exchange) tạo "premaster secret", mã hóa bằng public key của server rồi gửi đi — chỉ server có private key tương ứng mới giải mã được. Cả 2 bên từ đó tính ra cùng một **session key** đối xứng (symmetric key) dùng để mã hóa dữ liệu thực tế (nhanh hơn nhiều so với mã hóa bất đối xứng cho toàn bộ traffic).
5. **Finished**: cả 2 bên xác nhận handshake hoàn tất, bắt đầu truyền dữ liệu HTTP đã mã hóa bằng session key.

**Điểm khác biệt TLS 1.3 (hiện là chuẩn khuyến nghị)**: rút gọn handshake xuống **1-RTT** (thay vì 2-RTT như TLS 1.2), loại bỏ các cipher suite yếu/cũ, hỗ trợ **0-RTT resumption** cho kết nối lặp lại tới cùng server — giảm đáng kể độ trễ khi thiết lập kết nối, quan trọng với mobile/high-latency network.

**Vì sao dùng cả mã hóa bất đối xứng lẫn đối xứng**: mã hóa bất đối xứng (RSA/ECDHE) an toàn hơn cho việc trao đổi khóa qua kênh chưa tin cậy nhưng **chậm hơn nhiều lần** so với đối xứng (AES) — nên chỉ dùng bất đối xứng ở bước bắt tay để trao đổi session key, còn toàn bộ traffic thực tế sau đó dùng đối xứng để đảm bảo tốc độ.

## Detailed Answer (EN)
**HTTP** transmits data in plaintext over TCP (usually port 80) — anyone who can intercept traffic on the path (man-in-the-middle, sniffing on a shared network) can read or modify the content. **HTTPS** = HTTP running inside an encrypted **TLS (Transport Layer Security)** layer, typically over port 443. It's not a separate protocol — it's ordinary HTTP wrapped in a TLS layer that provides three security properties: **encryption** (confidentiality), **data integrity** (protection against tampering in transit), and **server authentication** (via certificate).

**Order of establishing an HTTPS connection**:
1. **TCP three-way handshake** happens first (SYN, SYN-ACK, ACK) — a normal TCP connection is established.
2. The **TLS handshake** happens immediately after, on top of the already-established TCP connection, before any HTTP data is sent.

**Main steps of a TLS handshake (TLS 1.2, for illustration; TLS 1.3 shortens this to 1-RTT)**:

```
Client                                          Server
  |---- ClientHello (TLS version, supported cipher suites, random) ->|
  |<--- ServerHello (chosen cipher suite, random) --------------------|
  |<--- Certificate (server's cert + public key) ----------------------|
  |<--- ServerHelloDone ------------------------------------------- |
  |---- ClientKeyExchange (premaster secret, encrypted with pubkey)-->|
  |---- ChangeCipherSpec + Finished --------------------------------->|
  |<--- ChangeCipherSpec + Finished -----------------------------------|
  ===== Encrypted HTTP data flow begins using the session key =====
```

1. **ClientHello**: the client sends supported TLS versions and cipher suites, plus a random number.
2. **ServerHello**: the server picks one TLS version + cipher suite from the list, sending its own random number.
3. **Certificate**: the server sends its X.509 certificate (containing the public key, signed by a CA). The client verifies it by checking the chain of trust up to a pre-trusted root CA (in the OS/browser's trust store), verifying the hostname matches, and confirming it isn't expired or revoked.
4. **Key exchange**: the client (in TLS 1.2 RSA key exchange) generates a "premaster secret," encrypts it with the server's public key, and sends it — only the server holding the matching private key can decrypt it. Both sides then derive the same symmetric **session key**, used to encrypt actual traffic (much faster than asymmetric encryption for the full data stream).
5. **Finished**: both sides confirm the handshake is complete, and encrypted HTTP traffic using the session key begins.

**TLS 1.3 differences (the current recommended standard)**: shortens the handshake to **1-RTT** (down from 2-RTT in TLS 1.2), removes weak/legacy cipher suites, and supports **0-RTT resumption** for repeat connections to the same server — significantly cutting connection-setup latency, which matters a lot for mobile/high-latency networks.

**Why both asymmetric and symmetric encryption are used**: asymmetric encryption (RSA/ECDHE) is safer for exchanging keys over an untrusted channel but is **orders of magnitude slower** than symmetric encryption (AES) — so asymmetric crypto is only used during the handshake to exchange the session key, while all subsequent actual traffic uses symmetric encryption for speed.
