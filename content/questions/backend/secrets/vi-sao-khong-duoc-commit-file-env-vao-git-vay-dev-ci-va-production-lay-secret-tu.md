---
id: vi-sao-khong-duoc-commit-file-env-vao-git-vay-dev-ci-va-production-lay-secret-tu
position: backend
technology: secrets
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không được commit file `.env` vào git? Vậy dev, CI và production lấy secret từ đâu?

## Question (EN)
Why should `.env` never be committed to git? Where do dev, CI, and production get their secrets instead?

## Đáp án chi tiết (VI)
Vì git giữ **lịch sử vĩnh viễn**: một khi secret vào commit, nó còn nằm đó kể cả sau khi bạn xoá file ở commit sau. Repo private cũng không an toàn — chỉ cần một lần chuyển sang public, một fork, một bản clone trên máy nhân viên cũ là secret đã ra ngoài.\
\
**Cách làm chuẩn:**\
- `.env` nằm trong `.gitignore`; commit `.env.example` chỉ chứa **tên biến**, không chứa giá trị.\
- **Dev**: mỗi người tự tạo `.env` local, dùng credential của môi trường dev — không bao giờ dùng key production.\
- **CI**: secret nằm ở kho secret của CI (GitHub Actions secrets, GitLab CI variables), inject vào lúc chạy qua biến môi trường.\
- **Production**: platform env vars (Vercel, Railway) hoặc secret manager chuyên dụng (AWS Secrets Manager, HashiCorp Vault) — nơi có phân quyền và audit log.\
\
Bật thêm **secret scanning + push protection** trên repo để chặn ngay lúc push, và một hook `gitleaks`/`git-secrets` ở local. Phòng ở khâu commit rẻ hơn nhiều so với đi rotate cả cụm key sau sự cố.

## Detailed Answer (EN)
Because git keeps history **forever**: once a secret lands in a commit, it stays there even if a later commit deletes the file. A private repo is not protection either — one flip to public, one fork, or one clone left on a former employee's laptop and the secret is out.\
\
**The standard setup:**\
- `.env` goes in `.gitignore`; commit an `.env.example` with **variable names only**, no values.\
- **Dev**: each developer keeps a local `.env` with dev-environment credentials — never production keys.\
- **CI**: secrets live in the CI secret store (GitHub Actions secrets, GitLab CI variables) and are injected at runtime as environment variables.\
- **Production**: platform env vars (Vercel, Railway) or a dedicated secret manager (AWS Secrets Manager, HashiCorp Vault) that provides access control and audit logs.\
\
Also enable **secret scanning with push protection** on the repo, plus a local `gitleaks`/`git-secrets` hook. Blocking at commit time is far cheaper than rotating a whole key set after an incident.
