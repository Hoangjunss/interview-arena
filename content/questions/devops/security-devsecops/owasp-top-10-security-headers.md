---
id: owasp-top-10-security-headers
position: devops
technology: security-devsecops
level: junior
tags: [owasp, application-security, http-headers]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kể tên một vài lỗ hổng trong OWASP Top 10 mà bạn biết, và cho biết những HTTP security header nào giúp giảm thiểu chúng ở tầng hạ tầng (reverse proxy/load balancer) mà không cần sửa code ứng dụng.

## Question (EN)
Name a few vulnerabilities from the OWASP Top 10, and describe which HTTP security headers help mitigate them at the infrastructure layer (reverse proxy/load balancer) without changing application code.

## Đáp án chi tiết (VI)
**OWASP Top 10** là danh sách 10 rủi ro bảo mật ứng dụng web phổ biến/nghiêm trọng nhất, được cập nhật định kỳ (bản 2021 là bản gần nhất được dùng rộng rãi). Một số mục tiêu biểu:
- **A01: Broken Access Control** — user truy cập được resource/chức năng lẽ ra không có quyền.
- **A02: Cryptographic Failures** — dữ liệu nhạy cảm truyền/lưu không mã hoá đúng cách.
- **A03: Injection** — SQL injection, command injection, XSS.
- **A05: Security Misconfiguration** — cấu hình mặc định không an toàn, header thiếu, verbose error message lộ thông tin hệ thống.

**Với vai trò DevOps, phần dễ tác động nhất mà không cần đụng code ứng dụng là cấu hình HTTP security header ở reverse proxy (Nginx, Envoy, CDN):**

| Header | Giảm thiểu rủi ro nào | Ví dụ cấu hình |
|---|---|---|
| `Strict-Transport-Security` (HSTS) | Downgrade attack HTTPS → HTTP, man-in-the-middle | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` (CSP) | XSS (A03) — chặn browser thực thi script không nằm trong whitelist | `Content-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com` |
| `X-Content-Type-Options` | MIME-sniffing attack (browser tự đoán content-type sai, thực thi file như script) | `X-Content-Type-Options: nosniff` |
| `X-Frame-Options` / `frame-ancestors` (CSP) | Clickjacking | `X-Frame-Options: DENY` |
| `Referrer-Policy` | Rò rỉ URL nội bộ nhạy cảm qua header Referer khi user click link ra ngoài | `Referrer-Policy: strict-origin-when-cross-origin` |
| `Permissions-Policy` | Hạn chế browser API nhạy cảm (camera, geolocation) mà site không cần dùng | `Permissions-Policy: geolocation=(), camera=()` |

**Cấu hình mẫu trên Nginx:**
```nginx
server {
  listen 443 ssl;

  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Content-Security-Policy "default-src 'self'" always;

  # Ẩn thông tin version server - giảm information disclosure (A05)
  server_tokens off;
}
```

**Kiểm tra nhanh header đã áp dụng chưa:**
```bash
curl -sI https://example.com | grep -Ei "strict-transport|content-security|x-frame|x-content-type"
```
Hoặc dùng công cụ online như securityheaders.com để chấm điểm.

**Giới hạn quan trọng cần nói rõ trong phỏng vấn:** những header này **giảm thiểu (mitigate)**, không phải **loại bỏ hoàn toàn (eliminate)** lỗ hổng gốc:
- CSP giúp giảm tác hại của XSS nếu chẳng may có, nhưng không thay thế được việc escape/sanitize input đúng cách trong code — vẫn cần fix ở tầng ứng dụng.
- `X-Frame-Options` chặn được clickjacking cơ bản nhưng không chặn được toàn bộ biến thể tấn công UI redressing tinh vi hơn.
- Header là lớp phòng thủ bổ sung (defense in depth), không phải giải pháp thay thế cho việc viết code an toàn (input validation, output encoding, access control đúng ở tầng service).

**Pitfall:** cấu hình CSP quá chặt mà không test kỹ có thể chặn nhầm script/font/CDN hợp pháp mà ứng dụng đang dùng, gây lỗi UI im lặng (không crash rõ ràng, chỉ là một số phần trang không render) — nên rollout CSP ở chế độ `Content-Security-Policy-Report-Only` trước để thu thập violation report mà không chặn thật, rồi mới chuyển sang enforce.

## Detailed Answer (EN)
**OWASP Top 10** is a list of the ten most common/critical web application security risks, updated periodically (the 2021 edition is the most widely used). A few notable entries:
- **A01: Broken Access Control** — a user can access resources/functions they shouldn't be authorized for.
- **A02: Cryptographic Failures** — sensitive data transmitted/stored without proper encryption.
- **A03: Injection** — SQL injection, command injection, XSS.
- **A05: Security Misconfiguration** — insecure defaults, missing headers, verbose error messages leaking system details.

**As a DevOps engineer, the easiest lever to pull without touching application code is configuring HTTP security headers at the reverse proxy (Nginx, Envoy, CDN):**

| Header | Mitigates | Example config |
|---|---|---|
| `Strict-Transport-Security` (HSTS) | HTTPS → HTTP downgrade attacks, man-in-the-middle | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` (CSP) | XSS (A03) — blocks the browser from executing scripts not on the whitelist | `Content-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com` |
| `X-Content-Type-Options` | MIME-sniffing attacks (browser guessing content-type wrong and executing a file as script) | `X-Content-Type-Options: nosniff` |
| `X-Frame-Options` / `frame-ancestors` (CSP) | Clickjacking | `X-Frame-Options: DENY` |
| `Referrer-Policy` | Leaking sensitive internal URLs via the Referer header when users click outbound links | `Referrer-Policy: strict-origin-when-cross-origin` |
| `Permissions-Policy` | Restricting sensitive browser APIs (camera, geolocation) the site doesn't need | `Permissions-Policy: geolocation=(), camera=()` |

**Sample Nginx config:**
```nginx
server {
  listen 443 ssl;

  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Content-Security-Policy "default-src 'self'" always;

  # Hide server version info - reduces information disclosure (A05)
  server_tokens off;
}
```

**Quick check whether headers are applied:**
```bash
curl -sI https://example.com | grep -Ei "strict-transport|content-security|x-frame|x-content-type"
```
Or use an online tool like securityheaders.com to score the site.

**Important limitation to state clearly in an interview:** these headers **mitigate**, they don't **eliminate**, the root vulnerability:
- CSP reduces the impact of XSS if it happens, but doesn't replace proper input escaping/sanitization in code — that fix still belongs in the application layer.
- `X-Frame-Options` stops basic clickjacking but not every more sophisticated UI-redressing variant.
- Headers are an additional defense-in-depth layer, not a substitute for writing secure code (input validation, output encoding, correct access control at the service layer).

**Pitfall:** configuring CSP too strictly without proper testing can silently block legitimate scripts/fonts/CDN resources the app relies on, causing subtle UI breakage (no obvious crash, just parts of the page not rendering) — roll out CSP in `Content-Security-Policy-Report-Only` mode first to collect violation reports without blocking, then switch to enforcement.
