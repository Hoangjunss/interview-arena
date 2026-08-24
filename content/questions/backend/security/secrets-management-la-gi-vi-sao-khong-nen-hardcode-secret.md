---
id: secrets-management-la-gi-vi-sao-khong-nen-hardcode-secret
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Secrets management là gì? Vì sao không nên hardcode secret?

## Question (EN)
What is secrets management, and why not hardcode secrets?

## Đáp án chi tiết (VI)
Secret là dữ liệu nhạy cảm để truy cập tài nguyên: **mật khẩu, API key, DB credential, token, khóa mã hóa, chứng chỉ**. Secrets management là cách **lưu, phân phối, xoay vòng và kiểm soát truy cập** chúng an toàn.\
\
Vì sao **không hardcode** vào code/repo:\
- Commit vào Git là **lộ vĩnh viễn trong lịch sử**, kể cả khi xóa sau đó; repo bị leak là mất sạch.\
- Không xoay vòng được, ai đọc code cũng thấy, vi phạm least privilege.\
\
Thực hành đúng:\
- Để secret **ngoài code** — biến môi trường hoặc **secret store chuyên dụng** (HashiCorp Vault, AWS Secrets Manager, GCP/Azure equivalent, K8s Secret + encryption at rest).\
- **Mã hóa** khi lưu (at rest) và khi truyền (in transit).\
- **Least privilege** + audit ai truy cập.\
- **Rotation** định kỳ và thu hồi nhanh khi nghi lộ; ưu tiên credential ngắn hạn (IAM role) hơn key tĩnh.\
- Quét secret trong CI (git-secrets, trufflehog) để chặn commit nhầm.

## Detailed Answer (EN)
A secret is sensitive data used to access resources: **passwords, API keys, DB credentials, tokens, encryption keys, certificates**. Secrets management is how you **store, distribute, rotate and control access** to them safely.\
\
Why **not hardcode** into code/repos:\
- Committing to Git is a **permanent exposure in history**, even if deleted later; a leaked repo loses everything.\
- You cannot rotate them, anyone reading the code sees them, and it violates least privilege.\
\
Good practices:\
- Keep secrets **out of code** — environment variables or a **dedicated secret store** (HashiCorp Vault, AWS Secrets Manager, GCP/Azure equivalents, K8s Secrets + encryption at rest).\
- **Encrypt** at rest and in transit.\
- **Least privilege** + audit who accesses them.\
- **Rotate** regularly and revoke fast on suspected leaks; prefer short-lived credentials (IAM roles) over static keys.\
- Scan for secrets in CI (git-secrets, trufflehog) to block accidental commits.
