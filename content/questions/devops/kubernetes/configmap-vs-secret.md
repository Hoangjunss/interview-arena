---
id: configmap-vs-secret
position: devops
technology: kubernetes
level: junior
tags: [kubernetes, configuration, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ConfigMap và Secret khác nhau ở điểm nào? Secret có thực sự "an toàn" như tên gọi không?

## Question (EN)
What's the difference between a ConfigMap and a Secret? Is a Secret actually as "secure" as its name suggests?

## Đáp án chi tiết (VI)
Cả hai đều dùng để **tách cấu hình ra khỏi image**, cho phép đổi config mà không cần build lại container.

| Đặc điểm | ConfigMap | Secret |
|---|---|---|
| Dữ liệu | Plain text | **Base64-encoded** (không phải mã hóa!) |
| Mục đích | Config không nhạy cảm (URL, feature flag, file config) | Dữ liệu nhạy cảm (password, token, TLS cert) |
| Giới hạn size | 1MiB | 1MiB |
| Lưu trong etcd | Plain text | Base64 — **vẫn đọc được nếu không bật encryption at rest** |

**Sự thật quan trọng hay bị hỏi bẫy**: Secret **không mã hóa dữ liệu**, chỉ **encode base64** — decode một dòng lệnh là ra:
```bash
kubectl get secret db-secret -o jsonpath='{.data.password}' | base64 -d
```
Vì vậy Secret an toàn hơn ConfigMap chủ yếu nhờ:
1. Kubernetes áp `RBAC` chặt hơn cho resource `secrets` theo mặc định best practice.
2. `kubectl get secret` không in giá trị mặc định (`kubectl describe` che giá trị).
3. Có thể bật **encryption at rest** cho etcd (`EncryptionConfiguration`) — nếu không bật, Secret nằm trong etcd dưới dạng base64 y hệt như ConfigMap, ai đọc được etcd là đọc được password.

**Cách dùng trong Pod** — 2 cách chính:
```yaml
envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: app-secret
volumes:
  - name: secret-vol
    secret:
      secretName: app-secret
```

**Best practice production**:
- Không commit Secret YAML (dù base64) vào git — dùng **Sealed Secrets**, **External Secrets Operator**, hoặc **Vault** để inject secret runtime.
- Set `immutable: true` cho ConfigMap/Secret không đổi để giảm tải watch của apiserver và tránh rollout ngoài ý muốn.
- Đổi giá trị Secret gắn qua `env` **không tự restart Pod** — Pod phải được recreate (dùng volume mount + `subPath` hoặc tool như Reloader để tự động rolling restart khi Secret đổi).

## Detailed Answer (EN)
Both exist to **decouple configuration from the image**, letting you change config without rebuilding the container.

| Feature | ConfigMap | Secret |
|---|---|---|
| Data | Plain text | **Base64-encoded** (not encrypted!) |
| Purpose | Non-sensitive config (URLs, feature flags, config files) | Sensitive data (passwords, tokens, TLS certs) |
| Size limit | 1MiB | 1MiB |
| Stored in etcd | Plain text | Base64 — **still readable if encryption at rest isn't enabled** |

**A key fact that's often used as a trick question**: a Secret is **not encrypted**, only **base64-encoded** — one command decodes it:
```bash
kubectl get secret db-secret -o jsonpath='{.data.password}' | base64 -d
```
So Secrets are safer than ConfigMaps mainly because of:
1. Kubernetes applies stricter `RBAC` conventions to the `secrets` resource by default best practice.
2. `kubectl get secret` doesn't print values by default (`kubectl describe` masks values).
3. You can enable **encryption at rest** for etcd (`EncryptionConfiguration`) — without it, Secrets sit in etcd as plain base64, identical to ConfigMaps; anyone who can read etcd can read the password.

**Consuming them in a Pod** — two main ways:
```yaml
envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: app-secret
volumes:
  - name: secret-vol
    secret:
      secretName: app-secret
```

**Production best practices**:
- Never commit Secret YAML (even base64-encoded) to git — use **Sealed Secrets**, **External Secrets Operator**, or **Vault** to inject secrets at runtime.
- Set `immutable: true` on ConfigMaps/Secrets that don't change, to reduce apiserver watch load and prevent accidental rollouts.
- Changing a Secret consumed via `env` does **not** automatically restart the Pod — the Pod must be recreated (use a volume mount with `subPath`, or a tool like Reloader to trigger an automatic rolling restart when the Secret changes).
