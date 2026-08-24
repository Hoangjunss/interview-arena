---
id: secrets-management-gitops
position: devops
technology: gitops-release-mgmt
level: senior
tags: [gitops, security, secrets, kubernetes]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GitOps yêu cầu mọi thứ nằm trong Git, nhưng secret (mật khẩu DB, API key) thì không được commit plaintext vào Git. Giải quyết mâu thuẫn này như thế nào? So sánh các giải pháp phổ biến.

## Question (EN)
GitOps requires everything to live in Git, but secrets (DB passwords, API keys) can never be committed in plaintext. How do you resolve this conflict? Compare the common solutions.

## Đáp án chi tiết (VI)
Đây là một trong những **câu hỏi kinh điển nhất** khi phỏng vấn GitOps ở mức senior, vì nó chạm vào mâu thuẫn cốt lõi: nguyên tắc "Git là single source of truth" đối nghịch trực tiếp với nguyên tắc bảo mật "không bao giờ commit secret plaintext". Có 3 nhóm giải pháp chính, mỗi nhóm giải quyết mâu thuẫn theo cách khác nhau.

### Nhóm 1: Mã hoá secret trước khi commit vào Git (Sealed Secrets)
**Bitnami Sealed Secrets**: dùng cặp khoá public/private theo cluster. Encrypt bằng public key (an toàn để commit), chỉ controller trong cluster (giữ private key) mới decrypt được.
```bash
# Encrypt secret thành SealedSecret, an toàn để commit
kubeseal --format yaml < secret.yaml > sealed-secret.yaml
git add sealed-secret.yaml && git commit -m "add db credentials"
```
```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-credentials
spec:
  encryptedData:
    password: AgBy3i4OJSWK+PiTySYZZA9rO...   # ciphertext, vô nghĩa nếu bị leak
```
- **Ưu điểm**: đơn giản, tích hợp trực tiếp vào GitOps flow như resource bình thường, controller tự decrypt khi apply.
- **Nhược điểm**: private key gắn với 1 cluster cụ thể — nếu rebuild cluster mới (disaster recovery), phải backup/restore key riêng, nếu mất key thì **toàn bộ SealedSecret cũ vô dụng, phải tạo lại tất cả secret**.

**SOPS (Secrets OPerationS) + age/GPG/KMS**: mã hoá value trong file YAML/JSON, giữ nguyên cấu trúc, tích hợp với Flux native (`decryption` field trong `Kustomization`).
```yaml
# secret.enc.yaml - chỉ value bị mã hoá, structure vẫn đọc được
apiVersion: v1
kind: Secret
stringData:
    password: ENC[AES256_GCM,data:Ttp...,type:str]
sops:
    kms: [...]  # hoặc age/gpg
```
- **Ưu điểm**: hỗ trợ nhiều backend key (AWS KMS, GCP KMS, age, PGP) — không khoá cứng vào 1 cluster như Sealed Secrets, dễ disaster recovery hơn (key quản lý ở KMS cloud, tách biệt cluster).
- **Nhược điểm**: cần cấu hình decrypt key cho Flux/ArgoCD (qua plugin), thêm một bước ở CI để encrypt trước khi commit.

### Nhóm 2: Không lưu secret trong Git — chỉ lưu *reference* (External Secrets)
**External Secrets Operator (ESO)**: Git chỉ chứa một CRD trỏ tới secret thật nằm ở Vault/AWS Secrets Manager/GCP Secret Manager; controller tự fetch và tạo Kubernetes Secret tại runtime.
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  secretStoreRef:
    name: vault-backend
  target:
    name: db-credentials    # K8s Secret sẽ được tạo với tên này
  data:
    - secretKey: password
      remoteRef:
        key: prod/order-service/db
        property: password
```
- **Ưu điểm**: secret **không bao giờ nằm trong Git dù ở dạng mã hoá** — tách biệt hoàn toàn vòng đời secret (rotate, revoke ở Vault) khỏi vòng đời deploy config; đáp ứng tốt yêu cầu compliance nghiêm ngặt (PCI-DSS, SOC2) vốn thường cấm cả ciphertext của secret nằm trong version control.
- **Nhược điểm**: thêm phụ thuộc external system (Vault/Secrets Manager phải luôn sẵn sàng, nếu down thì secret mới không fetch được dù Git vẫn đúng); phức tạp hơn khi bootstrap cluster mới (cần cấu hình kết nối tới secret store trước).

### Nhóm 3: Vault Agent Injector / CSI Secret Store driver
Secret hoàn toàn không đi qua Kubernetes Secret object — inject trực tiếp vào Pod dưới dạng file/env qua sidecar hoặc CSI volume, tại thời điểm Pod khởi động.
- **Ưu điểm**: giảm bề mặt tấn công tối đa (không có Secret object nào trong etcd để lộ nếu etcd bị compromise).
- **Nhược điểm**: phức tạp nhất để vận hành, cần Vault infra trưởng thành.

**Bảng so sánh quyết định:**

| Giải pháp | Secret có nằm (mã hoá) trong Git? | Độ phức tạp | Phù hợp |
|---|---|---|---|
| Sealed Secrets | Có (ciphertext) | Thấp | Team nhỏ, ít cluster, không cần rotate thường xuyên |
| SOPS + KMS | Có (ciphertext) | Trung bình | Team đã dùng cloud KMS, cần multi-cluster |
| External Secrets Operator | Không (chỉ reference) | Trung bình-Cao | Tổ chức có Vault/Secrets Manager sẵn, cần compliance nghiêm |
| Vault Agent Injector | Không | Cao | Yêu cầu bảo mật cực cao, secret rotate liên tục |

**Kết luận cho câu trả lời senior:** không có giải pháp "đúng tuyệt đối" — quyết định phụ thuộc vào **mức độ trưởng thành hạ tầng secret management sẵn có** (đã có Vault chưa) và **yêu cầu compliance**. Nguyên tắc bất biến cần giữ: **secret KHÔNG BAO GIỜ ở dạng plaintext trong Git**, nhưng "Git chứa mọi thứ" có thể linh hoạt thành "Git chứa mọi thứ CÓ THỂ AN TOÀN ĐỂ COMMIT — bao gồm cả ciphertext hoặc reference, chứ không nhất thiết phải là giá trị thật".

**Pitfall thực tế từng gặp:** dùng Sealed Secrets nhưng không backup private key của controller — khi cluster bị xoá nhầm và rebuild lại, toàn bộ ~200 SealedSecret trong Git trở thành vô dụng vì key giải mã đã mất, phải reset lại toàn bộ secret thủ công cho mọi service.

## Detailed Answer (EN)
This is one of the most **classic senior-level GitOps interview questions**, because it touches the core conflict: the "Git is the single source of truth" principle directly opposes the security principle of "never commit plaintext secrets." There are 3 main solution categories, each resolving the conflict differently.

### Category 1: Encrypt the secret before committing to Git (Sealed Secrets)
**Bitnami Sealed Secrets**: uses a public/private key pair per cluster. Encrypt with the public key (safe to commit); only the in-cluster controller (holding the private key) can decrypt.
```bash
# Encrypt a secret into a SealedSecret, safe to commit
kubeseal --format yaml < secret.yaml > sealed-secret.yaml
git add sealed-secret.yaml && git commit -m "add db credentials"
```
```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-credentials
spec:
  encryptedData:
    password: AgBy3i4OJSWK+PiTySYZZA9rO...   # ciphertext, meaningless if leaked
