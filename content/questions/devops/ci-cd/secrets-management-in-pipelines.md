---
id: secrets-management-in-pipelines
position: devops
technology: ci-cd
level: mid
tags: [security, secrets-management, github-actions]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để quản lý secrets (API key, DB password, credential) an toàn trong CI/CD pipeline? Những sai lầm phổ biến nào cần tránh?

## Question (EN)
How do you securely manage secrets (API keys, DB passwords, credentials) in a CI/CD pipeline? What common mistakes should be avoided?

## Đáp án chi tiết (VI)
Nguyên tắc cốt lõi: **secrets không bao giờ được commit vào Git**, không hardcode trong YAML pipeline, và phải giới hạn phạm vi truy cập theo nguyên tắc **least privilege**.

**Cách quản lý secrets đúng:**

1. **Dùng secret store của CI platform:**
```yaml
# GitHub Actions
steps:
  - run: deploy.sh
    env:
      API_KEY: ${{ secrets.PROD_API_KEY }}
```
Secrets được mã hóa lưu trên GitHub, tự động mask trong log (nếu giá trị secret vô tình bị print, GitHub thay bằng `***`).

2. **Dùng secret manager chuyên dụng** (khuyến nghị cho hệ thống lớn): HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault. Pipeline chỉ giữ một credential ngắn hạn (OIDC token) để **lấy** secret tại thời điểm chạy, thay vì lưu secret tĩnh trong CI config:
```yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/ci-deploy-role
    aws-region: ap-southeast-1
- run: |
    DB_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/db --query SecretString --output text)
```

3. **OIDC (OpenID Connect) thay vì static credentials:** GitHub Actions/GitLab CI có thể exchange một short-lived token để lấy quyền vào AWS/GCP/Azure mà không cần lưu access key vĩnh viễn trong secrets — giảm risk nếu secret bị leak vì token tự hết hạn sau vài phút.

4. **Environment-scoped secrets:** tách secret theo environment (`dev`, `staging`, `production`) với protection rule — ví dụ GitHub Environments yêu cầu approval thủ công trước khi job được quyền đọc secret của `production`.

**Sai lầm phổ biến cần tránh:**

| Sai lầm | Hậu quả | Cách khắc phục |
|---|---|---|
| Hardcode secret trong file YAML/code | Lộ vĩnh viễn trong Git history dù xóa sau đó | Dùng secret store, rotate ngay nếu đã lỡ commit |
| `echo $SECRET` để debug | Secret hiện trong log CI | Không bao giờ print secret; dùng masking |
| Secret dùng chung cho mọi môi trường | Compromise dev cũng ảnh hưởng production | Secret riêng biệt theo environment |
| Không rotate secret định kỳ | Secret cũ bị leak vẫn còn hiệu lực vô thời hạn | Rotate theo lịch (30-90 ngày) hoặc tự động qua Vault dynamic secrets |
| Cấp quyền quá rộng cho CI service account | Một pipeline bị compromise có thể phá hủy toàn bộ hạ tầng | Role/policy riêng theo từng pipeline, least privilege |
| Secret trong build args Docker (`--build-arg`) | Lưu lại trong image layer, `docker history` xem được | Dùng BuildKit secret mount: `RUN --mount=type=secret,id=mytoken` |

**Xử lý khi secret đã lỡ leak vào Git:**
1. Revoke/rotate secret ngay lập tức (quan trọng nhất, vì `git filter-branch`/BFG chỉ xóa khỏi history chứ không đảm bảo secret chưa bị ai đó lấy).
2. Dùng `git filter-repo` hoặc BFG Repo-Cleaner để xóa khỏi history.
3. Audit log truy cập xem secret có bị dùng trái phép không.

## Detailed Answer (EN)
The core principle: **secrets must never be committed to Git**, never hardcoded in pipeline YAML, and access must be scoped by **least privilege**.

**How to manage secrets correctly:**

1. **Use the CI platform's secret store:**
```yaml
# GitHub Actions
steps:
  - run: deploy.sh
    env:
      API_KEY: ${{ secrets.PROD_API_KEY }}
```
Secrets are stored encrypted and auto-masked in logs (if a secret value is accidentally printed, GitHub replaces it with `***`).

2. **Use a dedicated secret manager** (recommended for larger systems): HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault. The pipeline only holds a short-lived credential (OIDC token) used to **fetch** the secret at run time, instead of storing a static secret in CI config:
```yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::123456789:role/ci-deploy-role
    aws-region: ap-southeast-1
- run: |
    DB_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/db --query SecretString --output text)
```

3. **OIDC (OpenID Connect) instead of static credentials:** GitHub Actions/GitLab CI can exchange a short-lived token for access to AWS/GCP/Azure without ever storing a permanent access key in secrets — reducing risk if a secret leaks, since the token self-expires within minutes.

4. **Environment-scoped secrets:** separate secrets by environment (`dev`, `staging`, `production`) with protection rules — e.g. GitHub Environments can require manual approval before a job is allowed to read `production` secrets.

**Common mistakes to avoid:**

| Mistake | Consequence | Fix |
|---|---|---|
| Hardcoding secrets in YAML/code | Permanently exposed in Git history even after deletion | Use a secret store; rotate immediately if already committed |
| `echo $SECRET` for debugging | Secret shows up in CI logs | Never print secrets; rely on masking |
| Reusing the same secret across environments | A dev compromise also compromises production | Use separate secrets per environment |
| Never rotating secrets | A leaked old secret stays valid indefinitely | Rotate on a schedule (30-90 days) or automatically via Vault dynamic secrets |
| Overly broad permissions for the CI service account | One compromised pipeline can destroy the whole infrastructure | Per-pipeline roles/policies, least privilege |
| Secrets passed as Docker build args (`--build-arg`) | Persisted in the image layer, visible via `docker history` | Use BuildKit secret mounts: `RUN --mount=type=secret,id=mytoken` |

**Handling a secret that already leaked into Git:**
1. Revoke/rotate the secret immediately (the most important step, since `git filter-branch`/BFG only removes it from history — it doesn't guarantee no one already grabbed it).
2. Use `git filter-repo` or BFG Repo-Cleaner to purge it from history.
3. Audit access logs to check whether the secret was used maliciously.