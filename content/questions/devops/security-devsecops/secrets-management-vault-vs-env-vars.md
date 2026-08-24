---
id: secrets-management-vault-vs-env-vars
position: devops
technology: security-devsecops
level: junior
tags: [secrets-management, vault, env-vars]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao lưu secret (mật khẩu DB, API key) dưới dạng biến môi trường plaintext trong file `.env` hoặc trong manifest Kubernetes lại không an toàn? Nên dùng giải pháp nào thay thế?

## Question (EN)
Why is storing secrets (DB passwords, API keys) as plaintext environment variables in a `.env` file or Kubernetes manifest insecure? What should be used instead?

## Đáp án chi tiết (VI)
**Vấn đề với env vars plaintext:**
- File `.env` thường bị commit nhầm lên Git (rồi nằm mãi trong history dù xoá sau).
- Biến môi trường của một process có thể bị đọc bởi bất kỳ ai có quyền truy cập `/proc/<pid>/environ` trên host, hoặc bởi các process con kế thừa toàn bộ env.
- Trong Kubernetes, secret đặt trực tiếp trong `env:` của Pod spec sẽ hiện rõ trong `kubectl describe pod`, log CI/CD, và trong etcd (nếu chưa bật encryption at rest) — ai có quyền `get pods` là đọc được.
- Không có cơ chế **rotation**, **audit log ai đã đọc secret nào lúc nào**, và không có **least privilege** (mọi service có quyền đọc namespace đều thấy hết secret).
- Secret dễ bị leak qua crash dump, log ứng dụng in nhầm `process.env`, hoặc qua các công cụ APM/tracing vô tình capture toàn bộ environment.

**Giải pháp thay thế:**

| Giải pháp | Đặc điểm | Khi dùng |
|---|---|---|
| **HashiCorp Vault** | Dynamic secrets, lease + auto-revoke, audit log chi tiết, policy theo path | Đa cloud, cần rotation động (DB creds sinh ra theo yêu cầu) |
| **AWS KMS + Secrets Manager** | Tích hợp IAM, tự động rotate RDS password | Hệ sinh thái AWS |
| **GCP Secret Manager / Azure Key Vault** | Tương tự, tích hợp IAM cloud tương ứng | Hệ sinh thái GCP/Azure |
| **Kubernetes Sealed Secrets / SOPS** | Mã hoá secret ngay trong Git, giải mã lúc apply | Team nhỏ, muốn GitOps mà vẫn an toàn |
| **External Secrets Operator (ESO)** | Đồng bộ secret từ Vault/AWS/GCP vào K8s Secret tự động | Đã có Vault/cloud secret store, muốn K8s-native |

**Ví dụ với Vault (dynamic DB credentials):**
```bash
# App request credential ngắn hạn thay vì dùng password cố định
vault read database/creds/readonly-role
# Output: username=v-token-readonly-abc123, password=A1b2C3..., lease_duration=1h
```
Sau 1 giờ, Vault tự revoke credential này khỏi DB — kể cả nếu leak, kẻ tấn công cũng chỉ có cửa sổ ngắn để khai thác.

**Trong Kubernetes với External Secrets Operator:**
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: db-credentials-k8s
  data:
    - secretKey: password
      remoteRef:
        key: secret/data/prod/db
        property: password
```

**Lưu ý/pitfall thường gặp:**
- Bật **encryption at rest cho etcd** — K8s Secret mặc định chỉ base64, không mã hoá.
- Đừng nghĩ Vault là "bulletproof" nếu vẫn hardcode root token vào CI script — phải dùng auth method (Kubernetes auth, AppRole) để app tự xác thực mà không cần biết secret tĩnh nào.
- Không nên tự triển khai Vault production mà chưa có kế hoạch unseal/HA — mất Vault = toàn bộ app không lấy được secret khi restart.

## Detailed Answer (EN)
**Problems with plaintext env vars:**
- `.env` files get accidentally committed to Git (and stay in history even after deletion).
- Any process's environment variables can be read by anyone with access to `/proc/<pid>/environ`, and are inherited by all child processes.
- In Kubernetes, secrets placed directly in a Pod's `env:` block show up in `kubectl describe pod`, CI/CD logs, and in etcd (if encryption at rest isn't enabled) — anyone with `get pods` permission can read them.
- No built-in **rotation**, no **audit trail** of who read which secret when, and no **least privilege** (any service that can read the namespace sees every secret).
- Secrets easily leak via crash dumps, apps that accidentally log `process.env`, or APM/tracing tools that capture the full environment.

**Alternatives:**

| Solution | Characteristics | When to use |
|---|---|---|
| **HashiCorp Vault** | Dynamic secrets, lease + auto-revoke, detailed audit log, path-based policy | Multi-cloud, need dynamic rotation (DB creds generated on demand) |
| **AWS KMS + Secrets Manager** | IAM-integrated, auto-rotates RDS passwords | AWS ecosystem |
| **GCP Secret Manager / Azure Key Vault** | Similar, integrates with respective cloud IAM | GCP/Azure ecosystem |
| **Kubernetes Sealed Secrets / SOPS** | Encrypt secrets right in Git, decrypt at apply time | Small teams wanting GitOps while staying safe |
| **External Secrets Operator (ESO)** | Syncs secrets from Vault/AWS/GCP into native K8s Secrets automatically | Already have Vault/cloud secret store, want K8s-native consumption |

**Example with Vault (dynamic DB credentials):**
```bash
# App requests a short-lived credential instead of using a fixed password
vault read database/creds/readonly-role
# Output: username=v-token-readonly-abc123, password=A1b2C3..., lease_duration=1h
```
After 1 hour Vault auto-revokes the credential from the DB — even if leaked, an attacker only has a narrow window to exploit it.

**In Kubernetes with External Secrets Operator:**
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: db-credentials-k8s
  data:
    - secretKey: password
      remoteRef:
        key: secret/data/prod/db
        property: password
```

**Common pitfalls:**
- Enable **etcd encryption at rest** — Kubernetes Secrets are base64-encoded by default, not encrypted.
- Don't consider Vault "bulletproof" if you still hardcode a root token into a CI script — use an auth method (Kubernetes auth, AppRole) so apps authenticate themselves without knowing any static secret.
- Don't run Vault in production without an unseal/HA plan — losing Vault means the app can't fetch secrets on restart.