```
- **Pros**: simple, integrates directly into the GitOps flow as a normal resource, the controller auto-decrypts on apply.
- **Cons**: the private key is tied to one specific cluster — rebuilding a new cluster (disaster recovery) requires separately backing up/restoring the key; if the key is lost, **all old SealedSecrets become useless, and every secret must be recreated**.

**SOPS (Secrets OPerationS) + age/GPG/KMS**: encrypts values within a YAML/JSON file while preserving structure, integrates natively with Flux (via the `decryption` field in a `Kustomization`).
```yaml
# secret.enc.yaml - only the values are encrypted, structure stays readable
apiVersion: v1
kind: Secret
stringData:
    password: ENC[AES256_GCM,data:Ttp...,type:str]
sops:
    kms: [...]  # or age/gpg
```
- **Pros**: supports multiple key backends (AWS KMS, GCP KMS, age, PGP) — not hardwired to one cluster like Sealed Secrets, easier disaster recovery (key managed in a cloud KMS, separate from the cluster).
- **Cons**: requires configuring a decryption key for Flux/ArgoCD (via a plugin), adds an encryption step in CI before committing.

### Category 2: Don't store the secret in Git at all — store only a *reference* (External Secrets)
**External Secrets Operator (ESO)**: Git contains only a CRD pointing to the real secret stored in Vault/AWS Secrets Manager/GCP Secret Manager; the controller fetches it and creates the Kubernetes Secret at runtime.
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  secretStoreRef:
    name: vault-backend
  target:
    name: db-credentials    # the K8s Secret created will have this name
  data:
    - secretKey: password
      remoteRef:
        key: prod/order-service/db
        property: password
```
- **Pros**: the secret **never lives in Git, not even encrypted** — completely decoupling the secret's lifecycle (rotation, revocation in Vault) from the config's deploy lifecycle; satisfies strict compliance requirements (PCI-DSS, SOC2) that often forbid even ciphertext of secrets in version control.
- **Cons**: adds an external system dependency (Vault/Secrets Manager must always be available; if it's down, new secrets can't be fetched even though Git is still correct); more complex to bootstrap a new cluster (must configure the connection to the secret store first).

### Category 3: Vault Agent Injector / CSI Secret Store driver
Secrets never pass through a Kubernetes Secret object at all — injected directly into the Pod as a file/env var via a sidecar or CSI volume at Pod startup time.
- **Pros**: minimizes attack surface (no Secret object in etcd to expose if etcd is compromised).
- **Cons**: the most operationally complex, requiring a mature Vault infrastructure.

**Decision comparison table:**

| Solution | Is the secret (encrypted) in Git? | Complexity | Best fit |
|---|---|---|---|
| Sealed Secrets | Yes (ciphertext) | Low | Small teams, few clusters, infrequent rotation |
| SOPS + KMS | Yes (ciphertext) | Medium | Teams already using a cloud KMS, needing multi-cluster |
| External Secrets Operator | No (reference only) | Medium-High | Organizations with an existing Vault/Secrets Manager, strict compliance |
| Vault Agent Injector | No | High | Extremely high security requirements, frequent secret rotation |

**Conclusion for a senior-level answer:** there's no "absolutely correct" solution — the decision depends on the **maturity of existing secret-management infrastructure** (is Vault already in place?) and **compliance requirements**. The invariant to preserve: secrets must **NEVER be plaintext in Git**, but "Git contains everything" can flexibly mean "Git contains everything SAFE TO COMMIT — including ciphertext or references, not necessarily the real value."

**A real-world pitfall:** using Sealed Secrets without backing up the controller's private key — when the cluster is accidentally deleted and rebuilt, all ~200 SealedSecrets in Git become useless because the decryption key is gone, requiring every secret for every service to be reset manually.
