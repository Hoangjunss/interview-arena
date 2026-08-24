---
id: owasp-top-10-la-gi-ke-vai-rui-ro-chinh-va-secrets-management
position: backend
technology: owasp
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OWASP Top 10 là gì? Kể vài rủi ro chính và secrets management.

## Question (EN)
What is the OWASP Top 10, and what are some key risks plus secrets management?

## Đáp án chi tiết (VI)
**OWASP Top 10** là danh sách 10 nhóm rủi ro bảo mật web nghiêm trọng nhất, cập nhật định kỳ — dùng làm khung tối thiểu để rà soát ứng dụng. Vài mục cốt lõi:\
- **Broken Access Control**: kiểm quyền thiếu/sai → user thấy/sửa dữ liệu người khác. Thường đứng đầu.\
- **Cryptographic Failures**: bảo vệ dữ liệu nhạy cảm kém (không TLS, hash mật khẩu yếu).\
- **Injection**: SQL/command/LDAP injection — dữ liệu bị hiểu thành lệnh (dùng query tham số hóa).\
- **Insecure Design, Security Misconfiguration, Vulnerable Components** (thư viện có CVE), **Identification/Auth Failures**, **SSRF**...\
\
**Secrets management** (liên quan Cryptographic/Misconfiguration): **không hardcode** API key/DB password/token trong code hay commit vào Git. Đưa vào **biến môi trường** hoặc **secret manager** (Vault, AWS Secrets Manager, Vercel env); phân quyền tối thiểu, **rotate** định kỳ, và tách secret theo môi trường (dev/prod).

## Detailed Answer (EN)
The **OWASP Top 10** is a periodically updated list of the ten most critical web security risk categories — a minimum checklist for reviewing an app. Core entries:\
- **Broken Access Control**: missing/incorrect permission checks → users see/modify others' data. Usually ranked first.\
- **Cryptographic Failures**: poor protection of sensitive data (no TLS, weak password hashing).\
- **Injection**: SQL/command/LDAP injection — data interpreted as commands (use parameterized queries).\
- **Insecure Design, Security Misconfiguration, Vulnerable Components** (libraries with CVEs), **Identification/Auth Failures**, **SSRF**...\
\
**Secrets management** (related to Cryptographic/Misconfiguration): **never hardcode** API keys/DB passwords/tokens in code or commit them to Git. Put them in **environment variables** or a **secret manager** (Vault, AWS Secrets Manager, Vercel env); grant least privilege, **rotate** regularly, and separate secrets per environment (dev/prod).
